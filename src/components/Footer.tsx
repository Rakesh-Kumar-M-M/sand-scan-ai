import { Button } from "@/components/ui/button";
import { Waves, Github, Twitter, Mail, ExternalLink } from "lucide-react";

export const Footer = () => {
  const footerSections = [
    {
      title: "Platform",
      links: [
        { name: "Dashboard", href: "#dashboard" },
        { name: "Upload Data", href: "#upload" },
        { name: "Analysis Tools", href: "#analysis" },
        { name: "API Access", href: "#api" },
      ],
    },
    {
      title: "Research",
      links: [
        { name: "Methodology", href: "#methodology" },
        { name: "Publications", href: "#publications" },
        { name: "Datasets", href: "#datasets" },
        { name: "Collaborations", href: "#collaborations" },
      ],
    },
    {
      title: "Community",
      links: [
        { name: "Citizen Science", href: "#citizen-science" },
        { name: "Educational Resources", href: "#education" },
        { name: "Contributing", href: "#contribute" },
        { name: "Support", href: "#support" },
      ],
    },
    {
      title: "About",
      links: [
        { name: "Our Mission", href: "#mission" },
        { name: "Team", href: "#team" },
        { name: "Partners", href: "#partners" },
        { name: "Contact", href: "#contact" },
      ],
    },
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-6 py-16">
        {/* Newsletter Signup */}
        <div className="bg-white/10 rounded-2xl p-8 mb-16 border border-white/20">
          <div className="max-w-2xl mx-auto text-center space-y-4">
            <h3 className="text-2xl font-bold">Stay Updated on Coastal Science</h3>
            <p className="text-primary-foreground/80">
              Get the latest insights, research findings, and platform updates delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <Button className="bg-accent hover:bg-accent/90 text-white">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-5 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1 space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center">
                <img src="/Arenis_logo.jpeg" alt="" />
              </div>
              <div className="font-bold text-2xl">Arenis</div>
            </div>
            <p className="text-primary-foreground/80 leading-relaxed">
              Advancing coastal science  monitoring and community engagement for a sustainable future.
            </p>
            <div className="flex space-x-4">
              <Button size="sm" variant="ghost" className="text-primary-foreground hover:text-accent">
                <Github className="h-5 w-5" />
              </Button>
              <Button size="sm" variant="ghost" className="text-primary-foreground hover:text-accent">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button size="sm" variant="ghost" className="text-primary-foreground hover:text-accent">
                <Mail className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={index} className="space-y-4">
              <h4 className="font-semibold text-lg">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      className="text-primary-foreground/80 hover:text-accent transition-colors flex items-center space-x-1"
                    >
                      <span>{link.name}</span>
                      <ExternalLink className="h-3 w-3 opacity-60" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-white/20">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-primary-foreground/80">
              © 2025 CoastalWatch. Advancing coastal science through technology.
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <a href="#privacy" className="text-primary-foreground/80 hover:text-accent transition-colors">
                Privacy Policy
              </a>
              <a href="#terms" className="text-primary-foreground/80 hover:text-accent transition-colors">
                Terms of Service
              </a>
              <a href="#open-source" className="text-primary-foreground/80 hover:text-accent transition-colors">
                Open Source
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};