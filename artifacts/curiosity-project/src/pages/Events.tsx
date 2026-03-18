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
  workshop: "bg-blue-600 text-white",
  fundraiser: "bg-primary text-primary-foreground",
  community: "bg-orange-600 text-white",
  volunteer: "bg-purple-600 text-white",
  other: "bg-gray-600 text-white"
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
      <div className="bg-white px-4 sm:px-6 lg:px-12 py-12 lg:py-16 border-b border-border">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div className="border-l-4 border-primary pl-6">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-3">
              Community Events
            </h1>
            <p className="text-muted-foreground text-lg">
              Join us, learn something new, and connect with neighbors.
            </p>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <button className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-md font-bold hover:bg-primary/90 transition-colors">
                <Plus className="w-5 h-5" />
                Host an Event
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] rounded-lg">
              <DialogHeader>
                <DialogTitle className="font-bold text-2xl">Create New Event</DialogTitle>
                <DialogDescription>
                  Propose an event for the community. It will be added to the public calendar.
                </DialogDescription>
              </DialogHeader>
              
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
                <div className="space-y-1">
                  <label className="text-sm font-bold">Event Title</label>
                  <input 
                    {...form.register("title")}
                    className="w-full px-4 py-2.5 rounded-md border border-input bg-background focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                    placeholder="e.g. Weekend Code Camp"
                  />
                  {form.formState.errors.title && (
                    <p className="text-xs text-destructive">{form.formState.errors.title.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm font-bold">Date & Time</label>
                    <input 
                      type="datetime-local"
                      {...form.register("date")}
                      className="w-full px-4 py-2.5 rounded-md border border-input bg-background focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-bold">Category</label>
                    <select 
                      {...form.register("category")}
                      className="w-full px-4 py-2.5 rounded-md border border-input bg-background focus:ring-2 focus:ring-primary focus:border-primary transition-all"
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
                  <label className="text-sm font-bold">Location</label>
                  <input 
                    {...form.register("location")}
                    className="w-full px-4 py-2.5 rounded-md border border-input bg-background focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                    placeholder="Where will it happen?"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-bold">Description</label>
                  <textarea 
                    {...form.register("description")}
                    rows={3}
                    className="w-full px-4 py-2.5 rounded-md border border-input bg-background focus:ring-2 focus:ring-primary focus:border-primary transition-all resize-none"
                    placeholder="Tell us more about the event..."
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={createMutation.isPending}
                  className="w-full mt-4 bg-primary text-primary-foreground py-3 rounded-md font-bold disabled:opacity-50 transition-colors flex justify-center items-center gap-2 hover:bg-primary/90"
                >
                  {createMutation.isPending && <Loader2 className="w-5 h-5 animate-spin" />}
                  {createMutation.isPending ? "Publishing..." : "Publish Event"}
                </button>
              </form>
            </DialogContent>
          </Dialog>
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

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="bg-white rounded-lg p-6 border border-border animate-pulse h-64">
                  <div className="w-20 h-6 bg-muted rounded-md mb-4"></div>
                  <div className="w-3/4 h-8 bg-muted rounded mb-2"></div>
                  <div className="w-1/2 h-4 bg-muted rounded mb-6"></div>
                  <div className="w-full h-16 bg-muted rounded"></div>
                </div>
              ))}
            </div>
          ) : filteredEvents.length === 0 ? (
            <div className="text-center py-24 bg-white rounded-lg border border-border">
              <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">No events found</h3>
              <p className="text-muted-foreground">Check back later or host your own event!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredEvents.map((event) => (
                <div 
                  key={event.id}
                  className={cn(
                    "bg-white rounded-lg p-6 border shadow-sm flex flex-col",
                    !event.isUpcoming ? "opacity-75 bg-gray-50" : "border-border"
                  )}
                >
                  <div className="flex justify-between items-start mb-4">
                    <span className={cn(
                      "text-xs font-bold uppercase tracking-wider px-2 py-1 rounded",
                      categoryColors[event.category] || categoryColors.other
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
                          try { return format(new Date(event.date), "MMMM d, yyyy • h:mm a") } 
                          catch { return event.date }
                        })()}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-foreground font-semibold">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span className="line-clamp-1">{event.location}</span>
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
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
