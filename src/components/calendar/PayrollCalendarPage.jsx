import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, Clock, AlertCircle, CheckCircle2 } from 'lucide-react';

const events = [
  { id: 1, date: '15 Jul', title: 'Mid-Month Cutoff', desc: 'Deadline for attendance & leave approvals.', type: 'warning' },
  { id: 2, date: '25 Jul', title: 'Payroll Processing', desc: 'Auto-processing of salaries starts.', type: 'info' },
  { id: 3, date: '28 Jul', title: 'Review & Approvals', desc: 'Management review of generated payroll.', type: 'info' },
  { id: 4, date: '01 Aug', title: 'Salary Disbursement', desc: 'Funds transferred to employee accounts.', type: 'success' },
];

const fadeUp = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.35 } } };
const stagger = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.05 } } };

export default function PayrollCalendarPage() {
  return (
    <motion.div variants={stagger} initial="hidden" animate="show">
      <div className="page-header mb-6">
        <h1 className="page-title">Payroll Calendar</h1>
        <p className="page-subtitle">Track important dates and deadlines</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div variants={fadeUp} className="card p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center metric-lavender">
              <CalendarIcon className="w-5 h-5" style={{ color: '#7c3aed' }} />
            </div>
            <h3 className="text-[16px] font-bold" style={{ color: 'var(--text-primary)' }}>July 2025 Schedule</h3>
          </div>
          
          <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[19px] before:w-[2px] before:bg-[var(--border-color)]">
            {events.map((ev, i) => (
              <div key={ev.id} className="relative flex items-start gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-4 border-[var(--bg-card)] ${
                  ev.type === 'success' ? 'bg-[#10b981]' : ev.type === 'warning' ? 'bg-[#f59e0b]' : 'bg-[#6c4cff]'
                }`}>
                  {ev.type === 'success' ? <CheckCircle2 className="w-4 h-4 text-white" /> : 
                   ev.type === 'warning' ? <AlertCircle className="w-4 h-4 text-white" /> : 
                   <Clock className="w-4 h-4 text-white" />}
                </div>
                <div className="card p-4 flex-1">
                  <span className="text-[11.5px] font-bold uppercase tracking-wider mb-1 block" style={{ color: 'var(--text-muted)' }}>{ev.date}</span>
                  <p className="text-[14px] font-semibold" style={{ color: 'var(--text-primary)' }}>{ev.title}</p>
                  <p className="text-[12.5px] mt-1" style={{ color: 'var(--text-secondary)' }}>{ev.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
