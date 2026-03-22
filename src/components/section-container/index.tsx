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
        className={cn("py-[120px] space-y-[80px] mx-auto px-4 max-w-[1450px] mx-auto", className)}
      >
        {children}
      </div>
    </div>
  );
};
