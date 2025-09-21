import { HeroSection } from '@/components/HeroSection';
import { FeatureSection } from '@/components/FeatureSection';
import { ArchitectureSection } from '@/components/ArchitectureSection';
import { TechStackSection } from '@/components/TechStackSection';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <HeroSection />
      <FeatureSection />
      <TechStackSection />
      <ArchitectureSection />
    </div>
  );
}