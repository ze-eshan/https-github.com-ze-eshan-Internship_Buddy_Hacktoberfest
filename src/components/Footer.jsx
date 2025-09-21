import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t bg-gray-50 mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <div className="bg-blue-600 w-8 h-8 rounded-md flex items-center justify-center mr-2">
                <span className="text-white font-bold">IM</span>
              </div>
              <span className="font-bold text-xl">InternMatch</span>
            </div>
            <p className="text-gray-600 mb-4">
              Connecting students with their ideal internship opportunities through intelligent matching.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-blue-600">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-600">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-600">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-600">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Product</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-blue-600">Features</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600">How It Works</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600">Pricing</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600">Demo</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-blue-600">Documentation</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600">Blog</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600">Support</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600">API Status</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-blue-600">About</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600">Careers</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600">Contact</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600">Partners</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-12 pt-8 text-center text-gray-500 text-sm">
          <p>Â© 2023 InternMatch. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}