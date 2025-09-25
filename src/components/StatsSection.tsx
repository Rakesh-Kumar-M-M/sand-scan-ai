import { Card, CardContent } from "@/components/ui/card";
import { Camera, MapPin, Users, Microscope } from "lucide-react";

export const StatsSection = () => {
  const stats = [
    {
      icon: Camera,
      value: "15,000+",
      label: "Sand Images Analyzed",
      description: "AI-powered grain size analysis",
    },
    {
      icon: MapPin,
      value: "500+",
      label: "Beach Locations",
      description: "Across coastal regions worldwide",
    },
    {
      icon: Users,
      value: "2,800+",
      label: "Citizen Scientists",
      description: "Contributing to coastal research",
    },
    {
      icon: Microscope,
      value: "98.5%",
      label: "Analysis Accuracy",
      description: "Validated against lab measurements",
    },
  ];

  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-6">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl font-bold">Making Waves in Coastal Science</h2>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
            Our platform is already making a significant impact on coastal monitoring 
            and research worldwide.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-white/10 border-white/20 backdrop-blur-sm hover:bg-white/15 transition-all duration-300">
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mx-auto">
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-white">{stat.value}</div>
                  <div className="text-lg font-semibold text-white">{stat.label}</div>
                  <div className="text-sm text-white/70">{stat.description}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-4xl mx-auto border border-white/20">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-2xl font-bold text-accent mb-2">Real-time Processing</div>
                <p className="text-white/80">
                  Instant AI analysis provides immediate results for uploaded sand samples
                </p>
              </div>
              <div>
                <div className="text-2xl font-bold text-accent mb-2">Global Coverage</div>
                <p className="text-white/80">
                  Monitoring coastal changes across continents with standardized methods
                </p>
              </div>
              <div>
                <div className="text-2xl font-bold text-accent mb-2">Open Science</div>
                <p className="text-white/80">
                  All data freely available to researchers and policymakers worldwide
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};