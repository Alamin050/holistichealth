'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Stethoscope, Heart, Monitor, ShieldCheck, Mail, Phone, MapPin, Twitter, Linkedin, Facebook, LayoutGrid, HandHeart, Info, MessageSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Home() {
    const { toast } = useToast();

    const scrollTo = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };
    
    const handleContactSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        toast({
            title: "Message Sent!",
            description: "Thanks for reaching out. We'll get back to you soon.",
        })
    }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-body">
      <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-sm shadow-neumorphic-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-2 font-semibold" onClick={() => scrollTo('home')}>
             <LayoutGrid className="h-8 w-8 text-cyan-500" />
            <span className="font-headline text-2xl font-bold bg-gradient-to-br from-cyan-500 to-blue-600 bg-clip-text text-transparent">
                Holistic Health
            </span>
          </Link>
          <nav className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollTo('home')} className="text-muted-foreground hover:text-primary transition-colors">Home</button>
            <button onClick={() => scrollTo('about')} className="text-muted-foreground hover:text-primary transition-colors">About Us</button>
            <button onClick={() => scrollTo('services')} className="text-muted-foreground hover:text-primary transition-colors">Services</button>
            <button onClick={() => scrollTo('contact')} className="text-muted-foreground hover:text-primary transition-colors">Contact</button>
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        <section id="home" className="flex items-center justify-center py-20 md:py-32 min-h-screen -mt-20 bg-gradient-to-br from-background via-blue-50/20 to-cyan-50/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground/90 font-headline">
                  A New Era of Personalized Care
                </h1>
                <p className="mt-6 text-lg text-muted-foreground max-w-3xl mx-auto">
                  Connecting doctors and patients with intelligent, proactive health monitoring, wrapped in a beautiful, tactile interface.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="transform hover:-translate-y-2 transition-transform duration-300 ease-in-out">
                  <CardHeader className="items-center text-center">
                    <div className="p-4 bg-background rounded-full mb-4 shadow-neumorphic">
                      <Stethoscope className="h-10 w-10 text-cyan-500" />
                    </div>
                    <CardTitle className="font-headline text-2xl">For Doctors</CardTitle>
                    <CardDescription>
                      Manage patients, build care protocols, and receive critical alerts.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <Button asChild size="lg" className="w-full">
                      <Link href="/doctor/login">Doctor Portal</Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="transform hover:-translate-y-2 transition-transform duration-300 ease-in-out">
                  <CardHeader className="items-center text-center">
                    <div className="p-4 bg-background rounded-full mb-4 shadow-neumorphic">
                      <Heart className="h-10 w-10 text-blue-500" />
                    </div>
                    <CardTitle className="font-headline text-2xl">For Patients</CardTitle>
                    <CardDescription>
                      Track your health, follow your care plan, and stay connected.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <Button asChild size="lg" variant="secondary" className="w-full">
                      <Link href="/patient/login">Patient Portal</Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="py-20 md:py-28 bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold font-headline"><span className="bg-gradient-to-br from-cyan-500 to-blue-600 bg-clip-text text-transparent">About</span> Holistic Health</h2>
                    <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                        We are dedicated to bridging the gap between patients and healthcare providers through innovative technology and a human-centric approach.
                    </p>
                </div>
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl transform -rotate-3"></div>
                            <img src="https://picsum.photos/seed/about/800/600" alt="About Us" className="relative rounded-xl shadow-neumorphic w-full" data-ai-hint="team computers" />
                        </div>
                    </div>
                    <div className="space-y-4">
                        <h3 className="font-headline text-2xl font-semibold">Our Mission</h3>
                        <p className="text-muted-foreground">To empower patients to take control of their health and provide doctors with the tools they need for proactive and personalized care. We believe in a future where healthcare is accessible, intelligent, and deeply connected.</p>
                        <h3 className="font-headline text-2xl font-semibold mt-6">Our Vision</h3>
                        <p className="text-muted-foreground">To create a holistic health ecosystem that leverages AI and real-time data to prevent illness, manage chronic conditions, and foster a stronger doctor-patient relationship, ultimately leading to better health outcomes for everyone.</p>
                    </div>
                </div>
            </div>
        </section>

        <section id="services" className="py-20 md:py-28 bg-background/70">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                     <h2 className="text-3xl md:text-5xl font-bold font-headline">Our <span className="bg-gradient-to-br from-cyan-500 to-blue-600 bg-clip-text text-transparent">Services</span></h2>
                    <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                        A suite of tools designed for modern, continuous healthcare.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <Card>
                        <CardHeader className="items-center text-center">
                             <div className="p-4 bg-background rounded-full mb-4 shadow-neumorphic"><Monitor className="h-10 w-10 text-cyan-500" /></div>
                            <CardTitle className="font-headline text-xl">Remote Monitoring</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-center text-muted-foreground">Keep track of patient vitals and progress from anywhere, enabling timely interventions.</p>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader className="items-center text-center">
                            <div className="p-4 bg-background rounded-full mb-4 shadow-neumorphic"><ShieldCheck className="h-10 w-10 text-blue-500" /></div>
                            <CardTitle className="font-headline text-xl">AI-Powered Triage</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-center text-muted-foreground">Automated risk assessment helps prioritize patients who need the most urgent attention.</p>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader className="items-center text-center">
                            <div className="p-4 bg-background rounded-full mb-4 shadow-neumorphic"><HandHeart className="h-10 w-10 text-cyan-400" /></div>
                            <CardTitle className="font-headline text-xl">Custom Care Protocols</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-center text-muted-foreground">Build and assign personalized care plans with medication schedules and instructions.</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>

        <section id="contact" className="py-20 md:py-28">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                     <h2 className="text-3xl md:text-5xl font-bold font-headline">Get In <span className="bg-gradient-to-br from-cyan-500 to-blue-600 bg-clip-text text-transparent">Touch</span></h2>
                    <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                        Have questions? We'd love to hear from you.
                    </p>
                </div>
                <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
                    <div className="space-y-8">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-background rounded-lg shadow-neumorphic-sm"><Mail className="h-6 w-6 text-primary"/></div>
                            <div>
                                <h3 className="font-semibold text-lg">Email</h3>
                                <p className="text-muted-foreground">support@holistic.health</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-background rounded-lg shadow-neumorphic-sm"><Phone className="h-6 w-6 text-primary"/></div>
                            <div>
                                <h3 className="font-semibold text-lg">Phone</h3>
                                <p className="text-muted-foreground">(555) 123-4567</p>
                            </div>
                        </div>
                         <div className="flex items-start gap-4">
                            <div className="p-3 bg-background rounded-lg shadow-neumorphic-sm"><MapPin className="h-6 w-6 text-primary"/></div>
                            <div>
                                <h3 className="font-semibold text-lg">Address</h3>
                                <p className="text-muted-foreground">123 Health-Tech Ave, Silicon Valley, CA</p>
                            </div>
                        </div>
                    </div>
                    <Card>
                        <CardHeader>
                            <CardTitle>Send us a message</CardTitle>
                        </CardHeader>
                        <CardContent>
                             <form onSubmit={handleContactSubmit} className="space-y-4">
                                <Input placeholder="Your Name" required/>
                                <Input type="email" placeholder="Your Email" required/>
                                <Textarea placeholder="Your Message" rows={5} required/>
                                <Button type="submit" className="w-full">
                                    <MessageSquare/> Send Message
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>

      </main>

      <footer className="bg-background/80 border-t py-8 shadow-neumorphic-inset">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-muted-foreground">
            <div className="flex justify-center space-x-6 mb-4">
                <Link href="#" className="hover:text-primary"><Twitter/></Link>
                <Link href="#" className="hover:text-primary"><Linkedin/></Link>
                <Link href="#" className="hover:text-primary"><Facebook/></Link>
            </div>
            <p>&copy; {new Date().getFullYear()} Holistic Health. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
