import { useGetStats } from "@workspace/api-client-react";
import { Users, HeartHandshake, BookOpen, MapPin, Clock, CalendarDays } from "lucide-react";
import { AnimatedCounter } from "./AnimatedCounter";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const { data: stats, isLoading, isError } = useGetStats();

  const statItems = [
    { 
      label: "Students Served", 
      value: stats?.studentsServed, 
      icon: Users,
      color: "text-primary",
      bg: "bg-primary/10"
    },
    { 
      label: "Active Volunteers", 
      value: stats?.volunteersActive, 
      icon: HeartHandshake,
      color: "text-secondary",
      bg: "bg-secondary/10"
    },
    { 
      label: "Programs Running", 
      value: stats?.programsRunning, 
      icon: BookOpen,
      color: "text-accent",
      bg: "bg-accent/20"
    },
    { 
      label: "Communities Reached", 
      value: stats?.communitiesReached, 
      icon: MapPin,
      color: "text-primary",
      bg: "bg-primary/10"
    },
    { 
      label: "Hours of Instruction", 
      value: stats?.hoursOfInstruction, 
      icon: Clock,
      color: "text-secondary",
      bg: "bg-secondary/10"
    },
    { 
      label: "Years of Impact", 
      value: stats?.yearsOfImpact, 
      icon: CalendarDays,
      color: "text-accent",
      bg: "bg-accent/20"
    },
  ];

  return (
    <aside className="w-full lg:w-80 lg:min-h-[calc(100vh-4rem)] lg:sticky lg:top-16 bg-sidebar border-l border-sidebar-border p-6 shadow-[-10px_0_30px_-15px_rgba(0,0,0,0.05)] z-10">
      <div className="flex flex-col h-full">
        <div className="mb-8">
          <h2 className="text-2xl font-display font-bold text-foreground relative inline-block">
            Our Impact
            <span className="absolute -bottom-2 left-0 w-12 h-1 bg-primary rounded-full"></span>
          </h2>
          <p className="text-muted-foreground mt-4 text-sm">
            Live numbers showcasing the difference we're making together every single day.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-1 gap-4 lg:gap-6 flex-1">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-card border border-border/50">
                <Skeleton className="w-12 h-12 rounded-xl" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
            ))
          ) : isError ? (
            <div className="col-span-2 lg:col-span-1 p-6 text-center bg-destructive/10 text-destructive rounded-2xl border border-destructive/20">
              <p className="text-sm font-medium">Unable to load impact stats at this time.</p>
            </div>
          ) : (
            statItems.map((item, index) => (
              <div 
                key={index} 
                className="group flex flex-col lg:flex-row items-start lg:items-center gap-4 p-4 rounded-2xl bg-card border border-border/50 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300 hover:-translate-y-0.5"
              >
                <div className={cn("p-3 rounded-xl transition-colors duration-300 group-hover:scale-110", item.bg, item.color)}>
                  <item.icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-2xl lg:text-3xl font-display font-bold text-foreground">
                    <AnimatedCounter value={item.value || 0} />
                    {item.label === "Years of Impact" && "+"}
                  </div>
                  <div className="text-xs lg:text-sm font-medium text-muted-foreground">
                    {item.label}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="mt-8 pt-6 border-t border-border hidden lg:block">
          <div className="p-5 rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <HeartHandshake className="w-24 h-24 rotate-12" />
            </div>
            <h3 className="font-display font-bold text-lg mb-2 relative z-10">Join the movement</h3>
            <p className="text-primary-foreground/80 text-sm mb-4 relative z-10">
              Your time or resources can help us reach our next milestone.
            </p>
            <button className="w-full bg-white text-primary font-semibold py-2.5 px-4 rounded-xl shadow-sm hover:shadow-md active:scale-95 transition-all z-10 relative">
              Get Involved
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
