import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import { Footer } from "./Footer";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col w-full relative">
      <Navbar />
      
      <div className="flex flex-col lg:flex-row flex-1 w-full max-w-[1600px] mx-auto">
        <main className="flex-1 w-full relative z-0">
          {children}
        </main>
        
        <Sidebar />
      </div>
      
      <Footer />
    </div>
  );
}
