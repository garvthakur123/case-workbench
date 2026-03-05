import { Link } from "react-router-dom";
import { mockCases } from "../../data/cases";
import StatusPill from "../../components/StatusPill";

export default function CaseListPage() {
  return (
    <div>
      <h2 style={{ margin: "0 0 12px" }}>Cases</h2>

      <div style={{ border: "1px solid #e5e5e5", borderRadius: 8, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#fafafa", textAlign: "left" }}>
              <th style={{ padding: 12, borderBottom: "1px solid #eee" }}>ID</th>
              <th style={{ padding: 12, borderBottom: "1px solid #eee" }}>Title</th>
              <th style={{ padding: 12, borderBottom: "1px solid #eee" }}>Status</th>
              <th style={{ padding: 12, borderBottom: "1px solid #eee" }}>Priority</th>
              <th style={{ padding: 12, borderBottom: "1px solid #eee" }}>Assignee</th>
              <th style={{ padding: 12, borderBottom: "1px solid #eee" }}>Updated</th>
            </tr>
          </thead>

          <tbody>
            {mockCases.map((c) => (
              <tr key={c.id} style={{ borderBottom: "1px solid #f0f0f0" }}>
                <td style={{ padding: 12 }}>
                  <Link to={`/cases/${c.id}`}>{c.id}</Link>
                </td>
                <td style={{ padding: 12 }}>{c.title}</td>
                <td style={{ padding: 12 }}>
                  <StatusPill status={c.status} />
                </td>
                <td style={{ padding: 12 }}>{c.priority}</td>
                <td style={{ padding: 12 }}>{c.assignee}</td>
                <td style={{ padding: 12, color: "#666" }}>
                  {new Date(c.updatedAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
