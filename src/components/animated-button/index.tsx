import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const AnimatedButton = ({
  children,
  href,
  hrefClassName,
  buttonClassName,
  hoverClassName,
}: {
  children: React.ReactNode;
  href: string;
  hrefClassName?: string;
  buttonClassName?: string;
  hoverClassName?: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <Link
        href={href}
        className={cn(
          "relative inline-flex items-center justify-center overflow-hidden border border-[#181818]  px-[28px] py-[13px] group",
          hrefClassName
        )}
      >
        <span
          className={cn(
            "absolute inset-0 bg-[#8C7261] translate-y-full group-hover:translate-y-0 transition-transform duration-400 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]",
            hoverClassName
          )}
        />
        <span
          className={cn(
            "relative text-xs tracking-[0.15em] text-[#181818]  group-hover:text-white transition-colors duration-200 uppercase",
            buttonClassName
          )}
        >
          {children}
        </span>
      </Link>
    </motion.div>
  );
};
