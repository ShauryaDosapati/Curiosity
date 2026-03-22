import { Link } from "wouter";
import { ArrowRight, Heart, Users, BookOpen } from "lucide-react";
import { Layout } from "@/components/Layout";

export default function Home() {
  return (
    <Layout>
      <div className="flex flex-col">

        {/* Hero */}
        <section className="bg-white px-4 sm:px-6 lg:px-12 py-16 lg:py-24">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-primary/10 text-primary font-bold text-sm mb-6 border border-primary/20 uppercase tracking-wide">
                Empowering minds through curiosity
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-foreground leading-[1.1] mb-6">
                Igniting the spark of <span className="text-primary">curiosity</span> in every community.
              </h1>

              <p className="text-lg sm:text-xl text-muted-foreground mb-10 leading-relaxed">
                We provide free educational resources, mentorship, and community programs to ensure everyone has the opportunity to learn, grow, and succeed.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/events"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-md bg-primary text-primary-foreground font-bold text-lg hover:bg-primary/90 transition-colors"
                >
                  Join our next event
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-md bg-white text-foreground border-2 border-border font-bold text-lg hover:bg-muted transition-colors"
                >
                  Our Story
                </Link>
              </div>
            </div>

            <div className="relative w-full aspect-square lg:aspect-auto lg:h-[600px] rounded-lg overflow-hidden shadow-sm border border-border">
              <img
                src={`${import.meta.env.BASE_URL}images/photo1.jpg`}
                alt="Community gathering"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* Pillars */}
        <section className="bg-muted px-4 sm:px-6 lg:px-12 py-20 border-y border-border">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12 border-l-4 border-primary pl-6">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-foreground">How we make a difference</h2>
              <p className="text-lg text-muted-foreground max-w-2xl">Our approach is built on three core pillars designed to create lasting, sustainable impact.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg border border-border shadow-sm flex flex-col items-start">
                <div className="w-14 h-14 bg-primary text-primary-foreground rounded-md flex items-center justify-center mb-6 shadow-sm">
                  <BookOpen className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-3">Accessible Education</h3>
                <p className="text-muted-foreground leading-relaxed">Providing free workshops, tutoring, and resources to bridge the educational gap in underserved areas.</p>
              </div>

              <div className="bg-white p-8 rounded-lg border border-border shadow-sm flex flex-col items-start">
                <div className="w-14 h-14 bg-primary text-primary-foreground rounded-md flex items-center justify-center mb-6 shadow-sm">
                  <Users className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-3">Mentorship</h3>
                <p className="text-muted-foreground leading-relaxed">Connecting eager learners with experienced professionals who guide, inspire, and open new doors.</p>
              </div>

              <div className="bg-white p-8 rounded-lg border border-border shadow-sm flex flex-col items-start">
                <div className="w-14 h-14 bg-primary text-primary-foreground rounded-md flex items-center justify-center mb-6 shadow-sm">
                  <Heart className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-3">Community Support</h3>
                <p className="text-muted-foreground leading-relaxed">Building safe spaces where neighbors can connect, collaborate, and support each other's growth.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Photo gallery */}
        <section className="px-4 sm:px-6 lg:px-12 py-20 bg-white border-b border-border">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-lg overflow-hidden shadow-sm border border-border aspect-[4/3]">
              <img
                src={`${import.meta.env.BASE_URL}images/photo2.jpg`}
                alt="Students learning together"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="rounded-lg overflow-hidden shadow-sm border border-border aspect-[4/3]">
              <img
                src={`${import.meta.env.BASE_URL}images/photo3.jpg`}
                alt="Community event"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-band px-4 sm:px-6 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">Ready to spark a change?</h2>
            <p className="text-lg text-primary-foreground/90 mb-10 leading-relaxed">
              Whether you have an hour a week or just a few dollars to spare, your contribution fuels the curiosity of tomorrow's leaders.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/contact"
                className="px-8 py-4 rounded-md bg-white text-primary font-bold text-lg hover:bg-muted transition-colors"
              >
                Volunteer with us
              </Link>
              <Link
                href="/contact"
                className="px-8 py-4 rounded-md bg-transparent border-2 border-white text-white font-bold text-lg hover:bg-white/10 transition-colors"
              >
                Make a Donation
              </Link>
            </div>
          </div>
        </section>

      </div>
    </Layout>
  );
}
