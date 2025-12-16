import { redirect } from 'next/navigation';
import { AuthFormWrapper } from '@/components/shared/auth-form-wrapper';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LogIn } from 'lucide-react';

export default function DoctorLoginPage() {
  async function login(formData: FormData) {
    'use server';
    // In a real app, you'd validate credentials here.
    // For this scaffold, we'll just redirect.
    redirect('/doctor/dashboard');
  }

  return (
    <AuthFormWrapper
      title="Doctor Portal"
      footerText="Not a doctor?"
      footerLink="/"
      footerLinkText="Go back"
    >
      <form action={login} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" placeholder="doctor@example.com" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" required />
        </div>
        <Button type="submit" className="w-full" size="lg">
          <LogIn />
          Login
        </Button>
      </form>
    </AuthFormWrapper>
  );
}
