import { Link, useParams } from "react-router-dom";
import { mockCases } from "../../data/cases";
import StatusPill from "../../components/StatusPill";

export default function CaseDetailsPage() {
  const { caseId } = useParams();
  const c = mockCases.find((x) => x.id === caseId);

  if (!c) {
    return (
      <div>
        <p>Case not found.</p>
        <Link to="/cases">Back to cases</Link>
      </div>
    );
  }

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div>
        <Link to="/cases" style={{ fontSize: 14 }}>← Back</Link>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <h2 style={{ margin: 0 }}>{c.id}</h2>
        <StatusPill status={c.status} />
      </div>

      <div style={{ color: "#333" }}>
        <strong>Title:</strong> {c.title}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <div style={{ border: "1px solid #e5e5e5", borderRadius: 8, padding: 12 }}>
          <div style={{ fontSize: 12, color: "#666" }}>Priority</div>
          <div style={{ fontSize: 16 }}>{c.priority}</div>
        </div>

        <div style={{ border: "1px solid #e5e5e5", borderRadius: 8, padding: 12 }}>
          <div style={{ fontSize: 12, color: "#666" }}>Assignee</div>
          <div style={{ fontSize: 16 }}>{c.assignee}</div>
        </div>
      </div>

      <div style={{ border: "1px solid #e5e5e5", borderRadius: 8, padding: 12 }}>
        <div style={{ fontSize: 12, color: "#666" }}>Last updated</div>
        <div style={{ fontSize: 16 }}>{new Date(c.updatedAt).toLocaleString()}</div>
      </div>

      <div style={{ border: "1px solid #e5e5e5", borderRadius: 8, padding: 12 }}>
        <div style={{ fontSize: 12, color: "#666" }}>Internal note</div>
        <div style={{ marginTop: 6 }}>{c.note ? c.note : "—"}</div>
      </div>
    </div>
  );
}
