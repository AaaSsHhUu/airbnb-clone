import FilterNavbar from "@/components/FilterNavbar"
import Listing from "@/components/Listing"
import Navbar from "@/components/Navbar"
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom"

function Home() {
  const location = useLocation();

  useEffect(() => {
      if(location.state?.toastMessage){
          toast.error(location.state.toastMessage);
      }
  },[location])

  return (
    <section>
      <Navbar />
      <FilterNavbar />
      <Listing />
    </section>
  )
}

export default Home