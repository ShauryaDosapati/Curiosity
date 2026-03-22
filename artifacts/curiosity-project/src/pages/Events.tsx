import { useState } from "react";
import { Layout } from "@/components/Layout";
import { format } from "date-fns";
import { MapPin, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

type EventCategory = "workshop" | "fundraiser" | "community" | "volunteer" | "other";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  category: EventCategory;
  isUpcoming: boolean;
  imageUrl?: string | null;
}

const EVENTS: Event[] = [
  {
    id: "java-workshop-2026",
    title: "Coding Workshop (Java)",
    description: "A hands-on Java programming workshop for beginners and intermediate learners. Students explored core Java concepts including variables, control flow, object-oriented programming, and built their own mini-projects.",
    date: "2026-02-13",
    location: "Plainsboro Public Library",
    category: "workshop",
    isUpcoming: false,
    imageUrl: "images/event-workshop1.jpg",
  },
  {
    id: "spring-gala-2026",
    title: "Spring Fundraising Gala",
    description: "Our annual gala bringing together donors, volunteers, and community leaders. Enjoy dinner, live music, and inspiring student showcases.",
    date: "2026-05-10",
    location: "Grand Ballroom, City Hotel",
    category: "fundraiser",
    isUpcoming: true,
    imageUrl: null,
  },
  {
    id: "science-fair-2026",
    title: "Community Science Fair",
    description: "Students present their science projects to the public. Come be inspired by the next generation of scientists and makers!",
    date: "2026-06-07",
    location: "Riverside Community Center",
    category: "community",
    isUpcoming: true,
    imageUrl: null,
  },
  {
    id: "volunteer-orientation-2026",
    title: "Volunteer Orientation Day",
    description: "New to volunteering with us? Learn how to make the most impact as a mentor and tutor in your first session with us.",
    date: "2026-04-05",
    location: "123 Learning Lane, Plainsboro, NJ",
    category: "volunteer",
    isUpcoming: true,
    imageUrl: null,
  },
];

const categoryColors: Record<EventCategory, string> = {
  workshop: "bg-blue-600 text-white",
  fundraiser: "bg-primary text-primary-foreground",
  community: "bg-orange-600 text-white",
  volunteer: "bg-purple-600 text-white",
  other: "bg-gray-600 text-white",
};

export default function Events() {
  const [filter, setFilter] = useState<"all" | "upcoming" | "past">("all");

  const filteredEvents = EVENTS.filter((e) => {
    if (filter === "all") return true;
    if (filter === "upcoming") return e.isUpcoming;
    return !e.isUpcoming;
  });

  return (
    <Layout>
      <div className="bg-white px-4 sm:px-6 lg:px-12 py-12 lg:py-16 border-b border-border">
        <div className="max-w-6xl mx-auto border-l-4 border-primary pl-6">
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-3">
            Community Events
          </h1>
          <p className="text-muted-foreground text-lg">
            Join us, learn something new, and connect with neighbors.
          </p>
        </div>
      </div>

      <div className="bg-muted px-4 sm:px-6 lg:px-12 py-12 min-h-screen">
        <div className="max-w-6xl mx-auto">
          <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
            {(["upcoming", "past", "all"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "px-5 py-2 rounded-md font-bold text-sm transition-colors whitespace-nowrap",
                  filter === f
                    ? "bg-foreground text-background"
                    : "bg-white text-muted-foreground border border-border hover:bg-gray-50"
                )}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)} Events
              </button>
            ))}
          </div>

          {filteredEvents.length === 0 ? (
            <div className="text-center py-24 bg-white rounded-lg border border-border">
              <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">No events found</h3>
              <p className="text-muted-foreground">Check back soon for upcoming events!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredEvents.map((event) => (
                <div
                  key={event.id}
                  className={cn(
                    "bg-white rounded-lg border shadow-sm flex flex-col overflow-hidden",
                    !event.isUpcoming ? "opacity-75 bg-gray-50" : "border-border"
                  )}
                >
                  {event.imageUrl && (
                    <div className="aspect-[16/9] overflow-hidden">
                      <img
                        src={`${import.meta.env.BASE_URL}${event.imageUrl.replace(/^\//, "")}`}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex justify-between items-start mb-4">
                      <span className={cn(
                        "text-xs font-bold uppercase tracking-wider px-2 py-1 rounded",
                        categoryColors[event.category]
                      )}>
                        {event.category}
                      </span>
                      {!event.isUpcoming && (
                        <span className="text-xs font-bold uppercase tracking-wider bg-gray-200 text-gray-700 px-2 py-1 rounded">
                          Passed
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl font-bold text-foreground mb-4 line-clamp-2">
                      {event.title}
                    </h3>

                    <div className="space-y-3 mb-6 bg-muted p-4 rounded-md">
                      <div className="flex items-center gap-3 text-sm text-foreground font-semibold">
                        <Calendar className="w-4 h-4 text-primary" />
                        <span>
                          {(() => {
                            try { return format(new Date(event.date), "MMMM d, yyyy"); }
                            catch { return event.date; }
                          })()}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-foreground font-semibold">
                        <MapPin className="w-4 h-4 text-primary" />
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.location)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline line-clamp-1"
                        >
                          {event.location}
                        </a>
                      </div>
                    </div>

                    <p className="text-muted-foreground text-sm line-clamp-3 mb-6 flex-1">
                      {event.description}
                    </p>

                    <button
                      disabled={!event.isUpcoming}
                      className="w-full mt-auto py-2.5 rounded-md font-bold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed"
                    >
                      {event.isUpcoming ? "RSVP Now" : "View Details"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
