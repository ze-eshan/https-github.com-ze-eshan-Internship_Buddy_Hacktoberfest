import { 
  Monitor, 
  Server, 
  Database, 
  Cpu, 
  Lock, 
  Globe,
  ArrowRight,
  User,
  Zap,
  BarChart3
} from 'lucide-react';

export function ArchitectureSection() {
  const architecture = [
    {
      id: 1,
      title: "Frontend (Next.js)",
      icon: <Monitor className="h-8 w-8" />,
      description: "Candidate-facing UI with mobile-first design and i18n support",
      color: "bg-blue-500"
    },
    {
      id: 2,
      title: "Backend (Node.js)",
      icon: <Server className="h-8 w-8" />,
      description: "Orchestrator handling API requests, filtering, and service coordination",
      color: "bg-indigo-500"
    },
    {
      id: 3,
      title: "Embedding Service",
      icon: <Cpu className="h-8 w-8" />,
      description: "Python microservice generating MPNet embeddings for semantic matching",
      color: "bg-purple-500"
    },
    {
      id: 4,
      title: "Vector Database",
      icon: <Database className="h-8 w-8" />,
      description: "Pinecone for efficient semantic similarity search",
      color: "bg-pink-500"
    },
    {
      id: 5,
      title: "Authentication",
      icon: <Lock className="h-8 w-8" />,
      description: "Firebase Auth for secure user authentication",
      color: "bg-teal-500"
    }
  ];

  const dataFlow = [
    {
      id: 1,
      title: "User Authentication",
      description: "Candidate logs in via Firebase Auth",
      icon: <User className="h-5 w-5" />
    },
    {
      id: 2,
      title: "Profile Submission",
      description: "Fills input form → frontend sends to backend",
      icon: <Zap className="h-5 w-5" />
    },
    {
      id: 3,
      title: "Rule-Based Filtering",
      description: "Backend applies rule-based filters",
      icon: <BarChart3 className="h-5 w-5" />
    },
    {
      id: 4,
      title: "Embedding Generation",
      description: "Backend calls Python embedding API → embedding generated",
      icon: <Cpu className="h-5 w-5" />
    },
    {
      id: 5,
      title: "Semantic Search",
      description: "Backend queries Pinecone → retrieves top 10 internships",
      icon: <Database className="h-5 w-5" />
    },
    {
      id: 6,
      title: "Hybrid Ranking",
      description: "Hybrid ranking = (0.6 × similarity) + (0.4 × rule-based score)",
      icon: <BarChart3 className="h-5 w-5" />
    },
    {
      id: 7,
      title: "Recommendation Display",
      description: "Top 3–5 internships returned → displayed as cards",
      icon: <Monitor className="h-5 w-5" />
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-theme-primary">System Architecture</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            How our recommendation engine works behind the scenes
          </p>
        </div>
        
        {/* Architecture Diagram */}
        <div className="relative mb-20">
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-theme-primary transform -translate-y-1/2 z-0"></div>
          
          <div className="relative grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-0">
            {architecture.map((component, index) => (
              <div 
                key={component.id} 
                className="flex flex-col items-center text-center z-10"
              >
                <div className={`${component.color} p-4 rounded-2xl shadow-xl mb-4 transition-all duration-300 hover:scale-105`}>
                  <div className="bg-white p-3 rounded-xl">
                    {component.icon}
                  </div>
                </div>
                <h3 className="font-bold text-lg mb-2 text-theme-primary">{component.title}</h3>
                <p className="text-gray-600 text-sm px-2">{component.description}</p>
                
                {index < architecture.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                    <div className="bg-white rounded-full p-2 shadow-md">
                      <ArrowRight className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Data Flow */}
        <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8 max-w-6xl mx-auto border border-blue-100">
          <div className="text-center mb-10">
            <h3 className="font-bold text-2xl md:text-3xl mb-2 text-theme-primary">Data Flow Process</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Step-by-step journey of how recommendations are generated
            </p>
          </div>
          
          <div className="relative">
            {/* Vertical line for mobile */}
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-theme-primary -z-20 md:hidden"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {dataFlow.map((step, index) => (
                <div 
                  key={step.id} 
                  className={`flex ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'} ${index % 2 === 0 ? 'md:border-r' : 'md:border-l'} md:border-gray-200 pb-6`}
                >
                  {/* Mobile step indicator */}
                  <div className="md:hidden flex flex-col items-center mr-4">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-theme-primary text-white mb-2">
                      {step.id}
                    </div>
                    <div className="w-0.5 h-full bg-theme-primary "></div>
                  </div>
                  
                  {/* Desktop step indicator */}
                  <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-theme-primary text-white mr-4 flex-shrink-0">
                    {step.id}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <div className="bg-blue-100 p-2 rounded-lg mr-3">
                        {step.icon}
                      </div>
                      <h4 className="font-bold text-lg text-theme-primary">{step.title}</h4>
                    </div>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-10 text-center">
            <div className="inline-flex flex-wrap justify-center gap-3">
              <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
                Semantic Search
              </div>
              <div className="bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full text-sm font-medium">
                Hybrid Ranking
              </div>
              <div className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium">
                Rule-Based Filtering
              </div>
              <div className="bg-pink-100 text-pink-800 px-4 py-2 rounded-full text-sm font-medium">
                MPNet Embeddings
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}