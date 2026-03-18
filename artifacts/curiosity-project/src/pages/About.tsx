import { Layout } from "@/components/Layout";

export default function About() {
  return (
    <Layout>
      <div className="px-4 sm:px-6 lg:px-12 py-12 lg:py-20 max-w-5xl mx-auto">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold mb-6 text-foreground">
            Our Story
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We believe that curiosity is the fundamental driver of human progress, and everyone deserves the resources to explore their potential.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
          <div className="rounded-3xl overflow-hidden shadow-xl border border-border/50">
             <img 
              src={`${import.meta.env.BASE_URL}images/about-mission.png`}
              alt="Our Mission" 
              className="w-full h-auto object-cover"
            />
          </div>
          <div>
            <h2 className="text-3xl font-display font-bold mb-6 text-primary">The Vision</h2>
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p>
                The Curiosity Project started in 2015 when a small group of educators noticed a massive gap in out-of-school resources for local youth. While talent was evenly distributed, opportunity was not.
              </p>
              <p>
                What began as weekend coding and art workshops in a local library has blossomed into a city-wide movement. Today, we run dozens of programs spanning STEM, the arts, life skills, and community leadership.
              </p>
              <p className="font-semibold text-foreground">
                Our mission is simple: To provide barrier-free access to education, mentorship, and inspiration for those who need it most.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-24">
          <h2 className="text-3xl font-display font-bold mb-12 text-center">Our Core Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {[
              { title: "Radical Inclusion", desc: "We build doors, not walls. Every program we offer is free and open to anyone willing to learn." },
              { title: "Lifelong Curiosity", desc: "We celebrate questions over answers. Learning doesn't stop when school ends." },
              { title: "Community First", desc: "We listen to the communities we serve and design programs around their specific needs." },
              { title: "Empathetic Mentorship", desc: "We believe a supportive guide is just as important as a good curriculum." }
            ].map((value, i) => (
              <div key={i} className="bg-card p-8 rounded-3xl border border-border/50 shadow-md">
                <div className="text-4xl font-display font-extrabold text-primary/20 mb-4">0{i+1}</div>
                <h3 className="text-xl font-bold font-display mb-2">{value.title}</h3>
                <p className="text-muted-foreground">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-display font-bold mb-12 text-center">Meet the Team</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {["Sarah Jenkins", "Marcus Chen", "Elena Rodriguez", "David Kim"].map((name, i) => (
              <div key={i} className="text-center group">
                <div className="mb-4 rounded-full overflow-hidden border-4 border-white shadow-xl mx-auto w-32 h-32 lg:w-40 lg:h-40 bg-muted">
                  <img 
                    src={`${import.meta.env.BASE_URL}images/team-placeholder.png`}
                    alt={name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <h3 className="font-bold font-display text-lg">{name}</h3>
                <p className="text-sm text-primary font-medium">
                  {["Executive Director", "Head of Programs", "Community Outreach", "Lead Mentor"][i]}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </Layout>
  );
}
