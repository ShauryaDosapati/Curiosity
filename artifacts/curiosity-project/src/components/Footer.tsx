import { Link } from "wouter";
import { Sparkles, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-12 lg:py-16 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-primary text-primary-foreground p-1.5 rounded-lg">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="font-display font-bold text-2xl tracking-tight">
                The Curiosity Project
              </span>
            </div>
            <p className="text-muted-foreground/80 max-w-sm mb-6 leading-relaxed">
              Empowering communities through education, resources, and unwavering support. Join us in building a brighter, more curious future for everyone.
            </p>
            <div className="flex items-center gap-1 text-sm font-medium text-primary">
              <span>Made with</span>
              <Heart className="w-4 h-4 fill-current" />
              <span>for the community</span>
            </div>
          </div>
          
          <div>
            <h4 className="font-display font-bold text-lg mb-4 text-white">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link href="/" className="text-muted-foreground/80 hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/about" className="text-muted-foreground/80 hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/events" className="text-muted-foreground/80 hover:text-white transition-colors">Events</Link></li>
              <li><Link href="/contact" className="text-muted-foreground/80 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-display font-bold text-lg mb-4 text-white">Get Involved</h4>
            <ul className="space-y-3">
              <li><Link href="/contact" className="text-muted-foreground/80 hover:text-white transition-colors">Volunteer</Link></li>
              <li><Link href="/events" className="text-muted-foreground/80 hover:text-white transition-colors">Attend an Event</Link></li>
              <li><Link href="/contact" className="text-muted-foreground/80 hover:text-white transition-colors">Partner with us</Link></li>
              <li><Link href="/contact" className="text-primary hover:text-primary/80 font-semibold transition-colors">Donate Now</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground/60">
          <p>© {new Date().getFullYear()} The Curiosity Project. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
