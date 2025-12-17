import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LogOut, UserCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


type PageHeaderProps = {
  title: string;
  subtitle: string;
};

export function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <header className="bg-transparent p-4 sm:p-6 mb-8">
      <div className="mx-auto flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-headline bg-gradient-to-br from-cyan-500 to-blue-600 bg-clip-text text-transparent">{title}</h1>
          <p className="text-md text-muted-foreground">{subtitle}</p>
        </div>
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-12 w-12 rounded-full shadow-neumorphic p-0">
                <Avatar className="h-11 w-11">
                  <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Dr. Smith" />
                  <AvatarFallback>DS</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">Dr. Smith</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    dr.smith@example.com
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/doctor/profile">
                  <UserCircle className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                 <Link href="/">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
