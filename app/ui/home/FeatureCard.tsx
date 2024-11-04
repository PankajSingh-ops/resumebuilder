import React from 'react';
import { 
  Layout, 
  CheckSquare, 
  Sparkles, 
  Shield, 
  LayoutTemplate, 
  Bot, 
  Settings, 
  Files, 
  PenTool,
  LucideIcon 
} from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description, color }) => (
  <div className="p-6 rounded-xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-white hover:bg-opacity-90 cursor-pointer">
    <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${color}`}>
      <Icon className="w-6 h-6 text-white" />
    </div>
    <h3 className="text-xl font-bold mb-2 text-gray-800">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </div>
);

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
}

const FeaturesGrid: React.FC = () => {
  const features: Feature[] = [
    {
      icon: Layout,
      title: "Easy Online Builder",
      description: "Create beautiful content in minutes with our intuitive drag-and-drop interface.",
      color: "bg-indigo-500"
    },
    {
      icon: CheckSquare,
      title: "Smart Checker",
      description: "Advanced verification system ensures your content is error-free and polished.",
      color: "bg-pink-500"
    },
    {
      icon: Shield,
      title: "Secure & Protected",
      description: "Your data is encrypted and protected with enterprise-grade security measures.",
      color: "bg-blue-500"
    },
    {
      icon: Sparkles,
      title: "AI-Powered Generation",
      description: "Leverage cutting-edge AI to generate compelling content instantly.",
      color: "bg-purple-500"
    },
    {
      icon: LayoutTemplate,
      title: "Premium Templates",
      description: "Access professionally designed templates for any purpose or industry.",
      color: "bg-yellow-500"
    },
    {
      icon: Bot,
      title: "Smart Suggestions",
      description: "Get intelligent recommendations based on your content and goals.",
      color: "bg-green-500"
    },
    {
      icon: Settings,
      title: "Customizable Options",
      description: "Tailor every aspect to match your specific needs and preferences.",
      color: "bg-red-500"
    },
    {
      icon: Files,
      title: "Multiple Formats",
      description: "Export your work in various formats with just one click.",
      color: "bg-cyan-500"
    },
    {
      icon: PenTool,
      title: "Design Tools",
      description: "Professional design tools to make your content stand out.",
      color: "bg-orange-500"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Features designed to help you succeed
        </h2>
        <p className="text-xl text-gray-600">
          Everything you need to create amazing content
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
            color={feature.color}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturesGrid;