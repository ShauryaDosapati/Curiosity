import { Layout } from "@/components/Layout";
import { Mail, Phone, MapPin, Send, Loader2 } from "lucide-react";
import { useSubmitContact } from "@workspace/api-client-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(3, "Subject is required"),
  message: z.string().min(10, "Message is too short")
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function Contact() {
  const { toast } = useToast();
  const submitMutation = useSubmitContact();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema)
  });

  const onSubmit = async (data: ContactFormValues) => {
    try {
      const res = await submitMutation.mutateAsync({ data });
      if (res.success) {
        toast({ title: "Message sent!", description: res.message });
        form.reset();
      } else {
        toast({ title: "Error", description: res.message, variant: "destructive" });
      }
    } catch (error) {
      toast({ title: "Failed to send message", variant: "destructive" });
    }
  };

  return (
    <Layout>
      <div className="px-4 sm:px-6 lg:px-12 py-12 lg:py-20 max-w-6xl mx-auto">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-display font-bold mb-6">Let's Connect</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Have questions about our programs, want to volunteer, or looking to partner? We'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-8 bg-card rounded-[3rem] p-8 lg:p-12 border border-border/50 shadow-xl shadow-black/5">
          
          <div className="lg:col-span-2 space-y-8">
            <h3 className="text-2xl font-display font-bold text-primary">Get in Touch</h3>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-secondary/10 p-3 rounded-2xl text-secondary mt-1">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-1">Visit Us</h4>
                  <p className="text-muted-foreground">123 Learning Lane<br/>Innovation District<br/>Cityville, ST 12345</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-accent/20 p-3 rounded-2xl text-accent-foreground mt-1">
                  <Mail className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-1">Email Us</h4>
                  <p className="text-muted-foreground">hello@curiosityproject.org<br/>partners@curiosityproject.org</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-2xl text-primary mt-1">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-1">Call Us</h4>
                  <p className="text-muted-foreground">(555) 123-4567<br/>Mon-Fri, 9am - 5pm</p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-muted/50 rounded-3xl mt-8">
              <h4 className="font-bold mb-2">Emergency Support</h4>
              <p className="text-sm text-muted-foreground">
                If you are a student in immediate need of assistance or resources outside of normal hours, please call our 24/7 hotline at (555) 999-0000.
              </p>
            </div>
          </div>

          <div className="lg:col-span-3">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 bg-white p-8 rounded-3xl border border-border/50 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-foreground ml-1">Your Name</label>
                  <input 
                    {...form.register("name")}
                    className="w-full px-5 py-4 rounded-2xl border-2 border-muted bg-muted/30 focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all outline-none"
                    placeholder="Jane Doe"
                  />
                  {form.formState.errors.name && <p className="text-xs text-destructive ml-1">{form.formState.errors.name.message}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-foreground ml-1">Email Address</label>
                  <input 
                    {...form.register("email")}
                    type="email"
                    className="w-full px-5 py-4 rounded-2xl border-2 border-muted bg-muted/30 focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all outline-none"
                    placeholder="jane@example.com"
                  />
                  {form.formState.errors.email && <p className="text-xs text-destructive ml-1">{form.formState.errors.email.message}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-foreground ml-1">Subject</label>
                <input 
                  {...form.register("subject")}
                  className="w-full px-5 py-4 rounded-2xl border-2 border-muted bg-muted/30 focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all outline-none"
                  placeholder="How can we help?"
                />
                {form.formState.errors.subject && <p className="text-xs text-destructive ml-1">{form.formState.errors.subject.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-foreground ml-1">Message</label>
                <textarea 
                  {...form.register("message")}
                  rows={5}
                  className="w-full px-5 py-4 rounded-2xl border-2 border-muted bg-muted/30 focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all outline-none resize-none"
                  placeholder="Tell us what's on your mind..."
                />
                {form.formState.errors.message && <p className="text-xs text-destructive ml-1">{form.formState.errors.message.message}</p>}
              </div>

              <button 
                type="submit" 
                disabled={submitMutation.isPending}
                className="w-full bg-primary text-primary-foreground py-4 rounded-2xl font-bold text-lg shadow-lg shadow-primary/25 hover:shadow-xl hover:-translate-y-1 active:translate-y-0 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
              >
                {submitMutation.isPending ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="w-5 h-5 ml-2" />
                  </>
                )}
              </button>
            </form>
          </div>

        </div>
      </div>
    </Layout>
  );
}
