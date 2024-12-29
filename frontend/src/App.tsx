import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ListingDetails from "./pages/ListingDetails";
import { Footer, Navbar } from "./components";
import Loading from "./components/Loading";
import { Suspense } from "react";
import ProtectedRoute from "./components/ProtectedRoute";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
// import { CardSkeleton } from "./components/ui/skeleton";
import NewListingForm from "./components/NewListingForm";
import UpdateListingForm from "./components/UpdateListingForm";
import Login from "./pages/Login";
import Signup from "./pages/Signup";


function App() {
  const {user} = useSelector((state : RootState) => state.userReducer);
  return (
    <>
      <Navbar />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/listing/:id" element={<ListingDetails />} />
          <Route element={<ProtectedRoute isAuthenticated={user ? true : false} />}>
              <Route path="/new-listing" element={<NewListingForm />} />
              <Route path="/update-listing/:id" element={<UpdateListingForm />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Suspense>
      <Footer />
    </>
  )
}

export default App
