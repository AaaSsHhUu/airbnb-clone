import { getCurrentUser, useSignupMutation } from "@/redux/api/userApi";
import { userExist } from "@/redux/reducer/userReducer";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FiLoader } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { FaX } from "react-icons/fa6";
import { SignupFormData } from "@/types/types";

export default function Signup() {
    const [openDialog, setOpenDialog] = useState<boolean>(false);

    const { register, handleSubmit, formState: { errors } } = useForm<SignupFormData>();
    // console.log("error in form : ", errors);
    const [signup, { isLoading }] = useSignupMutation();
    // console.log("data : ", data);

    const dispatch = useDispatch();

    const onSubmit = async (credentials: SignupFormData) => {
        try {
            const res = await signup(credentials);

            if ("data" in res) {
                toast.success(res.data?.message!);
                const user = await getCurrentUser();
                console.log("user : ", user);
                dispatch(userExist(user));
            }
        } catch (error) {
            toast.error("Signup failed, try again");
        }
        finally {
            setOpenDialog(false);
        }
    }

    return (
        <Dialog open={openDialog} >
            {/* <DialogTrigger asChild> */}
            <Button
                variant={"ghost"}
                className="border-none w-full shadow-none font-semibold font-sans"
                onClick={() => setOpenDialog(true)}
            >
                Signup
            </Button>
            {/* </DialogTrigger> */}
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-center text-xl">Signup to Airbnb</DialogTitle>

                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-4 py-4">
                        <div className="">
                            <Label>Username</Label>
                            <Input
                                id="username"
                                {...register("username", { required: "Username is required" })}
                                placeholder="Johndoe"
                            />
                            {errors.username && <p className="text-red-700 text-sm my-1">{errors.username.message}</p>}
                        </div>
                        <div className="">
                            <Label>Email</Label>
                            <Input
                                id="email"
                                {...register("email", { required: "Email is required" })}
                                placeholder="johndoe@gmail.com"
                            />
                            {errors.email && <p className="text-red-700 text-sm my-1">{errors.email.message}</p>}

                        </div>
                        <div className="">
                            <Label>Password</Label>
                            <Input
                                id="password"
                                {...register("password", { required: "Password is required" })}
                                placeholder="password1234"
                            />
                            {errors.password && <p className="text-red-700 text-sm my-1">{errors.password.message}</p>}

                        </div>
                        <Button type="submit" className="w-full flex gap-2 items-center" >
                            {isLoading && <FiLoader className='text-white animate-spin' />}
                            <p>Signup</p>
                        </Button>
                    </div>
                </form>
                <div onClick={() => setOpenDialog(!openDialog)} className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground cursor-pointer">
                    <FaX className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                </div>
            </DialogContent>
        </Dialog>
    )
}
