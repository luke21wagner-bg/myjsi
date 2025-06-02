import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./index.css";

const apps = [
  { 
    name: "orders", 
    slug: "orders", 
    iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24"><path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z"/><path d="M5 3L3 5V19L5 21H19L21 19V5L19 3H5Z" stroke="white" stroke-width="0.5" fill="none"/></svg>` 
  },
  { 
    name: "sales", 
    slug: "sales", 
    iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24"><rect x="3" y="6" width="18" height="12" rx="2" fill="white"/><rect x="5" y="8" width="6" height="3" fill="#c4b5a0"/><circle cx="15" cy="12" r="2" fill="#c4b5a0"/></svg>` 
  },
  { 
    name: "lead times", 
    slug: "lead-times", 
    iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" stroke="white" stroke-width="2" fill="none"/><path d="M12 7V12L16 16" stroke="white" stroke-width="2" stroke-linecap="round"/><path d="M8 4L16 4" stroke="white" stroke-width="1.5"/><path d="M4 8L4 16" stroke="white" stroke-width="1.5"/></svg>` 
  },
  { 
    name: "fabrics", 
    slug: "fabrics", 
    iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="1" stroke="white" stroke-width="2" fill="none"/><path d="M8 8L16 16M16 8L8 16" stroke="white" stroke-width="1.5"/><circle cx="8" cy="8" r="1" fill="white"/><circle cx="16" cy="8" r="1" fill="white"/><circle cx="8" cy="16" r="1" fill="white"/><circle cx="16" cy="16" r="1" fill="white"/></svg>` 
  },
  { 
    name: "ssa", 
    slug: "ssa", 
    iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24"><rect x="4" y="6" width="16" height="12" rx="2" stroke="white" stroke-width="2" fill="none"/><path d="M8 9H16M8 12H16M8 15H12" stroke="white" stroke-width="1.5"/><circle cx="18" cy="18" r="3" stroke="white" stroke-width="1.5" fill="none"/><path d="M16.5 18L17.5 19L19.5 17" stroke="white" stroke-width="1" fill="none"/></svg>` 
  },
  { 
    name: "documents", 
    slug: "documents", 
    iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24"><rect x="6" y="4" width="12" height="16" rx="1" stroke="white" stroke-width="2" fill="none"/><rect x="4" y="6" width="12" height="16" rx="1" stroke="white" stroke-width="2" fill="none"/><rect x="2" y="8" width="12" height="16" rx="1" stroke="white" stroke-width="2" fill="none"/></svg>` 
  },
  { 
    name: "news", 
    slug: "news", 
    iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24"><rect x="4" y="6" width="16" height="14" rx="2" stroke="white" stroke-width="2" fill="none"/><path d="M8 10H16M8 13H16M8 16H12" stroke="white" stroke-width="1.5"/><rect x="14" y="10" width="2" height="3" fill="white"/></svg>` 
  },
  { 
    name: "samples", 
    slug: "samples", 
    iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24"><rect x="5" y="5" width="14" height="14" rx="2" stroke="white" stroke-width="2" fill="none"/><rect x="8" y="8" width="3" height="3" fill="white"/><rect x="13" y="8" width="3" height="3" fill="white"/><rect x="8" y="13" width="3" height="3" fill="white"/><rect x="13" y="13" width="3" height="3" fill="white"/></svg>` 
  }
];

function OrdersPage() {
  return (
    <div className="page">
      <header className="topbar">
        <Link to="/">
        <div dangerouslySetInnerHTML={{__html: `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="40" viewBox="0 0 120 40" fill="white"><text x="10" y="25" font-family="Arial" font-size="18" font-style="italic">My</text><rect x="35" y="8" width="20" height="20" fill="none" stroke="white" stroke-width="2"/><text x="60" y="25" font-family="Arial" font-size="18">JSI</text></svg>`}} />
        <div className="profile"></div>
        </Link>
      </header>
      <div className="content-page">
        <h1>Orders Dashboard</h1>
        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h3>Recent Orders</h3>
            <p>Order #12345 - In Progress</p>
            <p>Order #12346 - Completed</p>
            <p>Order #12347 - Pending</p>
          </div>
          <div className="dashboard-card">
            <h3>Quick Actions</h3>
            <button className="action-btn">New Order</button>
            <button className="action-btn">View All Orders</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SalesPage() {
  return (
    <div className="page">
      <header className="topbar">
        <div dangerouslySetInnerHTML={{__html: `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="40" viewBox="0 0 120 40" fill="white"><text x="10" y="25" font-family="Arial" font-size="18" font-style="italic">My</text><rect x="35" y="8" width="20" height="20" fill="none" stroke="white" stroke-width="2"/><text x="60" y="25" font-family="Arial" font-size="18">JSI</text></svg>`}} />
        <div className="profile"></div>
      </header>
      <div className="content-page">
        <h1>Sales Analytics</h1>
        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h3>This Month</h3>
            <p className="big-number">$45,230</p>
            <p>+12% from last month</p>
          </div>
          <div className="dashboard-card">
            <h3>Top Products</h3>
            <p>Fabric A - $12,500</p>
            <p>Fabric B - $8,900</p>
            <p>Fabric C - $6,750</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function LeadTimesPage() {
  return (
    <div className="page">
      <header className="topbar">
        <div dangerouslySetInnerHTML={{__html: `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="40" viewBox="0 0 120 40" fill="white"><text x="10" y="25" font-family="Arial" font-size="18" font-style="italic">My</text><rect x="35" y="8" width="20" height="20" fill="none" stroke="white" stroke-width="2"/><text x="60" y="25" font-family="Arial" font-size="18">JSI</text></svg>`}} />
        <div className="profile"></div>
      </header>
      <div className="content-page">
        <h1>Lead Times</h1>
        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h3>Average Lead Time</h3>
            <p className="big-number">14 days</p>
            <p>Standard production time</p>
          </div>
          <div className="dashboard-card">
            <h3>Current Orders</h3>
            <p>Rush Order - 3 days remaining</p>
            <p>Standard Order - 8 days remaining</p>
            <p>Bulk Order - 12 days remaining</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function GenericPage({ title }) {
  return (
    <div className="page">
      <header className="topbar">
        <div dangerouslySetInnerHTML={{__html: `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="40" viewBox="0 0 120 40" fill="white"><text x="10" y="25" font-family="Arial" font-size="18" font-style="italic">My</text><rect x="35" y="8" width="20" height="20" fill="none" stroke="white" stroke-width="2"/><text x="60" y="25" font-family="Arial" font-size="18">JSI</text></svg>`}} />
        <div className="profile"></div>
      </header>
      <div className="content-page">
        <h1>{title}</h1>
        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h3>Welcome to {title}</h3>
            <p>This section is coming soon!</p>
            <p>We're building amazing features for you.</p>
          </div>
          <div className="dashboard-card">
            <h3>Quick Links</h3>
            <button className="action-btn" onClick={() => window.history.back()}>← Back to Home</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function HomePage() {
  return (
    <div className="page">
      <header className="topbar">
        <div dangerouslySetInnerHTML={{__html: `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="40" viewBox="0 0 120 40" fill="white"><text x="10" y="25" font-family="Arial" font-size="18" font-style="italic">My</text><rect x="35" y="8" width="20" height="20" fill="none" stroke="white" stroke-width="2"/><text x="60" y="25" font-family="Arial" font-size="18">JSI</text></svg>`}} />
        <div className="profile"></div>
      </header>
      <div className="grid">
        {apps.map((a, i) => (
          <a key={i} href={`/${a.slug}`} className="tile">
            <div className="tile-icon" dangerouslySetInnerHTML={{__html: a.iconSvg}} />
            <div className="tile-label">{a.name}</div>
          </a>
        ))}
      </div>
      <div className="feedback-bar">Feedback</div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/sales" element={<SalesPage />} />
        <Route path="/lead-times" element={<LeadTimesPage />} />
        <Route path="/fabrics" element={<GenericPage title="Fabrics" />} />
        <Route path="/ssa" element={<GenericPage title="SSA" />} />
        <Route path="/documents" element={<GenericPage title="Documents" />} />
        <Route path="/news" element={<GenericPage title="News" />} />
        <Route path="/samples" element={<GenericPage title="Samples" />} />
      </Routes>
    </Router>
  );
}

export default App;
