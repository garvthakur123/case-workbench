import { Link, useParams } from "react-router-dom";
import { useMemo, useState } from "react";
import { mockCases } from "../../data/cases";
import StatusPill from "../../components/StatusPill";

const STATUS_OPTIONS = ["NEW", "IN_REVIEW", "NEEDS_INFO", "DONE"];

function fakeSave(delayMs = 700) {
  return new Promise((resolve) => setTimeout(resolve, delayMs));
}

export default function CaseDetailsPage() {
  const { caseId } = useParams();

  const initialCase = useMemo(
    () => mockCases.find((x) => x.id === caseId),
    [caseId]
  );

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // “Saved” state for this page (local-only for now)
  const [saved, setSaved] = useState(() =>
    initialCase ? { ...initialCase } : null
  );

  // Draft edits
  const [draft, setDraft] = useState(() =>
    initialCase ? { ...initialCase } : null
  );

  if (!initialCase || !saved || !draft) {
    return (
      <div>
        <p>Case not found.</p>
        <Link to="/cases">Back to cases</Link>
      </div>
    );
  }

  function startEdit() {
    setDraft({ ...saved });
    setIsEditing(true);
  }

  function cancelEdit() {
    setDraft({ ...saved });
    setIsEditing(false);
  }

  async function saveEdit() {
    setIsSaving(true);
    try {
      await fakeSave(700);

      const next = {
        ...draft,
        updatedAt: new Date().toISOString(),
      };

      setSaved(next);
      setDraft(next);
      setIsEditing(false);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Link to="/cases" style={{ fontSize: 14 }}>← Back</Link>

        {!isEditing ? (
          <button
            onClick={startEdit}
            style={{
              padding: "8px 12px",
              borderRadius: 8,
              border: "1px solid #ddd",
              background: "white",
              cursor: "pointer",
            }}
          >
            Edit
          </button>
        ) : (
          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={cancelEdit}
              disabled={isSaving}
              style={{
                padding: "8px 12px",
                borderRadius: 8,
                border: "1px solid #ddd",
                background: "white",
                cursor: isSaving ? "not-allowed" : "pointer",
              }}
            >
              Cancel
            </button>
            <button
              onClick={saveEdit}
              disabled={isSaving}
              style={{
                padding: "8px 12px",
                borderRadius: 8,
                border: "1px solid #111",
                background: "#111",
                color: "white",
                cursor: isSaving ? "not-allowed" : "pointer",
                opacity: isSaving ? 0.7 : 1,
              }}
            >
              {isSaving ? "Saving…" : "Save"}
            </button>
          </div>
        )}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <h2 style={{ margin: 0 }}>{saved.id}</h2>
        <StatusPill status={saved.status} />
      </div>

      <div style={{ color: "#333" }}>
        <strong>Title:</strong> {saved.title}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {/* Status (editable) */}
        <div style={{ border: "1px solid #e5e5e5", borderRadius: 8, padding: 12 }}>
          <div style={{ fontSize: 12, color: "#666" }}>Status</div>

          {!isEditing ? (
            <div style={{ marginTop: 6 }}>
              <StatusPill status={saved.status} />
            </div>
          ) : (
            <select
              value={draft.status}
              onChange={(e) => setDraft({ ...draft, status: e.target.value })}
              disabled={isSaving}
              style={{
                marginTop: 6,
                width: "100%",
                padding: "10px 12px",
                border: "1px solid #ddd",
                borderRadius: 8,
              }}
            >
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Assignee (editable) */}
        <div style={{ border: "1px solid #e5e5e5", borderRadius: 8, padding: 12 }}>
          <div style={{ fontSize: 12, color: "#666" }}>Assignee</div>

          {!isEditing ? (
            <div style={{ fontSize: 16, marginTop: 6 }}>{saved.assignee}</div>
          ) : (
            <input
              value={draft.assignee}
              onChange={(e) => setDraft({ ...draft, assignee: e.target.value })}
              disabled={isSaving}
              placeholder="Assignee name"
              style={{
                marginTop: 6,
                width: "100%",
                padding: "10px 12px",
                border: "1px solid #ddd",
                borderRadius: 8,
              }}
            />
          )}
        </div>
      </div>

      <div style={{ border: "1px solid #e5e5e5", borderRadius: 8, padding: 12 }}>
        <div style={{ fontSize: 12, color: "#666" }}>Last updated</div>
        <div style={{ fontSize: 16 }}>{new Date(saved.updatedAt).toLocaleString()}</div>
      </div>

      <div style={{ border: "1px solid #e5e5e5", borderRadius: 8, padding: 12 }}>
        <div style={{ fontSize: 12, color: "#666" }}>Internal note</div>
        <div style={{ marginTop: 6 }}>{saved.note ? saved.note : "—"}</div>
      </div>
    </div>
  );
}
