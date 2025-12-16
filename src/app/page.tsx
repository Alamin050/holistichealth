import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Stethoscope, UserHeart } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <h1 className="text-2xl font-bold text-primary font-headline">Holistic Health</h1>
      </header>

      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground font-headline">
              A New Era of Personalized Care
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Connecting doctors and patients with intelligent, proactive health monitoring.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="transform hover:scale-105 transition-transform duration-300 ease-in-out shadow-lg hover:shadow-2xl">
              <CardHeader className="items-center text-center">
                <div className="p-4 bg-primary/10 rounded-full mb-4">
                  <Stethoscope className="h-10 w-10 text-primary" />
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

            <Card className="transform hover:scale-105 transition-transform duration-300 ease-in-out shadow-lg hover:shadow-2xl">
              <CardHeader className="items-center text-center">
                <div className="p-4 bg-accent/10 rounded-full mb-4">
                  <UserHeart className="h-10 w-10 text-accent" />
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

      <footer className="py-6 text-center text-muted-foreground text-sm">
        <p>&copy; {new Date().getFullYear()} Holistic Health. All rights reserved.</p>
      </footer>
    </div>
  );
}
