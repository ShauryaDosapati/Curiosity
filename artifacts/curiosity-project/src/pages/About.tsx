import { Layout } from "@/components/Layout";

export default function About() {
  return (
    <Layout>
      <div className="flex flex-col">
        
        {/* Header */}
        <section className="bg-white px-4 sm:px-6 lg:px-12 py-16 lg:py-24 border-b border-border">
          <div className="max-w-5xl mx-auto">
            <div className="border-l-4 border-primary pl-6 mb-8">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-foreground">
                Our Story
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
                We believe that curiosity is the fundamental driver of human progress, and everyone deserves the resources to explore their potential.
              </p>
            </div>
          </div>
        </section>

        {/* Vision */}
        <section className="bg-muted px-4 sm:px-6 lg:px-12 py-20 border-b border-border">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="rounded-lg overflow-hidden shadow-sm border border-border bg-white p-2">
               <img 
                src={`${import.meta.env.BASE_URL}images/about-mission.png`}
                alt="Our Mission" 
                className="w-full h-auto object-cover rounded-md"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6 text-foreground border-l-4 border-primary pl-4">The Vision</h2>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  The Curiosity Project started in 2015 when a small group of educators noticed a massive gap in out-of-school resources for local youth. While talent was evenly distributed, opportunity was not.
                </p>
                <p>
                  What began as weekend coding and art workshops in a local library has blossomed into a city-wide movement. Today, we run dozens of programs spanning STEM, the arts, life skills, and community leadership.
                </p>
                <p className="font-bold text-foreground bg-white p-4 border-l-4 border-secondary rounded-r-lg shadow-sm">
                  Our mission is simple: To provide barrier-free access to education, mentorship, and inspiration for those who need it most.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="bg-white px-4 sm:px-6 lg:px-12 py-20 border-b border-border">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 border-l-4 border-primary pl-4">Our Core Values</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { title: "Radical Inclusion", desc: "We build doors, not walls. Every program we offer is free and open to anyone willing to learn." },
                { title: "Lifelong Curiosity", desc: "We celebrate questions over answers. Learning doesn't stop when school ends." },
                { title: "Community First", desc: "We listen to the communities we serve and design programs around their specific needs." },
                { title: "Empathetic Mentorship", desc: "We believe a supportive guide is just as important as a good curriculum." }
              ].map((value, i) => (
                <div key={i} className="bg-muted p-8 rounded-lg border border-border flex flex-col">
                  <div className="text-sm font-bold text-primary mb-2 uppercase tracking-wider">Core Value {i+1}</div>
                  <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="bg-muted px-4 sm:px-6 lg:px-12 py-20">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 border-l-4 border-primary pl-4">Meet the Team</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {["Sarah Jenkins", "Marcus Chen", "Elena Rodriguez", "David Kim"].map((name, i) => (
                <div key={i} className="bg-white p-6 rounded-lg border border-border text-center shadow-sm">
                  <div className="mb-4 rounded-full overflow-hidden border-2 border-border mx-auto w-24 h-24 bg-muted">
                    <img 
                      src={`${import.meta.env.BASE_URL}images/team-placeholder.png`}
                      alt={name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-bold text-lg">{name}</h3>
                  <p className="text-sm text-primary font-semibold mt-1">
                    {["Executive Director", "Head of Programs", "Community Outreach", "Lead Mentor"][i]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>
    </Layout>
  );
}
