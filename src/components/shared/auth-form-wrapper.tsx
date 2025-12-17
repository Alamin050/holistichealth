import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

type AuthFormWrapperProps = {
  children: React.ReactNode;
  title: string;
  footerText: string;
  footerLink: string;
  footerLinkText: string;
};

export function AuthFormWrapper({
  children,
  title,
  footerText,
  footerLink,
  footerLinkText,
}: AuthFormWrapperProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold font-headline bg-gradient-to-br from-cyan-500 to-blue-600 bg-clip-text text-transparent">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          {children}
        </CardContent>
        <CardFooter className="flex justify-center text-sm">
          <p className="text-muted-foreground">
            {footerText}{" "}
            <Link href={footerLink} className="font-semibold text-primary hover:underline">
              {footerLinkText}
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
