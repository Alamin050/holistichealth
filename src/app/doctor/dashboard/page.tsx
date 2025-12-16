import { PageHeader } from "@/components/shared/page-header";
import { ProtocolBuilder } from "./components/protocol-builder";

export default function DoctorDashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <PageHeader 
        title="Doctor Dashboard"
        subtitle="Create and manage patient care protocols."
      />
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        <ProtocolBuilder />
      </main>
    </div>
  );
}
