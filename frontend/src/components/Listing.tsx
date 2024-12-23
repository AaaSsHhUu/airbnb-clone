import { useAllListingQuery } from "@/redux/api/listingApi"
import ListingCard from "./ListingCard"
import toast from "react-hot-toast";
import { CardSkeleton } from "./ui/skeleton";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

function Listing() {
  const { category, price } = useSelector((state: RootState) => state.listingReducer);
  const { data, isLoading, isError, error } = useAllListingQuery({ category, price });

  if (isError) {
    toast.error("Listings Not Found!!!");
    console.log("error : ", error);
  }

  if (isLoading) {
    return (
      <div className="mt-48 z-20 min-h-screen max-w-[100vw] px-[2%] flex justify-center gap-8 flex-wrap">
        {Array(8).fill(0).map((_, idx) => (
          <CardSkeleton key={idx} />
        ))}
      </div>
    )
  }

  if(data?.allListings.length === 0){
    return <div className="h-[60vh] mt-24 flex justify-center items-center">
      <h1 className="text-3xl font-bold">No Listing Found 😢</h1>
    </div>
  }

  return (
    <div className="mt-48 z-20 min-h-screen max-w-[100vw] px-[2%] flex justify-center  gap-8 flex-wrap">
      {data?.allListings.map((listing) => (
        <ListingCard
          key={listing._id}
          title={listing.title}
          description={listing.description}
          image={listing.image}
          price={listing.price}
          _id={listing._id}
        />
      ))}

    </div>
  )
}

export default Listing