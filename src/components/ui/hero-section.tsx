import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-jerseys.jpg";

export function HeroSection() {
  return (
    <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-black/60" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gradient">
          Jersey Jolt Hub
        </h1>
        <p className="text-xl md:text-2xl text-foreground/90 mb-8">
          Les maillots de sport de vos équipes préférées
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="gradient-primary border-0 shadow-sport transition-sprint hover:scale-105">
            Découvrir la Collection
          </Button>
          <Button variant="outline" size="lg" className="transition-sprint hover:scale-105">
            Maillots Tendance
          </Button>
        </div>
      </div>
      
      {/* Animated Elements */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-foreground/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-foreground/50 rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
}