import { PageHeader } from "@/components/shared/page-header";
import { ProtocolBuilder } from "./components/protocol-builder";

export default function DoctorDashboardPage() {
  return (
    <>
      <PageHeader 
        title="Doctor Dashboard"
        subtitle="Create and manage patient care protocols."
      />
      <div className="flex-1 flex flex-col">
        <ProtocolBuilder />
      </div>
    </>
  );
}
