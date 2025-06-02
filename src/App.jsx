// src/App.jsx
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
        <h1>Orders Dashboard</h1>
        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h3>Recent Orders</h3>
            <p>Order #12345 – In Progress</p>
            <p>Order #12346 – Completed</p>
            <p>Order #12347 – Pending</p>
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
  // Placeholder state for year selection
  const [year, setYear] = useState(2025);

  // Sample data
  const salesData = [
    { month: "Jan", bookings: "$1,259,493", sales: "$506,304" },
    { month: "Feb", bookings: "$497,537", sales: "$553,922" },
    { month: "Mar", bookings: "$400,110", sales: "$365,601" },
    { month: "Apr", bookings: "$554,318", sales: "$696,628" },
    { month: "May", bookings: "$869,362", sales: "$1,340,018" },
    { month: "Jun", bookings: "$0",      sales: "$0"       },
  ];

  // Calculate totals (simple string stripping + parsing)
  const totalBookings = salesData
    .reduce((sum, row) => sum + Number(row.bookings.replace(/[\$,]/g, "")), 0);
  const totalSales = salesData
    .reduce((sum, row) => sum + Number(row.sales.replace(/[\$,]/g, "")), 0);

  // Format back to currency
  const formatCurrency = (num) => {
    return `$${num.toLocaleString()}`;
  };

  // Placeholder goal & progress
  const goalAmount = 7000000;
  const percentAchieved = ((totalSales / goalAmount) * 100).toFixed(2); // ~49.46% for sample data
  const yearPassedPercent = 41.64; // static placeholder

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
        {/* Year Selector */}
        <div className="year-selector">
          <select
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
          >
            <option value={2025}>2025</option>
            <option value={2024}>2024</option>
            <option value={2023}>2023</option>
          </select>
        </div>

        {/* Sales Table */}
        <table className="sales-table">
          <thead>
            <tr>
              <th>Month</th>
              <th>Bookings</th>
              <th>Sales</th>
            </tr>
          </thead>
          <tbody>
            {salesData.map((row) => (
              <tr key={row.month}>
                <td>{row.month}</td>
                <td>{row.bookings}</td>
                <td>{row.sales}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="totals-row">
              <td><strong>Total</strong></td>
              <td><strong>{formatCurrency(totalBookings)}</strong></td>
              <td><strong>{formatCurrency(totalSales)}</strong></td>
            </tr>
          </tfoot>
        </table>

        {/* Goal Section */}
        <div className="goal-section">
          <div className="goal-header">
            <span className="goal-label">Goal</span>
            <span className="goal-amount">${(goalAmount / 1000000).toFixed(2)}M</span>
          </div>
          <div className="progress-bar-container">
            <div
              className="progress-bar-fill"
              style={{ width: `${percentAchieved}%` }}
            >
              <span className="progress-text">{percentAchieved}%</span>
            </div>
          </div>
          <div className="year-progress-text">
            Jun 2: {yearPassedPercent}% of year passed.
          </div>
        </div>

        {/* Backlog, Customer Rank, Rewards */}
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
  const fileInputRef = useRef(null);
  const [photoFile, setPhotoFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [soNumber, setSoNumber] = useState("");
  const [lineItem, setLineItem] = useState("");
  const [notes, setNotes] = useState("");

  const handleTakePhoto = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChosen = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Your existing email‐sending logic goes here...
    alert("Form submitted! (Email logic not shown here)");
    setPhotoFile(null);
    setPreviewUrl(null);
    setSoNumber("");
    setLineItem("");
    setNotes("");
  };

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
        {!photoFile ? (
          <>
            <h1 className="section-title">REPLACEMENT</h1>
            <div className="dashboard-grid">
              <button className="tile" onClick={handleTakePhoto}>
                <div className="tile-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="white"
                    viewBox="0 0 24 24"
                    width="48"
                    height="48"
                  >
                    <path d="M12 5a7 7 0 100 14 7 7 0 000-14zm0 12a5 5 0 110-10 5 5 0 010 10z"/>
                    <path d="M20 4h-3.17l-1.84-2H8.99L7.15 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16
                            a2 2 0 002-2V6a2 2 0 00-2-2zm0 14H4V6h4.17l1.83-2h4.01l1.83 2H20v12z"/>
                  </svg>
                </div>
                <div className="tile-label">TAKE PHOTO</div>
              </button>

              <input
                type="file"
                accept="image/*"
                capture="environment"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChosen}
              />

              <button className="tile" onClick={handleTakePhoto}>
                <div className="tile-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="white"
                    viewBox="0 0 24 24"
                    width="48"
                    height="48"
                  >
                    <path d="M5 20h14v-2H5v2zm7-18l-5 5h3v4h4V7h3l-5-5z"/>
                  </svg>
                </div>
                <div className="tile-label">UPLOAD</div>
              </button>
            </div>
          </>
        ) : (
          <div className="form-container">
            <h1 className="section-title">REPLACEMENT DETAILS</h1>
            {previewUrl && (
              <img src={previewUrl} alt="Preview" className="image-preview" />
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-field">
                <label htmlFor="soNumber">SO #</label>
                <input
                  type="text"
                  id="soNumber"
                  value={soNumber}
                  onChange={(e) => setSoNumber(e.target.value)}
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="lineItem">Line Item #</label>
                <input
                  type="text"
                  id="lineItem"
                  value={lineItem}
                  onChange={(e) => setLineItem(e.target.value)}
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="notes">Notes / Description</label>
                <textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows="4"
                  required
                />
              </div>

              <button type="submit" className="submit-btn">
                Submit
              </button>
            </form>
          </div>
        )}
      </div>
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
