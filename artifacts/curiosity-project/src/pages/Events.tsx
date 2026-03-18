import { useState } from "react";
import { Layout } from "@/components/Layout";
import { useGetEvents, useCreateEvent, EventCategory } from "@workspace/api-client-react";
import { format } from "date-fns";
import { MapPin, Calendar, Plus, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogDescription
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

const eventSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description is too short"),
  date: z.string().min(1, "Date is required"),
  location: z.string().min(3, "Location is required"),
  category: z.enum(["workshop", "fundraiser", "community", "volunteer", "other"] as const),
  imageUrl: z.string().optional()
});

type EventFormValues = z.infer<typeof eventSchema>;

const categoryColors: Record<string, string> = {
  workshop: "bg-blue-100 text-blue-800 border-blue-200",
  fundraiser: "bg-green-100 text-green-800 border-green-200",
  community: "bg-orange-100 text-orange-800 border-orange-200",
  volunteer: "bg-purple-100 text-purple-800 border-purple-200",
  other: "bg-gray-100 text-gray-800 border-gray-200"
};

export default function Events() {
  const { data: events, isLoading } = useGetEvents();
  const [filter, setFilter] = useState<"all" | "upcoming" | "past">("upcoming");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const createMutation = useCreateEvent();

  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      category: "community"
    }
  });

  const onSubmit = async (data: EventFormValues) => {
    try {
      await createMutation.mutateAsync({
        data: {
          ...data,
          // Format the date to ISO string if needed by backend, simple local string for now
          date: new Date(data.date).toISOString() 
        }
      });
      toast({ title: "Event created successfully!" });
      setIsDialogOpen(false);
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["/api/events"] });
    } catch (error) {
      toast({ title: "Failed to create event", variant: "destructive" });
    }
  };

  const filteredEvents = events?.filter(e => {
    if (filter === "all") return true;
    if (filter === "upcoming") return e.isUpcoming;
    return !e.isUpcoming;
  }) || [];

  return (
    <Layout>
      <div className="px-4 sm:px-6 lg:px-12 py-12 max-w-6xl mx-auto">
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-12">
          <div>
            <h1 className="text-4xl lg:text-5xl font-display font-bold text-foreground mb-3">
              Community Events
            </h1>
            <p className="text-muted-foreground text-lg">
              Join us, learn something new, and connect with neighbors.
            </p>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <button className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold shadow-lg shadow-primary/20 hover:-translate-y-0.5 hover:shadow-xl transition-all">
                <Plus className="w-5 h-5" />
                Host an Event
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] rounded-3xl">
              <DialogHeader>
                <DialogTitle className="font-display text-2xl">Create New Event</DialogTitle>
                <DialogDescription>
                  Propose an event for the community. It will be added to the public calendar.
                </DialogDescription>
              </DialogHeader>
              
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium">Event Title</label>
                  <input 
                    {...form.register("title")}
                    className="w-full px-4 py-2.5 rounded-xl border border-input bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    placeholder="e.g. Weekend Code Camp"
                  />
                  {form.formState.errors.title && (
                    <p className="text-xs text-destructive">{form.formState.errors.title.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm font-medium">Date & Time</label>
                    <input 
                      type="datetime-local"
                      {...form.register("date")}
                      className="w-full px-4 py-2.5 rounded-xl border border-input bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium">Category</label>
                    <select 
                      {...form.register("category")}
                      className="w-full px-4 py-2.5 rounded-xl border border-input bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    >
                      <option value="workshop">Workshop</option>
                      <option value="fundraiser">Fundraiser</option>
                      <option value="community">Community</option>
                      <option value="volunteer">Volunteer</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium">Location</label>
                  <input 
                    {...form.register("location")}
                    className="w-full px-4 py-2.5 rounded-xl border border-input bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    placeholder="Where will it happen?"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium">Description</label>
                  <textarea 
                    {...form.register("description")}
                    rows={3}
                    className="w-full px-4 py-2.5 rounded-xl border border-input bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                    placeholder="Tell us more about the event..."
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={createMutation.isPending}
                  className="w-full mt-4 bg-primary text-primary-foreground py-3 rounded-xl font-bold shadow-md hover:shadow-lg disabled:opacity-50 transition-all flex justify-center items-center gap-2"
                >
                  {createMutation.isPending && <Loader2 className="w-5 h-5 animate-spin" />}
                  {createMutation.isPending ? "Publishing..." : "Publish Event"}
                </button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
          {(["upcoming", "past", "all"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "px-5 py-2 rounded-full font-medium text-sm transition-all whitespace-nowrap",
                filter === f 
                  ? "bg-foreground text-background shadow-md" 
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)} Events
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="bg-card rounded-3xl p-6 border border-border animate-pulse h-64">
                <div className="w-20 h-6 bg-muted rounded-full mb-4"></div>
                <div className="w-3/4 h-8 bg-muted rounded mb-2"></div>
                <div className="w-1/2 h-4 bg-muted rounded mb-6"></div>
                <div className="w-full h-16 bg-muted rounded"></div>
              </div>
            ))}
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="text-center py-24 bg-card rounded-3xl border border-dashed border-border">
            <Calendar className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
            <h3 className="text-2xl font-display font-bold mb-2">No events found</h3>
            <p className="text-muted-foreground">Check back later or host your own event!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <div 
                key={event.id}
                className={cn(
                  "bg-card rounded-3xl p-6 border shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col",
                  !event.isUpcoming ? "opacity-75 border-border/50" : "border-border"
                )}
              >
                <div className="flex justify-between items-start mb-4">
                  <span className={cn(
                    "text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border",
                    categoryColors[event.category] || categoryColors.other
                  )}>
                    {event.category}
                  </span>
                  {!event.isUpcoming && (
                    <span className="text-xs font-semibold bg-muted text-muted-foreground px-2 py-1 rounded-md">
                      Passed
                    </span>
                  )}
                </div>
                
                <h3 className="text-xl font-display font-bold text-foreground mb-2 line-clamp-2">
                  {event.title}
                </h3>
                
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span>
                      {/* Try to parse date, fallback to raw string if invalid */}
                      {(() => {
                        try { return format(new Date(event.date), "MMMM d, yyyy • h:mm a") } 
                        catch { return event.date }
                      })()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
                    <MapPin className="w-4 h-4 text-secondary" />
                    <span className="line-clamp-1">{event.location}</span>
                  </div>
                </div>
                
                <p className="text-muted-foreground text-sm line-clamp-3 mb-6 flex-1">
                  {event.description}
                </p>
                
                <button 
                  disabled={!event.isUpcoming}
                  className="w-full mt-auto py-2.5 rounded-xl font-bold border-2 border-primary/20 text-primary hover:bg-primary/5 transition-colors disabled:opacity-50 disabled:border-border disabled:text-muted-foreground disabled:hover:bg-transparent"
                >
                  {event.isUpcoming ? "RSVP Now" : "View Details"}
                </button>
              </div>
            ))}
          </div>
        )}

      </div>
    </Layout>
  );
}
