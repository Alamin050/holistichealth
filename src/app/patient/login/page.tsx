"use client";

import { AuthFormWrapper } from '@/components/shared/auth-form-wrapper';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, QrCode } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { sendMagicLink, scanQrCode } from './actions';
import { useRouter } from 'next/navigation';

// We need a client component to use the useToast hook
function PatientLoginForm() {
  const { toast } = useToast();
  const router = useRouter();


  const handleScanQr = () => {
    // In a real app, this would open a camera view.
    // For now we will just navigate to the page
    router.push('/patient/qr-auth');
  }

  return (
    <AuthFormWrapper
      title="Patient Portal"
      footerText="Not a patient?"
      footerLink="/"
      footerLinkText="Go back"
    >
      <div className="space-y-6">
        <form action={sendMagicLink}>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" name="email" type="email" placeholder="patient@example.com" required />
          </div>
          <Button type="submit" className="w-full mt-4" size="lg">
            <Mail />
            Send Magic Link
          </Button>
        </form>
        <div className="flex items-center space-x-2">
          <Separator className="flex-1" />
          <span className="text-xs text-muted-foreground">OR</span>
          <Separator className="flex-1" />
        </div>
        <Button variant="outline" className="w-full" size="lg" onClick={handleScanQr}>
            <QrCode />
            Scan QR Code
          </Button>
      </div>
    </AuthFormWrapper>
  );
}

export default function PatientLoginPage() {
    return <PatientLoginForm />
}
