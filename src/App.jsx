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
        <h1>Sales Analytics</h1>
        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h3>This Month</h3>
            <p className="big-number">$45,230</p>
            <p>+12% from last month</p>
          </div>
          <div className="dashboard-card">
            <h3>Top Products</h3>
            <p>Fabric A – $12,500</p>
            <p>Fabric B – $8,900</p>
            <p>Fabric C – $6,750</p>
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
  // Ref to the hidden file-input
  const fileInputRef = useRef(null);

  // State to hold the chosen photo
  const [photoFile, setPhotoFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  // State for form fields
  const [soNumber, setSoNumber] = useState("");
  const [lineItem, setLineItem] = useState("");
  const [notes, setNotes] = useState("");

  // When user taps “Take Photo”, trigger the hidden file input
  const handleTakePhoto = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // When user picks (or snaps) a photo, show the form
  const handleFileChosen = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  // On form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // RIGHT NOW: just log data and alert. In real life, you'd upload to your server.
    console.log({
      soNumber,
      lineItem,
      notes,
      photoFile
    });
    alert("Replacement form submitted!");
    // Reset everything for next time (or you could redirect elsewhere)
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
          // STEP 1: Show “Take Photo” and “Upload” buttons
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

              {/* Hidden file input (camera + gallery) */}
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
          // STEP 2: Show form once a photo is selected
          <div className="form-container">
            <h1 className="section-title">REPLACEMENT DETAILS</h1>

            {/* Image preview at top */}
            {previewUrl && (
              <img src={previewUrl} alt="Preview" className="image-preview" />
            )}

            <form onSubmit={handleSubmit}>
              {/* SO Number */}
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

              {/* Line Item Number */}
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

              {/* Notes (longer description) */}
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

              {/* Submit button */}
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
