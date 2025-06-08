// src/App.js
import React, { useState, useCallback, useMemo, createContext, useContext } from 'react';
import './App.css';
import { MousePointer, PieChart, Clock, Folder, Swatch, Box, Wrench, MessageSquare, Users } from 'react-feather';

// ThemeContext.js
const ThemeContext = createContext();

const lightTheme = {
  colors: {
    background: '#F0EFEF',
    surface: 'rgba(255, 255, 255, 0.6)',
    primary: '#2A2A2A',
    secondary: '#7A7A7A',
    accent: '#B99962',
    accentHover: '#A38551',
    subtle: 'rgba(230, 230, 230, 0.5)',
    textPrimary: '#2A2A2A',
    textSecondary: '#7A7A7A',
    border: 'rgba(255, 255, 255, 0.8)',
    shadow: 'rgba(0, 0, 0, 0.1)',
  },
  backdropFilter: 'blur(16px) saturate(180%)',
};

const darkTheme = {
  colors: {
    background: '#212529',
    surface: 'rgba(40, 40, 40, 0.6)',
    primary: '#F5F5F5',
    secondary: '#A0A0A0',
    accent: '#D4B37F',
    accentHover: '#E0C49A',
    subtle: 'rgba(50, 50, 50, 0.5)',
    textPrimary: '#F5F5F5',
    textSecondary: '#A0A0A0',
    border: 'rgba(255, 255, 255, 0.1)',
    shadow: 'rgba(0, 0, 0, 0.2)',
  },
  backdropFilter: 'blur(16px) saturate(180%)',
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const theme = isDarkMode ? darkTheme : lightTheme;
  const toggleTheme = useCallback(() => setIsDarkMode(prev => !prev), []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

// Constants.js
const MENU_ITEMS = [
  { id: 'orders', icon: MousePointer, label: 'Orders' },
  { id: 'sales', icon: PieChart, label: 'Sales' },
  { id: 'lead-times', icon: Clock, label: 'Lead Times' },
  { id: 'projects', icon: Folder, label: 'Projects' },
  { id: 'fabrics', icon: Swatch, label: 'Fabrics' },
  { id: 'resources', icon: Box, label: 'Resources' },
  { id: 'samples', icon: Wrench, label: 'Samples' },
  { id: 'replacements', icon: Wrench, label: 'Replacements' },
  { id: 'feedback', icon: MessageSquare, label: 'Feedback' },
  { id: 'members', icon: Users, label: 'Members' },
];

const ORDER_DATA = [
  {
    date: 'THU, JUN 5, 2025',
    amount: '$643.80',
    company: 'CORPORATE DESIGN INC',
    companyLower: 'corporate design inc',
    details: 'ONE MAIN FINANCIAL',
    detailsLower: 'one main financial',
    orderNumber: '449518',
  },
  {
    date: 'WED, JUN 4, 2025',
    amount: '$1,345.20',
    company: 'GLOBAL INTERIORS',
    companyLower: 'global interiors',
    details: 'PROJECT ALPHA',
    detailsLower: 'project alpha',
    orderNumber: '449517',
  },
];

const INITIAL_OPPORTUNITIES = [
  { name: 'Project Delta', company: 'TechCorp', contact: 'John Doe', value: 50000, stage: 'Proposal' },
  { name: 'Expansion Plan', company: 'Global Inc', contact: 'Jane Smith', value: 75000, stage: 'Negotiation' },
];

const INITIAL_MEMBERS = [
  { id: 1, name: 'John Smith', role: 'Designer' },
  { id: 2, name: 'Emma Johnson', role: 'Manager' },
];

const STAGES = ['Prospect', 'Proposal', 'Negotiation', 'Won', 'Lost'];
const EMPTY_OPPORTUNITY = { name: '', company: '', contact: '', value: '', stage: 'Prospect' };

// Components
const GlassCard = React.memo(({ children, className = '', ...props }) => {
  const { theme } = useTheme();
  return (
    <div
      className={`glass-card ${className}`}
      style={{
        backgroundColor: theme.colors.surface,
        borderColor: theme.colors.border,
      }}
      {...props}
    >
      {children}
    </div>
  );
});

const ScreenWrapper = React.memo(({ children }) => {
  const { theme } = useTheme();
  return (
    <div
      className="min-h-full p-4"
      style={{
        backgroundColor: theme.colors.background,
        color: theme.colors.textPrimary,
      }}
    >
      {children}
    </div>
  );
});

const AppHeader = React.memo(({ onHomeClick, onProfileClick }) => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="flex justify-between items-center mb-4">
      <button onClick={onHomeClick}>
        <img src="https://via.placeholder.com/40" alt="Logo" className="h-10" />
      </button>
      <div className="flex space-x-2">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full glass-card"
          style={{ backgroundColor: theme.colors.subtle }}
        >
          {theme === lightTheme ? '🌙' : '☀️'}
        </button>
        <button onClick={onProfileClick}>
          <img src="https://via.placeholder.com/40" alt="Profile" className="h-10 rounded-full" />
        </button>
      </div>
    </div>
  );
});

const PageTitle = React.memo(({ title, subtitle }) => {
  const { theme } = useTheme();
  return (
    <div className="mb-4">
      <h1 className="text-2xl font-bold" style={{ color: theme.colors.textPrimary }}>
        {title}
      </h1>
      {subtitle && (
        <p className="text-sm" style={{ color: theme.colors.textSecondary }}>
          {subtitle}
        </p>
      )}
    </div>
  );
});

const SearchInput = React.memo(({ value, onChange, placeholder }) => {
  const { theme } = useTheme();
  return (
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full p-3 pr-10 rounded-lg glass-card text-sm"
        style={{
          backgroundColor: theme.colors.subtle,
          color: theme.colors.textPrimary,
          borderColor: theme.colors.border,
        }}
      />
      <span className="absolute right-3 top-1/2 transform -translate-y-1/2">🔍</span>
    </div>
  );
});

const FormInput = React.memo(({ label, type = 'text', value, onChange, options }) => {
  const { theme } = useTheme();
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1" style={{ color: theme.colors.textPrimary }}>
        {label}
      </label>
      {type === 'select' ? (
        <select
          value={value}
          onChange={onChange}
          className="w-full p-3 rounded-lg glass-card"
          style={{
            backgroundColor: theme.colors.subtle,
            color: theme.colors.textPrimary,
            borderColor: theme.colors.border,
          }}
        >
          {options.map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          value={value}
          onChange={onChange}
          className="w-full p-3 rounded-lg glass-card"
          style={{
            backgroundColor: theme.colors.subtle,
            color: theme.colors.textPrimary,
            borderColor: theme.colors.border,
          }}
        />
      )}
    </div>
  );
});

const DonutChart = React.memo(({ data }) => {
  const { theme } = useTheme();
  const total = useMemo(() => data.reduce((acc, item) => acc + item.value, 0), [data]);
  const size = 150;
  const strokeWidth = 20;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const segments = useMemo(() => {
    let cumulative = 0;
    return data.map(item => {
      const dashoffset = circumference * (1 - cumulative / total);
      const dasharray = (circumference * item.value) / total;
      cumulative += item.value;
      return { ...item, dashoffset, dasharray };
    });
  }, [data, total, circumference]);

  return (
    <div className="flex items-center space-x-4">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {segments.map((item, index) => (
            <circle
              key={index}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={item.color}
              strokeWidth={strokeWidth}
              strokeDasharray={`${item.dasharray} ${circumference}`}
              strokeDashoffset={item.dashoffset}
              transform={`rotate(-90 ${size / 2} ${size / 2})`}
            />
          ))}
        </svg>
      </div>
      <div className="space-y-2">
        {data.map(item => (
          <div key={item.label} className="flex items-center">
            <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }} />
            <div>
              <p className="text-sm font-semibold" style={{ color: theme.colors.textPrimary }}>
                {item.label}
              </p>
              <p className="text-xs" style={{ color: theme.colors.textSecondary }}>
                ${item.value.toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

const Modal = React.memo(({ show, onClose, title, children }) => {
  const { theme } = useTheme();
  if (!show) return null;
  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
    >
      <div
        className="w-full max-w-md p-6 rounded-lg glass-card"
        style={{
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
        }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold" style={{ color: theme.colors.textPrimary }}>
            {title}
          </h2>
          <button onClick={onClose} style={{ color: theme.colors.textSecondary }}>
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
});

const ProfileMenu = React.memo(({ show, onClose, onNavigate }) => {
  const { theme } = useTheme();
  if (!show) return null;
  return (
    <div
      className="fixed inset-x-0 bottom-0 p-4 glass-card"
      style={{
        backgroundColor: theme.colors.surface,
        borderColor: theme.colors.border,
      }}
    >
      {MENU_ITEMS.map(item => (
        <button
          key={item.id}
          onClick={() => onNavigate(item.id)}
          className="flex items-center w-full p-3 hover:bg-opacity-80 rounded-lg transition-colors"
          style={{ color: theme.colors.textPrimary }}
        >
          <item.icon className="mr-2" size={20} />
          {item.label}
        </button>
      ))}
    </div>
  );
});

// Screen Components
const HomeScreen = React.memo(({ onNavigate, setShowNewOpportunityModal }) => {
  const { theme } = useTheme();
  return (
    <ScreenWrapper>
      <PageTitle title="Dashboard" subtitle="Welcome back!" />
      <div className="grid grid-cols-2 gap-3">
        {MENU_ITEMS.map(item => (
          <GlassCard
            key={item.id}
            className="p-4 flex flex-col items-center justify-center cursor-pointer"
            onClick={() => onNavigate(item.id)}
          >
            <item.icon size={24} style={{ color: theme.colors.accent }} />
            <p className="text-sm font-medium mt-2" style={{ color: theme.colors.textPrimary }}>
              {item.label}
            </p>
          </GlassCard>
        ))}
      </div>
      <button
        onClick={() => setShowNewOpportunityModal(true)}
        className="mt-4 w-full text-white font-bold py-3 px-6 rounded-lg glass-card"
        style={{ backgroundColor: theme.colors.accent }}
      >
        New Opportunity
      </button>
    </ScreenWrapper>
  );
});

const OrdersScreen = React.memo(({ onHomeClick, onProfileClick }) => {
  const { theme } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOrders = useMemo(() => {
    if (!searchTerm) return ORDER_DATA;
    const term = searchTerm.toLowerCase();
    return ORDER_DATA.filter(
      order =>
        order.companyLower.includes(term) ||
        order.detailsLower.includes(term) ||
        order.orderNumber.includes(searchTerm)
    );
  }, [searchTerm]);

  return (
    <ScreenWrapper>
      <AppHeader onHomeClick={onHomeClick} onProfileClick={onProfileClick} />
      <PageTitle title="Orders" subtitle="Review recent order history." />
      <div className="px-4 pb-4">
        <SearchInput
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder="Search by company, details..."
        />
      </div>
      <div className="px-4 space-y-3 pb-4">
        {filteredOrders.map(order => (
          <GlassCard key={order.orderNumber} className="overflow-hidden">
            <div className="p-4">
              <div className="flex justify-between items-center">
                <p className="font-semibold" style={{ color: theme.colors.textPrimary }}>
                  {order.details}
                </p>
                <p className="font-bold text-lg" style={{ color: theme.colors.accent }}>
                  {order.amount}
                </p>
              </div>
              <p className="text-sm" style={{ color: theme.colors.textSecondary }}>
                {order.company}
              </p>
            </div>
            <div className="px-4 py-2" style={{ backgroundColor: theme.colors.subtle }}>
              <p className="text-xs font-medium" style={{ color: theme.colors.textSecondary }}>
                {order.date} · #{order.orderNumber}
              </p>
            </div>
          </GlassCard>
        ))}
      </div>
    </ScreenWrapper>
  );
});

const SalesScreen = React.memo(({ onHomeClick, onProfileClick }) => {
  const { theme } = useTheme();
  const chartData = [
    { label: 'Furniture', value: 25000, color: '#B99962' },
    { label: 'Decor', value: 15000, color: '#7A7A7A' },
    { label: 'Lighting', value: 10000, color: '#D4B37F' },
  ];

  return (
    <ScreenWrapper>
      <AppHeader onHomeClick={onHomeClick} onProfileClick={onProfileClick} />
      <PageTitle title="Sales" subtitle="Sales performance overview." />
      <div className="px-4">
        <GlassCard className="p-4">
          <DonutChart data={chartData} />
        </GlassCard>
      </div>
    </ScreenWrapper>
  );
});

const LeadTimesScreen = React.memo(({ onHomeClick, onProfileClick }) => {
  const { theme } = useTheme();
  return (
    <ScreenWrapper>
      <AppHeader onHomeClick={onHomeClick} onProfileClick={onProfileClick} />
      <PageTitle title="Lead Times" subtitle="Track production timelines." />
      <div className="px-4">
        <GlassCard className="p-4">
          <p style={{ color: theme.colors.textPrimary }}>Lead times data goes here.</p>
        </GlassCard>
      </div>
    </ScreenWrapper>
  );
});

const ProjectsScreen = React.memo(({ onHomeClick, onProfileClick }) => {
  const { theme } = useTheme();
  return (
    <ScreenWrapper>
      <AppHeader onHomeClick={onHomeClick} onProfileClick={onProfileClick} />
      <PageTitle title="Projects" subtitle="Manage ongoing projects." />
      <div className="px-4">
        <GlassCard className="p-4">
          <p style={{ color: theme.colors.textPrimary }}>Projects data goes here.</p>
        </GlassCard>
      </div>
    </ScreenWrapper>
  );
});

const FabricsScreen = React.memo(({ onHomeClick, onProfileClick }) => {
  const { theme } = useTheme();
  return (
    <ScreenWrapper>
      <AppHeader onHomeClick={onHomeClick} onProfileClick={onProfileClick} />
      <PageTitle title="Fabrics" subtitle="Browse fabric options." />
      <div className="px-4">
        <GlassCard className="p-4">
          <p style={{ color: theme.colors.textPrimary }}>Fabrics data goes here.</p>
        </GlassCard>
      </div>
    </ScreenWrapper>
  );
});

const ResourcesScreen = React.memo(({ onHomeClick, onProfileClick }) => {
  const { theme } = useTheme();
  return (
    <ScreenWrapper>
      <AppHeader onHomeClick={onHomeClick} onProfileClick={onProfileClick} />
      <PageTitle title="Resources" subtitle="Access resources." />
      <div className="px-4">
        <GlassCard className="p-4">
          <p style={{ color: theme.colors.textPrimary }}>Resources data goes here.</p>
        </GlassCard>
      </div>
    </ScreenWrapper>
  );
});

const SamplesScreen = React.memo(({ onHomeClick, onProfileClick }) => {
  const { theme } = useTheme();
  return (
    <ScreenWrapper>
      <AppHeader onHomeClick={onHomeClick} onProfileClick={onProfileClick} />
      <PageTitle title="Samples" subtitle="Request samples." />
      <div className="px-4">
        <GlassCard className="p-4">
          <p style={{ color: theme.colors.textPrimary }}>Samples data goes here.</p>
        </GlassCard>
      </div>
    </ScreenWrapper>
  );
});

const ReplacementsScreen = React.memo(({ onHomeClick, onProfileClick }) => {
  const { theme } = useTheme();
  return (
    <ScreenWrapper>
      <AppHeader onHomeClick={onHomeClick} onProfileClick={onProfileClick} />
      <PageTitle title="Replacements" subtitle="Manage replacements." />
      <div className="px-4">
        <GlassCard className="p-4">
          <p style={{ color: theme.colors.textPrimary }}>Replacements data goes here.</p>
        </GlassCard>
      </div>
    </ScreenWrapper>
  );
});

const FeedbackScreen = React.memo(({ onHomeClick, onProfileClick }) => {
  const { theme } = useTheme();
  return (
    <ScreenWrapper>
      <AppHeader onHomeClick={onHomeClick} onProfileClick={onProfileClick} />
      <PageTitle title="Feedback" subtitle="Provide feedback." />
      <div className="px-4">
        <GlassCard className="p-4">
          <p style={{ color: theme.colors.textPrimary }}>Feedback form goes here.</p>
        </GlassCard>
      </div>
    </ScreenWrapper>
  );
});

const MembersScreen = React.memo(({ onHomeClick, onProfileClick, members, onUpdateRole }) => {
  const { theme } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMembers = useMemo(() => {
    if (!searchTerm) return members;
    const term = searchTerm.toLowerCase();
    return members.filter(member => member.name.toLowerCase().includes(term));
  }, [members, searchTerm]);

  return (
    <ScreenWrapper>
      <AppHeader onHomeClick={onHomeClick} onProfileClick={onProfileClick} />
      <PageTitle title="Team Members" subtitle="Manage your team." />
      <div className="px-4 pb-4">
        <SearchInput
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder="Search by name..."
        />
      </div>
      <div className="px-4 space-y-3 pb-4">
        {filteredMembers.map(member => (
          <GlassCard key={member.id} className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold" style={{ color: theme.colors.textPrimary }}>
                  {member.name}
                </p>
                <p className="text-sm" style={{ color: theme.colors.textSecondary }}>
                  {member.role}
                </p>
              </div>
              <select
                value={member.role}
                onChange={e => onUpdateRole(member.id, e.target.value)}
                className="p-2 rounded-lg glass-card"
                style={{
                  backgroundColor: theme.colors.subtle,
                  color: theme.colors.textPrimary,
                  borderColor: theme.colors.border,
                }}
              >
                {['Designer', 'Manager', 'Developer'].map(role => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>
          </GlassCard>
        ))}
      </div>
    </ScreenWrapper>
  );
});

function App() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [showNewOpportunityModal, setShowNewOpportunityModal] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [newOpportunity, setNewOpportunity] = useState(EMPTY_OPPORTUNITY);
  const [members, setMembers] = useState(INITIAL_MEMBERS);

  const handleNavigate = useCallback((screen) => {
    setCurrentScreen(screen);
    setShowProfileMenu(false);
  }, []);

  const handleCreateOpportunity = useCallback(() => {
    if (newOpportunity.name && newOpportunity.company && newOpportunity.value) {
      alert(`Creating opportunity: ${newOpportunity.name}`);
      setNewOpportunity(EMPTY_OPPORTUNITY);
      setShowNewOpportunityModal(false);
    }
  }, [newOpportunity]);

  const updateNewOpportunity = useCallback((field, value) => {
    setNewOpportunity(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleUpdateRole = useCallback((memberId, newRole) => {
    setMembers(prevMembers => prevMembers.map(m => (m.id === memberId ? { ...m, role: newRole } : m)));
  }, []);

  const renderScreen = () => {
    const commonProps = {
      onNavigate: handleNavigate,
      onHomeClick: () => handleNavigate('home'),
      onProfileClick: () => setShowProfileMenu(true),
      setShowNewOpportunityModal,
      members,
      onUpdateRole: handleUpdateRole,
    };

    const ScreenComponent = {
      home: HomeScreen,
      orders: OrdersScreen,
      sales: SalesScreen,
      'lead-times': LeadTimesScreen,
      projects: ProjectsScreen,
      fabrics: FabricsScreen,
      resources: ResourcesScreen,
      samples: SamplesScreen,
      replacements: ReplacementsScreen,
      feedback: FeedbackScreen,
      members: MembersScreen,
    }[currentScreen];

    return ScreenComponent ? <ScreenComponent {...commonProps} /> : <HomeScreen {...commonProps} />;
  };

  return (
    <ThemeProvider>
      <div className="font-sans flex items-center justify-center min-h-screen p-4">
        <div
          className="w-full max-w-sm h-[812px] rounded-[40px] shadow-2xl overflow-hidden relative border-8"
          style={{
            borderColor: useTheme().isDarkMode ? '#000000' : '#FFFFFF',
            backgroundImage: `url('https://www.transparenttextures.com/patterns/concrete-wall.png')`,
          }}
        >
          <div className="w-full h-full overflow-y-auto scrollbar-hide">
            {renderScreen()}
          </div>
          <ProfileMenu
            show={showProfileMenu}
            onClose={() => setShowProfileMenu(false)}
            onNavigate={handleNavigate}
          />
          <Modal
            show={showNewOpportunityModal}
            onClose={() => setShowNewOpportunityModal(false)}
            title="New Opportunity"
          >
            <FormInput
              label="Opportunity Name"
              value={newOpportunity.name}
              onChange={e => updateNewOpportunity('name', e.target.value)}
            />
            <FormInput
              label="Company"
              value={newOpportunity.company}
              onChange={e => updateNewOpportunity('company', e.target.value)}
            />
            <FormInput
              label="Contact"
              value={newOpportunity.contact}
              onChange={e => updateNewOpportunity('contact', e.target.value)}
            />
            <FormInput
              label="Value ($)"
              type="number"
              value={newOpportunity.value}
              onChange={e => updateNewOpportunity('value', e.target.value)}
            />
            <FormInput
              label="Stage"
              type="select"
              options={STAGES.filter(s => s !== 'Won' && s !== 'Lost')}
              value={newOpportunity.stage}
              onChange={e => updateNewOpportunity('stage', e.target.value)}
            />
            <div className="pt-4">
              <button
                onClick={handleCreateOpportunity}
                className="w-full text-white font-bold py-3 px-6 rounded-lg transition-colors glass-card"
                style={{ backgroundColor: useTheme().theme.colors.accent }}
              >
                Create Opportunity
              </button>
            </div>
          </Modal>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;

// src/App.css
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.glass-card {
  border-radius: 1rem;
  border: 1px solid var(--border-color);
  box-shadow: 0 4px 30px var(--shadow-color);
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
}
