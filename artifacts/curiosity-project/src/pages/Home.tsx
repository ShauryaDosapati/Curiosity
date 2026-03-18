import { Link } from "wouter";
import { ArrowRight, Heart, Users, BookOpen, Stars } from "lucide-react";
import { Layout } from "@/components/Layout";

export default function Home() {
  return (
    <Layout>
      <div className="flex flex-col gap-16 lg:gap-24 pb-20">
        
        {/* Hero Section */}
        <section className="relative px-4 sm:px-6 lg:px-12 pt-12 lg:pt-20">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent -z-10 rounded-b-[3rem]" />
          
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 text-accent-foreground font-medium text-sm mb-6 border border-accent/30">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              Empowering minds since 2015
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-extrabold text-foreground leading-[1.1] mb-6">
              Igniting the spark of <span className="text-primary relative whitespace-nowrap">
                <span className="relative z-10">curiosity</span>
                <svg className="absolute -bottom-2 left-0 w-full h-4 text-accent/50 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" strokeLinecap="round" />
                </svg>
              </span> in every community.
            </h1>
            
            <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl leading-relaxed">
              We provide free educational resources, mentorship, and community programs to ensure everyone has the opportunity to learn, grow, and succeed.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/events"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold text-lg shadow-lg shadow-primary/30 hover:shadow-xl hover:-translate-y-1 hover:bg-primary/95 transition-all"
              >
                Join our next event
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                href="/about"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-white text-foreground border-2 border-border font-semibold text-lg hover:border-primary/30 hover:bg-primary/5 transition-all"
              >
                Our Story
              </Link>
            </div>
          </div>
          
          <div className="mt-16 w-full rounded-[2.5rem] overflow-hidden shadow-2xl shadow-black/10 relative h-[300px] sm:h-[400px] lg:h-[500px] border-4 border-white/50 group">
            {/* landing page hero scenic community event */}
            <img 
              src={`${import.meta.env.BASE_URL}images/hero-bg.png`}
              alt="Community gathering" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent"></div>
          </div>
        </section>

        {/* Pillars Section */}
        <section className="px-4 sm:px-6 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold mb-4">How we make a difference</h2>
            <p className="text-muted-foreground">Our approach is built on three core pillars designed to create lasting, sustainable impact.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card p-8 rounded-3xl border border-border/50 shadow-lg shadow-black/5 hover-lift">
              <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6">
                <BookOpen className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold font-display mb-3">Accessible Education</h3>
              <p className="text-muted-foreground leading-relaxed">Providing free workshops, tutoring, and resources to bridge the educational gap in underserved areas.</p>
            </div>
            
            <div className="bg-card p-8 rounded-3xl border border-border/50 shadow-lg shadow-black/5 hover-lift">
              <div className="w-14 h-14 bg-secondary/10 text-secondary rounded-2xl flex items-center justify-center mb-6">
                <Users className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold font-display mb-3">Mentorship</h3>
              <p className="text-muted-foreground leading-relaxed">Connecting eager learners with experienced professionals who guide, inspire, and open new doors.</p>
            </div>
            
            <div className="bg-card p-8 rounded-3xl border border-border/50 shadow-lg shadow-black/5 hover-lift">
              <div className="w-14 h-14 bg-accent/20 text-accent rounded-2xl flex items-center justify-center mb-6">
                <Heart className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold font-display mb-3">Community Support</h3>
              <p className="text-muted-foreground leading-relaxed">Building safe spaces where neighbors can connect, collaborate, and support each other's growth.</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 sm:px-6 lg:px-12">
          <div className="bg-gradient-to-br from-secondary to-secondary/80 rounded-[3rem] p-10 lg:p-16 text-center text-white relative overflow-hidden shadow-2xl shadow-secondary/20">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Stars className="w-64 h-64" />
            </div>
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl lg:text-5xl font-display font-bold mb-6">Ready to spark a change?</h2>
              <p className="text-lg text-white/80 mb-10 leading-relaxed">
                Whether you have an hour a week or just a few dollars to spare, your contribution fuels the curiosity of tomorrow's leaders.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link 
                  href="/contact"
                  className="px-8 py-4 rounded-full bg-white text-secondary font-bold text-lg hover:shadow-xl hover:-translate-y-1 transition-all"
                >
                  Volunteer with us
                </Link>
                <Link 
                  href="/contact"
                  className="px-8 py-4 rounded-full bg-transparent border-2 border-white text-white font-bold text-lg hover:bg-white/10 transition-all"
                >
                  Make a Donation
                </Link>
              </div>
            </div>
          </div>
        </section>

      </div>
    </Layout>
  );
}
