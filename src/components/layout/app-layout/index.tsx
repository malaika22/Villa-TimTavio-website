import { Footer } from "../footer";
import { Header } from "./header";
import { SectionDotsIndicator } from "@/components/section-dot-indicator";

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <SectionDotsIndicator />
      <Header />
      {children}
      <Footer />
    </div>
  );
};
