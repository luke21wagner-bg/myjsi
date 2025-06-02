import "./index.css";

const apps = [
  { name: "orders",     icon: "/icons/orders.svg" },
  { name: "sales",      icon: "/icons/sales.svg" },
  { name: "lead times", icon: "/icons/lead-times.svg" },
  { name: "fabrics",    icon: "/icons/fabrics.svg" },
  { name: "ssa",        icon: "/icons/ssa.svg" },
  { name: "documents",  icon: "/icons/documents.svg" },
  { name: "samples",    icon: "/icons/samples.svg" },
  { name: "replacement",icon: "/icons/replacement.svg" },
];

export default function App() {
  return (
    <div className="page">
      {/* ----- Top bar ----- */}
      <header className="topbar">
        <div className="brand">
          <img src="/logo.svg" alt="MyJSI logo" />
        </div>
        <div className="profile" />
      </header>

      {/* ----- Grid of tiles ----- */}
      <main className="grid">
        {apps.map((a) => (
          <button key={a.name} className="tile">
            <img src={a.icon} alt="" className="tile-icon" />
            <span className="tile-label">{a.name}</span>
          </button>
        ))}
      </main>
    </div>
  );
}
