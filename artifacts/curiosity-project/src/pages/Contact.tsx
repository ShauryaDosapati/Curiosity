import { Layout } from "@/components/Layout";
import { Mail, Phone, ArrowRight } from "lucide-react";

const INSTAGRAM_DM_URL = "https://ig.me/m/thecuriosityproject2025";
const INSTAGRAM_PROFILE_URL = "https://www.instagram.com/thecuriosityproject2025/";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

export default function Contact() {
  return (
    <Layout>

      {/* Hero */}
      <div className="bg-white px-4 sm:px-6 lg:px-12 py-16 lg:py-24 border-b border-border">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-8">
            <InstagramIcon className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground mb-6">
            Let's Connect
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            The best way to reach us is through Instagram DM. We respond quickly and love hearing from our community.
          </p>
        </div>
      </div>

      {/* Main CTA */}
      <div className="bg-muted px-4 sm:px-6 lg:px-12 py-20">
        <div className="max-w-3xl mx-auto">

          {/* Primary DM card */}
          <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden mb-8">
            <div className="bg-gradient-to-r from-[#f09433] via-[#e6683c] to-[#dc2743] p-8 text-white text-center">
              <InstagramIcon className="w-12 h-12 mx-auto mb-4 opacity-90" />
              <h2 className="text-2xl font-bold mb-2">Send us a DM</h2>
              <p className="text-white/80">@thecuriosityproject2025</p>
            </div>
            <div className="p-8 text-center">
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                Whether you have a question about our programs, want to volunteer, or are looking to partner with us — drop us a message on Instagram.
              </p>
              <a
                href={INSTAGRAM_DM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-10 py-4 rounded-xl font-bold text-lg hover:bg-primary/90 transition-colors shadow-sm"
              >
                Open Instagram DM
                <ArrowRight className="w-5 h-5" />
              </a>
              <p className="text-sm text-muted-foreground mt-4">
                Opens the Instagram app or website
              </p>
            </div>
          </div>

          {/* Secondary contact options */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <a
              href={INSTAGRAM_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-3 bg-white p-6 rounded-xl border border-border shadow-sm hover:border-primary hover:shadow-md transition-all group text-center"
            >
              <div className="bg-primary/10 p-3 rounded-full group-hover:bg-primary/20 transition-colors">
                <InstagramIcon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="font-bold text-foreground text-sm">Follow Us</p>
                <p className="text-xs text-muted-foreground mt-1">@thecuriosityproject2025</p>
              </div>
            </a>

            <a
              href="mailto:curiosityprojectlearning@gmail.com"
              className="flex flex-col items-center gap-3 bg-white p-6 rounded-xl border border-border shadow-sm hover:border-primary hover:shadow-md transition-all group text-center"
            >
              <div className="bg-primary/10 p-3 rounded-full group-hover:bg-primary/20 transition-colors">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="font-bold text-foreground text-sm">Email</p>
                <p className="text-xs text-muted-foreground mt-1">curiosityprojectlearning<br />@gmail.com</p>
              </div>
            </a>

            <a
              href="tel:6092409693"
              className="flex flex-col items-center gap-3 bg-white p-6 rounded-xl border border-border shadow-sm hover:border-primary hover:shadow-md transition-all group text-center"
            >
              <div className="bg-primary/10 p-3 rounded-full group-hover:bg-primary/20 transition-colors">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="font-bold text-foreground text-sm">Call Us</p>
                <p className="text-xs text-muted-foreground mt-1">(609) 240-9693<br />Mon–Fri, 9am–5pm</p>
              </div>
            </a>
          </div>

        </div>
      </div>

    </Layout>
  );
}
