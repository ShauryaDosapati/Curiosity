import { Layout } from "@/components/Layout";

const teamMembers = [
  { name: "Srikar Janga",              image: "member1.jpg" },
  { name: "Manas Kacham",             image: "member2.jpg" },
  { name: "Rakshith Sathiamoorthy",   image: "member3.jpg" },
  { name: "Aavyan Kamat",             image: "member4.jpg" },
  { name: "Dev Shaurya Dosapati",     image: "member5.jpg" },
];

export default function About() {
  return (
    <Layout>
      <div className="flex flex-col">

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

        <section className="bg-muted px-4 sm:px-6 lg:px-12 py-20 border-b border-border">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="rounded-lg overflow-hidden shadow-sm border border-border bg-white p-2">
              <img
                src={`${import.meta.env.BASE_URL}images/photo4.jpg`}
                alt="Our Mission"
                className="w-full h-auto object-cover rounded-md"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6 text-foreground border-l-4 border-primary pl-4">The Vision</h2>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  The Curiosity Project started when a small group of educators noticed a massive gap in out-of-school resources for local youth. While talent was evenly distributed, opportunity was not.
                </p>
                <p>
                  What began as weekend coding and art workshops in a local library has grown into a community movement. Today, we continue to expand our programs spanning STEM, the arts, life skills, and community leadership.
                </p>
                <p className="font-bold text-foreground bg-white p-4 border-l-4 border-secondary rounded-r-lg shadow-sm">
                  Our mission is simple: To provide barrier-free access to education, mentorship, and inspiration for those who need it most.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white px-4 sm:px-6 lg:px-12 py-20 border-b border-border">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 border-l-4 border-primary pl-4">Meet Our Core Team</h2>
            <p className="text-lg text-muted-foreground mb-12 pl-5">The people behind The Curiosity Project who make it all happen.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member, i) => (
                <div key={i} className="bg-muted rounded-lg border border-border overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={`${import.meta.env.BASE_URL}images/${member.image}`}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-5 text-center">
                    <h3 className="font-bold text-lg text-foreground">{member.name}</h3>
                    <p className="text-sm text-primary font-semibold mt-1">Core Member</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-muted px-4 sm:px-6 lg:px-12 py-20">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 border-l-4 border-primary pl-4">Our Community in Action</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="rounded-lg overflow-hidden shadow-sm border border-border aspect-[4/3]">
                <img
                  src={`${import.meta.env.BASE_URL}images/photo1.jpg`}
                  alt="Community members"
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
          </div>
        </section>

      </div>
    </Layout>
  );
}
