import React, { useRef, useState, useEffect } from "react";
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
      <div className="profile"></div>
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
          <!-- Simple grid icon -->
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

      <div className="feedback-bar">Feedback</div>
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
    // …add more as needed
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const filtered = projects.filter((p) =>
    p.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Use today's date for header
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

      {/* ORDERS heading at top */}
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
  // “Today” string, e.g. “Wed – Jun 3, 2025”
  const [todayDateStr, setTodayDateStr] = useState("");
  // Percentage of the year that’s passed
  const [yearPassedPercent, setYearPassedPercent] = useState("0.00");

  // Modal open/close for Opportunities
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const today = new Date();
    const weekday = today.toLocaleDateString("en-US", { weekday: "short" });
    const month = today.toLocaleDateString("en-US", { month: "short" });
    const day = today.getDate();
    const year = today.getFullYear();
    setTodayDateStr(`${weekday} - ${month} ${day}, ${year}`);

    // Calculate % of year passed (from Jan 1 to Dec 31)
    const startOfYear = new Date(year, 0, 1);
    const startOfNextYear = new Date(year + 1, 0, 1);
    const percent =
      ((today.getTime() - startOfYear.getTime()) /
        (startOfNextYear.getTime() - startOfYear.getTime())) *
      100;
    setYearPassedPercent(percent.toFixed(2));
  }, []);

  // Sample data: bookings for each month (Jan–Jun)
  const [year, setYear] = useState(new Date().getFullYear());
  const salesData = [
    { month: "Jan", bookings: "$1,259,493", sales: "$506,304" },
    { month: "Feb", bookings: "$497,537", sales: "$553,922" },
    { month: "Mar", bookings: "$400,110", sales: "$365,601" },
    { month: "Apr", bookings: "$554,318", sales: "$696,628" },
    { month: "May", bookings: "$869,362", sales: "$1,340,018" },
    { month: "Jun", bookings: "$0", sales: "$0" }
  ];

  // Compute totals
  const totalBookings = salesData.reduce(
    (sum, row) => sum + Number(row.bookings.replace(/[\$,]/g, "")),
    0
  );
  const totalSales = salesData.reduce(
    (sum, row) => sum + Number(row.sales.replace(/[\$,]/g, "")),
    0
  );

  // Format $3 580 820 → "$3,580,820"
  const formatCurrency = (num) => `$${num.toLocaleString()}`;

  // **Use bookings total** ÷ $7 000 000 (goal) for the progress %
  const goalAmount = 7000000;
  const percentAchieved = ((totalBookings / goalAmount) * 100).toFixed(2);

  // Open & close modal (toggle) for Opportunities
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

      {/* SALES heading */}
      <h1 className="documents-heading">SALES</h1>

      {/* Swipeable toolbar: New Lead +, Rewards, Commissions, Opportunities */}
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

      {/* Sleek table container */}
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

      {/* -------------------------------------
            Opportunities Modal (if open)
         ------------------------------------- */}
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

// Helper: "Wed - Jun 3, 2025" → "Jun 3"
function monthDay(fullDateStr) {
  const parts = fullDateStr.split(" - ");
  if (parts.length === 2) {
    const datePart = parts[1].split(",")[0]; // "Jun 3"
    return datePart;
  }
  return fullDateStr;
}

//
// ─── NEW LEADS PAGE (Form) ───────────────────────────────────────────────────
//
function NewLeadsPage({ addLead }) {
  const navigate = useNavigate();

  // Local form state
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

    // Build a single lead object
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

    // Add to top‐level leads array
    addLead(newLead);

    // After submit, navigate back to /sales (SalesPage)
    navigate("/sales");
  };

  return (
    <div className="page new-lead-page">
      <Topbar />

      {/* NEW LEAD heading */}
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
// ─── OPPORTUNITIES PAGE (Modal Content) ──────────────────────────────────────
//
function OpportunitiesPage({ leads }) {
  // Organize leads by projectStatus
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
      // If somehow unmatched, put in 'Discovery'
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

  const designerRewards = [
    { name: "Jen Franklin", amount: "$12.10" }
  ];

  return (
    <div className="page rewards-page">
      <Topbar />

      {/* REWARDS heading */}
      <h1 className="rewards-heading">REWARDS</h1>

      {/* Quarter dropdown */}
      <div className="quarter-selector">
        <select
          value={quarter}
          onChange={(e) => setQuarter(e.target.value)}
        >
          <option>Q1 2025</option>
          <option>Q2 2025</option>
          <option>Q3 2025</option>
          <option>Q4 2025</option>
        </select>
      </div>

      {/* Sales section */}
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

      {/* Designers section */}
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

      {/* DOCUMENTS heading at top */}
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
// ─── LEAD TIMES PAGE ───────────────────────────────────────────────────────────
//
function LeadTimesPage() {
  return (
    <div className="page">
      <Topbar />

      {/* LEAD TIMES heading at top */}
      <h1 className="documents-heading">LEAD TIMES</h1>

      <div className="content-page">
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

//
// ─── FABRICS PAGE (Decision Screen) ───────────────────────────────────────────
//
function FabricsPage() {
  return (
    <div className="page">
      <Topbar />

      {/* FABRICS heading at top */}
      <h1 className="documents-heading">FABRICS</h1>

      <div className="content-page documents-page">
        <div className="documents-buttons">
          <Link to="/fabrics/database">
            <button className="doc-btn">Fabric Database</button>
          </Link>
          <Link to="/fabrics/com-request">
            <button className="doc-btn">COM Ydg Request</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

//
// ─── Fabric Database Landing Page (stub) ──────────────────────────────────────
//
function FabricDatabasePage() {
  return (
    <div className="page">
      <Topbar />

      {/* FABRIC DATABASE heading */}
      <h1 className="documents-heading">FABRIC DATABASE</h1>

      <div className="content-page">
        <p style={{ padding: "0 16px", color: "#333333" }}>
          This is the landing page for <strong>Fabric Database</strong>. 
          (Replace this stub with actual functionality later.)
        </p>
      </div>
    </div>
  );
}

//
// ─── COM Yardage Request Page ─────────────────────────────────────────────────
//
function ComYdgRequestPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [pillModel, setPillModel] = useState("");
  const [lines, setLines] = useState([]); // { model, pattern, qty }

  // Add pill when user hits Enter or clicks search icon
  const addPill = () => {
    const trimmed = searchTerm.trim();
    if (trimmed === "") return;
    setPillModel(trimmed);
    setSearchTerm("");
  };

  // Move pill into list on click
  const pillClicked = () => {
    if (!pillModel) return;
    const alreadyAdded = lines.some((l) => l.model === pillModel);
    if (!alreadyAdded) {
      setLines((prev) => [
        ...prev,
        { model: pillModel, pattern: "", qty: "" }
      ]);
    }
    setPillModel("");
  };

  // Update pattern or qty for a given line index
  const updateLine = (index, field, value) => {
    setLines((prev) =>
      prev.map((ln, i) =>
        i === index
          ? { ...ln, [field]: value }
          : ln
      )
    );
  };

  // Enable Submit only if every line has nonempty pattern and qty > 0
  const allValid =
    lines.length > 0 &&
    lines.every(
      (ln) =>
        ln.pattern.trim() !== "" &&
        Number(ln.qty) > 0
    );

  const handleSubmit = () => {
    alert(`Submitting:\n${JSON.stringify(lines, null, 2)}`);
    setLines([]);
  };

  // Trigger addPill on Enter key
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addPill();
    }
  };

  return (
    <div className="page">
      <Topbar />

      {/* COM YARD REQUEST heading at top */}
      <h1 className="com-heading">COM YARD REQUEST</h1>

      <div className="content-page com-page">
        {/* Search Field */}
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

        {/* Pill for the searched model */}
        {pillModel && (
          <div className="model-pill" onClick={pillClicked}>
            {pillModel}
          </div>
        )}

        {/* List of lines: once pill is clicked, show these entries */}
        <div className="com-list">
          {lines.map((ln, idx) => (
            <div key={idx} className="com-item">
              <div className="com-item-header">{ln.model}</div>
              <div className="com-item-fields">
                <input
                  type="text"
                  placeholder="Fabric Pattern"
                  value={ln.pattern}
                  onChange={(e) =>
                    updateLine(idx, "pattern", e.target.value)
                  }
                  required
                />
                <input
                  type="number"
                  placeholder="Qty"
                  min="1"
                  value={ln.qty}
                  onChange={(e) =>
                    updateLine(idx, "qty", e.target.value)
                  }
                  required
                />
              </div>
            </div>
          ))}
        </div>

        {/* Submit Button */}
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

      {/* PRODUCTS heading at top */}
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

        {/* Bottom Buttons */}
        <div className="prod-buttons">
          <Link to="/products/seating" className="prod-btn">
            <svg
              className="prod-btn-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#333"
            >
              <path d="M4 17h16v-2H4v2zm2-4h12V7H6v6zm10 0V9H8v4h8zM5 6h14v2H5V6zm0 11h2v3H5v-3zm12 0h2v3h-2v-3z"/>
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
              <rect x="3" y="5" width="18" height="14" rx="1" stroke="#333" strokeWidth="1" fill="none"/>
              <rect x="6" y="8" width="4" height="3" fill="#333"/>
              <rect x="14" y="8" width="4" height="3" fill="#333"/>
              <rect x="6" y="14" width="4" height="3" fill="#333"/>
              <rect x="14" y="14" width="4" height="3" fill="#333"/>
            </svg>
            <div className="prod-btn-label">Casegoods</div>
          </Link>
        </div>
      </div>
    </div>
  );
}

//
// ─── PRODUCTS Placeholder Pages ─────────────────────────────────────────────────
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
  const fileInputRef = useRef(null);
  const [photoFile, setPhotoFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [soNumber, setSoNumber] = useState("");
  const [lineItem, setLineItem] = useState("");
  const [notes, setNotes] = useState("");

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

      {/* REPLACEMENTS heading at top */}
      <h1 className="documents-heading">REPLACEMENTS</h1>

      <div className="content-page">
        {!photoFile ? (
          <>
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
                    <path d="M20 4h-3.17l-1.84-2H8.99L7.15 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 14H4V6h4.17l1.83-2h4.01l1.83 2H20v12z"/>
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

      {/* SSA heading at top */}
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

          {/* Submit button */}
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

      {/* SAMPLES heading at top */}
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
// ─── MAIN APP (Router Setup & Leads State & Viewport Lock) ────────────────────
//
function App() {
  // Holds an array of all “New Lead” submissions
  const [leads, setLeads] = useState([]);

  // Called by NewLeadsPage to add a new lead
  const addLead = (leadObj) => {
    setLeads((prev) => [...prev, leadObj]);
  };

  // Disable pinch/zoom by setting viewport meta tag on initial mount
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

          {/* SALES (with leads passed in) */}
          <Route path="/sales" element={<SalesPage leads={leads} />} />

          {/* NEW LEADS FORM */}
          <Route
            path="/sales/new-leads"
            element={<NewLeadsPage addLead={addLead} />}
          />

          {/* REWARDS */}
          <Route path="/sales/rewards" element={<RewardsPage />} />

          {/* COMMISSIONS */}
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
        </Routes>
      </Router>
    </div>
  );
}

export default App;
