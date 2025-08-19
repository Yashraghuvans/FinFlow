import React from 'react';
import { 
  BarChart3, 
  Bell, 
  TrendingUp, 
  FileText, 
  Shield, 
  Zap,
  Calculator,
  PieChart,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: Calculator,
      title: "EMI Calculator",
      description: "Advanced EMI calculation with prepayment options and interest rate analysis for informed decision making.",
      color: "primary",
      gradient: "from-primary-500 to-primary-600"
    },
    {
      icon: BarChart3,
      title: "Data Visualization",
      description: "Interactive charts and graphs to visualize trends in loan balances, payment history, and interest growth.",
      color: "purple",
      gradient: "from-purple-500 to-purple-600"
    },
    {
      icon: Bell,
      title: "Smart Reminders",
      description: "Weekly or monthly notifications to update financial records, ensuring data accuracy and timely payments.",
      color: "warning",
      gradient: "from-warning-500 to-warning-600"
    },
    {
      icon: FileText,
      title: "Insights & Reports",
      description: "Detailed reports and analytical insights to optimize payment strategies and financial planning.",
      color: "teal",
      gradient: "from-teal-500 to-teal-600"
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Bank-level security with end-to-end encryption to protect your sensitive financial information.",
      color: "success",
      gradient: "from-success-500 to-success-600"
    },
    {
      icon: Zap,
      title: "Real-time Updates",
      description: "Live data synchronization across all devices with instant updates and notifications.",
      color: "error",
      gradient: "from-error-500 to-error-600"
    }
  ];

  const benefits = [
    {
      icon: CheckCircle,
      title: "Track Loan Disbursements",
      description: "Monitor every payment to builders and contractors with detailed transaction history."
    },
    {
      icon: CheckCircle,
      title: "Interest Accrual Monitoring",
      description: "Real-time tracking of interest growth and outstanding balances with predictive analytics."
    },
    {
      icon: CheckCircle,
      title: "Payment Optimization",
      description: "Smart recommendations to optimize payment schedules and reduce total interest paid."
    },
    {
      icon: CheckCircle,
      title: "Financial Planning",
      description: "Comprehensive tools for long-term financial planning and goal setting."
    }
  ];

  return (
    <section className="py-24 px-4 bg-gradient-to-br from-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Powerful Features for{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-purple-400">
              Financial Mastery
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Everything you need to manage your home loan efficiently, from EMI calculations to comprehensive analytics.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={feature.title}
                className="group card hover:transform hover:scale-105 transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-primary-400 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Benefits Section */}
        <div className="bg-slate-800/50 rounded-2xl border border-slate-700 p-8 md:p-12 animate-fade-in-up animation-delay-500">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why Choose FinFlow?
            </h3>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Experience the difference with our comprehensive financial management platform designed for modern homeowners.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div 
                  key={benefit.title}
                  className="flex items-start space-x-4 group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-success-500/20 rounded-lg flex items-center justify-center group-hover:bg-success-500/30 transition-colors duration-300">
                    <Icon className="w-6 h-6 text-success-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-success-400 transition-colors duration-300">
                      {benefit.title}
                    </h4>
                    <p className="text-slate-300 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 animate-fade-in-up animation-delay-700">
          <div className="bg-gradient-to-r from-primary-600/20 to-purple-600/20 rounded-2xl border border-primary-500/30 p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Transform Your Financial Management?
            </h3>
            <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
              Join thousands of users who have already simplified their home loan management with FinFlow.
            </p>
            <button className="btn-primary text-lg px-8 py-4">
              Get Started Today
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
