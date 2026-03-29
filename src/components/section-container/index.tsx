import { cn } from "@/lib/utils";

export const SectionContainer = ({
  children,
  className,
  wrapperClassName,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  wrapperClassName?: string;
  id?: string;
}) => {
  return (
    <div className={cn(wrapperClassName)} id={id}>
      <div
        className={cn(
          "py-16 space-y-12 mx-auto px-4 max-w-[1450px] sm:px-8 sm:space-y-16 md:px-12 lg:py-[120px] lg:space-y-[80px]",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
};
