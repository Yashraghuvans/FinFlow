import React from 'react';
import { LineChart, BellRing, Database, Lightbulb } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: Database,
      title: "Data Management",
      description: "Input and manage loan disbursement, payment, and interest accrual data through an intuitive interface."
    },
    {
      icon: BellRing,
      title: "Smart Reminders",
      description: "Sends weekly or monthly notifications, prompting you to update financial records, ensuring data accuracy."
    },
    {
      icon: LineChart,
      title: "Interactive Visualization",
      description: "Generates interactive charts and graphs to visualize trends in loan balances and payment history."
    },
    {
      icon: Lightbulb,
      title: "Insights & Reports",
      description: "Provides detailed reports and analytical insights, enabling you to optimize payment strategies."
    },
  ];

  return (
    <section className='py-20 px-4 bg-gray-900 text-white'>
      <div className='container mx-auto max-w-6xl'>
        <h2 className='text-4xl sm:text-5xl font-bold text-center mb-16 text-blue-300'>
          Key Features
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {features.map((feature, index) => (
            <div
              key={index}
              className='group bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-2 border border-gray-700 hover:border-blue-500'
            >
              <div className='flex justify-center items-center mb-6'>
                <feature.icon className='w-16 h-16 text-blue-400 group-hover:text-blue-300 transition-colors duration-300' />
              </div>
              <h3 className='text-2xl font-semibold text-center mb-4 group-hover:text-white transition-colors duration-300'>
                {feature.title}
              </h3>
              <p className='text-gray-300 text-center group-hover:text-gray-200 transition-colors duration-300'>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
