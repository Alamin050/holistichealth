import { redirect } from 'next/navigation';
import { AuthFormWrapper } from '@/components/shared/auth-form-wrapper';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, QrCode } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

// We need a client component to use the useToast hook
function PatientLoginForm() {
  const { toast } = useToast();

  async function sendMagicLink(formData: FormData) {
    'use server';
    const email = formData.get('email') as string;
    
    // In a real app, you'd send a magic link/OTP here.
    // For this scaffold, we'll show a toast and redirect.
    console.log(`Sending magic link to ${email}`);
    
    // The toast needs to be called from a client-side action
    // For simplicity, we'll just redirect
    redirect('/patient/home');
  }

  // This is a placeholder for QR scanning functionality
  async function scanQrCode() {
    'use server';
    // In a real app, this would open a camera view.
    // We'll simulate by redirecting to a placeholder auth page.
    // This could also be a client-side route change.
    // For now, it's just illustrative.
    console.log("QR Code scan initiated");
    // This server action is for demonstration. In a real app, you would
    // likely handle this on the client to activate the device camera.
    redirect('/patient/qr-auth');
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
        <form action={scanQrCode}>
          <Button variant="outline" className="w-full" size="lg">
            <QrCode />
            Scan QR Code
          </Button>
        </form>
      </div>
    </AuthFormWrapper>
  );
}

export default function PatientLoginPage() {
    return <PatientLoginForm />
}
