import { PageHeader } from "@/components/shared/page-header";
import { ProtocolBuilder } from "./components/protocol-builder";

export default function DoctorDashboardPage() {
  return (
    <>
      <PageHeader 
        title="Doctor Dashboard"
        subtitle="Create and manage patient care protocols."
      />
      <main className="flex-1 flex flex-col gap-4 p-4 lg:gap-6 lg:p-6">
        <ProtocolBuilder />
      </main>
    </>
  );
}
