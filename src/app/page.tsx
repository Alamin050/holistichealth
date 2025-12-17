import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Stethoscope, Heart } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h1 className="text-3xl font-bold text-primary font-headline bg-gradient-to-br from-cyan-500 to-blue-600 bg-clip-text text-transparent">
          Holistic Health
        </h1>
      </header>

      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground/90 font-headline">
              A New Era of Personalized Care
            </h2>
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
      </main>

      <footer className="py-8 text-center text-muted-foreground text-sm">
        <p>&copy; {new Date().getFullYear()} Holistic Health. All rights reserved.</p>
      </footer>
    </div>
  );
}
