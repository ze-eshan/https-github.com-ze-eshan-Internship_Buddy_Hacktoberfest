import { Button } from '@/components/ui/button';
import { ArrowRight, Brain, Search, Users } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Find Your Perfect <span className="text-theme-primary">Internship</span> Match
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          Our AI-powered recommendation engine connects students with internships that match their skills, interests, and career goals.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button size="lg" className="text-lg px-8 py-6 bg-theme-primary hover:bg-theme-primary/[0.6]">
            Get Started <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button size="lg" variant="outline" className="text-lg px-8 py-6 text-theme-primary">
            How It Works
          </Button>
        </div>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <Brain className="h-6 w-6 text-theme-primary" />
            </div>
            <h3 className="font-semibold text-lg mb-2">AI-Powered Matching</h3>
            <p className="text-gray-600">Intelligent algorithms analyze your profile to find the best internship matches.</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <Search className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Smart Filtering</h3>
            <p className="text-gray-600">Filter by location, sector, skills, and education to find your ideal opportunity.</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-theme-primary" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Personalized Results</h3>
            <p className="text-gray-600">Get internship recommendations tailored to your unique profile and preferences.</p>
          </div>
        </div>
      </div>
    </section>
  );
}