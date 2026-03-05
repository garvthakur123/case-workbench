import { Link, useParams } from "react-router-dom";

export default function CaseDetailsPage() {
  const { caseId } = useParams();

  return (
    <div>
      <Link to="/cases" style={{ fontSize: 14 }}>← Back</Link>
      <h2 style={{ marginTop: 12 }}>{caseId}</h2>
      <p>Details page placeholder ✅</p>
    </div>
  );
}