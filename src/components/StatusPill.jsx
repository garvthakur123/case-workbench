const label = {
  NEW: "New",
  IN_REVIEW: "In review",
  NEEDS_INFO: "Needs info",
  DONE: "Done",
};

export default function StatusPill({ status }) {
  const bg =
    status === "DONE"
      ? "#e8f5e9"
      : status === "NEEDS_INFO"
      ? "#fff3e0"
      : status === "IN_REVIEW"
      ? "#e3f2fd"
      : "#f5f5f5";

  const border =
    status === "DONE"
      ? "#a5d6a7"
      : status === "NEEDS_INFO"
      ? "#ffcc80"
      : status === "IN_REVIEW"
      ? "#90caf9"
      : "#e0e0e0";

  return (
    <span
      style={{
        display: "inline-block",
        padding: "4px 8px",
        borderRadius: 999,
        background: bg,
        border: `1px solid ${border}`,
        fontSize: 12,
        whiteSpace: "nowrap",
      }}
    >
      {label[status] ?? status}
    </span>
  );
}
