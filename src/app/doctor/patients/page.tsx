import { MoreHorizontal } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { PageHeader } from "@/components/shared/page-header"

const patients = [
    { name: "Liam Johnson", email: "liam@example.com", status: "GREEN", date: "2023-06-23" },
    { name: "Olivia Smith", email: "olivia@example.com", status: "YELLOW", date: "2023-06-24" },
    { name: "Noah Williams", email: "noah@example.com", status: "RED", date: "2023-06-25" },
    { name: "Emma Brown", email: "emma@example.com", status: "GREEN", date: "2023-06-26" },
    { name: "Ava Jones", email: "ava@example.com", status: "YELLOW", date: "2023-06-27" },
];

const statusStyles: { [key: string]: string } = {
    RED: 'bg-red-500/20 text-red-700 border-red-500/30',
    YELLOW: 'bg-yellow-500/20 text-yellow-700 border-yellow-500/30',
    GREEN: 'bg-green-500/20 text-green-700 border-green-500/30',
};

export default function PatientsPage() {
  return (
    <>
      <PageHeader 
        title="Patients"
        subtitle="A list of your current patients."
      />
      <div className="flex-1 flex flex-col">
        <Card>
          <CardHeader>
            <CardTitle>Current Patients</CardTitle>
            <CardDescription>
              Manage your patients and view their triage status.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-none">
                  <TableHead>Patient</TableHead>
                  <TableHead>Triage Status</TableHead>
                  <TableHead>Last Check-in</TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {patients.map((patient) => (
                    <TableRow key={patient.email} className="border-t border-border">
                        <TableCell>
                            <div className="font-medium">{patient.name}</div>
                            <div className="text-sm text-muted-foreground">{patient.email}</div>
                        </TableCell>
                        <TableCell>
                            <Badge variant="outline" className={statusStyles[patient.status]}>{patient.status}</Badge>
                        </TableCell>
                        <TableCell>
                            {patient.date}
                        </TableCell>
                        <TableCell>
                            <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button aria-haspopup="true" size="icon" variant="ghost">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Toggle menu</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                <DropdownMenuItem>Contact</DropdownMenuItem>
                            </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
