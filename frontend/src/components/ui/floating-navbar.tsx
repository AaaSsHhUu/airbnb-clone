import { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Button } from "./button";


interface NavItems{
  name : string;
  link ?: string;
  icon ?: JSX.Element;
  action ?: () => void;
}

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: NavItems[];
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();

  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    // Check if current is not undefined and is a number
    if (typeof current === "number") {
      let direction = current! - scrollYProgress.getPrevious()!;

      if (scrollYProgress.get() < 0.05) {
        setVisible(false);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: 100,
        }}
        animate={{
          y: visible ? 0 : 100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          "flex max-w-fit fixed bottom-10 inset-x-0 mx-auto border rounded-full bg-white shadow-lg z-[5000] font-bold items-center justify-center space-x-4",
          className
        )}
      >
        {navItems.map((navItem: NavItems, idx: number) => (
          <>
            {(navItem.action) ? 
              (
                <Button variant={"secondary"} 
                  className="relative items-center flex space-x-1 text-neutral-600 px-3 py-3 rounded-full  hover:bg-red-500 hover:text-white font-bold" 
                  onClick={navItem.action}>
                  {navItem.name}
                </Button>
              )
              :
              (<Link
                key={`link=${idx}`}
                to={navItem.link || "/"}
                className={cn(
                  "relative items-center flex space-x-1 text-neutral-600 px-3 py-3 rounded-full  hover:bg-red-500 hover:text-white"
                )}
                >
                  <span className="block text-sm">{navItem.name}</span>
              </Link>)
            }
          </>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};
