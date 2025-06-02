import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-[#f6f5f3] font-sans">
      <header className="bg-neutral-800 text-white px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <img src="/favicon.svg" alt="JSI Logo" className="h-6" />
          <span className="text-xl font-semibold">MyJSI</span>
        </div>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a8.25 8.25 0 0115 0"
            />
          </svg>
        </div>
      </header>

      <main className="px-6 py-6 grid grid-cols-2 gap-4">
        {apps.map((app) => (
          <button
            key={app.name}
            className="bg-[#d9d0c8] rounded-xl p-6 flex flex-col items-center justify-center text-center shadow-sm"
          >
            <img src={app.icon} alt="" className="h-10 mb-2 opacity-90" />
            <span className="text-sm font-medium text-neutral-800 lowercase tracking-wide">
              {app.name}
            </span>
          </button>
        ))}
      </main>
    </div>
  );
}

const apps = [
  { name: 'orders', icon: '/icons/orders.svg' },
  { name: 'sales', icon: '/icons/sales.svg' },
  { name: 'lead times', icon: '/icons/lead-times.svg' },
  { name: 'fabrics', icon: '/icons/fabrics.svg' },
  { name: 'ssa', icon: '/icons/ssa.svg' },
  { name: 'documents', icon: '/icons/documents.svg' },
  { name: 'samples', icon: '/icons/samples.svg' },
  { name: 'replacement', icon: '/icons/replacement.svg' },
];

export default App;
