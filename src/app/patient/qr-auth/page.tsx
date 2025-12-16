import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

interface QrAuthPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

function AuthProcessor({ searchParams }: QrAuthPageProps) {
  const patientData = {
    patientName: searchParams.patientName,
    hospitalId: searchParams.hospitalId,
    careProtocol: searchParams.careProtocol,
    medicine: searchParams.medicine,
  };

  const queryParams = new URLSearchParams();

  if (typeof patientData.patientName === 'string') queryParams.set('patientName', patientData.patientName);
  if (typeof patientData.hospitalId === 'string') queryParams.set('hospitalId', patientData.hospitalId);
  if (typeof patientData.careProtocol === 'string') queryParams.set('careProtocol', patientData.careProtocol);
  if (typeof patientData.medicine === 'string') queryParams.set('medicine', patientData.medicine);

  // In a real app, you would exchange a token for a session here
  // and store the protocol data in the session or a secure store.
  // For this scaffold, we redirect and pass the data via URL.
  redirect(`/patient/home?${queryParams.toString()}`);

  // This part is unreachable due to redirect, but necessary for React's rules.
  return null;
}


export default function QrAuthPage({ searchParams }: QrAuthPageProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <CardTitle className="text-2xl font-headline">Authenticating...</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="text-muted-foreground">Please wait while we set up your session.</p>
        </CardContent>
      </Card>
      <Suspense fallback={null}>
        <AuthProcessor searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
