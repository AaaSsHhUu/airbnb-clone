import {TbLoader3} from "react-icons/tb";

const Loading = () => {
  return (
    <div className="h-screen w-full grid place-content-center">
        <TbLoader3 className="animate-spin" size={50}/>
    </div>
  )
}

export default Loading