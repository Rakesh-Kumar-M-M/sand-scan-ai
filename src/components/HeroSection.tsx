import { Button } from "@/components/ui/button";
import { MapPin, Microscope, TrendingUp, Users } from "lucide-react";
import heroImage from "@/assets/hero-beach.jpg";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-primary/70 to-primary/30" />
      </div>

      <div className="relative container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.4)]">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                AI-Powered
                <span className="block bg-gradient-to-r from-accent to-warning bg-clip-text text-transparent">
                  Coastal Monitoring
                </span>
              </h1>
              <p className="text-xl text-white/90 leading-relaxed max-w-2xl">
                Automated beach sediment analysis using advanced AI and citizen science 
                for sustainable coastal management and climate resilience.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-6">
              <a href="/analysis" className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <Microscope className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold">AI Analysis</h3>
                  <p className="text-sm text-white/80">Grain size detection</p>
                </div>
              </a>

              <a href="/analysis" className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold">GPS Mapping</h3>
                  <p className="text-sm text-white/80">Spatial analysis</p>
                </div>
              </a>

              <a href="/analysis" className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold">Predictions</h3>
                  <p className="text-sm text-white/80">Change detection</p>
                </div>
              </a>

              <a href="/analysis" className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold">Citizen Science</h3>
                  <p className="text-sm text-white/80">Community driven</p>
                </div>
              </a>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" variant="secondary" className="shadow-ocean" asChild>
                <a href="/analysis">Start Analysis</a>
              </Button>
              <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10" asChild>
                <a href="/analysis">AI Analysis</a>
              </Button>
            </div>
          </div>

          {/* Right column intentionally simplified: direct CTA only */}
          <div className="bg-card/90 backdrop-blur-sm rounded-2xl p-8 shadow-ocean border border-white/20">
            <div className="space-y-6 text-center">
              <h2 className="text-2xl font-bold">Analyze Your Beach</h2>
              <p className="text-muted-foreground">
                Start AI analysis and set your location on the map
              </p>
              <Button 
                className="w-full bg-gradient-ocean hover:shadow-ocean transition-all duration-300"
                size="lg"
                asChild
              >
                <a href="/analysis">Go to Analysis</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};