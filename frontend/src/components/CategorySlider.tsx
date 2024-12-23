import { setListingQueryProps } from "@/redux/reducer/listingReducer";
import { RootState } from "@/redux/store";
import { useRef } from "react"
import { FaGreaterThan, FaHiking, FaLessThan, FaMountain, FaRegSnowflake } from "react-icons/fa";
import { FaMountainCity, FaPersonSwimming, FaUmbrellaBeach } from "react-icons/fa6";
import { GiCampingTent } from "react-icons/gi";
import { MdCastle, MdFort, MdHotel } from "react-icons/md";
import { PiFarmBold } from "react-icons/pi";
import { RiHotelFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";

const categories = [
  {
    icon : <MdHotel />, 
    name : 'Room'
  },
  {
    icon : <FaMountain />, 
    name : 'Mountain'
  },
  {
    icon : <MdCastle />, 
    name : 'Castle'
  },
  {
    icon : <MdFort />, 
    name : 'Fort'
  },
  {
    icon : <FaPersonSwimming />, 
    name : 'Swimming'
  },
  {
    icon : <FaUmbrellaBeach />, 
    name : 'Beach'
  },
  {
    icon : <RiHotelFill />, 
    name : 'Hotel'
  },
  {
    icon : <FaHiking />, 
    name : 'Hiking'
  },
  {
    icon : <FaRegSnowflake />, 
    name : 'Snow'
  },
  {
    icon : <PiFarmBold />, 
    name : 'Farm'
  },
  {
    icon : <GiCampingTent />, 
    name : 'Camping'
  },
  {
    icon : <FaMountainCity />, 
    name : 'Mountain-city'
  },
]

function CategorySlider() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const {category : storeCategory} = useSelector((state : RootState) => state.listingReducer);
  const dispatch = useDispatch();

  // console.log("category : ", storeCategory);

  const swipeLeft = () => {
    if(scrollRef.current){
        scrollRef.current.scrollBy({left : -500, behavior : 'smooth'})
    }
  }

  const swipeRight = () => {
      if(scrollRef.current){
        scrollRef.current.scrollBy({left : 500, behavior : 'smooth'})
      }
  }

  const handleCategoryChange = (categoryValue : string) => {
      dispatch(setListingQueryProps({category : categoryValue}))
  }

  return (
    <div className="flex px-8 items-center gap-8">
      <button onClick={swipeLeft} className="hidden md:block cursor-pointer fixed left-[2%] bg-radial-white border-b md:border p-1 rounded-full z-10">
        <FaLessThan />
      </button>
      <div ref={scrollRef} className="flex items-center gap-10 overflow-hidden overflow-x-scroll scroll-smooth scrollbar-none">
        {
          categories.map((category) => (
            <button onClick={() => handleCategoryChange(category.name)} key={category.name} className={`flex cursor-pointer  ${storeCategory === category.name ? "opacity-100 border-b-[#09090b] border-b-[3px]" : "hover:border-b-[3px] opacity-70 hover:opacity-100"} flex-col items-center gap-2`}>
              <p className="text-xl" >{category.icon}</p>
              <span className="text-sm font-semibold text-center">{category.name}</span>
            </button>
          ))
        }
      </div>
      <button onClick={swipeRight} className="hidden md:block cursor-pointer fixed right-[30%] bg-radial-white border p-1 rounded-full z-10">
        <FaGreaterThan />
      </button>
    </div>
  )
}

export default CategorySlider