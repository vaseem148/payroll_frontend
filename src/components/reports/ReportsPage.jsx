import { motion } from 'framer-motion';
import { BarChart3, Download, TrendingUp, DollarSign } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', Base: 4000, Bonus: 2400 },
  { name: 'Feb', Base: 3000, Bonus: 1398 },
  { name: 'Mar', Base: 2000, Bonus: 9800 },
  { name: 'Apr', Base: 2780, Bonus: 3908 },
  { name: 'May', Base: 1890, Bonus: 4800 },
  { name: 'Jun', Base: 2390, Bonus: 3800 },
];

const fadeUp = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.35 } } };
const stagger = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.05 } } };

export default function ReportsPage() {
  return (
    <motion.div variants={stagger} initial="hidden" animate="show">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="page-title">Reports & Analytics</h1>
          <p className="page-subtitle">Company payroll insights</p>
        </div>
        <button className="btn-secondary"><Download className="w-4 h-4" /> Export Report</button>
      </div>

      <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
        {[
          { l: 'Total Payroll (YTD)', v: '₹84,50,000', i: DollarSign, bg: 'metric-lavender', c: '#7c3aed' },
          { l: 'Average Salary', v: '₹1,15,000', i: TrendingUp, bg: 'metric-mint', c: '#059669' },
          { l: 'Taxes Paid', v: '₹12,40,000', i: BarChart3, bg: 'metric-peach', c: '#e11d48' },
        ].map(s => (
          <div key={s.l} className={`card ${s.bg} p-6`}>
            <div className="flex items-center gap-3 mb-2">
              <s.i className="w-5 h-5" style={{ color: s.c }} />
              <p className="text-[12.5px] font-medium" style={{ color: 'var(--text-secondary)' }}>{s.l}</p>
            </div>
            <p className="text-[28px] font-bold tracking-tight" style={{ color: s.c }}>{s.v}</p>
          </div>
        ))}
      </motion.div>

      <motion.div variants={fadeUp} className="card p-6">
        <h3 className="text-[16px] font-bold mb-6" style={{ color: 'var(--text-primary)' }}>Salary Breakdown</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--text-muted)' }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--text-muted)' }} />
            <Tooltip cursor={{ fill: 'var(--bg-card-hover)' }} contentStyle={{ borderRadius: '12px', border: '1px solid var(--border-color)', background: 'var(--bg-card)' }} />
            <Bar dataKey="Base" stackId="a" fill="#6c4cff" radius={[0, 0, 4, 4]} barSize={30} />
            <Bar dataKey="Bonus" stackId="a" fill="#06b6d4" radius={[4, 4, 0, 0]} barSize={30} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </motion.div>
  );
}
