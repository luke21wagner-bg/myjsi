import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate
} from "react-router-dom";
import "./index.css";

//
// ─── REUSABLE LOGO COMPONENT ─────────────────────────────────────────────────
//
function Logo() {
  return (
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
  );
}

//
// ─── SHARED TOPBAR ─────────────────────────────────────────────────────────────
//
function Topbar() {
  return (
    <header className="topbar">
      <Logo />
      <div className="profile" />
    </header>
  );
}

//
// ─── HOME PAGE ─────────────────────────────────────────────────────────────────
//
function HomePage() {
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
      name: "products",
      slug: "products",
      iconSvg: `
        <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24">
          <rect x="3" y="3" width="18" height="18" rx="2" stroke="white" stroke-width="2" fill="none"/>
          <rect x="7" y="7" width="4" height="4" fill="white"/>
          <rect x="13" y="7" width="4" height="4" fill="white"/>
          <rect x="7" y="13" width="4" height="4" fill="white"/>
          <rect x="13" y="13" width="4" height="4" fill="white"/>
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

  return (
    <div className="page">
      <Topbar />
      <div className="home-content">
        <div className="grid">
          {apps.map((a, idx) => (
            <Link key={idx} to={`/${a.slug}`} className="tile">
              <div
                className="tile-icon"
                dangerouslySetInnerHTML={{ __html: a.iconSvg }}
              />
              <div className="tile-label">{a.name}</div>
            </Link>
          ))}
        </div>
      </div>
      <Link to="/feedback">
        <div className="feedback-bar">FEEDBACK</div>
      </Link>
    </div>
  );
}

//
// ─── ORDERS PAGE ───────────────────────────────────────────────────────────────
//
function OrdersPage() {
  const projects = [
    "BUSINESS FURNISHINGS - MONREAU SEMINARY - NOTRE DAME, IN - 450080",
    "BUSINESS FURNISHINGS - Replacement - 449967",
    "BUSINESS FURNITURE LLC - 9100 KEYSTONE AMENITY- FURNITURE - 448242",
    "BUSINESS FURNITURE LLC - Indiana Pacers - 448180",
    "BUSINESS FURNITURE LLC - Subaru - 448489",
    "BUSINESS FURNITURE LLC - Subaru - 448491",
    "COMMERCIAL OFFICE ENVIRONMENTS - FORUM - 447995",
    "COMMERCIAL OFFICE ENVIRONMENTS - Microsoft - 447002"
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const filtered = projects.filter((p) =>
    p.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Set today’s date string once
  const [todayDateStr, setTodayDateStr] = useState("");
  useEffect(() => {
    const today = new Date();
    const weekday = today.toLocaleDateString("en-US", { weekday: "short" });
    const month = today.toLocaleDateString("en-US", { month: "short" });
    const day = today.getDate();
    const year = today.getFullYear();
    setTodayDateStr(`${weekday} - ${month} ${day}, ${year}`);
  }, []);

  return (
    <div className="page">
      <Topbar />

      <h1 className="documents-heading">ORDERS</h1>

      <div className="orders-toolbar">
        <div className="orders-search-wrapper">
          <svg
            className="search-icon"
            xmlns="http://www.w3.org/2000/svg"
            fill="#888"
            viewBox="0 0 24 24"
          >
            <path
              d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z"
              stroke="#888"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <input
            type="text"
            className="orders-search-input"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="orders-header-row">
        <span className="orders-date">{todayDateStr}</span>
      </div>

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

//
// ─── SALES PAGE ────────────────────────────────────────────────────────────────
//
function SalesPage({ leads }) {
  const [todayDateStr, setTodayDateStr] = useState("");
  const [yearPassedPercent, setYearPassedPercent] = useState("0.00");
  const [year, setYear] = useState(new Date().getFullYear());
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const today = new Date();
    const weekday = today.toLocaleDateString("en-US", { weekday: "short" });
    const month = today.toLocaleDateString("en-US", { month: "short" });
    const day = today.getDate();
    const fullYear = today.getFullYear();
    setTodayDateStr(`${weekday} - ${month} ${day}, ${fullYear}`);

    const startOfYear = new Date(fullYear, 0, 1);
    const startNext = new Date(fullYear + 1, 0, 1);
    const percent =
      ((today.getTime() - startOfYear.getTime()) /
        (startNext.getTime() - startOfYear.getTime())) *
      100;
    setYearPassedPercent(percent.toFixed(2));
  }, []);

  // Sample data (Jan–Jun)
  const salesData = [
    { month: "Jan", bookings: "$1,259,493", sales: "$506,304" },
    { month: "Feb", bookings: "$497,537", sales: "$553,922" },
    { month: "Mar", bookings: "$400,110", sales: "$365,601" },
    { month: "Apr", bookings: "$554,318", sales: "$696,628" },
    { month: "May", bookings: "$869,362", sales: "$1,340,018" },
    { month: "Jun", bookings: "$0", sales: "$0" }
  ];

  const totalBookings = salesData.reduce(
    (sum, row) => sum + Number(row.bookings.replace(/[\$,]/g, "")),
    0
  );
  const totalSales = salesData.reduce(
    (sum, row) => sum + Number(row.sales.replace(/[\$,]/g, "")),
    0
  );

  const formatCurrency = (num) => `$${num.toLocaleString()}`;
  const goalAmount = 7000000;
  const percentAchieved = ((totalBookings / goalAmount) * 100).toFixed(2);

  const openModal = () => {
    setIsModalOpen(true);
    document.body.classList.add("no-scroll");
  };
  const closeModal = () => {
    setIsModalOpen(false);
    document.body.classList.remove("no-scroll");
  };

  return (
    <div className="page">
      <Topbar />

      <h1 className="documents-heading">SALES</h1>

      <div className="sales-toolbar">
        <Link to="/sales/new-leads">
          <button className="new-lead-btn">New Lead +</button>
        </Link>
        <Link to="/sales/rewards">
          <button className="rewards-btn">Rewards</button>
        </Link>
        <Link to="/sales/commissions">
          <button className="commissions-btn">Commissions</button>
        </Link>
        <button className="opportunities-btn" onClick={openModal}>
          Opportunities
        </button>
      </div>

      <div className="content-page">
        <div className="table-container">
          <table className="sales-table">
            <thead>
              <tr>
                <th>
                  <select
                    value={year}
                    onChange={(e) => setYear(Number(e.target.value))}
                    style={{
                      background: "transparent",
                      border: "none",
                      fontSize: "14px",
                      fontWeight: "bold",
                      color: "#333333",
                      cursor: "pointer"
                    }}
                  >
                    <option value={2025}>2025</option>
                    <option value={2024}>2024</option>
                    <option value={2023}>2023</option>
                  </select>
                </th>
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
                <td>
                  <strong>Total</strong>
                </td>
                <td>
                  <strong>{formatCurrency(totalBookings)}</strong>
                </td>
                <td>
                  <strong>{formatCurrency(totalSales)}</strong>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div className="goal-section">
          <div className="goal-header">
            <span className="goal-label">Goal</span>
            <span className="goal-amount">
              ${(goalAmount / 1000000).toFixed(2)}M
            </span>
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
            {monthDay(todayDateStr)}: {yearPassedPercent}% of year passed.
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <span className="modal-close" onClick={closeModal}>
              ×
            </span>
            <OpportunitiesPage leads={leads} />
          </div>
        </div>
      )}
    </div>
  );
}

function monthDay(fullDateStr) {
  const parts = fullDateStr.split(" - ");
  if (parts.length === 2) {
    const datePart = parts[1].split(",")[0]; // "Jun 3"
    return datePart;
  }
  return fullDateStr;
}

//
// ─── NEW LEADS PAGE ──────────────────────────────────────────────────────────
//
function NewLeadsPage({ addLead }) {
  const navigate = useNavigate();

  const [projectName, setProjectName] = useState("");
  const [decisionMakerName, setDecisionMakerName] = useState("");
  const [decisionMakerRole, setDecisionMakerRole] = useState("");
  const [projectStatus, setProjectStatus] = useState("Discovery");
  const [vertical, setVertical] = useState("Healthcare");
  const [estimatedList, setEstimatedList] = useState("");
  const [poTimeframe, setPoTimeframe] = useState("Jan 2025");
  const [urgency, setUrgency] = useState("Low");
  const [competitors, setCompetitors] = useState("Kimball");
  const [attachments, setAttachments] = useState("");
  const [otherNotes, setOtherNotes] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newLead = {
      projectName,
      decisionMakerName,
      decisionMakerRole,
      projectStatus,
      vertical,
      estimatedList,
      poTimeframe,
      urgency,
      competitors,
      attachments,
      otherNotes,
      timestamp: new Date().toISOString()
    };
    addLead(newLead);
    navigate("/sales");
  };

  return (
    <div className="page new-lead-page">
      <Topbar />

      <h1 className="new-lead-heading">NEW LEAD</h1>

      <div className="content-page">
        <form className="new-lead-form" onSubmit={handleSubmit}>
          {/* Project */}
          <div className="lead-field lead-full">
            <label>Project</label>
            <input
              type="text"
              placeholder="e.g. Project Alpha"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              required
            />
          </div>

          {/* Decision Maker (Name/Email + Role) */}
          <div className="lead-form-row">
            <div className="lead-half">
              <div className="lead-field">
                <label>Decision Maker Name/Email</label>
                <input
                  type="text"
                  placeholder="Name and/or email..."
                  value={decisionMakerName}
                  onChange={(e) => setDecisionMakerName(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="lead-half">
              <div className="lead-field">
                <label>Decision Maker Role</label>
                <input
                  type="text"
                  placeholder="Enter role..."
                  value={decisionMakerRole}
                  onChange={(e) => setDecisionMakerRole(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          {/* Project Status */}
          <div className="lead-field lead-full">
            <label>Project Status</label>
            <select
              value={projectStatus}
              onChange={(e) => setProjectStatus(e.target.value)}
              required
            >
              <option>Discovery</option>
              <option>Specifying</option>
              <option>Bidding/Decision</option>
              <option>PO Expected</option>
              <option>Won</option>
              <option>Lost</option>
            </select>
          </div>

          {/* Vertical + Estimated List */}
          <div className="lead-form-row">
            <div className="lead-half">
              <div className="lead-field">
                <label>Vertical</label>
                <select
                  value={vertical}
                  onChange={(e) => setVertical(e.target.value)}
                >
                  <option>Healthcare</option>
                  <option>Education</option>
                  <option>Corporate</option>
                  <option>Hospitality</option>
                  <option>Government</option>
                </select>
              </div>
            </div>
            <div className="lead-half">
              <div className="lead-field">
                <label>Estimated List</label>
                <div style={{ position: "relative" }}>
                  <span
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "10px",
                      transform: "translateY(-50%)",
                      fontSize: "14px",
                      color: "#555555",
                      pointerEvents: "none"
                    }}
                  >
                    $
                  </span>
                  <input
                    type="number"
                    placeholder="0.00"
                    style={{ paddingLeft: "24px" }}
                    value={estimatedList}
                    onChange={(e) => setEstimatedList(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* PO Timeframe + Urgency */}
          <div className="lead-form-row">
            <div className="lead-half">
              <div className="lead-field">
                <label>PO Timeframe</label>
                <select
                  value={poTimeframe}
                  onChange={(e) => setPoTimeframe(e.target.value)}
                >
                  <option>Jan 2025</option>
                  <option>Feb 2025</option>
                  <option>Mar 2025</option>
                  <option>Apr 2025</option>
                  <option>May 2025</option>
                  <option>Jun 2025</option>
                </select>
              </div>
            </div>
            <div className="lead-half">
              <div className="lead-field">
                <label>Urgency</label>
                <select
                  value={urgency}
                  onChange={(e) => setUrgency(e.target.value)}
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
              </div>
            </div>
          </div>

          {/* Competitors + Attachments */}
          <div className="lead-form-row">
            <div className="lead-half">
              <div className="lead-field">
                <label>Competitors</label>
                <select
                  value={competitors}
                  onChange={(e) => setCompetitors(e.target.value)}
                >
                  <option>Kimball</option>
                  <option>Steelcase</option>
                  <option>Herman Miller</option>
                  <option>HON</option>
                </select>
              </div>
            </div>
            <div className="lead-half">
              <div className="lead-field">
                <label>Attachments</label>
                <div style={{ position: "relative" }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#888"
                    viewBox="0 0 24 24"
                    stroke="#888"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      position: "absolute",
                      top: "50%",
                      right: "12px",
                      transform: "translateY(-50%)",
                      width: "18px",
                      height: "18px",
                      pointerEvents: "none"
                    }}
                  >
                    <path d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z"></path>
                  </svg>
                  <input
                    type="text"
                    placeholder="Include attachment(s)"
                    style={{ paddingRight: "36px" }}
                    value={attachments}
                    onChange={(e) => setAttachments(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Other notes */}
          <div className="lead-field lead-full">
            <label>Other notes</label>
            <textarea
              rows="4"
              placeholder="Other project scope info, install locations, or general details..."
              value={otherNotes}
              onChange={(e) => setOtherNotes(e.target.value)}
            />
          </div>

          {/* Submit */}
          <button type="submit" className="lead-submit-btn">
            SUBMIT
          </button>
        </form>
      </div>
    </div>
  );
}

//
// ─── OPPORTUNITIES PAGE ──────────────────────────────────────────────────────
//
function OpportunitiesPage({ leads }) {
  const categories = {
    Discovery: [],
    Specifying: [],
    "Bidding/Decision": [],
    "PO Expected": [],
    Won: [],
    Lost: []
  };

  leads.forEach((lead) => {
    const status = lead.projectStatus;
    if (categories[status]) {
      categories[status].push(lead.projectName);
    } else {
      categories["Discovery"].push(lead.projectName);
    }
  });

  return (
    <div className="opp-page">
      {Object.entries(categories).map(([stage, items]) => (
        <div key={stage} className="opp-section">
          <h2>{stage}</h2>
          <ul className="opp-list">
            {items.length > 0 ? (
              items.map((proj, idx) => (
                <li key={idx} className="opp-item">
                  {proj}
                </li>
              ))
            ) : (
              <li className="opp-item" style={{ fontStyle: "italic", color: "#777" }}>
                (No leads in this category)
              </li>
            )}
          </ul>
        </div>
      ))}
    </div>
  );
}

//
// ─── REWARDS PAGE ─────────────────────────────────────────────────────────────
//
function RewardsPage() {
  const [quarter, setQuarter] = useState("Q1 2025");

  const salesRewards = [
    { name: "Deb Butler", amount: "$520.32" },
    { name: "Jason Beehler", amount: "$44.21" },
    { name: "Andrea Kirkland", amount: "$20.00" },
    { name: "Alan Bird", amount: "$1,034.21" }
  ];

  const designerRewards = [{ name: "Jen Franklin", amount: "$12.10" }];

  return (
    <div className="page rewards-page">
      <Topbar />

      <h1 className="rewards-heading">REWARDS</h1>

      <div className="quarter-selector">
        <select value={quarter} onChange={(e) => setQuarter(e.target.value)}>
          <option>Q1 2025</option>
          <option>Q2 2025</option>
          <option>Q3 2025</option>
          <option>Q4 2025</option>
        </select>
      </div>

      <div className="rewards-section">
        <h2>Sales</h2>
        <div className="rewards-list">
          {salesRewards.map((r, i) => (
            <div key={i} className="rewards-item">
              <span>{r.name}</span>
              <span>{r.amount}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="rewards-section">
        <h2>Designers</h2>
        <div className="rewards-list">
          {designerRewards.map((r, i) => (
            <div key={i} className="rewards-item">
              <span>{r.name}</span>
              <span>{r.amount}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

//
// ─── DOCUMENTS PAGE ─────────────────────────────────────────────────────────
//
function DocumentsPage() {
  return (
    <div className="page">
      <Topbar />

      <h1 className="documents-heading">DOCUMENTS</h1>

      <div className="content-page documents-page">
        <div className="documents-buttons">
          <button className="doc-btn">Contracts</button>
          <button className="doc-btn">Commission Rates</button>
          <button className="doc-btn">Presentations</button>
          <button className="doc-btn">Sample Discounts</button>
          <button className="doc-btn">Install Instructions</button>
          <button className="doc-btn">Discontinued Finishes</button>
        </div>
      </div>
    </div>
  );
}

//
// ─── COM YDG REQUEST PAGE ───────────────────────────────────────────────────
//
function ComYdgRequestPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [pillModel, setPillModel] = useState("");
  const [lines, setLines] = useState([]);

  const addPill = () => {
    const trimmed = searchTerm.trim();
    if (trimmed === "") return;
    setPillModel(trimmed);
    setSearchTerm("");
  };

  const pillClicked = () => {
    if (!pillModel) return;
    const already = lines.some((l) => l.model === pillModel);
    if (!already) {
      setLines((prev) => [...prev, { model: pillModel, pattern: "", qty: "" }]);
    }
    setPillModel("");
  };

  const updateLine = (index, field, value) => {
    setLines((prev) =>
      prev.map((ln, i) => (i === index ? { ...ln, [field]: value } : ln))
    );
  };

  const allValid =
    lines.length > 0 &&
    lines.every((ln) => ln.pattern.trim() !== "" && Number(ln.qty) > 0);

  const handleSubmit = () => {
    alert(`Submitting:\n${JSON.stringify(lines, null, 2)}`);
    setLines([]);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addPill();
    }
  };

  return (
    <div className="page">
      <Topbar />

      <h1 className="com-heading">COM YARD REQUEST</h1>

      <div className="content-page com-page">
        <div className="com-search-wrapper">
          <input
            type="text"
            className="com-search-input"
            placeholder="Search model(s)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <svg
            className="com-search-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            onClick={addPill}
          >
            <path
              d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z"
              stroke="#888"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {pillModel && (
          <div className="model-pill" onClick={pillClicked}>
            {pillModel}
          </div>
        )}

        <div className="com-list">
          {lines.map((ln, idx) => (
            <div key={idx} className="com-item">
              <div className="com-item-header">{ln.model}</div>
              <div className="com-item-fields">
                <input
                  type="text"
                  placeholder="Fabric Pattern"
                  value={ln.pattern}
                  onChange={(e) => updateLine(idx, "pattern", e.target.value)}
                  required
                />
                <input
                  type="number"
                  placeholder="Qty"
                  min="1"
                  value={ln.qty}
                  onChange={(e) => updateLine(idx, "qty", e.target.value)}
                  required
                />
              </div>
            </div>
          ))}
        </div>

        <button
          className="com-submit-btn"
          disabled={!allValid}
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

//
// ─── PRODUCTS PAGE ─────────────────────────────────────────────────────────────
//
function ProductsPage() {
  return (
    <div className="page">
      <Topbar />

      <h1 className="documents-heading">PRODUCTS</h1>

      <div className="content-page products-page">
        {/* Swivels */}
        <Link to="/products/swivels" className="category-box">
          <div className="category-title">Swivels</div>
          <div className="product-images">
            <img
              src="https://via.placeholder.com/60"
              alt="Swivel 1"
              className="product-img"
            />
            <img
              src="https://via.placeholder.com/60"
              alt="Swivel 2"
              className="product-img"
            />
            <img
              src="https://via.placeholder.com/60"
              alt="Swivel 3"
              className="product-img"
            />
            <img
              src="https://via.placeholder.com/60"
              alt="Swivel 4"
              className="product-img"
            />
          </div>
        </Link>

        {/* End Tables */}
        <Link to="/products/end-tables" className="category-box">
          <div className="category-title">End Tables</div>
          <div className="product-images">
            <img
              src="https://via.placeholder.com/60"
              alt="Table 1"
              className="product-img"
            />
            <img
              src="https://via.placeholder.com/60"
              alt="Table 2"
              className="product-img"
            />
            <img
              src="https://via.placeholder.com/60"
              alt="Table 3"
              className="product-img"
            />
          </div>
        </Link>

        {/* Conference */}
        <Link to="/products/conference" className="category-box">
          <div className="category-title">Conference</div>
          <div className="product-images">
            <img
              src="https://via.placeholder.com/60"
              alt="Conference 1"
              className="product-img"
            />
            <img
              src="https://via.placeholder.com/60"
              alt="Conference 2"
              className="product-img"
            />
            <img
              src="https://via.placeholder.com/60"
              alt="Conference 3"
              className="product-img"
            />
          </div>
        </Link>

        {/* More... */}
        <Link to="/products/more" className="category-box">
          <div className="category-title">More...</div>
        </Link>

        {/* Bottom “Seating” & “Casegoods” buttons */}
        <div className="prod-buttons">
          <Link to="/products/seating" className="prod-btn">
            <svg
              className="prod-btn-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#333"
            >
              <path d="M4 17h16v-2H4v2zm2-4h12V7H6v6zm10 0V9H8v4h8zM5 6h14v2H5V6zm0 11h2v3H5v-3zm12 0h2v3h-2v-3z" />
            </svg>
            <div className="prod-btn-label">Seating</div>
          </Link>
          <Link to="/products/casegoods" className="prod-btn">
            <svg
              className="prod-btn-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#333"
            >
              <rect x="3" y="5" width="18" height="14" rx="1" stroke="#333" strokeWidth="1" fill="none" />
              <rect x="6" y="8" width="4" height="3" fill="#333" />
              <rect x="14" y="8" width="4" height="3" fill="#333" />
              <rect x="6" y="14" width="4" height="3" fill="#333" />
              <rect x="14" y="14" width="4" height="3" fill="#333" />
            </svg>
            <div className="prod-btn-label">Casegoods</div>
          </Link>
        </div>
      </div>
    </div>
  );
}

//
// ─── PRODUCTS PLACEHOLDERS ───────────────────────────────────────────────────
//
function SwivelsPage() {
  return (
    <div className="page">
      <Topbar />
      <h1 className="documents-heading">SWIVELS</h1>
      <div className="content-page">
        <p style={{ padding: "0 16px", color: "#333333" }}>
          This is the placeholder page for <strong>Swivels</strong>.
        </p>
      </div>
    </div>
  );
}
function EndTablesPage() {
  return (
    <div className="page">
      <Topbar />
      <h1 className="documents-heading">END TABLES</h1>
      <div className="content-page">
        <p style={{ padding: "0 16px", color: "#333333" }}>
          This is the placeholder page for <strong>End Tables</strong>.
        </p>
      </div>
    </div>
  );
}
function ConferencePage() {
  return (
    <div className="page">
      <Topbar />
      <h1 className="documents-heading">CONFERENCE</h1>
      <div className="content-page">
        <p style={{ padding: "0 16px", color: "#333333" }}>
          This is the placeholder page for <strong>Conference</strong>.
        </p>
      </div>
    </div>
  );
}
function MorePage() {
  return (
    <div className="page">
      <Topbar />
      <h1 className="documents-heading">MORE</h1>
      <div className="content-page">
        <p style={{ padding: "0 16px", color: "#333333" }}>
          This is the placeholder page for <strong>More...</strong>.
        </p>
      </div>
    </div>
  );
}
function SeatingPage() {
  return (
    <div className="page">
      <Topbar />
      <h1 className="documents-heading">SEATING</h1>
      <div className="content-page">
        <p style={{ padding: "0 16px", color: "#333333" }}>
          This is the placeholder page for <strong>Seating</strong>.
        </p>
      </div>
    </div>
  );
}
function CasegoodsPage() {
  return (
    <div className="page">
      <Topbar />
      <h1 className="documents-heading">CASEGOODS</h1>
      <div className="content-page">
        <p style={{ padding: "0 16px", color: "#333333" }}>
          This is the placeholder page for <strong>Casegoods</strong>.
        </p>
      </div>
    </div>
  );
}

//
// ─── REPLACEMENTS PAGE ─────────────────────────────────────────────────────────
//
function ReplacementsPage() {
  const [photoFile, setPhotoFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [soNumber, setSoNumber] = useState("");
  const [lineItem, setLineItem] = useState("");
  const [notes, setNotes] = useState("");
  const fileInputRef = React.useRef(null);

  const handleTakePhoto = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleFileChosen = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Replacement submitted! (Add email logic separately.)");
    setPhotoFile(null);
    setPreviewUrl(null);
    setSoNumber("");
    setLineItem("");
    setNotes("");
  };

  return (
    <div className="page">
      <Topbar />

      <h1 className="documents-heading">REPLACEMENTS</h1>

      <div className="content-page">
        {!photoFile ? (
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
                  <path d="M12 5a7 7 0 100 14 7 7 0 000-14zm0 12a5 5 0 110-10 5 5 0 010 10z" />
                  <path d="M20 4h-3.17l-1.84-2H8.99L7.15 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 14H4V6h4.17l1.83-2h4.01l1.83 2H20v12z" />
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
                  <path d="M5 20h14v-2H5v2zm7-18l-5 5h3v4h4V7h3l-5-5z" />
                </svg>
              </div>
              <div className="tile-label">UPLOAD</div>
            </button>
          </div>
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

//
// ─── SSAPAGE ──────────────────────────────────────────────────────────────────
//
function SSAPage() {
  const [form, setForm] = useState({
    project: "",
    dealer: "",
    estList: "",
    discount: "Standard Discount",
    poDate: "",
    products: "",
    priceList: "January 2025",
    contract: false,
    spiff: false,
    waiveHandling: false,
    waiveGrommets: false,
    waiveSpecialFinish: false,
    waiveSpecialLam: false,
    validThrough: "",
    competition: "",
    notes: ""
  });

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("SSA form submitted:", form);
    alert("SSA form submitted! Check console for data.");
  }

  return (
    <div className="page">
      <Topbar />

      <h1 className="documents-heading">SSA</h1>

      <div className="content-page ssa-page">
        <form className="ssa-form" onSubmit={handleSubmit}>
          {/* Project */}
          <div className="ssa-form-field">
            <label htmlFor="project">Project</label>
            <input
              type="text"
              id="project"
              name="project"
              placeholder="Enter Project Name"
              value={form.project}
              onChange={handleChange}
              required
            />
          </div>

          {/* Dealer */}
          <div className="ssa-form-field">
            <label htmlFor="dealer">Dealer</label>
            <div className="ssa-search-wrapper">
              <svg
                className="ssa-search-icon"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="#888"
                viewBox="0 0 24 24"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                id="dealer"
                name="dealer"
                placeholder="Search Dealer"
                value={form.dealer}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Est. List */}
          <div className="ssa-form-field">
            <label htmlFor="estList">Est. List</label>
            <div className="ssa-dollar-wrapper">
              <span className="ssa-dollar-sign">$</span>
              <input
                type="number"
                id="estList"
                name="estList"
                placeholder="0.00"
                value={form.estList}
                onChange={handleChange}
                min="0"
                step="0.01"
                required
              />
            </div>
          </div>

          {/* Discount */}
          <div className="ssa-form-field">
            <label htmlFor="discount">Discount</label>
            <select
              id="discount"
              name="discount"
              value={form.discount}
              onChange={handleChange}
              required
            >
              <option>Standard Discount</option>
              <option>Discount Option 1</option>
              <option>Discount Option 2</option>
            </select>
          </div>

          {/* PO Date */}
          <div className="ssa-form-field">
            <label htmlFor="poDate">PO Date</label>
            <input
              type="date"
              id="poDate"
              name="poDate"
              value={form.poDate}
              onChange={handleChange}
              required
            />
          </div>

          {/* Products */}
          <div className="ssa-form-field">
            <label htmlFor="products">Products</label>
            <div className="ssa-search-wrapper">
              <svg
                className="ssa-search-icon"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="#888"
                viewBox="0 0 24 24"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                id="products"
                name="products"
                placeholder="Search Products"
                value={form.products}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Price List */}
          <div className="ssa-form-field">
            <label htmlFor="priceList">Price List</label>
            <select
              id="priceList"
              name="priceList"
              value={form.priceList}
              onChange={handleChange}
              required
            >
              <option>January 2025</option>
              <option>February 2025</option>
              <option>March 2025</option>
            </select>
          </div>

          {/* Contract + Spiff */}
          <div className="ssa-form-field-inline">
            <div className="ssa-checkbox-group">
              <input
                type="checkbox"
                id="contract"
                name="contract"
                checked={form.contract}
                onChange={handleChange}
              />
              <label htmlFor="contract">Contract</label>
            </div>
            <div className="ssa-checkbox-group">
              <input
                type="checkbox"
                id="spiff"
                name="spiff"
                checked={form.spiff}
                onChange={handleChange}
              />
              <label htmlFor="spiff">Spiff</label>
            </div>
          </div>

          {/* Waive checkboxes */}
          <div className="ssa-form-field waiver-section">
            <label>Waive</label>
            <div className="waive-checkboxes">
              <div className="ssa-checkbox-group">
                <input
                  type="checkbox"
                  id="waiveHandling"
                  name="waiveHandling"
                  checked={form.waiveHandling}
                  onChange={handleChange}
                />
                <label htmlFor="waiveHandling">Handling</label>
              </div>
              <div className="ssa-checkbox-group">
                <input
                  type="checkbox"
                  id="waiveGrommets"
                  name="waiveGrommets"
                  checked={form.waiveGrommets}
                  onChange={handleChange}
                />
                <label htmlFor="waiveGrommets">Grommets</label>
              </div>
              <div className="ssa-checkbox-group">
                <input
                  type="checkbox"
                  id="waiveSpecialFinish"
                  name="waiveSpecialFinish"
                  checked={form.waiveSpecialFinish}
                  onChange={handleChange}
                />
                <label htmlFor="waiveSpecialFinish">Special Finish</label>
              </div>
              <div className="ssa-checkbox-group">
                <input
                  type="checkbox"
                  id="waiveSpecialLam"
                  name="waiveSpecialLam"
                  checked={form.waiveSpecialLam}
                  onChange={handleChange}
                />
                <label htmlFor="waiveSpecialLam">Special Lam</label>
              </div>
            </div>
          </div>

          {/* Valid Through */}
          <div className="ssa-form-field">
            <label htmlFor="validThrough">Valid Through</label>
            <input
              type="date"
              id="validThrough"
              name="validThrough"
              value={form.validThrough}
              onChange={handleChange}
              required
            />
          </div>

          {/* Competition */}
          <div className="ssa-form-field">
            <label htmlFor="competition">Competition</label>
            <input
              type="text"
              id="competition"
              name="competition"
              placeholder="Search Competitors"
              value={form.competition}
              onChange={handleChange}
            />
          </div>

          {/* Notes */}
          <div className="ssa-form-field">
            <label htmlFor="notes">Notes</label>
            <textarea
              id="notes"
              name="notes"
              placeholder="Additional notes or competitors..."
              rows="3"
              value={form.notes}
              onChange={handleChange}
            />
          </div>

          <div className="ssa-form-actions">
            <button type="submit" className="ssa-submit-btn">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

//
// ─── SAMPLES PAGE ─────────────────────────────────────────────────────────────
//
function SamplesPage() {
  return (
    <div className="page">
      <Topbar />

      <h1 className="documents-heading">SAMPLES</h1>

      <div className="content-page">
        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h3>Welcome to Samples</h3>
            <p>This section is coming soon!</p>
            <p>We’re building amazing features for you.</p>
          </div>
          <div className="dashboard-card">
            <h3>Quick Links</h3>
            <button
              className="action-btn"
              onClick={() => window.history.back()}
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

//
// ─── FEEDBACK PAGE ────────────────────────────────────────────────────────────
//
function FeedbackPage() {
  const navigate = useNavigate();

  const [subject, setSubject] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [files, setFiles] = useState("");
  const [isSubmittedOverlayOn, setIsSubmittedOverlayOn] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmittedOverlayOn(true);
    setTimeout(() => {
      setIsSubmittedOverlayOn(false);
      navigate("/");
    }, 1000);
  };

  return (
    <div className="page feedback-page">
      <Topbar />

      <h1 className="feedback-heading">FEEDBACK</h1>

      <div className="content-page">
        <form className="feedback-form" onSubmit={handleSubmit}>
          <div className="feedback-field">
            <label>Subject</label>
            <input
              type="text"
              placeholder="Include suggestion title..."
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </div>

          <div className="feedback-field">
            <label>Suggestion</label>
            <textarea
              rows="6"
              placeholder="Include suggestions for MyJSI app improvements..."
              value={suggestion}
              onChange={(e) => setSuggestion(e.target.value)}
              required
            />
          </div>

          <div className="feedback-field">
            <label>Files</label>
            <div className="feedback-file-wrapper">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="#888"
                viewBox="0 0 24 24"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                placeholder="Add attachments"
                value={files}
                onChange={(e) => setFiles(e.target.value)}
              />
            </div>
          </div>

          <button type="submit" className="feedback-submit-btn">
            SUBMIT
          </button>
        </form>
      </div>

      {isSubmittedOverlayOn && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: "300px" }}>
            <div className="submitted-message">Submitted</div>
          </div>
        </div>
      )}
    </div>
  );
}

//
// ─── LEAD TIMES PAGE ──────────────────────────────────────────────────────────
//
function LeadTimesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]); // will hold array of { name, type, weeks }

  useEffect(() => {
    // 1) Fetch the raw HTML of the JSI “Lead Times” page
    fetch("https://www.jsifurniture.com/resources/lead-times/")
      .then((res) => res.text())
      .then((htmlString) => {
        // 2) Parse it into a DOM so we can extract the innerText
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlString, "text/html");
        const fullText = doc.body.innerText;

        // 3) Split into lines, trim, and remove empty‐string lines
        const lines = fullText
          .split("\n")
          .map((l) => l.trim())
          .filter((l) => l.length > 0);

        // 4) Find the start of “Casegoods + Tables”
        const casegoodsIdx = lines.findIndex((l) =>
          l.includes("Casegoods + Tables")
        );
        if (casegoodsIdx < 0) {
          console.error("Could not find “Casegoods + Tables” header in JSI HTML");
          return;
        }

        // 5) Starting from casegoodsIdx+1, collect every line until the first “X weeks” entry.
        //    Those lines are the series NAMES.
        const seriesNames = [];
        let cursor = casegoodsIdx + 1;
        while (
          cursor < lines.length &&
          !/^\d+\s+weeks?$/i.test(lines[cursor])
        ) {
          seriesNames.push(lines[cursor]);
          cursor++;
        }

        // 6) Now, starting from that cursor, collect exactly seriesNames.length MANY “X weeks” lines
        const seriesWeeks = [];
        let weeksCursor = cursor;
        while (
          weeksCursor < lines.length &&
          seriesWeeks.length < seriesNames.length
        ) {
          if (/^\d+\s+weeks?$/i.test(lines[weeksCursor])) {
            seriesWeeks.push(lines[weeksCursor]);
          }
          weeksCursor++;
        }

        // 7) Build the final array of { name, type, weeks }
        //    If “name” includes “Seating” (or “Markdown: … - Seating”), we show a chair icon; otherwise a table icon.
        const items = seriesNames.map((fullName, i) => {
          // Derive a “displayName” by removing “– Wood” or “– Uph” suffix:
          const displayName = fullName.replace(/\s*–\s*(Wood|Uph)\s*$/i, "");

          // If the series string ends with “Seating” or includes “– Seating” → treat as “seating”:
          const lower = fullName.toLowerCase();
          const isSeating =
            lower.includes("seating") ||
            displayName.toLowerCase().endsWith("seating");

          // Extract just the number of weeks (drop “ weeks” text):
          const weeksText = seriesWeeks[i] || "0 weeks";
          const weeksNumber = weeksText.split(/\s+/)[0];

          return {
            name: displayName,
            type: isSeating ? "seating" : "table",
            weeks: weeksNumber
          };
        });

        setData(items);
      })
      .catch((err) => {
        console.error("Error fetching/parsing Lead Times:", err);
      });
  }, []);

  // Filter in real time
  const filtered = data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Two tiny SVG icons: one for a chair (seating), one for a table/casegood
  const SeatingIcon = () => (
    <svg
      className="lead-icon"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="#333333"
    >
      <path d="M4 17h16v-2H4v2zm2-4h12V7H6v6zm10 0V9H8v4h8zM5 6h14v2H5V6zm0 11h2v3H5v-3zm12 0h2v3h-2v-3z" />
    </svg>
  );
  const TableIcon = () => (
    <svg
      className="lead-icon"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="#333333"
    >
      <path d="M4 17h16v-2H4v2zm2-4h12V7H6v6zm-2 8h18v-2H2v2zm2 0V19H4v2zm16-2v2h-2v-2h2zM20 4H4v2h16V4z" />
    </svg>
  );

  return (
    <div className="page lead-times-page">
      <Topbar />

      <h1 className="documents-heading">LEAD TIMES</h1>

      <div className="content-page">
        <div className="lead-times-searchbar">
          <div className="lead-times-search-wrapper">
            <svg
              className="search-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle cx="11" cy="11" r="8" stroke="#888888" strokeWidth="2" />
              <line
                x1="21"
                y1="21"
                x2="16.65"
                y2="16.65"
                stroke="#888888"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <input
              type="text"
              className="lead-times-search-input"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <svg
            className="lead-times-filter-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              d="M3 4h18v2H3V4zm4 6h10v2H7v-2zm-2 6h14v2H5v-2z"
              fill="#888888"
            />
          </svg>
        </div>

        <div className="series-list">
          {filtered.map((item, idx) => (
            <div key={idx} className="series-row">
              <div className="series-icons">
                {item.type === "seating" ? <SeatingIcon /> : <TableIcon />}
                <span className="lead-number">{item.weeks}</span>
              </div>
              <div className="series-name">{item.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

//
// ─── OTHER PAGES ──────────────────────────────────────────────────────────────
// (Re‐use exactly as we defined above in your previous setup.)
//
// For brevity, the code for “ReplacementsPage”, “SSAPage”, “SamplesPage”, etc.
// is unchanged from the prior version. See above in this file for the full
// definitions of ReplacementsPage, SSAPage, SamplesPage, FeedbackPage, etc.
//
// ──────────────────────────────────────────────────────────────────────────────
//
// ROUTER: tie everything together
//
function App() {
  const [leads, setLeads] = useState([]);

  const addLead = (leadObj) => {
    setLeads((prev) => [...prev, leadObj]);
  };

  // Lock pinch/zoom so user can’t break layout
  useEffect(() => {
    let meta = document.querySelector('meta[name="viewport"]');
    const contentValue =
      "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no";
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "viewport";
      meta.content = contentValue;
      document.head.appendChild(meta);
    } else {
      meta.setAttribute("content", contentValue);
    }
  }, []);

  return (
    <div className="app-container">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />

          {/* ORDERS */}
          <Route path="/orders" element={<OrdersPage />} />

          {/* SALES */}
          <Route path="/sales" element={<SalesPage leads={leads} />} />
          <Route
            path="/sales/new-leads"
            element={<NewLeadsPage addLead={addLead} />}
          />
          <Route path="/sales/rewards" element={<RewardsPage />} />
          <Route
            path="/sales/commissions"
            element={
              <div className="page">
                <Topbar />
                <h1 className="documents-heading">COMMISSIONS</h1>
                <div className="content-page">
                  <p style={{ padding: "0 16px", color: "#333333" }}>
                    This is a placeholder page for <strong>Commissions</strong>.
                  </p>
                </div>
              </div>
            }
          />

          {/* LEAD TIMES */}
          <Route path="/lead-times" element={<LeadTimesPage />} />

          {/* FABRICS */}
          <Route path="/fabrics" element={<FabricsPage />} />
          <Route
            path="/fabrics/database"
            element={<FabricDatabasePage />}
          />
          <Route
            path="/fabrics/com-request"
            element={<ComYdgRequestPage />}
          />

          {/* DOCUMENTS */}
          <Route path="/documents" element={<DocumentsPage />} />

          {/* REPLACEMENTS */}
          <Route path="/replacements" element={<ReplacementsPage />} />

          {/* PRODUCTS */}
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/swivels" element={<SwivelsPage />} />
          <Route path="/products/end-tables" element={<EndTablesPage />} />
          <Route path="/products/conference" element={<ConferencePage />} />
          <Route path="/products/more" element={<MorePage />} />
          <Route path="/products/seating" element={<SeatingPage />} />
          <Route path="/products/casegoods" element={<CasegoodsPage />} />

          {/* SSA */}
          <Route path="/ssa" element={<SSAPage />} />

          {/* SAMPLES */}
          <Route path="/samples" element={<SamplesPage />} />

          {/* FEEDBACK */}
          <Route path="/feedback" element={<FeedbackPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
