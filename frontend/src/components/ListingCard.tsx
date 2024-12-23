import { Star } from "lucide-react"
import { Link } from "react-router-dom";

interface ListingCardProps{
  title : string;
  description : string;
  image : {
    filename : string;
    url : string;
  };
  price : number;
  _id : string;
}

function ListingCard({
  _id,
  title,
  image,
  price
} : ListingCardProps) {
  return (
      <Link to={`/listing/${_id}`} className="w-[18rem] h-[22rem] flex flex-col gap-4 items-center hover:shadow-md rounded-xl  transition-all duration-150">
          {/* image */}
          <div className="w-full h-[60%] rounded-xl overflow-hidden">
            <img src={image.url} alt={title} className="h-full w-full" />
          </div>
          
          {/* desc */}
          <div className="w-full tracking-wide px-2">
              {/* name */}
              <div className="flex items-center justify-between">
                <p className="font-bold">{title.length > 24 ? title.slice(0,24) + "..." : title}</p>
                <p className="flex gap-1"><Star /> 4.3</p>
              </div>
              {/* org name */}
              <p className="text-gray-500">Stay with Barcin</p>
              {/* Dates */}
              <p className="text-gray-500 ">11-16 Nov</p>
              {/* price */}
              <p className="text-base font-semibold"><span className="font-bold">₹{price.toLocaleString('en')}</span> night</p>
          </div>
      </Link>
  )
}

export default ListingCard