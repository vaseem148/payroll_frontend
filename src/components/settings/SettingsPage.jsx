import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon, Globe, Bell, Shield, Database, ChevronRight, Palette } from 'lucide-react';

const f = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.35 } } };
const s = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } };

export default function SettingsPage() {
  const { theme, toggleTheme } = useTheme();
  const sections = [
    { title: 'Notifications', icon: Bell, desc: 'Email alerts, push notifications, and in-app preferences.', color: '#f59e0b', bg: '#fef3c7' },
    { title: 'Security & Access', icon: Shield, desc: 'Two-factor auth, passwords, API keys, sessions.', color: '#e11d48', bg: '#ffe4e6' },
    { title: 'Data & Privacy', icon: Database, desc: 'Data export, retention policies, GDPR compliance.', color: '#059669', bg: '#d1fae5' },
    { title: 'Localization', icon: Globe, desc: 'Language, timezone, date format, currency.', color: '#0ea5e9', bg: '#e0f2fe' },
  ];
  return (
    <motion.div variants={s} initial="hidden" animate="show">
      <motion.div variants={f} className="card p-7 mb-7">
        <div className="flex items-center gap-2.5 mb-5">
          <Palette className="w-5 h-5" style={{ color: '#6c4cff' }} />
          <h3 className="text-[16px] font-bold" style={{ color: 'var(--text-primary)' }}>Appearance</h3>
        </div>
        <p className="text-[13px] mb-5" style={{ color: 'var(--text-secondary)' }}>Choose how PayrollX looks for you.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg">
          {[{ l: 'Light Mode', d: 'Clean, bright interface', I: Sun, v: 'light' }, { l: 'Dark Mode', d: 'Easy on the eyes', I: Moon, v: 'dark' }].map(t => (
            <button key={t.v} onClick={theme !== t.v ? toggleTheme : undefined}
              className="flex items-center gap-4 p-5 rounded-2xl text-left transition-all"
              style={{
                background: theme === t.v ? 'rgba(108,76,255,0.06)' : 'var(--bg-input)',
                border: `2px solid ${theme === t.v ? '#6c4cff' : 'var(--border-color)'}`,
              }}>
              <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: theme === t.v ? '#6c4cff' : 'var(--bg-card-hover)' }}>
                <t.I className="w-5 h-5" style={{ color: theme === t.v ? '#fff' : 'var(--text-muted)' }} />
              </div>
              <div>
                <p className="text-[14px] font-semibold" style={{ color: theme === t.v ? '#6c4cff' : 'var(--text-secondary)' }}>{t.l}</p>
                <p className="text-[11.5px] mt-0.5" style={{ color: 'var(--text-muted)' }}>{t.d}</p>
              </div>
            </button>
          ))}
        </div>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {sections.map(sec => (
          <motion.div key={sec.title} variants={f} className="card card-hover p-7">
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0" style={{ background: sec.bg }}>
                <sec.icon className="w-5 h-5" style={{ color: sec.color }} />
              </div>
              <div className="flex-1">
                <h3 className="text-[15px] font-bold mb-1" style={{ color: 'var(--text-primary)' }}>{sec.title}</h3>
                <p className="text-[12.5px] leading-relaxed" style={{ color: 'var(--text-muted)' }}>{sec.desc}</p>
                <button className="mt-4 flex items-center gap-1.5 text-[12.5px] font-semibold" style={{ color: '#6c4cff' }}>Configure <ChevronRight className="w-3.5 h-3.5" /></button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
