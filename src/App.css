import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./index.css";

// HomePage and other app components (orders, sales, etc.) remain unchanged.
// You only need to add SSAPage and modify the route for "/ssa".

function HomePage() {
  const apps = [
    { name: "orders", slug: "orders", iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24"><path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z"/><path d="M5 3L3 5V19L5 21H19L21 19V5L19 3H5Z" stroke="white" stroke-width="0.5" fill="none"/></svg>` },
    { name: "sales", slug: "sales", iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24"><rect x="3" y="6" width="18" height="12" rx="2" fill="white"/><rect x="5" y="8" width="6" height="3" fill="#c4b5a0"/><circle cx="15" cy="12" r="2" fill="#c4b5a0"/></svg>` },
    { name: "lead times", slug: "lead-times", iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" stroke="white" stroke-width="2" fill="none"/><path d="M12 7V12L16 16" stroke="white" stroke-width="2" stroke-linecap="round"/><path d="M8 4L16 4" stroke="white" stroke-width="1.5"/><path d="M4 8L4 16" stroke="white" stroke-width="1.5"/></svg>` },
    { name: "fabrics", slug: "fabrics", iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="1" stroke="white" stroke-width="2" fill="none"/><path d="M8 8L16 16M16 8L8 16" stroke="white" stroke-width="1.5"/><circle cx="8" cy="8" r="1" fill="white"/><circle cx="16" cy="8" r="1" fill="white"/><circle cx="8" cy="16" r="1" fill="white"/><circle cx="16" cy="16" r="1" fill="white"/></svg>` },
    { name: "ssa", slug: "ssa", iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24"><rect x="4" y="6" width="16" height="12" rx="2" stroke="white" stroke-width="2" fill="none"/><path d="M8 9H16M8 12H16M8 15H12" stroke="white" stroke-width="1.5"/><circle cx="18" cy="18" r="3" stroke="white" stroke-width="1.5" fill="none"/><path d="M16.5 18L17.5 19L19.5 17" stroke="white" stroke-width="1" fill="none"/></svg>` },
    { name: "documents", slug: "documents", iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24"><rect x="6" y="4" width="12" height="16" rx="1" stroke="white" stroke-width="2" fill="none"/><rect x="4" y="6" width="12" height="16" rx="1" stroke="white" stroke-width="2" fill="none"/><rect x="2" y="8" width="12" height="16" rx="1" stroke="white" stroke-width="2" fill="none"/></svg>` },
    { name: "replacements", slug: "replacements", iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24"><path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z"/><path d="M5 3L3 5V19L5 21H19L21 19V5L19 3H5Z" stroke="white" stroke-width="0.5" fill="none"/></svg>` },
    { name: "samples", slug: "samples", iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24"><rect x="5" y="5" width="14" height="14" rx="2" stroke="white" stroke-width="2" fill="none"/><rect x="8" y="8" width="3" height="3" fill="white"/><rect x="13" y="8" width="3" height="3" fill="white"/><rect x="8" y="13" width="3" height="3" fill="white"/><rect x="13" y="13" width="3" height="3" fill="white"/></svg>` },
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

// Placeholder for OrdersPage
function OrdersPage() {
  return <div className="page"><header className="topbar">…Orders Page…</header></div>;
}

// Placeholder for SalesPage
function SalesPage() {
  return <div className="page"><header className="topbar">…Sales Page…</header></div>;
}

// Placeholder for LeadTimesPage
function LeadTimesPage() {
  return <div className="page"><header className="topbar">…Lead Times Page…</header></div>;
}

// Placeholder for FabricsPage
function FabricsPage() {
  return <div className="page"><header className="topbar">…Fabrics Page…</header></div>;
}

// Placeholder for DocumentsPage
function DocumentsPage() {
  return <div className="page"><header className="topbar">…Documents Page…</header></div>;
}

// Placeholder for ReplacementsPage
function ReplacementsPage() {
  return <div className="page"><header className="topbar">…Replacements Page…</header></div>;
}

// Placeholder for SamplesPage
function SamplesPage() {
  return <div className="page"><header className="topbar">…Samples Page…</header></div>;
}


// === SSAPage (new fillable form) ===
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


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/sales" element={<SalesPage />} />
        <Route path="/lead-times" element={<LeadTimesPage />} />
        <Route path="/fabrics" element={<FabricsPage />} />
        <Route path="/ssa" element={<SSAPage />} />
        <Route path="/documents" element={<DocumentsPage />} />
        <Route path="/replacements" element={<ReplacementsPage />} />
        <Route path="/samples" element={<SamplesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
