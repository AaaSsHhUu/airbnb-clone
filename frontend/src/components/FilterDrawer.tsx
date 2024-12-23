import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { GiSettingsKnobs } from "react-icons/gi"
import { Separator } from "./ui/separator"
import { Slider } from "./ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import { setListingQueryProps } from "@/redux/reducer/listingReducer"

export default function FilterDrawer() {
    const {price} = useSelector((state : RootState) => state.listingReducer);
    const dispatch = useDispatch();

    const handlePriceChange = (value : number[]) => {
        dispatch(setListingQueryProps({price : value[0]}))
        // Since slider returns an array . get the first index for value
    }

    const handleCategoryChange = (value : string) => {
        dispatch(setListingQueryProps({category : value}))
        console.log("category : ", value);
    }

    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button variant={"outline"} className="border p-4 h-auto rounded-full md:rounded-lg md:px-5 md:py-3 text-base font-semibold shadow-none " >
                    <GiSettingsKnobs />
                    <span className="hidden md:block">Filter</span>
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader>
                        <DrawerTitle className="text-center text-xl">Filters</DrawerTitle>
                    </DrawerHeader>
                    <Separator />
                    {/* Category Selector */}
                    <h2 className="text-lg font-bold text-center mt-4">Category</h2>
                    <div className="flex justify-center my-3">
                        <Select onValueChange={handleCategoryChange}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="rooms">Room</SelectItem>
                                <SelectItem value="mountains">Mountains</SelectItem>
                                <SelectItem value="mountain-city">Castles</SelectItem>
                                <SelectItem value="forts">Forts</SelectItem>
                                <SelectItem value="swimming">Swimming</SelectItem>
                                <SelectItem value="beaches">Beaches</SelectItem>
                                <SelectItem value="hiking">Hiking</SelectItem>
                                <SelectItem value="hotels">Hotels</SelectItem>
                                <SelectItem value="snow">Snow</SelectItem>
                                <SelectItem value="camping">Camping</SelectItem>
                                <SelectItem value="farms">Farms</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>


                    {/* Price selector */}
                    <div className="p-4 pb-0">
                        <h2 className="text-lg font-bold text-center">Price</h2>
                        <div className="flex items-center gap-2">
                            <span className="text-gray-500 font-bold">{price}</span>
                            <Slider
                                defaultValue={[1500]}
                                max={15000}
                                step={500}
                                min={500}
                                onValueChange={handlePriceChange}
                            />
                            <span className="text-gray-500 font-bold">15000</span>
                        </div>
                    </div>
                    <DrawerFooter>
                        <Button>Apply</Button>
                        <DrawerClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    )
}
