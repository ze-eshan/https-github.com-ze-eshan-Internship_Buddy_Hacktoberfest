import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  UserCheck, 
  MapPin, 
  GraduationCap, 
  Code, 
  Globe, 
  BarChart3 
} from 'lucide-react';

export function FeatureSection() {
  const features = [
    {
      icon: <UserCheck className="h-8 w-8 text-theme-primary bg-theme-primary/[0.2] p-1 rounded-md" />,
      title: "Profile Matching",
      description: "Create a detailed profile highlighting your skills, education, and career interests for accurate matching."
    },
    {
      icon: <MapPin className="h-8 w-8 text-theme-primary bg-theme-primary/[0.2] p-1 rounded-md" />,
      title: "Location Preferences",
      description: "Filter internships by preferred locations to find opportunities near you or in your dream city."
    },
    {
      icon: <GraduationCap className="h-8 w-8 text-theme-primary bg-theme-primary/[0.2] p-1 rounded-md" />,
      title: "Education Matching",
      description: "Recommendations based on your educational background and field of study for relevant opportunities."
    },
    {
      icon: <Code className="h-8 w-8 text-theme-primary bg-theme-primary/[0.2] p-1 rounded-md" />,
      title: "Skill-Based Matching",
      description: "Find internships that align with your technical and soft skills for a perfect fit."
    },
    {
      icon: <Globe className="h-8 w-8 text-theme-primary bg-theme-primary/[0.2] p-1 rounded-md" />,
      title: "Multilingual Support",
      description: "Access internship opportunities in multiple languages with our translation capabilities."
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-theme-primary bg-theme-primary/[0.2] p-1 rounded-md" />,
      title: "Analytics Dashboard",
      description: "Track your application success and get insights on recommended internships."
    }
  ];

  return (
    <section className="py-16">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Our platform offers everything you need to find the perfect internship opportunity
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <Card key={index} className="border border-gray-200 hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="mb-4">
                {feature.icon}
              </div>
              <CardTitle>{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}