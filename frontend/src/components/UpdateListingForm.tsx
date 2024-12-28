import { Controller, useForm } from "react-hook-form"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { FiLoader } from "react-icons/fi";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useListingDetailsQuery, useUpdateListingdetailsMutation } from "@/redux/api/listingApi";
import toast from "react-hot-toast";
import { ChangeEvent, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";

interface FormData {
    title ?: string;
    description ?: string;
    price ?: number;
    image ?: FileList;
    location ?: string;
    country ?: string;
    category ?: string;
}

function UpdateListingForm() {
    const { register, handleSubmit, formState: { errors }, control } = useForm<FormData>();

    const [updateListing, {isLoading, isError, error}] = useUpdateListingdetailsMutation();

    const navigate = useNavigate();

    const {id} = useParams();
    if(!id){
        return <Navigate to={"/"} />
    }

    const {data} = useListingDetailsQuery(id);
    const [imagePreview, setImagePreview] = useState(data?.listing.image.url);

    if (isError) {
        console.log("Api error : ", error);
        toast.error("Listing not created, Try again");
    }

    const onSubmit = async ({title, description, category, country, price, image, location} : FormData) => {
        const formdata = new FormData();
        if(title) formdata.set("title", title);
        if(description) formdata.set("description", description);
        if(category) formdata.set("category", category);
        if(country) formdata.set("country", country);
        if(location) formdata.set("location", location);
        if(image) formdata.set("image", image[0]);
        if(price) formdata.set("price", price.toString());
        try {
            const res = await updateListing({formdata, listingId : id });
            console.log("res : ", res);
            if("data" in res){
                toast.success("Listing updated successfully");
                navigate("/");
            }
        } catch (error) {  
            toast.error("Something went wrong!!!");
            console.log("listing creation error : ", error);
        }
    }

    // For preview image
    const handleImageChange = (event : ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if(file){
            const reader = new FileReader();
            reader.onload = () => {
                setImagePreview(reader.result as string);
            }
            reader.readAsDataURL(file);
        }
        // why do we need to change it to base64 string - <img> tags can directly display images using a Base64-encoded string as the src attribute. This is convenient when you don’t have a URL for the file yet (e.g., when the file hasn’t been uploaded to the server).
    }

    return (
        <div className="min-h-[50vh] mt-28 gap-2 w-3/4 flex mx-auto p-4 lg:w-[65vw]">
            <div className="max-w-[50%] w-full flex flex-col items-center justify-center px-3">
                <img src={imagePreview} alt="listing image" className="rounded-lg" />
                <div className="mt-4">
                    <Label>Listing Image</Label>
                    <Input 
                        id="image" 
                        type="file" 
                        accept="image/*" // accept only image files
                        {...register("image")} 
                        onChange={(event) => {
                            handleImageChange(event);
                            register("image").onChange(event);
                        }}
                    />
                    {errors.image && <p className="text-red-700 text-sm my-1">{errors.image.message}</p>}
                </div>
            </div>
            <Separator orientation="vertical" className="bg-gray-300 h-auto" />
            <form 
                onSubmit={handleSubmit(onSubmit)} 
                encType="multipart/form-data" 
                className="w-full px-2 flex flex-col items-center"
            >
                <h1 className="font-bold text-xl">Modify Listing</h1>
                <div className="flex flex-col gap-4 py-4 w-full">
                    <div>
                        <Label>Title</Label>
                        <Input
                            id="title"
                            {...register("title", { required: "Title is required" })}
                            defaultValue={data?.listing.title}
                        />
                        {errors.title && <p className="text-red-700 text-sm my-1">{errors.title.message}</p>}
                    </div>
                    <div>
                        <Label>Description</Label>
                        <Input
                            id="description"
                            {...register("description", { required: "Description is required" })}
                            defaultValue={data?.listing.description}
                        />
                        {errors.description && <p className="text-red-700 text-sm my-1">{errors.description.message}</p>}
                    </div>
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <Label>Price</Label>
                            <Input
                                id="price"
                                {...register("price", { required: "Price is required" })}
                                defaultValue={data?.listing.price}
                            />
                            {errors.price && <p className="text-red-700 text-sm my-1">{errors.price.message}</p>}
                        </div>
                        <div>
                            <Label>Category</Label>
                            <Controller
                                name="category"
                                control={control}
                                defaultValue={data?.listing.category}
                                rules={{ required: "Please select a category" }}
                                render={({ field }) => (
                                    <>
                                        <Select value={field.value} onValueChange={field.onChange}>
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="rooms">Room</SelectItem>
                                                <SelectItem value="mountains">Mountains</SelectItem>
                                                <SelectItem value="mountain-city">Castles</SelectItem>
                                                <SelectItem value="forts">Forts</SelectItem>
                                                <SelectItem value="swimming">Swimming</SelectItem>
                                                <SelectItem value="beaches">Beaches</SelectItem>
                                                <SelectItem value="hiking">Hiking</SelectItem>
                                                <SelectItem value="hotels">Hotels</SelectItem>
                                                <SelectItem value="snow">Snow</SelectItem>
                                                <SelectItem value="camping">Camping</SelectItem>
                                                <SelectItem value="farms">Farms</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {errors.category && <p className="text-red-700 text-sm my-1">{errors.category.message}</p>}
                                    </>
                                )}
                            >
                            </Controller>
                        </div>
                    </div>
                    <div>
                        <Label>Location</Label>
                        <Input
                            id="location"
                            {...register("location", { required: "Please Enter Location" })}
                            defaultValue={data?.listing.location}
                        />
                        {errors.location && <p className="text-red-700 text-sm my-1">{errors.location.message}</p>}
                    </div>

                    <div>
                        <Label>Country</Label>
                        <Input 
                            id="country"
                            {...register("country",{required : "Please provide country"})}
                            defaultValue={data?.listing.country}
                        />
                        {errors.country && <p className="text-red-700 text-sm my-1">{errors.country.message}</p> }
                    </div>

                    <Button type="submit" className={`w-full flex gap-2 items-center`} disabled={isLoading} >
                        {isLoading && <FiLoader className='text-white animate-spin' />}
                        <p>Update</p>
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default UpdateListingForm
