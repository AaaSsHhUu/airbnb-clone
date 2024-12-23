import { ShowRating, SubmitRating } from "@/components/Rating"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { FaLocationDot } from "react-icons/fa6"
import { BiSolidCategoryAlt } from "react-icons/bi";
import { InfiniteMovingCards } from "@/components/ui/infiniteMovingCards";
import { useForm, Controller } from "react-hook-form";
import { useDeleteListingMutation, useListingDetailsQuery } from "@/redux/api/listingApi";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { MdOutlineDelete, MdOutlineEditNote } from "react-icons/md";
import { ListingDetailsSkeleton } from "@/components/ui/skeleton";

type ReviewFormData = {
    rating: number;
    review: string;
}

interface ApiError {
    data: {
        success: boolean;
        message: string;
    }
}

function ListingDetails() {

    const { register, handleSubmit, control } = useForm<ReviewFormData>();

    const { id } = useParams();
    const navigate = useNavigate();

    const { user } = useSelector((state: RootState) => state.userReducer);

    const { data, isLoading, isError, error } = useListingDetailsQuery(id || "");
    const [deleteListing] = useDeleteListingMutation();

    const deleteListingHandler = async () => {
        const res = await deleteListing({listingId : id || ""});
        if("data" in res){
            toast.success("Listing deleted successfully");
            navigate("/");
        }
        console.log("delete listing res : ", res);
    }

    const editButtonHandler = (listingId : string) => {
        navigate(`/update-listing/${listingId}`);
    }

    // console.log("data : ", {data, isLoading, isError, error});

    if (isError) {
        const err = error as ApiError;
        console.log(error);
        toast.error(err.data.message || "Some error occured");
        return (
            <div className="h-screen grid place-content-center">
                <h1 className="text-xl font-bold">{err.data.message.toUpperCase()}</h1>
            </div>
        )
    }

    const onSubmit = (data: ReviewFormData) => {
        console.log("Submitted review : ", data);
        try {

        } catch (error) {

        }
    }

    const reviews = [
        {
            name: "anocxasiuwn",
            review: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nostrum cum laboriosam id dolore nemo molestias,"
        },
        {
            name: "anocxqwiuwn",
            review: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nostrum cum laboriosam id dolore nemo molestias, vitae tempore quae voluptate officia fuga doloribus, blanditiis rem beatae optio fugiat! Neque, quasi esse?Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nostrum cum laboriosam id dolore nemo molestias, vitae tempore quae voluptate officia fuga doloribus, blanditiis rem beatae optio fugiat! Neque, quasi esse?"
        },
        {
            name: "anocxwiuwn",
            review: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nostrum cum laboriosam id dolore nemo molestias, vitae tempore quae voluptate officia fuga doloribus, blanditiis rem beatae optio fugiat! Neque, quasi esse?"
        },
        {
            name: "anocxiuwn",
            review: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nostrum cum laboriosam id dolore nemo molestias, vitae tempore quae voluptate officia fuga doloribus, blanditiis rem beatae optio fugiat! Neque, quasi esse?"
        },
        {
            name: "anodcxiuwn",
            review: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nostrum cum laboriosam id dolore nemo molestias, vitae tempore quae voluptate officia fuga doloribus, blanditiis rem beatae optio fugiat! Neque, quasi esse?Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nostrum cum laboriosam id dolore nemo molestias, vitae tempore quae voluptate officia fuga doloribus, blanditiis rem beatae optio fugiat! Neque, quasi esse?"
        },
    ];

    if (isLoading) {
        return <ListingDetailsSkeleton />
    }

    return (
        <div className="mt-24">
            <div className="p-4 max-w-[90%] lg:max-w-[80%] mx-auto flex flex-col gap-4">
                <div className="flex items-center justify-between w-full px-4">
                    <h1 className="text-2xl font-bold">
                        {data?.listing.title}
                    </h1>
                    <ShowRating value={3} />
                </div>
                <Separator className="bg-gray-400" />
                {/* Image and details */}
                <div className="flex justify-between gap-2">
                    <div className="w-1/2 rounded-lg overflow-hidden">
                        <img src={data?.listing.image.url} alt={data?.listing.title} className="max-h-[25rem] h-full" />
                    </div>

                    <div className="w-1/2 p-4 flex flex-col gap-4 relative">
                        <p className="opacity-70 italic">{data?.listing.description}</p>

                        <p className="text-base font-semibold">
                            <span className="font-bold text-xl">₹ {data?.listing.price}</span> per night
                        </p>

                        <p className="flex items-center gap-2 text-base font-semibold">
                            <BiSolidCategoryAlt size={22} /> {data?.listing.category}
                        </p>

                        <p className="flex items-center gap-2 text-base font-semibold">
                            <FaLocationDot size={20} /> {data?.listing.location + ", " + data?.listing.country}
                        </p>

                        {(user && user._id === data?.listing.owner) &&
                            <div className="flex items-center w-full justify-center absolute bottom-0">
                                <Button className="rounded-r-none" onClick={() => editButtonHandler(id!)}>
                                    <MdOutlineEditNote />Edit
                                </Button>
                                <Button variant={'destructive'} className="rounded-l-none" onClick={deleteListingHandler}>
                                    <MdOutlineDelete />Delete
                                </Button>
                            </div>
                        }
                    </div>
                </div>
                <Separator className="bg-gray-400" />
                {/* Rating and Reviews */}
                <div className="flex items-center gap-2 w-full">
                    {/* Review Form */}
                    <div className="max-w-[30%] flex flex-col gap-2 items-center w-full">
                        <h1 className="font-bold text-xl opacity-70">Give your Review</h1>
                        <div className="text-center w-full">
                            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 items-center">
                                <Controller
                                    name="rating"
                                    control={control}
                                    render={({ field }) => (
                                        <SubmitRating
                                            value={field.value} // Controlled value
                                            onChange={field.onChange} // Controlled onChange
                                        />
                                    )}
                                >
                                </Controller>
                                <textarea
                                    id="review"
                                    rows={10}
                                    {...register("review", { required: "Review is required" })}
                                    placeholder="Tell your experience to enhance others"
                                    className="border p-4 w-full border-gray-400 rounded-lg"
                                />
                                <Button>Submit</Button>
                            </form>
                        </div>
                    </div>

                    {/* Others Reviews */}
                    <div className="w-[70%] ml-4">
                        <h1 className="w-full text-center text-2xl font-bold opacity-70">Reviews from the Guests</h1>
                        <InfiniteMovingCards
                            items={reviews}
                            speed="slow"
                            direction="right"
                            className="z-10"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListingDetails