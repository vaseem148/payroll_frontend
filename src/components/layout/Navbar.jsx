import { useTheme } from '../../context/ThemeContext';
import { useLocation } from 'react-router-dom';
import { Sun, Moon, Bell, Search } from 'lucide-react';

const pageTitles = {
  '/': 'Dashboard',
  '/employees': 'Employees',
  '/attendance': 'Attendance',
  '/payroll': 'Payroll',
  '/payslip': 'Payslip',
  '/payroll-calendar': 'Payroll Calendar',
  '/reports': 'Report and Analytics',
  '/tax': 'Tax & Compliance',
  '/onboarding': 'Employee Onboarding',
  '/settings': 'Settings',
};

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const title = pageTitles[location.pathname] || 'PayrollX';

  return (
    <header
      className="sticky top-0 z-30 flex items-center justify-between px-8"
      style={{
        height: 'var(--navbar-height)',
        background: 'var(--bg-navbar)',
        borderBottom: '1px solid var(--border-color)',
      }}
    >
      {/* Left — Welcome & Title */}
      <div>
        <p className="text-[13px]" style={{ color: 'var(--text-muted)' }}>
          Welcome back, Mohamed 👋
        </p>
        <h1 className="text-[20px] font-bold tracking-tight mt-0.5" style={{ color: 'var(--text-primary)' }}>
          {title}
        </h1>
      </div>

      {/* Right — Search, Actions, Profile */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div
          className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl"
          style={{
            background: 'var(--bg-input)',
            border: '1px solid var(--border-color)',
            minWidth: 200,
          }}
        >
          <Search className="w-4 h-4 shrink-0" style={{ color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder="Search now"
            className="bg-transparent outline-none text-[13px] flex-1 min-w-0"
            style={{ color: 'var(--text-primary)' }}
          />
        </div>

        {/* Notifications */}
        <button
          className="relative w-10 h-10 rounded-xl flex items-center justify-center transition-colors"
          style={{ color: 'var(--text-secondary)', border: '1px solid var(--border-color)' }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-input)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
          id="notifications-btn"
        >
          <Bell className="w-[18px] h-[18px]" strokeWidth={1.8} />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full" style={{ background: '#f43f5e', border: '2px solid var(--bg-navbar)' }} />
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors"
          style={{ color: 'var(--text-secondary)', border: '1px solid var(--border-color)' }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-input)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
          id="theme-toggle"
        >
          {theme === 'dark' ? <Sun className="w-[18px] h-[18px]" strokeWidth={1.8} /> : <Moon className="w-[18px] h-[18px]" strokeWidth={1.8} />}
        </button>

        {/* Profile Photo */}
        <div
          className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center cursor-pointer"
          style={{
            background: 'linear-gradient(135deg, #6c4cff, #a896ff)',
            border: '2px solid var(--border-color)',
          }}
        >
          <span className="text-white text-[12px] font-bold">MV</span>
        </div>
      </div>
    </header>
  );
}
