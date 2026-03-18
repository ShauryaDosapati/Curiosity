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
      <div className="bg-white px-4 sm:px-6 lg:px-12 py-16 border-b border-border">
        <div className="max-w-6xl mx-auto border-l-4 border-primary pl-6">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Let's Connect</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Have questions about our programs, want to volunteer, or looking to partner? We'd love to hear from you.
          </p>
        </div>
      </div>

      <div className="bg-muted px-4 sm:px-6 lg:px-12 py-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8">
          
          <div className="lg:col-span-2 space-y-8 bg-white p-8 rounded-lg border border-border shadow-sm">
            <h3 className="text-2xl font-bold text-foreground border-b-2 border-primary pb-2 inline-block">Get in Touch</h3>
            
            <div className="space-y-6 pt-4">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-2 rounded-md text-primary mt-1">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-1">Visit Us</h4>
                  <p className="text-muted-foreground text-sm">123 Learning Lane<br/>Innovation District<br/>Cityville, ST 12345</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-2 rounded-md text-primary mt-1">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-1">Email Us</h4>
                  <p className="text-muted-foreground text-sm">hello@curiosityproject.org<br/>partners@curiosityproject.org</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-2 rounded-md text-primary mt-1">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-1">Call Us</h4>
                  <p className="text-muted-foreground text-sm">(555) 123-4567<br/>Mon-Fri, 9am - 5pm</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-muted border border-border rounded-md mt-8">
              <h4 className="font-bold text-sm mb-1 text-foreground uppercase tracking-wide">Emergency Support</h4>
              <p className="text-sm text-muted-foreground">
                For immediate assistance outside of normal hours, call our 24/7 hotline at <span className="font-bold text-foreground">(555) 999-0000</span>.
              </p>
            </div>
          </div>

          <div className="lg:col-span-3">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 bg-white p-8 rounded-lg border border-border shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-foreground">Your Name</label>
                  <input 
                    {...form.register("name")}
                    className="w-full px-4 py-3 rounded-md border border-input bg-background focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none"
                    placeholder="Jane Doe"
                  />
                  {form.formState.errors.name && <p className="text-xs text-destructive">{form.formState.errors.name.message}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-foreground">Email Address</label>
                  <input 
                    {...form.register("email")}
                    type="email"
                    className="w-full px-4 py-3 rounded-md border border-input bg-background focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none"
                    placeholder="jane@example.com"
                  />
                  {form.formState.errors.email && <p className="text-xs text-destructive">{form.formState.errors.email.message}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-foreground">Subject</label>
                <input 
                  {...form.register("subject")}
                  className="w-full px-4 py-3 rounded-md border border-input bg-background focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none"
                  placeholder="How can we help?"
                />
                {form.formState.errors.subject && <p className="text-xs text-destructive">{form.formState.errors.subject.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-foreground">Message</label>
                <textarea 
                  {...form.register("message")}
                  rows={6}
                  className="w-full px-4 py-3 rounded-md border border-input bg-background focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none resize-none"
                  placeholder="Tell us what's on your mind..."
                />
                {form.formState.errors.message && <p className="text-xs text-destructive">{form.formState.errors.message.message}</p>}
              </div>

              <button 
                type="submit" 
                disabled={submitMutation.isPending}
                className="w-full bg-primary text-primary-foreground py-3 rounded-md font-bold text-lg hover:bg-primary/90 transition-colors disabled:opacity-50 flex justify-center items-center gap-2"
              >
                {submitMutation.isPending ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="w-4 h-4 ml-2" />
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
