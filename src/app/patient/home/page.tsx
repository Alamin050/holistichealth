import { Suspense } from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { Triage } from './components/triage';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Pill, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PatientHomePageProps {
  searchParams: {
    patientName?: string;
    careProtocol?: string;
    medicine?: string;
  };
}

export default function PatientHomePage({ searchParams }: PatientHomePageProps) {
  const { patientName, careProtocol, medicine } = searchParams;
  const welcomeName = patientName || 'Patient';

  return (
    <div className="min-h-screen bg-background">
      <PageHeader 
        title="Patient Dashboard"
        subtitle={`Welcome, ${welcomeName}!`}
      />
      <main className="container mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {(careProtocol || medicine) && (
            <div className="lg:col-span-1 space-y-8">
              {careProtocol && (
                <Card>
                  <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                    <FileText className="h-8 w-8 text-primary" />
                    <CardTitle>Your Care Protocol</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{careProtocol}</p>
                  </CardContent>
                </Card>
              )}

              {medicine && (
                <Card className="bg-gradient-to-r from-primary/80 to-primary text-primary-foreground">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                        <Pill className="h-8 w-8" />
                        <CardTitle>Medicine Recommendation</CardTitle>
                    </div>
                    <CardDescription className="text-primary-foreground/80">
                      Your doctor has prescribed: <strong>{medicine}</strong>.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">Get a special offer and have it delivered to your doorstep by our partner pharmacy.</p>
                    <Button variant="secondary" className="w-full">
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Buy Now & Get 10% Off
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          <div className={careProtocol || medicine ? "md:col-span-1 lg:col-span-2" : "md:col-span-2 lg:col-span-3"}>
             <Suspense fallback={<div>Loading triage...</div>}>
                <Triage patientName={patientName || 'Anonymous'} hospitalId={searchParams.hospitalId || 'N/A'}/>
             </Suspense>
          </div>
        </div>
      </main>
    </div>
  );
}
