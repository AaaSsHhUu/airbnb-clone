import CategorySlider from "./CategorySlider"
import FilterDrawer from "./FilterDrawer"
import { Switch } from "./ui/switch"

function FilterNavbar() {
  return (
    <div className="w-screen flex items-center justify-between bg-white fixed top-[5.75rem] left-0 md:border border-b px-4 py-2">
        
        <div className="w-full md:w-[70%] ml-4">
            <CategorySlider />
        </div>

        <div className="hidden md:flex max-w-[25%] gap-3 lg:gap-4 items-center w-full">
            <FilterDrawer />

            <div className="px-4 py-3 border rounded-lg flex items-center gap-2">
                <Switch />
                <p className="text-sm font-bold">Include taxes</p>
            </div>
        </div>
    </div>
  )
}

export default FilterNavbar