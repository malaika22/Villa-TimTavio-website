import { cn } from "@/lib/utils";

export const SectionContainer = ({
  children,
  className,
  wrapperClassName,
}: {
  children: React.ReactNode;
  className?: string;
  wrapperClassName?: string;
}) => {
  return (
    <div className={cn(wrapperClassName)}>
      <div
        className={cn("py-[120px] space-y-[80px] mx-auto px-4 max-w-[1450px] mx-auto", className)}
      >
        {children}
      </div>
    </div>
  );
};
