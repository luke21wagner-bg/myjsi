import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./index.css";

/* ---------- config ---------- */
const apps = [
{ name: "🚀 Launch", slug: "orders", icon: "/icons/orders.svg" },
{ name: "💰 Sales", slug: "sales", icon: "/icons/sales.svg" },
{ name: "📈 Analytics", slug: "lead-lines", icon: "/icons/lead-lines.svg" },
{ name: "🎨 Design", slug: "fabrics", icon: "/icons/fabrics.svg" },
{ name: "📰 News", slug: "news", icon: "/icons/news.svg" },
{ name: "✨ Magic", slug: "samples", icon: "/icons/samples.svg" },
{ name: "🔧 Tools", slug: "replacement", icon: "/icons/replacement.svg" },
];

/* ---------- generic detail screen ---------- */
function ModulePage({ title }) {
  return (
    <div className="page">
      <header className="topbar">
        <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>‹ Home</Link>
        <span style={{ flexGrow: 1 }} />
      </header>

      <div style={{ padding: "40px 20px", textAlign: "center" }}>
        <h1 style={{ fontSize: "1.8rem", marginBottom: 8 }}>{title}</h1>
        <p style={{ color: "#666" }}>Module landing page coming soon…</p>
      </div>
    </div>
  );
}

/* ---------- home grid ---------- */
function Home() {
  return (
    <>
      <header className="topbar">
        <div className="brand">
          <img src="/logo.svg" alt="JSI Logo" />
        </div>
        <div className="profile" />
      </header>

      <main className="grid">
        {apps.map((a) => (
          <Link key={a.slug} to={`/${a.slug}`} className="tile">
            <img src={a.icon} alt="" className="tile-icon" />
            <span className="tile-label">{a.name}</span>
          </Link>
        ))}
      </main>
    </>
  );
}

/* ---------- root component ---------- */
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {apps.map((a) => (
          <Route
            key={a.slug}
            path={`/${a.slug}`}
            element={<ModulePage title={a.name} />}
          />
        ))}
      </Routes>
    </Router>
  );
}
