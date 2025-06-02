import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-[#f6f5f3] text-neutral-900 font-sans px-4 py-6">
      <header className="mb-6 text-center">
        <img src="/favicon.svg" alt="JSI Logo" className="mx-auto h-10 mb-2" />
        <h1 className="text-2xl font-bold tracking-tight">MyJSI</h1>
        <p className="text-xs text-neutral-500">All your tools in one place</p>
      </header>

      <div className="flex flex-col gap-3">
        {apps.map((app) => (
          <button
            key={app.name}
            className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition text-left"
          >
            <h2 className="text-base font-semibold mb-1">{app.name}</h2>
            <p className="text-xs text-neutral-500 leading-tight">{app.desc}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

const apps = [
  { name: 'Orders', desc: 'Track NESDs, calendar sync, statuses' },
  { name: 'Sales', desc: 'Rewards, bookings, goals' },
  { name: 'Fabrics', desc: 'Patterns, suppliers, filtering' },
  { name: 'SSA', desc: 'Discount requests & approvals' },
  { name: 'Lead Times', desc: 'View/search product timelines' },
  { name: 'Resources', desc: 'Contracts, instructions, and docs' },
  { name: 'Products', desc: 'Explore collections & categories' },
  { name: 'Samples', desc: 'Request material samples' },
  { name: 'Replacement', desc: 'Warranty & part requests' },
  { name: 'Dealer Directory', desc: 'Manage dealers & contacts' },
];

export default App;
