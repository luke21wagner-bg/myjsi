import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-[#f6f5f3] font-sans text-neutral-900 px-4 py-6">
      <header className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <img src="/favicon.svg" alt="JSI Logo" className="h-6" />
          <h1 className="text-xl font-semibold">MyJSI</h1>
        </div>
        <div className="w-6 h-6 rounded-full bg-neutral-300" />
      </header>

      <main className="grid grid-cols-2 gap-4">
        {apps.map((app) => (
          <button
            key={app.name}
            className="bg-[#d9d0c8] rounded-xl p-6 shadow text-center"
          >
            <div className="w-8 h-8 mx-auto mb-2 bg-white rounded" />
            <span className="text-sm lowercase">{app.name}</span>
          </button>
        ))}
      </main>
    </div>
  );
}

const apps = [
  { name: 'orders' },
  { name: 'sales' },
  { name: 'lead times' },
  { name: 'fabrics' },
  { name: 'ssa' },
  { name: 'documents' },
  { name: 'samples' },
  { name: 'replacement' },
];

export default App;
