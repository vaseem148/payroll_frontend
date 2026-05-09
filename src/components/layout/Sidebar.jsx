import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, Users, CalendarCheck, Wallet,
  UserPlus, Settings, ChevronLeft, ChevronRight,
  Rocket, ClipboardList, BarChart3, Receipt,
  Shield, ExternalLink
} from 'lucide-react';

const mainNav = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/employees', label: 'Employees', icon: Users },
  { path: '/attendance', label: 'Attendance', icon: CalendarCheck },
  { path: '/payroll', label: 'Payroll', icon: Wallet },
  { path: '/payslip', label: 'Payslip', icon: Receipt },
  { path: '/payroll-calendar', label: 'Payroll Calendar', icon: ClipboardList },
  { path: '/reports', label: 'Report and Analytics', icon: BarChart3 },
  { path: '/tax', label: 'Tax & Compliance', icon: Shield },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 240 }}
      transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
      className="fixed left-0 top-0 bottom-0 z-40 flex flex-col"
      style={{ background: 'var(--bg-sidebar)', borderRight: '1px solid var(--border-color)' }}
    >
      {/* ── Logo ──────────────────── */}
      <div
        className="flex items-center gap-2.5 shrink-0"
        style={{
          height: 72,
          padding: collapsed ? '0 18px' : '0 22px',
          justifyContent: collapsed ? 'center' : 'flex-start',
        }}
      >
        <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: 'linear-gradient(135deg, #6c4cff, #a896ff)' }}>
          <span className="text-white text-sm font-bold">P</span>
        </div>
        {!collapsed && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[16px] font-bold tracking-tight"
            style={{ color: 'var(--text-primary)' }}
          >
            <span style={{ color: '#6c4cff' }}>P</span>ayroll<span style={{ color: '#6c4cff' }}>X</span>
          </motion.span>
        )}
        {!collapsed && (
          <div className="ml-auto">
            <button
              className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors"
              style={{ color: 'var(--text-muted)', border: '1px solid var(--border-color)' }}
              onClick={() => setCollapsed(true)}
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* ── Nav ───────────────────── */}
      <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
        {mainNav.map((item) => (
          <NavLink key={item.path} to={item.path} end={item.path === '/'}>
            {({ isActive }) => (
              <div
                className={`nav-item ${isActive ? 'active' : ''}`}
                style={collapsed ? { justifyContent: 'center', padding: '11px' } : {}}
                title={collapsed ? item.label : undefined}
              >
                <item.icon className="w-[18px] h-[18px] shrink-0" strokeWidth={isActive ? 2.2 : 1.8} />
                {!collapsed && <span className="truncate">{item.label}</span>}
              </div>
            )}
          </NavLink>
        ))}
      </nav>

      {/* ── Upgrade Card ──────────── */}
      {!collapsed && (
        <div className="px-3 pb-3">
          <div className="upgrade-card">
            <div className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #6c4cff, #a896ff)' }}>
              <Rocket className="w-5 h-5 text-white" />
            </div>
            <p className="text-[12.5px] font-medium mb-3" style={{ color: 'var(--text-secondary)' }}>
              Additional features to<br />enhance your security.
            </p>
            <button className="w-full py-2.5 rounded-xl text-[13px] font-semibold flex items-center justify-center gap-2 transition-colors"
              style={{ background: '#6c4cff', color: '#fff' }}>
              Upgrade Pro <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* ── Settings ──────────────── */}
      <div className="px-3 pb-3">
        <NavLink to="/settings">
          {({ isActive }) => (
            <div
              className={`nav-item ${isActive ? 'active' : ''}`}
              style={collapsed ? { justifyContent: 'center', padding: '11px' } : {}}
            >
              <Settings className="w-[18px] h-[18px] shrink-0" strokeWidth={1.8} />
              {!collapsed && <span>Settings</span>}
            </div>
          )}
        </NavLink>
      </div>

      {/* ── Collapsed Toggle ──────── */}
      {collapsed && (
        <button
          onClick={() => setCollapsed(false)}
          className="flex items-center justify-center h-12 shrink-0 transition-colors"
          style={{ borderTop: '1px solid var(--border-color)', color: 'var(--text-muted)' }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-card-hover)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      )}
    </motion.aside>
  );
}
