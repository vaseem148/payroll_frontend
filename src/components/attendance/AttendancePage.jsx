import { motion } from 'framer-motion';
import { CalendarCheck, Clock, UserCheck, UserX, Download, Filter, ChevronLeft, ChevronRight, Calendar } from 'lucide-react';

const data = [
  { id: 1, name: 'Aria Patel', code: 'EMP-001', date: '09 Jul 2025', cin: '09:02 AM', cout: '06:15 PM', hrs: '9h 13m', ot: '+1h 13m', status: 'Present', ini: 'AP', bg: '#6c4cff' },
  { id: 2, name: 'David Kim', code: 'EMP-002', date: '09 Jul 2025', cin: '09:32 AM', cout: '06:00 PM', hrs: '8h 28m', ot: '-', status: 'Late', ini: 'DK', bg: '#06b6d4' },
  { id: 3, name: 'Elena Vogt', code: 'EMP-003', date: '09 Jul 2025', cin: '08:55 AM', cout: '05:45 PM', hrs: '8h 50m', ot: '+50m', status: 'Present', ini: 'EV', bg: '#a896ff' },
  { id: 4, name: 'Omar Hassan', code: 'EMP-004', date: '09 Jul 2025', cin: '-', cout: '-', hrs: '-', ot: '-', status: 'Absent', ini: 'OH', bg: '#10b981' },
  { id: 5, name: 'Sarah Chen', code: 'EMP-005', date: '09 Jul 2025', cin: '-', cout: '-', hrs: '-', ot: '-', status: 'On Leave', ini: 'SC', bg: '#f59e0b' },
  { id: 6, name: 'Priya Sharma', code: 'EMP-007', date: '09 Jul 2025', cin: '08:45 AM', cout: '06:30 PM', hrs: '9h 45m', ot: '+1h 45m', status: 'Present', ini: 'PS', bg: '#f43f5e' },
];
const sb = { Present: 'badge-success', Late: 'badge-warning', Absent: 'badge-danger', 'On Leave': 'badge-info' };
const f = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.35 } } };
const s = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.05 } } };

export default function AttendancePage() {
  const stats = [
    { l: 'Present', v: 3, p: '50%', Icon: UserCheck, bg: 'metric-mint', c: '#059669', ib: '#d1fae5' },
    { l: 'Absent', v: 1, p: '16.7%', Icon: UserX, bg: 'metric-peach', c: '#e11d48', ib: '#ffe4e6' },
    { l: 'Late', v: 1, p: '16.7%', Icon: Clock, bg: 'metric-amber', c: '#d97706', ib: '#fef3c7' },
    { l: 'On Leave', v: 1, p: '16.7%', Icon: CalendarCheck, bg: 'metric-lavender', c: '#7c3aed', ib: '#ede9fe' },
  ];
  return (
    <motion.div variants={s} initial="hidden" animate="show">
      <motion.div variants={f} className="card p-6 mb-7">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5" style={{ color: '#6c4cff' }} />
            <h3 className="text-[16px] font-bold" style={{ color: 'var(--text-primary)' }}>Today's Overview</h3>
          </div>
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 rounded-lg flex items-center justify-center btn-secondary" style={{ padding: 0 }}><ChevronLeft className="w-4 h-4" /></button>
            <span className="text-[13.5px] font-semibold px-4 py-2 rounded-xl" style={{ background: 'var(--bg-input)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' }}>Wed, 09 Jul 2025</span>
            <button className="w-8 h-8 rounded-lg flex items-center justify-center btn-secondary" style={{ padding: 0 }}><ChevronRight className="w-4 h-4" /></button>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map(st => (
            <div key={st.l} className={`card ${st.bg} p-4 flex items-center gap-3.5`}>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: st.ib }}>
                <st.Icon className="w-5 h-5" style={{ color: st.c }} />
              </div>
              <div className="flex-1">
                <p className="text-[24px] font-bold leading-none" style={{ color: 'var(--text-primary)' }}>{st.v}</p>
                <p className="text-[11.5px] mt-1" style={{ color: 'var(--text-muted)' }}>{st.l}</p>
              </div>
              <span className="text-[12px] font-semibold" style={{ color: st.c }}>{st.p}</span>
            </div>
          ))}
        </div>
      </motion.div>
      <motion.div variants={f} className="flex gap-3 mb-5">
        <button className="btn-secondary"><Filter className="w-4 h-4" /> Filter</button>
        <div className="ml-auto"><button className="btn-secondary"><Download className="w-4 h-4" /> Export</button></div>
      </motion.div>
      <motion.div variants={f} className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead><tr><th>Employee</th><th>Date</th><th>Check In</th><th>Check Out</th><th>Hours</th><th>Overtime</th><th>Status</th></tr></thead>
            <tbody>
              {data.map((a, i) => (
                <motion.tr key={a.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}>
                  <td><div className="flex items-center gap-3.5"><div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: a.bg }}><span className="text-white text-[12px] font-bold">{a.ini}</span></div><div><p className="text-[13.5px] font-semibold" style={{ color: 'var(--text-primary)' }}>{a.name}</p><p className="text-[11.5px]" style={{ color: 'var(--text-muted)' }}>{a.code}</p></div></div></td>
                  <td>{a.date}</td>
                  <td className="font-medium" style={{ color: a.cin === '-' ? 'var(--text-muted)' : 'var(--text-primary)' }}>{a.cin}</td>
                  <td className="font-medium" style={{ color: a.cout === '-' ? 'var(--text-muted)' : 'var(--text-primary)' }}>{a.cout}</td>
                  <td className="font-semibold" style={{ color: a.hrs === '-' ? 'var(--text-muted)' : 'var(--text-primary)' }}>{a.hrs}</td>
                  <td style={{ color: a.ot === '-' ? 'var(--text-muted)' : '#d97706' }}>{a.ot}</td>
                  <td><span className={`badge ${sb[a.status]}`}>{a.status}</span></td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
}
