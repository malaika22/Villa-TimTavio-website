import { Check, X } from "lucide-react";
import { Dialog, DialogContent } from "../ui/dialog";

export const FormSubmissionDialog = ({
  successOpen,
  setSuccessOpen,
}: {
  successOpen: boolean;
  setSuccessOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <Dialog open={successOpen} onOpenChange={setSuccessOpen}>
      <DialogContent className="p-0 border-0 bg-transparent shadow-none max-w-[500px] w-full [&_[data-slot=dialog-close]]:hidden rounded-lg">
        <div className="bg-[#F5F3F0] px-10 py-12 text-center relative rounded-lg">
          {/* Close button */}
          <button
            onClick={() => setSuccessOpen(false)}
            className="absolute top-4 right-4 text-[#b0a898] hover:text-[#2C2C2C] transition-colors duration-200 cursor-pointer"
          >
            <X size={16} />
          </button>

          {/* Check circle */}
          <div className="w-[60px] h-[60px] rounded-full border-2 border-[#8C7261] flex items-center justify-center mx-auto mb-7">
            <Check size={30} className="text-[#8C7261]" strokeWidth={2} />
          </div>

          {/* Heading */}
          <h2 className="text-[26px] font-normal text-[#2C2C2C] mb-3 tracking-wide">
            Application Received
          </h2>

          {/* Body */}
          <p className="text-[16px] text-[#9a9088] leading-relaxed max-w-[280px] font-heading mx-auto mb-8 mt-6">
            Thank you. Your request has been passed to our team and you will hear from us shortly.
          </p>

          {/* Footer */}
          <div className="border-t border-[#e0d9d0] pt-5">
            <p
              className="text-[12px] text-[#b0a898] italic"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Villa TimTavio
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
