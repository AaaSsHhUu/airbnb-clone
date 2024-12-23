import { Globe } from "lucide-react";
import { Separator } from "./ui/separator"
import { FaFacebookSquare, FaInstagramSquare, FaTwitterSquare } from "react-icons/fa";

function Footer() {
    const firstCol = ['Help Centre', 'AirCover', 'Anti-discrimination', 'Disability suppport', 'Cancellation options', 'Report neighbourhood concern'];
    const secondCol = ['Airbnb your home', 'AirCover for hosts', 'Hosting resources', 'Community forums', 'Hosting responsibility', 'Join a free hosting class', 'Find a co-host'];
    const thirdCol = ['Newsroom', 'New features', 'Careers', 'Investors', 'Airbnb.org emergency stays'];

    return (
        <div className="min-h-[50vh] w-full bg-gray-200 mt-10">
            <div className="px-8 pt-6 w-full flex flex-col gap-2">
                <div className="grid gap-3 md:grid-cols-3">
                    <div className="flex flex-col gap-2">
                        <p className="font-bold">Support</p>
                        {
                            firstCol.map((link) => (
                                <a href="#" className="text-sm hover:underline" key={link}>{link}</a>
                            ))
                        }
                    </div>
                    <Separator className="bg-[#d4d3d3] my-2 block md:hidden" />
                    <div className="flex flex-col gap-2">
                        <p className="font-bold">Hosting</p>
                        {
                            secondCol.map((link) => (
                                <a href="#" className="text-sm hover:underline" key={link}>{link}</a>
                            ))
                        }
                    </div>
                    <Separator className="bg-[#d4d3d3] my-2 block md:hidden" />
                    <div className="flex flex-col gap-2">
                        <p className="font-bold">Airbnb</p>
                        {
                            thirdCol.map((link) => (
                                <a href="#" className="text-sm hover:underline" key={link}>{link}</a>
                            ))
                        }
                    </div>
                </div>
                <Separator className="bg-[#d4d3d3] my-2" />
                <div className="flex flex-col sm:flex-row pb-2 gap-4 sm:gap-2 sm:justify-between sm:items-center w-full">
                    <div className="flex gap-2 text-sm font-sans">
                        <p>&copy; 2024 Airbnb, Inc.</p>
                        <a href="#" className="hover:underline">Privacy</a>
                        {" . "}
                        <a href="#" className="hover:underline">Terms</a>
                        {" . "}
                        <a href="#" className="hover:underline">Company Details</a>
                    </div>
                    <div className="flex items-center gap-4 font-bold">
                        <div className="flex gap-1 text-sm">
                            <Globe size={18}/>
                            <a href="#" className="hover:underline">English (IN)</a>
                        </div>
                        <div className="text-sm">
                            ₹ INR
                        </div>
                        <div className="flex gap-2 text-sm">
                            <FaFacebookSquare size={20}/>
                            <FaTwitterSquare size={20}/>
                            <FaInstagramSquare size={20}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer