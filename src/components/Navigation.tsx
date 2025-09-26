import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Waves } from "lucide-react";
import { AuthDialog } from "@/components/AuthDialog";
import { useAuth } from "@/context/AuthContext";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const { user, login, logout } = useAuth();

  const handleLoginSuccess = (u: { email: string; name?: string }, token: string) => {
    login(u, token);
  };

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Analysis", href: "/analysis" },
    { name: "Modules", href: "#modules" },
    { name: "Research", href: "#research" },
    { name: "Community", href: "#community" },
    { name: "API", href: "#api" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-border shadow-gentle">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-ocean rounded-xl flex items-center justify-center">
              <Waves className="h-6 w-6 text-white" />
            </div>
            <div className="font-bold text-xl text-primary">CoastalWatch</div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <div className="text-sm">Hi, {user.name || user.email}</div>
                <Button variant="outline" size="sm" onClick={logout}>Logout</Button>
              </>
            ) : (
              <Button variant="outline" size="sm" onClick={() => setAuthOpen(true)}>
                Sign In
              </Button>
            )}
            <Button size="sm" className="bg-gradient-ocean hover:shadow-ocean transition-all duration-300">
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block text-foreground hover:text-primary transition-colors font-medium py-2"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <div className="pt-4 space-y-2">
                <Button variant="outline" size="sm" className="w-full">
                  Sign In
                </Button>
                <Button size="sm" className="w-full bg-gradient-ocean">
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
      <AuthDialog open={authOpen} onOpenChange={setAuthOpen} onLoginSuccess={handleLoginSuccess} />
    </nav>
  );
};