import { HeroSection } from '@/components/HeroSection';
import { FeatureSection } from '@/components/FeatureSection';
import { ArchitectureSection } from '@/components/ArchitectureSection';
import { TechStackSection } from '@/components/TechStackSection';
import NavBar from '@/components/Navbar';

export default function Home() {
  return (
   <>
    <NavBar/>  
    
    <div className="pt-20 container mx-auto px-4 ">
      <HeroSection />
      <FeatureSection />
      <TechStackSection />
      <ArchitectureSection />
    </div>
   </>
  );
}