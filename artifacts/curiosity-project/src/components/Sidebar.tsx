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
      borderColor: "border-primary"
    },
    { 
      label: "Active Volunteers", 
      value: stats?.volunteersActive, 
      icon: HeartHandshake,
      color: "text-secondary",
      borderColor: "border-secondary"
    },
    { 
      label: "Programs Running", 
      value: stats?.programsRunning, 
      icon: BookOpen,
      color: "text-accent",
      borderColor: "border-accent"
    },
    { 
      label: "Communities Reached", 
      value: stats?.communitiesReached, 
      icon: MapPin,
      color: "text-primary",
      borderColor: "border-primary"
    },
    { 
      label: "Hours of Instruction", 
      value: stats?.hoursOfInstruction, 
      icon: Clock,
      color: "text-secondary",
      borderColor: "border-secondary"
    },
    { 
      label: "Years of Impact", 
      value: stats?.yearsOfImpact, 
      icon: CalendarDays,
      color: "text-accent",
      borderColor: "border-accent"
    },
  ];

  return (
    <aside className="w-full lg:w-80 lg:min-h-[calc(100vh-4rem)] lg:sticky lg:top-16 bg-sidebar border-l border-border p-6 z-10">
      <div className="flex flex-col h-full">
        <div className="mb-8 pl-4 border-l-4 border-primary">
          <h2 className="text-2xl font-bold text-foreground">
            Our Impact
          </h2>
          <p className="text-muted-foreground mt-2 text-sm">
            Live numbers showcasing the difference we're making together.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-1 gap-4 lg:gap-6 flex-1">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-lg bg-white border border-border shadow-sm">
                <Skeleton className="w-10 h-10 rounded-md" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
            ))
          ) : isError ? (
            <div className="col-span-2 lg:col-span-1 p-4 bg-destructive/10 text-destructive rounded-lg border border-destructive/20 text-sm">
              Unable to load impact stats.
            </div>
          ) : (
            statItems.map((item, index) => (
              <div 
                key={index} 
                className={cn(
                  "flex flex-col lg:flex-row items-start lg:items-center gap-4 p-4 rounded-lg bg-white border border-border shadow-sm border-l-4",
                  item.borderColor
                )}
              >
                <div className={cn("p-2 rounded-md bg-muted", item.color)}>
                  <item.icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-2xl lg:text-3xl font-bold text-foreground">
                    <AnimatedCounter value={item.value || 0} />
                    {item.label === "Years of Impact" && "+"}
                  </div>
                  <div className="text-xs lg:text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                    {item.label}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="mt-8 pt-6 border-t border-border hidden lg:block">
          <div className="p-6 rounded-lg bg-primary text-primary-foreground text-center">
            <HeartHandshake className="w-12 h-12 mx-auto mb-3 opacity-90" />
            <h3 className="font-bold text-lg mb-2">Join the movement</h3>
            <p className="text-primary-foreground/80 text-sm mb-6">
              Your time or resources can help us reach our next milestone.
            </p>
            <button className="w-full bg-white text-primary font-bold py-2.5 px-4 rounded-md shadow-sm hover:bg-muted transition-colors">
              Get Involved
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
