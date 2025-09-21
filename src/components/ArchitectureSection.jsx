import { 
  Monitor, 
  Server, 
  Database, 
  Cpu, 
  Lock, 
  Globe,
  ArrowRight
} from 'lucide-react';

export function ArchitectureSection() {
  const architecture = [
    {
      id: 1,
      title: "Frontend (Next.js)",
      icon: <Monitor className="h-8 w-8" />,
      description: "Candidate-facing UI with mobile-first design and i18n support"
    },
    {
      id: 2,
      title: "Backend (Node.js)",
      icon: <Server className="h-8 w-8" />,
      description: "Orchestrator handling API requests, filtering, and service coordination"
    },
    {
      id: 3,
      title: "Embedding Service",
      icon: <Cpu className="h-8 w-8" />,
      description: "Python microservice generating MPNet embeddings for semantic matching"
    },
    {
      id: 4,
      title: "Vector Database",
      icon: <Database className="h-8 w-8" />,
      description: "Pinecone for efficient semantic similarity search"
    },
    {
      id: 5,
      title: "Authentication",
      icon: <Lock className="h-8 w-8" />,
      description: "Firebase Auth for secure user authentication"
    }
  ];

  return (
    <section className="py-16">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">System Architecture</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          How our recommendation engine works behind the scenes
        </p>
      </div>
      
      <div className="relative">
        {/* Connection lines */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="hidden md:block w-full h-1 bg-gray-200"></div>
        </div>
        
        <div className="relative grid grid-cols-1 md:grid-cols-5 gap-8">
          {architecture.map((component, index) => (
            <div key={component.id} className="flex flex-col items-center text-center z-10">
              <div className="bg-white p-4 rounded-full shadow-lg border-2 border-blue-500 mb-4">
                {component.icon}
              </div>
              <h3 className="font-bold text-lg mb-2">{component.title}</h3>
              <p className="text-gray-600 text-sm">{component.description}</p>
              
              {index < architecture.length - 1 && (
                <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                  <ArrowRight className="h-6 w-6 text-gray-400" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-20 bg-blue-50 rounded-2xl p-8 max-w-4xl mx-auto">
        <h3 className="font-bold text-xl mb-4 text-center">Data Flow</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <ol className="space-y-4">
              <li className="flex items-start">
                <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">1</div>
                <span>Candidate logs in via Firebase Auth</span>
              </li>
              <li className="flex items-start">
                <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">2</div>
                <span>Fills input form → frontend sends to backend</span>
              </li>
              <li className="flex items-start">
                <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">3</div>
                <span>Backend applies rule-based filters</span>
              </li>
              <li className="flex items-start">
                <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">4</div>
                <span>Backend calls Python embedding API → embedding generated</span>
              </li>
            </ol>
          </div>
          <div>
            <ol className="space-y-4">
              <li className="flex items-start">
                <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">5</div>
                <span>Backend queries Pinecone → retrieves top 10 internships</span>
              </li>
              <li className="flex items-start">
                <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">6</div>
                <span>Hybrid ranking = (0.6 × similarity) + (0.4 × rule-based score)</span>
              </li>
              <li className="flex items-start">
                <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">7</div>
                <span>Top 3–5 internships returned → displayed as cards</span>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}