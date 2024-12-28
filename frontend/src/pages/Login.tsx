import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { getCurrentUser, useLoginMutation } from "@/redux/api/userApi"
import { userExist } from "@/redux/reducer/userReducer"
import { LoginFormData } from "@/types/types"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { FiLoader } from "react-icons/fi"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"


function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();

    const [login, { isLoading }] = useLoginMutation();

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const submitHandler = async (credentials: LoginFormData) => {
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
            toast.error("Login failed");
        }
        finally{
            navigate("/");
        }
    }


    return (
        <div className="grid place-content-center h-screen">
            <div className="w-[90vw] sm:w-[50vw] md:w-[40vw] border border-gray-400 rounded-lg overflow-hidden">
                <h1 className="font-bold text-lg text-center py-4">Login to your account</h1>
                <Separator className="bg-gray-300 mb-4" />
                <form className="my-3 w-[80%] mx-auto flex flex-col gap-3" onSubmit={handleSubmit(submitHandler)}>
                    <h1 className="text-2xl font-bold">Welcome to Airbnb</h1>
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
                        <p>Login</p>
                    </Button>
                    <p className="text-sm text-center font-semibold mt-2">
                        New to Airbnb ? &nbsp;
                        <Link to={"/signup"} className="hover:underline text-blue-600">Signup</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Login