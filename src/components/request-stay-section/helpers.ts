import { cn } from "@/lib/utils";
import { BORDER, BORDER_ERROR } from "./constants";

export const getInputClass = (hasError: boolean) =>
  cn(
    "border-0 border-b rounded-none bg-transparent px-0 py-2 text-white placeholder:text-[#6b6259] text-[15px] focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:shadow-none shadow-none transition-colors duration-200 h-auto",
    hasError ? `border-b-[${BORDER_ERROR}]` : `border-b-[${BORDER}] focus-visible:border-b-white`
  );

export const getSelectClass = (hasError: boolean, hasValue: boolean) =>
  cn(
    "w-full border-0 border-b rounded-none bg-transparent px-0 py-2 text-[15px] focus:ring-0 focus:ring-offset-0 shadow-none transition-colors duration-200 h-auto",
    hasError ? "border-b-[#f87171]" : `border-b-[${BORDER}] focus:border-b-white`,
    hasValue ? "text-white" : "text-[#6b6259]"
  );
