import { ExclusiveMemberFormSection } from "@/components/exclusive-member-form-section";
import { ExperiencePillar } from "@/components/experience-pillar";
import { FoodPillar } from "@/components/food-pillar";
import { FoundersQuoteSection } from "@/components/founders-quote-section";
import { HeroSection } from "@/components/hero-section";
import { TheCircle } from "@/components/the-circle";
import { TheEstateSection } from "@/components/the-estate-section";
import { PhilosophySection } from "@/components/philosophy-section";
import { RequestStaySection } from "@/components/request-stay-section";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <TheEstateSection />
      <FoundersQuoteSection />
      <FoodPillar />
      <ExperiencePillar />
      <TheCircle />
      <ExclusiveMemberFormSection />
      <PhilosophySection />
      <RequestStaySection />
    </div>
  );
}
