import AboutSection from "./components/home/AboutSection";
import ContactSection from "./components/home/ContactSection";
import GridBG from "./components/home/GridBG";
import Hero from "./components/home/Hero";
import HowWeMakeItHappen from "./components/home/HowWeMakeItHappen";
import InfluencerCategories from "./components/home/InfluencerCategories";
import RealResultsSection from "./components/home/RealResultsSection";
import ServicesPage from "./components/home/Service";
import Testimonials from "./components/home/Testimonials";
import VideoMarquee from "./components/home/VideoMarquee";


export default function Page() {
  return (
    <main className="bg-[#0b0b0b] text-white min-h-screen">
      <GridBG />

      <div className="relative">
        <Hero />
        <AboutSection/>
        <VideoMarquee />
        <ServicesPage/>
        <HowWeMakeItHappen />
        <RealResultsSection/>
        <InfluencerCategories />
        <Testimonials />
        <ContactSection/>
      </div>
    </main>
  );
}
