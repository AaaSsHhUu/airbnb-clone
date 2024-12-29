import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { getCurrentUser, useLoginMutation } from "@/redux/api/userApi"
import { userExist } from "@/redux/reducer/userReducer"
import { RootState } from "@/redux/store"
import { SignupFormData } from "@/types/types"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { FiLoader } from "react-icons/fi"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"


function Signup() {
    const { register, handleSubmit, formState: { errors } } = useForm<SignupFormData>();

    const {user} = useSelector((state : RootState) => state.userReducer);

    const [login, { isLoading }] = useLoginMutation();

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const submitHandler = async (credentials: SignupFormData) => {
        try{
            const res = await login(credentials);
            console.log("res : ", res);
            if("data" in res){
                toast.success(`${res.data?.message}`);
                const user = await getCurrentUser();
                dispatch(userExist(user));
            }
            if("error" in res){
                const errMsg = res.error as {data : {message : string}};
                toast.error(errMsg.data.message);
            }
        }catch(err){
            console.error(err);
            toast.error("Signup failed");
        }
        finally{
            navigate("/");
        }
    }

    if(user){
        navigate("/");
    }

    return (
        <div className="grid mt-24 place-content-center h-screen">
            <div className="w-[90vw] sm:w-[50vw] md:w-[40vw] border border-gray-400 rounded-lg overflow-hidden">
                <h1 className="font-bold text-lg text-center py-4">Register on Airbnb</h1>
                <Separator className="bg-gray-300 mb-4" />
                <form className="my-3 w-[80%] mx-auto flex flex-col gap-3" onSubmit={handleSubmit(submitHandler)}>
                    <h1 className="text-2xl font-bold">Welcome to Airbnb</h1>
                    <div>
                        <Label>Username</Label>
                        <Input
                            id="username"
                            placeholder="Johndoe"
                            {...register("username", { required: "Username is required" })}
                        />
                        {errors.username && <p className="m-1 text-sm text-red-600">{errors.username?.message}</p>}
                    </div>
                    <div>
                        <Label>Email</Label>
                        <Input
                            id="email"
                            placeholder="johndoe@gmail.com"
                            {...register("email", { required: "Email is required" })}
                        />
                        {errors.email && <p className="m-1 text-sm text-red-600">{errors.email?.message}</p>}
                    </div>
                    <div>
                        <Label>Password</Label>
                        <Input
                            id="password"
                            {...register("password", { required: "password is required" })}
                            placeholder="Enter your password"
                            type="password"
                        />
                        {errors.password && <p className="m-1 text-sm text-red-600">{errors.password?.message}</p>}
                    </div>
                    <Button type="submit" className="mt-4 w-full flex gap-2 items-center" >
                        {isLoading && <FiLoader className='text-white animate-spin' />}
                        <p>Signup</p>
                    </Button>
                    <p className="text-sm text-center font-semibold mt-2">
                        Already have an account &nbsp;
                        <Link to={"/login"} className="hover:underline text-blue-600">Login</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Signup