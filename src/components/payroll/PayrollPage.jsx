import { motion } from 'framer-motion';
import { DollarSign, Download, CheckCircle, Clock, XCircle, TrendingUp, Filter, Calendar } from 'lucide-react';

const rows = [
  { id: 1, name: 'Aria Patel', code: 'EMP-001', dept: 'Engineering', days: '22/22', base: '₹1,20,000', gross: '₹1,58,600', ded: '₹22,320', net: '₹1,36,280', status: 'Paid', ini: 'AP', bg: '#6c4cff' },
  { id: 2, name: 'David Kim', code: 'EMP-002', dept: 'Design', days: '21/22', base: '₹1,05,000', gross: '₹1,38,900', ded: '₹19,554', net: '₹1,19,346', status: 'Paid', ini: 'DK', bg: '#06b6d4' },
  { id: 3, name: 'Elena Vogt', code: 'EMP-003', dept: 'Product', days: '22/22', base: '₹1,35,000', gross: '₹1,78,350', ded: '₹25,128', net: '₹1,53,222', status: 'Approved', ini: 'EV', bg: '#a896ff' },
  { id: 4, name: 'Omar Hassan', code: 'EMP-004', dept: 'Engineering', days: '18/22', base: '₹95,000', gross: '₹1,25,550', ded: '₹17,684', net: '₹1,07,866', status: 'Processing', ini: 'OH', bg: '#10b981' },
  { id: 5, name: 'Sarah Chen', code: 'EMP-005', dept: 'Marketing', days: '20/22', base: '₹1,10,000', gross: '₹1,45,300', ded: '₹20,475', net: '₹1,24,825', status: 'Draft', ini: 'SC', bg: '#f59e0b' },
];
const sc = { Paid: { b: 'badge-success', I: CheckCircle }, Approved: { b: 'badge-info', I: CheckCircle }, Processing: { b: 'badge-progress', I: Clock }, Draft: { b: 'badge-danger', I: XCircle } };
const f = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.35 } } };
const s = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.05 } } };

export default function PayrollPage() {
  return (
    <motion.div variants={s} initial="hidden" animate="show">
      <motion.div variants={f} className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-7">
        {[
          { l: 'Total Gross Pay', v: '₹7,46,700', sub: 'All allowances included', bg: 'metric-lavender', c: '#7c3aed' },
          { l: 'Total Deductions', v: '₹1,05,161', sub: 'PF + ESI + Tax', bg: 'metric-peach', c: '#e11d48' },
          { l: 'Net Disbursement', v: '₹6,41,539', sub: 'Ready for transfer', bg: 'metric-mint', c: '#059669' },
        ].map(c => (
          <div key={c.l} className={`card ${c.bg} p-6`}>
            <p className="text-[12.5px] font-medium" style={{ color: 'var(--text-secondary)' }}>{c.l}</p>
            <p className="text-[28px] font-bold tracking-tight mt-1" style={{ color: c.c }}>{c.v}</p>
            <p className="text-[12px] mt-2" style={{ color: 'var(--text-muted)' }}>{c.sub}</p>
          </div>
        ))}
      </motion.div>
      <motion.div variants={f} className="flex gap-3 mb-5">
        <button className="btn-secondary"><Calendar className="w-4 h-4" /> Jul 2025</button>
        <button className="btn-secondary"><Filter className="w-4 h-4" /> All Status</button>
        <div className="ml-auto flex gap-3">
          <button className="btn-secondary"><Download className="w-4 h-4" /> Export</button>
          <button className="btn-primary"><DollarSign className="w-4 h-4" /> Run Payroll</button>
        </div>
      </motion.div>
      <motion.div variants={f} className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead><tr><th>Employee</th><th>Dept</th><th>Days</th><th>Base</th><th>Gross</th><th>Deductions</th><th>Net Pay</th><th>Status</th><th style={{ width: 60 }}></th></tr></thead>
            <tbody>
              {rows.map((p, i) => {
                const { b, I } = sc[p.status];
                return (
                  <motion.tr key={p.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}>
                    <td><div className="flex items-center gap-3.5"><div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: p.bg }}><span className="text-white text-[12px] font-bold">{p.ini}</span></div><div><p className="text-[13.5px] font-semibold" style={{ color: 'var(--text-primary)' }}>{p.name}</p><p className="text-[11.5px]" style={{ color: 'var(--text-muted)' }}>{p.code}</p></div></div></td>
                    <td><span className="badge badge-neutral">{p.dept}</span></td>
                    <td className="font-medium">{p.days}</td>
                    <td>{p.base}</td>
                    <td className="font-semibold" style={{ color: 'var(--text-primary)' }}>{p.gross}</td>
                    <td style={{ color: '#e11d48' }}>{p.ded}</td>
                    <td className="font-bold" style={{ color: '#059669' }}>{p.net}</td>
                    <td><span className={`badge ${b}`}><I className="w-3 h-3" /> {p.status}</span></td>
                    <td><button className="btn-outline" style={{ padding: '5px 12px', fontSize: 11.5 }}>View</button></td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
}
