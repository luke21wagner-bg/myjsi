import React, { useRef, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./index.css";

//
// ─── HOME PAGE ────────────────────────────────────────────────────────────────
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
          <Link key={i} to={`/${a.slug}`} className="tile">
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
    "COMMERCIAL OFFICE ENVIRONMENTS - Microsoft - 447002",
    // …add more as needed
  ];

  const todayDate = "Fri - May 30, 2025";
  const todayTotal = "$137,262.94";
  const [searchTerm, setSearchTerm] = useState("");

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

      <div className="orders-header-row">
        <span className="orders-date">{todayDate}</span>
        <span className="orders-total">{todayTotal}</span>
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

// ─── DOCUMENTS PAGE ─────────────────────────────────────────────────────────
function DocumentsPage() {
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

      <div className="content-page documents-page">
        <h1 className="documents-heading">DOCUMENTS</h1>

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

// ─── SALES PAGE ────────────────────────────────────────────────────────────────
//
function SalesPage() {
  const [year, setYear] = useState(2025);

  const salesData = [
    { month: "Jan", bookings: "$1,259,493", sales: "$506,304" },
    { month: "Feb", bookings: "$497,537", sales: "$553,922" },
    { month: "Mar", bookings: "$400,110", sales: "$365,601" },
    { month: "Apr", bookings: "$554,318", sales: "$696,628" },
    { month: "May", bookings: "$869,362", sales: "$1,340,018" },
    { month: "Jun", bookings: "$0",      sales: "$0"       },
  ];

  const totalBookings = salesData
    .reduce((sum, row) => sum + Number(row.bookings.replace(/[\$,]/g, "")), 0);
  const totalSales = salesData
    .reduce((sum, row) => sum + Number(row.sales.replace(/[\$,]/g, "")), 0);

  const formatCurrency = (num) => {
    return `$${num.toLocaleString()}`;
  };

  const goalAmount = 7000000;
  const percentAchieved = ((totalSales / goalAmount) * 100).toFixed(2); // ~49.46%
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

//
// ─── LEAD TIMES PAGE ───────────────────────────────────────────────────────────
//
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

//
// ─── REPLACEMENT PAGE ──────────────────────────────────────────────────────────
//
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
// ─── SSA PAGE ──────────────────────────────────────────────────────────────────
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
    notes: "",
  });

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("SSA form submitted:", form);
    alert("SSA form submitted! Check console for data.");
  }

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

      <div className="content-page ssa-page">
        <h1 className="ssa-heading">SSA</h1>

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
// ─── GENERIC PAGE (for Fabrics, Documents, Samples) ────────────────────────────
//
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

//
// ─── APP (Router Setup) ─────────────────────────────────────────────────────────
//
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/sales" element={<SalesPage />} />
        <Route path="/lead-times" element={<LeadTimesPage />} />
        <Route path="/fabrics" element={<GenericPage title="Fabrics" />} />
        <Route path="/ssa" element={<SSAPage />} />
        <Route path="/documents" element={<DocumentsPage />} />
        <Route path="/replacements" element={<ReplacementPage />} />
        <Route path="/samples" element={<GenericPage title="Samples" />} />
      </Routes>
    </Router>
  );
}

export default App;
