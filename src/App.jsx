import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-[#f6f5f3] text-neutral-900 font-sans px-4 py-6">
      <header className="mb-8 text-center">
        <img src="/favicon.svg" alt="JSI Logo" className="mx-auto h-12 mb-3" />
        <h1 className="text-3xl font-bold tracking-tight">MyJSI</h1>
        <p className="text-sm text-neutral-500">All your tools in one sleek space</p>
      </header>

      <div className="grid grid-cols-2 gap-4">
        {apps.map((app) => (
          <button
            key={app.name}
            className="bg-white rounded-2xl p-4 shadow hover:shadow-md transition text-left flex flex-col justify-between min-h-[110px]"
          >
            <div>
              <h2 className="text-lg font-semibold mb-1">{app.name}</h2>
              <p className="text-xs text-neutral-500 leading-tight">{app.desc}</p>
            </div>
            <div className="text-right text-neutral-300 text-sm mt-2">{app.tag}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

const apps = [
  {
    name: 'Orders',
    desc: 'Track NESDs, add to calendar, view statuses',
    tag: 'Logistics'
  },
  {
    name: 'Sales',
    desc: 'Spiff rewards, backlog, bookings & goals',
    tag: 'Analytics'
  },
  {
    name: 'Fabrics',
    desc: 'Approved patterns, suppliers, search filters',
    tag: 'Materials'
  },
  {
    name: 'SSA',
    desc: 'Request discounts, track approvals',
    tag: 'Pricing'
  },
  {
    name: 'Lead Times',
    desc: 'View or search product timelines',
    tag: 'Production'
  },
  {
    name: 'Resources',
    desc: 'Contracts, instructions, presentations',
    tag: 'Docs'
  },
  {
    name: 'Products',
    desc: 'View all collections and categories',
    tag: 'Catalog'
  },
  {
    name: 'Samples',
    desc: 'Request samples directly',
    tag: 'Material'
  },
  {
    name: 'Replacement',
    desc: 'Warranty claims and parts request',
    tag: 'Service'
  },
  {
    name: 'Dealer Directory',
    desc: 'See and manage all signed-up dealers',
    tag: 'CRM'
  },
];

export default App;
