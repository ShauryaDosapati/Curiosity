import { Users, HeartHandshake, BookOpen, MapPin, Clock, CalendarDays } from "lucide-react";
import { AnimatedCounter } from "./AnimatedCounter";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const statItems = [
    { label: "Students Served",     value: 4820,  icon: Users,         color: "text-primary",   borderColor: "border-primary"   },
    { label: "Active Volunteers",   value: 138,   icon: HeartHandshake, color: "text-secondary", borderColor: "border-secondary" },
    { label: "Programs Running",    value: 12,    icon: BookOpen,       color: "text-accent",    borderColor: "border-accent"    },
    { label: "Communities Reached", value: 27,    icon: MapPin,         color: "text-primary",   borderColor: "border-primary"   },
    { label: "Hours of Instruction",value: 18650, icon: Clock,          color: "text-secondary", borderColor: "border-secondary" },
    { label: "Years of Impact",     value: 8,     icon: CalendarDays,   color: "text-accent",    borderColor: "border-accent"    },
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
          {statItems.map((item, index) => (
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
                  <AnimatedCounter value={item.value} />
                  {item.label === "Years of Impact" && "+"}
                </div>
                <div className="text-xs lg:text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                  {item.label}
                </div>
              </div>
            </div>
          ))}
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
