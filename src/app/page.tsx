import BigFooter from "@/components/landing/BigFooter";
import ConnectBand from "@/components/landing/ConnectBand";
import HeroSection from "@/components/landing/HeroSection";
import QuoteBand from "@/components/landing/QuoteBand";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <HeroSection />
      <QuoteBand />
      <ConnectBand />
      <BigFooter />
    </div>
  );
}
