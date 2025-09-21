import { 
  BadgeCheck, 
  Zap, 
  Database, 
  Cpu, 
  Lock, 
  Globe 
} from 'lucide-react';

export function TechStackSection() {
  const techStack = [
    {
      category: "Frontend",
      items: [
        { name: "Next.js 15", icon: <Zap className="h-5 w-5" /> },
        { name: "Tailwind CSS", icon: <BadgeCheck className="h-5 w-5" /> },
        { name: "shadcn/ui", icon: <Globe className="h-5 w-5" /> },
        { name: "Lucide Icons", icon: <Globe className="h-5 w-5" /> }
      ]
    },
    {
      category: "Backend",
      items: [
        { name: "Node.js", icon: <Cpu className="h-5 w-5" /> },
        { name: "Express/Fastify", icon: <Zap className="h-5 w-5" /> },
        { name: "Firebase Auth", icon: <Lock className="h-5 w-5" /> }
      ]
    },
    {
      category: "AI & Data",
      items: [
        { name: "MPNet Embeddings", icon: <Cpu className="h-5 w-5" /> },
        { name: "Pinecone Vector DB", icon: <Database className="h-5 w-5" /> },
        { name: "Python Flask", icon: <Globe className="h-5 w-5" /> }
      ]
    }
  ];

  return (
    <section className="py-16 bg-gray-50 rounded-2xl px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Modern Tech Stack</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Built with cutting-edge technologies for optimal performance and user experience
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {techStack.map((category, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-bold text-xl mb-4 text-center">{category.category}</h3>
              <ul className="space-y-4">
                {category.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-center">
                    <div className=" p-2 rounded-lg mr-3 bg-theme-primary/[0.3] text-theme-primary">
                      {item.icon}
                    </div>
                    <span className="font-medium">{item.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <div className="inline-flex flex-wrap justify-center gap-4">
            <div className="bg-theme-primary/[0.3] text-theme-primary border-theme-primary text px-4 py-2 rounded-full border border-gray-200">
              Mobile-First Design
            </div>
            <div className="bg-theme-primary/[0.3] text-theme-primary border-theme-primary text px-4 py-2 rounded-full border border-gray-200">
              Hybrid Ranking Algorithm
            </div>
            <div className="bg-theme-primary/[0.3] text-theme-primary border-theme-primary text px-4 py-2 rounded-full border border-gray-200">
              Semantic Search
            </div>
            <div className="bg-theme-primary/[0.3] text-theme-primary border-theme-primary text px-4 py-2 rounded-full border border-gray-200">
              Rule-Based Filtering
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}