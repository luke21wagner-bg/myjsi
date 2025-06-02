import React, { useRef, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./index.css";

const apps = [
  {
    name: "orders",
    slug: "orders",
    iconSvg: `
      <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24">
        <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z"/>
        <path d="M5 3L3 5V19L5 21H19L21 19V5L19 3H5Z" stroke="white" stroke-width="0.5" fill="none"/>
      </svg>
    `
  },
  {
    name: "sales",
    slug: "sales",
    iconSvg: `
      <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24">
        <rect x="3" y="6" width="18" height="12" rx="2" fill="white"/>
        <rect x="5" y="8" width="6" height="3" fill="#c4b5a0"/>
        <circle cx="15" cy="12" r="2" fill="#c4b5a0"/>
      </svg>
    `
  },
  {
    name: "lead times",
    slug: "lead-times",
    iconSvg: `
      <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="9" stroke="white" stroke-width="2" fill="none"/>
        <path d="M12 7V12L16 16" stroke="white" stroke-width="2" stroke-linecap="round"/>
        <path d="M8 4L16 4" stroke="white" stroke-width="1.5"/>
        <path d="M4 8L4 16" stroke="white" stroke-width="1.5"/>
      </svg>
    `
  },
  {
    name: "fabrics",
    slug: "fabrics",
    iconSvg: `
      <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24">
        <rect x="4" y="4" width="16" height="16" rx="1" stroke="white" stroke-width="2" fill="none"/>
        <path d="M8 8L16 16M16 8L8 16" stroke="white" stroke-width="1.5"/>
        <circle cx="8" cy="8" r="1" fill="white"/>
        <circle cx="16" cy="8" r="1" fill="white"/>
        <circle cx="8" cy="16" r="1" fill="white"/>
        <circle cx="16" cy="16" r="1" fill="white"/>
      </svg>
    `
  },
  {
    name: "ssa",
    slug: "ssa",
    iconSvg: `
      <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24">
        <rect x="4" y="6" width="16" height="12" rx="2" stroke="white" stroke-width="2" fill="none"/>
        <path d="M8 9H16M8 12H16M8 15H12" stroke="white" stroke-width="1.5"/>
        <circle cx="18" cy="18" r="3" stroke="white" stroke-width="1.5" fill="none"/>
        <path d="M16.5 18L17.5 19L19.5 17" stroke="white" stroke-width="1" fill="none"/>
      </svg>
    `
  },
  {
    name: "documents",
    slug: "documents",
    iconSvg: `
      <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24">
        <rect x="6" y="4" width="12" height="16" rx="1" stroke="white" stroke-width="2" fill="none"/>
        <rect x="4" y="6" width="12" height="16" rx="1" stroke="white" stroke-width="2" fill="none"/>
        <rect x="2" y="8" width="12" height="16" rx="1" stroke="white" stroke-width="2" fill="none"/>
      </svg>
    `
  },
  {
    name: "replacements",
    slug: "replacements",
    iconSvg: `
      <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24">
        <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z"/>
        <path d="M5 3L3 5V19L5 21H19L21 19V5L19 3H5Z" stroke="white" stroke-width="0.5" fill="none"/>
      </svg>
    `
  },
  {
    name: "samples",
    slug: "samples",
    iconSvg: `
      <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24">
        <rect x="5" y="5" width="14" height="14" rx="2" stroke="white" stroke-width="2" fill="none"/>
        <rect x="8" y="8" width="3" height="3" fill="white"/>
        <rect x="13" y="8" width="3" height="3" fill="white"/>
        <rect x="8" y="13" width="3" height="3" fill="white"/>
        <rect x="13" y="13" width="3" height="3" fill="white"/>
      </svg>
    `
  }
];

function OrdersPage() {
  // Sample list of projects for demonstration:
  const projects = [
    "BUSINESS FURNISHINGS - MONREAU SEMINARY - NOTRE DAME, IN - 450080",
    "BUSINESS FURNISHINGS - Replacement - 449967",
    "BUSINESS FURNITURE LLC - 9100 KEYSTONE AMENITY- FURNITURE - 448242",
    "BUSINESS FURNITURE LLC - Indiana Pacers - 448180",
    "BUSINESS FURNITURE LLC - Subaru - 448489",
    "BUSINESS FURNITURE LLC - Subaru - 448491",
    "COMMERCIAL OFFICE ENVIRONMENTS - FORUM - 447995",
    "COMMERCIAL OFFICE ENVIRONMENTS - Microsoft - 447002",
    // …add more as needed
  ];

  // Hardcoded current date & total for example
  const todayDate = "Fri - May 30, 2025";
  const todayTotal = "$137,262.94";

  const [searchTerm, setSearchTerm] = useState("");

  // Basic search/filtering by substring
  const filtered = projects.filter((p) =>
    p.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page">
      <header className="topbar">
        <Link to="/">
          <div
            className="logo"
            dangerouslySetInnerHTML={{
              __html: `
                <svg xmlns="http://www.w3.org/2000/svg"
                     width="120" height="40"
                     viewBox="0 0 120 40" fill="white">
                  <text x="10" y="25" font-family="Arial" font-size="18" font-style="italic">
                    My
                  </text>
                  <rect x="35" y="8" width="20" height="20" fill="none" stroke="white" stroke-width="2"/>
                  <text x="60" y="25" font-family="Arial" font-size="18">
                    JSI
                  </text>
                </svg>
              `
            }}
          />
        </Link>
        <div className="profile"></div>
      </header>

      {/* Search bar + calendar icon */}
      <div className="orders-toolbar">
        <div className="orders-search-wrapper">
          <svg
            className="search-icon"
            xmlns="http://www.w3.org/2000/svg"
            fill="#888"
            viewBox="0 0 24 24"
          >
            <path d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <input
            type="text"
            className="orders-search-input"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <svg
          className="calendar-icon"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="#444"
          viewBox="0 0 24 24"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      </div>

      {/* Date + total row */}
      <div className="orders-header-row">
        <span className="orders-date">{todayDate}</span>
        <span className="orders-total">{todayTotal}</span>
      </div>

      {/* Scrollable list */}
      <div className="orders-list">
        {filtered.map((proj, idx) => (
          <div key={idx} className="orders-item">
            {proj}
          </div>
        ))}
      </div>
    </div>
  );
}

function SalesPage() {
  // (Existing SalesPage code unchanged)
  return (
    <div className="page">
      <header className="topbar">
        <Link to="/">
          <div
            className="logo"
            dangerouslySetInnerHTML={{
              __html: `
                <svg xmlns="http://www.w3.org/2000/svg"
                     width="120" height="40"
                     viewBox="0 0 120 40" fill="white">
                  <text x="10" y="25" font-family="Arial" font-size="18" font-style="italic">
                    My
                  </text>
                  <rect x="35" y="8" width="20" height="20" fill="none" stroke="white" stroke-width="2"/>
                  <text x="60" y="25" font-family="Arial" font-size="18">
                    JSI
                  </text>
                </svg>
              `
            }}
          />
        </Link>
        <h1 className="sales-title">SALES</h1>
        <button className="new-lead-btn">New Lead +</button>
      </header>

      <div className="content-page">
        {/* YEAR SELECT */}
        <div className="year-selector">
          <select>
            <option>2025</option>
            <option>2024</option>
            <option>2023</option>
          </select>
        </div>

        {/* SALES TABLE */}
        <table className="sales-table">
          <thead>
            <tr>
              <th>Month</th>
              <th>Bookings</th>
              <th>Sales</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Jan</td>
              <td>$1,259,493</td>
              <td>$506,304</td>
            </tr>
            <tr>
              <td>Feb</td>
              <td>$497,537</td>
              <td>$553,922</td>
            </tr>
            <tr>
              <td>Mar</td>
              <td>$400,110</td>
              <td>$365,601</td>
            </tr>
            <tr>
              <td>Apr</td>
              <td>$554,318</td>
              <td>$696,628</td>
            </tr>
            <tr>
              <td>May</td>
              <td>$869,362</td>
              <td>$1,340,018</td>
            </tr>
            <tr>
              <td>Jun</td>
              <td>$0</td>
              <td>$0</td>
            </tr>
          </tbody>
          <tfoot>
            <tr className="totals-row">
              <td><strong>Total</strong></td>
              <td><strong>$3,580,819</strong></td>
              <td><strong>$3,462,473</strong></td>
            </tr>
          </tfoot>
        </table>

        {/* GOAL SECTION */}
        <div className="goal-section">
          <div className="goal-header">
            <span className="goal-label">Goal</span>
            <span className="goal-amount">$7.00M</span>
          </div>
          <div className="progress-bar-container">
            <div className="progress-bar-fill" style={{ width: "51.15%" }}>
              <span className="progress-text">51.15%</span>
            </div>
          </div>
          <div className="year-progress-text">Jun 2: 41.64% of year passed.</div>
        </div>

        {/* INFO CARDS */}
        <div className="info-cards">
          <div className="info-card">
            <span className="info-title">Backlog</span>
            <span className="info-value">$1,380,200</span>
          </div>
          <div className="info-card placeholder-card">
            <span className="info-title">Customer Rank</span>
            <span className="info-value">–</span>
          </div>
          <div className="info-card placeholder-card">
            <span className="info-title">Rewards</span>
            <span className="info-value">–</span>
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
        <Link to="/">
          <div
            className="logo"
            dangerouslySetInnerHTML={{
              __html: `
                <svg xmlns="http://www.w3.org/2000/svg"
                     width="120" height="40"
                     viewBox="0 0 120 40" fill="white">
                  <text x="10" y="25" font-family="Arial" font-size="18" font-style="italic">
                    My
                  </text>
                  <rect x="35" y="8" width="20" height="20" fill="none" stroke="white" stroke-width="2"/>
                  <text x="60" y="25" font-family="Arial" font-size="18">
                    JSI
                  </text>
                </svg>
              `
            }}
          />
        </Link>
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
            <p>Rush Order – 3 days remaining</p>
            <p>Standard Order – 8 days remaining</p>
            <p>Bulk Order – 12 days remaining</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReplacementPage() {
  return (
    <div className="page">
      <header className="topbar">
        <Link to="/">
          <div
            className="logo"
            dangerouslySetInnerHTML={{
              __html: `
                <svg xmlns="http://www.w3.org/2000/svg"
                     width="120" height="40"
                     viewBox="0 0 120 40" fill="white">
                  <text x="10" y="25" font-family="Arial" font-size="18" font-style="italic">
                    My
                  </text>
                  <rect x="35" y="8" width="20" height="20" fill="none" stroke="white" stroke-width="2"/>
                  <text x="60" y="25" font-family="Arial" font-size="18">
                    JSI
                  </text>
                </svg>
              `
            }}
          />
        </Link>
        <div className="profile"></div>
      </header>
      {/* (Replacement code omitted for brevity) */}
    </div>
  );
}

function GenericPage({ title }) {
  return (
    <div className="page">
      <header className="topbar">
        <Link to="/">
          <div
            className="logo"
            dangerouslySetInnerHTML={{
              __html: `
                <svg xmlns="http://www.w3.org/2000/svg"
                     width="120" height="40"
                     viewBox="0 0 120 40" fill="white">
                  <text x="10" y="25" font-family="Arial" font-size="18" font-style="italic">
                    My
                  </text>
                  <rect x="35" y="8" width="20" height="20" fill="none" stroke="white" stroke-width="2"/>
                  <text x="60" y="25" font-family="Arial" font-size="18">
                    JSI
                  </text>
                </svg>
              `
            }}
          />
        </Link>
        <div className="profile"></div>
      </header>
      <div className="content-page">
        <h1>{title}</h1>
        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h3>Welcome to {title}</h3>
            <p>This section is coming soon!</p>
            <p>We’re building amazing features for you.</p>
          </div>
          <div className="dashboard-card">
            <h3>Quick Links</h3>
            <button className="action-btn" onClick={() => window.history.back()}>
              ← Back to Home
            </button>
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
        <Link to="/">
          <div
            className="logo"
            dangerouslySetInnerHTML={{
              __html: `
                <svg xmlns="http://www.w3.org/2000/svg"
                     width="120" height="40"
                     viewBox="0 0 120 40" fill="white">
                  <text x="10" y="25" font-family="Arial" font-size="18" font-style="italic">
                    My
                  </text>
                  <rect x="35" y="8" width="20" height="20" fill="none" stroke="white" stroke-width="2"/>
                  <text x="60" y="25" font-family="Arial" font-size="18">
                    JSI
                  </text>
                </svg>
              `
            }}
          />
        </Link>
        <div className="profile"></div>
      </header>

      <div className="grid">
        {apps.map((a, i) => (
          <a key={i} href={`/${a.slug}`} className="tile">
            <div className="tile-icon" dangerouslySetInnerHTML={{ __html: a.iconSvg }} />
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
        <Route path="/replacements" element={<ReplacementPage />} />
        <Route path="/samples" element={<GenericPage title="Samples" />} />
      </Routes>
    </Router>
  );
}

export default App;
