import { Link } from "wouter";
import { BookOpen } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-16 mt-auto border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="text-primary">
                <BookOpen className="w-8 h-8" />
              </div>
              <span className="font-bold text-2xl tracking-tight text-white">
                The Curiosity Project
              </span>
            </div>
            <p className="text-gray-400 max-w-sm mb-6 leading-relaxed">
              Empowering communities through education, resources, and unwavering support. Join us in building a brighter, more curious future for everyone.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-4 text-white border-l-2 border-primary pl-3">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link href="/" className="text-gray-400 hover:text-primary transition-colors font-medium">Home</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-primary transition-colors font-medium">About Us</Link></li>
              <li><Link href="/events" className="text-gray-400 hover:text-primary transition-colors font-medium">Events</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-primary transition-colors font-medium">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-4 text-white border-l-2 border-primary pl-3">Get Involved</h4>
            <ul className="space-y-3">
              <li><Link href="/contact" className="text-gray-400 hover:text-primary transition-colors font-medium">Volunteer</Link></li>
              <li><Link href="/events" className="text-gray-400 hover:text-primary transition-colors font-medium">Attend an Event</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-primary transition-colors font-medium">Partner with us</Link></li>
              <li><Link href="/contact" className="text-primary hover:text-primary/80 font-bold transition-colors">Donate Now</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500 font-medium">
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
