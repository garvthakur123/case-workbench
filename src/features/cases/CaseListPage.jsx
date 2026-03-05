import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import { mockCases } from "../../data/cases";
import StatusPill from "../../components/StatusPill";
import useDebouncedValue from "../../hooks/useDebouncedValue";

const STATUS_OPTIONS = ["ALL", "NEW", "IN_REVIEW", "NEEDS_INFO", "DONE"];

export default function CaseListPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");

  const debouncedSearch = useDebouncedValue(search, 250);

  const filteredCases = useMemo(() => {
    const s = debouncedSearch.trim().toLowerCase();

    return mockCases
      .filter((c) => {
        const matchesStatus = status === "ALL" ? true : c.status === status;

        const matchesSearch =
          s.length === 0
            ? true
            : c.id.toLowerCase().includes(s) ||
              c.title.toLowerCase().includes(s) ||
              c.assignee.toLowerCase().includes(s);

        return matchesStatus && matchesSearch;
      })
      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)); // newest first
  }, [debouncedSearch, status]);

  return (
    <div>
      <h2 style={{ margin: "0 0 12px" }}>Cases</h2>

      {/* Controls */}
      <div
        style={{
          display: "flex",
          gap: 12,
          alignItems: "center",
          marginBottom: 12,
          flexWrap: "wrap",
        }}
      >
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by ID, title, assignee…"
          style={{
            padding: "10px 12px",
            border: "1px solid #ddd",
            borderRadius: 8,
            minWidth: 260,
          }}
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          style={{
            padding: "10px 12px",
            border: "1px solid #ddd",
            borderRadius: 8,
          }}
        >
          {STATUS_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt === "ALL" ? "All statuses" : opt}
            </option>
          ))}
        </select>

        <div style={{ color: "#666", fontSize: 14 }}>
          Showing <strong>{filteredCases.length}</strong> of{" "}
          <strong>{mockCases.length}</strong>
        </div>
      </div>

      {/* Table */}
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
            {filteredCases.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ padding: 16, color: "#666" }}>
                  No cases match your search/filter.
                </td>
              </tr>
            ) : (
              filteredCases.map((c) => (
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
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
