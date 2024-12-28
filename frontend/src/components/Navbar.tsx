import { Globe, Menu, CircleUserRound, Search } from "lucide-react"
import { Separator } from "./ui/separator"
import { MouseEvent, useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom";
import { Signup, FilterDrawer, Login } from "@/components";
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Button } from "./ui/button";
import { userExist, userNotExist } from "@/redux/reducer/userReducer";
import toast from "react-hot-toast";
import { getCurrentUser, useLogoutMutation } from "@/redux/api/userApi";
import { FloatingNav } from "./ui/floating-navbar";

function Navbar() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCurrentUser = async () => {
        try {
          const currentUser = await getCurrentUser();
          dispatch(userExist(currentUser));
        } catch (error) {
          console.log("Error fetching current user : ", error);
        }
    }

    fetchCurrentUser();
  },[dispatch])

  const {user} = useSelector((state : RootState) => state.userReducer);
  console.log("user in store : ", user);

  useEffect(() => {
    // Attach the event listener when the dialog is open
    if (isDialogOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Cleanup the event listener when the dialog is closed or unmounted
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isDialogOpen])

  const [logout] = useLogoutMutation();
  const handleLogout = async () => {
      await logout(undefined);
      dispatch(userNotExist());
      toast.success("Logged out");
      setIsDialogOpen(false);
  }

  const handleClickOutside = (event: MouseEvent | Event) => {
    if (
      dialogRef.current &&
      event.target instanceof Node && 
      !dialogRef.current.contains(event.target) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target)
    ) {
      // console.log("dialogRef : ", dialogRef);
      setIsDialogOpen(false);
    }
  }

  const navLinks = [
    {
      name : "Signup",
      link : "/signup",
      // icon : 
    },
    {
      name : "Login",
      link : "/login",
    },
    {
      name : "Help center",
      link : "#"
    },
  ]

  return (
    <nav className="w-screen relative shadow-md">
      <div className="hidden border-b fixed bg-white top-0 left-0 z-20 px-4 py-3 lg:px-8 lg:py-3 md:flex justify-between items-center w-full">
        {/* Logo */}
        <Link to={'/'} className="mx-4 cursor-pointer">
          <img src="/airbnb-logo.png" alt="logo" width={120} />
        </Link>

        {/* search options */}
        <div className="w-[24rem] lg:max-w-[24rem] h-12 text-sm border px-2 py-3 rounded-full flex justify-between items-center cursor-pointer">
          <div className="font-semibold px-4">
            Anywhere
          </div>
          <Separator orientation="vertical" />
          <div className="font-semibold px-3">
            Any week
          </div>
          <Separator orientation="vertical" />
          <div className="flex gap-2 items-center justify-between pl-4">
            <p className="font-bold text-gray-500">Add guest</p>
            <button className="bg-[#ff385c] p-2 ml-2 rounded-full">
              <Search size={15} className="text-white" strokeWidth={3} />
            </button>
          </div>
        </div>
    
        {/* Profile */}
        <div className="flex items-center justify-between gap-3 relative">
          <Link to={"/new-listing"} className="hidden lg:block text-sm font-semibold">
              {user ? "Create Listing" : "Airbnb your home"}
          </Link>
          <a href="#" className="hover:bg-gray-200 rounded-full p-2">
            <Globe size={18} />
          </a>
          <button ref={buttonRef} className="flex items-center justify-between gap-2 border-2 rounded-full p-3 hover:shadow-md"
            onClick={() => setIsDialogOpen(!isDialogOpen)}
          >
            <Menu />
            <CircleUserRound size={25} />
          </button>
          <dialog ref={dialogRef} open={isDialogOpen} className="z-30 absolute rounded-lg -right-24 top-16 border min-w-[12.5rem] min-h-24">
            <div className="w-full list-none">
              <li className="dialog-link"><a href="#">Your Listings</a></li>
              <li className="dialog-link"><a href="#">Host an experience</a></li>
              <li className="dialog-link"><a href="#footer">Help centre</a></li>
              {!user && <Separator />}
              { user ?
                <li className="w-full flex justify-center my-2">
                  <Button onClick={handleLogout} variant={"destructive"} className="font-semibold">Logout</Button>
                </li>
                :
                <>
                  <li className="w-full"><Signup /></li>
                  <li className="w-full"><Login /></li>
                </>
              }
            </div>
          </dialog>
        </div>
      </div>

      {/* --------------------- For small screens ------------------*/}
      <div className="md:hidden fixed bg-white top-0 left-0 px-8 py-6 flex items-center justify-between gap-2 w-full cursor-pointer">
          <div className="flex items-center gap-2 w-[88%] border rounded-full overflow-hidden px-4 py-3 text-lg shadow-md">
              <FaSearch size={22} />
              <input type="text" className="w-full border-none outline-none h-full" placeholder="Where to ?" />
          </div>
          <FloatingNav  navItems={navLinks}/>

          <FilterDrawer />
      </div>
    </nav>
  )
}

export default Navbar