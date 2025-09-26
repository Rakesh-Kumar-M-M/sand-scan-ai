import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Map, GraduationCap, BarChart3, Download, Database } from "lucide-react";
import grainAnalysisImage from "@/assets/grain-analysis.jpg";
import mapPreviewImage from "@/assets/map-preview.jpg";

export const ModulesSection = () => {
  const modules = [
    {
      icon: TrendingUp,
      title: "Change Detection",
      description: "Compare historical beach data to detect shifts in grain size distribution and identify erosion patterns.",
      features: ["Past vs Present Analysis", "ΔD50 Calculations", "Erosion Zone Mapping"],
      color: "bg-gradient-ocean",
      image: mapPreviewImage,
    },
    {
      icon: Map,
      title: "Predictive Modeling",
      description: "Advanced ML models analyze trends to forecast coastal changes and identify at-risk areas.",
      features: ["Risk Zone Identification", "Erosion Predictions", "Climate Impact Models"],
      color: "bg-gradient-shore",
      image: grainAnalysisImage,
    },
    {
      icon: GraduationCap,
      title: "Citizen Science",
      description: "Engage communities in coastal monitoring while providing educational resources about marine processes.",
      features: ["Community Contributions", "Educational Content", "Instant Feedback"],
      color: "bg-success",
      image: null,
    },
  ];

  const additionalFeatures = [
    {
      icon: BarChart3,
      title: "Data Visualization",
      description: "Interactive dashboards and charts for comprehensive coastal analysis.",
    },
    {
      icon: Download,
      title: "Scientific Reports",
      description: "Export data in CSV, PDF, and GeoJSON formats for research.",
    },
    {
      icon: Database,
      title: "Public API",
      description: "Access coastal monitoring data through our research-friendly API.",
    },
  ];

  return (
    <section className="py-20 bg-gradient-sand">
      <div className="container mx-auto px-6">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl font-bold">Comprehensive Coastal Intelligence</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our integrated platform combines AI analysis, predictive modeling, and community engagement 
            to provide complete coastal monitoring solutions.
          </p>
        </div>

        {/* Main Modules */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {modules.map((module, index) => (
            <Card key={index} className="group hover:shadow-card transition-all duration-300 border-0 shadow-gentle overflow-hidden">
              {module.image && (
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={module.image} 
                    alt={module.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
                </div>
              )}
              
              <CardHeader className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 ${module.color} rounded-xl flex items-center justify-center`}>
                    <module.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{module.title}</CardTitle>
                </div>
                <CardDescription className="text-base leading-relaxed">
                  {module.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {module.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full shadow-[0_0_0_2px_rgba(255,255,255,0.4)_inset]" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  Explore Module
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Features */}
        <div className="space-y-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Additional Capabilities</h3>
            <p className="text-muted-foreground">
              Supporting tools and features for comprehensive coastal research
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {additionalFeatures.map((feature, index) => (
              <Card key={index} className="p-6 hover:shadow-gentle transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <feature.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium mb-4">
            <span>🌊</span>
            <span>Join the coastal monitoring revolution</span>
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">Ready to Get Started?</h3>
            <p className="text-muted-foreground">
              Begin contributing to coastal science today with your smartphone camera
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-ocean hover:shadow-ocean transition-all duration-300">
                Start Contributing
              </Button>
              <Button size="lg" variant="outline">
                View Documentation
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};