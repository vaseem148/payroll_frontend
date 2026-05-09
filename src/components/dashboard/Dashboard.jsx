import { motion } from 'framer-motion';
import {
  Users, TrendingUp, Wallet, CalendarCheck, Clock,
  ArrowUpRight, ArrowDownRight, UserCheck, UserX,
  DollarSign, MoreHorizontal, Plus, Filter, Briefcase,
  CreditCard, FileText, Activity
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import {
  AreaChart, Area, BarChart, Bar, PieChart as RechartPie, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

/* ── Data ────────────────────────────────────────── */
const payrollDates = [
  { period: 'Jan 2025', processing: 'Feb 1, 2025', approval: 'Feb 5, 2025', paymentOn: 'Feb 7, 2025', status: 'Completed' },
  { period: 'Feb 2025', processing: 'Mar 1, 2025', approval: 'Mar 5, 2025', paymentOn: 'Mar 7, 2025', status: 'Completed' },
  { period: 'Mar 2025', processing: 'Apr 1, 2025', approval: 'Apr 5, 2025', paymentOn: 'Apr 7, 2025', status: 'Completed' },
  { period: 'Apr 2025', processing: 'May 1, 2025', approval: 'May 5, 2025', paymentOn: 'May 7, 2025', status: 'In Progress' },
  { period: 'May 2025', processing: 'Jun 1, 2025', approval: 'Jun 5, 2025', paymentOn: 'Jun 7, 2025', status: 'Pending' },
  { period: 'Jun 2025', processing: 'Jul 1, 2025', approval: 'Jul 5, 2025', paymentOn: 'Jul 7, 2025', status: 'Pending' },
  { period: 'Jul 2025', processing: 'Aug 1, 2025', approval: 'Aug 5, 2025', paymentOn: 'Aug 7, 2025', status: 'Pending' },
];

const monthlyPayroll = [
  { month: 'Jan', amount: 245000 }, { month: 'Feb', amount: 252000 },
  { month: 'Mar', amount: 248000 }, { month: 'Apr', amount: 265000 },
  { month: 'May', amount: 278000 }, { month: 'Jun', amount: 285000 },
  { month: 'Jul', amount: 292000 },
];

const departments = [
  { name: 'Engineering', value: 18, color: '#6c4cff' },
  { name: 'Design', value: 8, color: '#a896ff' },
  { name: 'Marketing', value: 6, color: '#06b6d4' },
  { name: 'Sales', value: 10, color: '#10b981' },
  { name: 'HR & Ops', value: 8, color: '#f59e0b' },
];

const statusBadge = {
  Completed: 'badge-success',
  'In Progress': 'badge-progress',
  Pending: 'badge-warning',
};

/* ── Animations ──────────────────────────────────── */
const stagger = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } };
const fadeUp = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.35 } } };

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="card px-4 py-3 " style={{ fontSize: 12.5 }}>
      <p className="font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>{label}</p>
      {payload.map((e, i) => (
        <div key={i} className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full" style={{ background: e.color }} />
          <span style={{ color: 'var(--text-secondary)' }}>{e.name}:</span>
          <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>
            {e.name === 'Amount' ? `₹${(e.value / 1000).toFixed(0)}k` : e.value}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════ */
export default function Dashboard() {
  const { theme } = useTheme();
  const grid = theme === 'dark' ? '#2a2833' : '#f4f3f7';
  const label = theme === 'dark' ? '#5c5775' : '#9b95ab';

  return (
    <motion.div variants={stagger} initial="hidden" animate="show">

      {/* ── 3 Pastel Metric Cards ────── */}
      <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-7 ">
        {/* On-Time Payroll */}
        <div className="card metric-mint p-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: '#d1fae5' }}>
              <CalendarCheck className="w-6 h-6" style={{ color: '#059669' }} />
            </div>
            <div>
              <p className="text-[12.5px] font-medium" style={{ color: 'var(--text-secondary)' }}>On-Time Payroll Processing</p>
              <p className="text-[32px] font-bold tracking-tight mt-0.5" style={{ color: 'var(--text-primary)' }}>96%</p>
            </div>
          </div>
          <p className="text-[12px] mt-3" style={{ color: 'var(--text-muted)' }}>Payrolls processed on schedule without delays.</p>
        </div>

        {/* Payslip Accuracy */}
        <div className="card metric-lavender p-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: '#ede9fe' }}>
              <FileText className="w-6 h-6" style={{ color: '#7c3aed' }} />
            </div>
            <div>
              <p className="text-[12.5px] font-medium" style={{ color: 'var(--text-secondary)' }}>Payslip Distribution Accuracy</p>
              <p className="text-[32px] font-bold tracking-tight mt-0.5" style={{ color: 'var(--text-primary)' }}>98%</p>
            </div>
          </div>
          <p className="text-[12px] mt-3" style={{ color: 'var(--text-muted)' }}>Payslips generated and sent correctly.</p>
        </div>

        {/* Error Rate */}
        <div className="card metric-peach p-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: '#ffe4e6' }}>
              <Activity className="w-6 h-6" style={{ color: '#e11d48' }} />
            </div>
            <div>
              <p className="text-[12.5px] font-medium" style={{ color: 'var(--text-secondary)' }}>Payroll Error Rate</p>
              <p className="text-[32px] font-bold tracking-tight mt-0.5" style={{ color: 'var(--text-primary)' }}>2.5%</p>
            </div>
          </div>
          <p className="text-[12px] mt-3" style={{ color: 'var(--text-muted)' }}>Percentage of payroll transactions with errors.</p>
        </div>
      </motion.div>

      {/* ── Main Content: Table + Right Panel ── */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-5 mb-7">
        {/* Payroll Date List Table */}
        <motion.div variants={fadeUp} className="card overflow-hidden">
          <div className="flex items-center justify-between p-6 pb-4">
            <div>
              <h3 className="text-[16px] font-bold" style={{ color: 'var(--text-primary)' }}>Payroll Date List</h3>
              <p className="text-[12.5px] mt-1" style={{ color: 'var(--text-muted)' }}>Here's your employee payslip list details</p>
            </div>
            <div className="flex gap-2">
              <button className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ border: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
                <Filter className="w-4 h-4" />
              </button>
              <button className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: '#6c4cff', color: '#fff' }}>
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Period</th>
                  <th>Processing</th>
                  <th>Approval</th>
                  <th>Payment On</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {payrollDates.map((row, i) => (
                  <motion.tr key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}>
                    <td className="font-medium" style={{ color: 'var(--text-primary)' }}>{row.period}</td>
                    <td>{row.processing}</td>
                    <td>{row.approval}</td>
                    <td>{row.paymentOn}</td>
                    <td><span className={`badge ${statusBadge[row.status]}`}>{row.status}</span></td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Right Panel — Info Cards */}
        <motion.div variants={fadeUp} className="space-y-4">
          {/* Next Payment */}
          <div className="info-card">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="info-card-title">Next Payment</p>
                <p className="info-card-sub">Next payroll date</p>
              </div>
              <button style={{ color: 'var(--text-muted)' }}><MoreHorizontal className="w-5 h-5" /></button>
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl" style={{ background: 'var(--bg-input)' }}>
              <span className="text-[15px] font-semibold" style={{ color: 'var(--text-primary)' }}>May, 2025</span>
              <div className="flex items-center gap-2">
                <span className="text-[13px] font-semibold" style={{ color: '#6c4cff' }}>Wed</span>
                <span className="w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-bold text-white" style={{ background: '#6c4cff' }}>7</span>
              </div>
            </div>
          </div>

          {/* Payment Account */}
          <div className="info-card">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="info-card-title">Payment Account</p>
                <p className="info-card-sub">Money transfer throughout</p>
              </div>
              <button style={{ color: 'var(--text-muted)' }}><MoreHorizontal className="w-5 h-5" /></button>
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl" style={{ background: 'var(--bg-input)' }}>
              <div className="flex items-center gap-3">
                <CreditCard className="w-5 h-5" style={{ color: '#6c4cff' }} />
                <span className="text-[14px] font-semibold" style={{ color: 'var(--text-primary)' }}>ABC Bank</span>
              </div>
              <span className="badge badge-success">Connected</span>
            </div>
          </div>

          {/* Payslip */}
          <div className="info-card">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="info-card-title">Payslip</p>
                <p className="info-card-sub">Employee payslips</p>
              </div>
              <button style={{ color: 'var(--text-muted)' }}><MoreHorizontal className="w-5 h-5" /></button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[14px] font-bold" style={{ color: 'var(--text-primary)' }}>103 Employees</span>
              <button className="btn-outline">Generate</button>
            </div>
          </div>

          {/* Tax & Deduction */}
          <div className="info-card">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="info-card-title">TAX & Deduction</p>
                <p className="info-card-sub">Employee TAX & Deduction reports</p>
              </div>
              <button style={{ color: 'var(--text-muted)' }}><MoreHorizontal className="w-5 h-5" /></button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[14px] font-bold" style={{ color: 'var(--text-primary)' }}>80 Employees</span>
              <button className="btn-outline">Generate</button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Charts Row ──────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Payroll Trend */}
        <motion.div variants={fadeUp} className="card p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-[16px] font-bold" style={{ color: 'var(--text-primary)' }}>Payroll Trend</h3>
              <p className="text-[12.5px] mt-1" style={{ color: 'var(--text-muted)' }}>Monthly expenditure overview</p>
            </div>
            <span className="badge badge-info"><TrendingUp className="w-3.5 h-3.5" /> +8.2% YoY</span>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={monthlyPayroll}>
              <defs>
                <linearGradient id="payGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6c4cff" stopOpacity={0.12} />
                  <stop offset="100%" stopColor="#6c4cff" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={grid} />
              <XAxis dataKey="month" tick={{ fill: label, fontSize: 12 }} axisLine={false} tickLine={false} dy={8} />
              <YAxis tick={{ fill: label, fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={v => `₹${v / 1000}k`} dx={-4} />
              <Tooltip content={<ChartTooltip />} />
              <Area type="monotone" dataKey="amount" name="Amount" stroke="#6c4cff" strokeWidth={2.5} fill="url(#payGrad)"
                dot={false} activeDot={{ r: 5, strokeWidth: 2, fill: '#fff', stroke: '#6c4cff' }} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Department Donut */}
        <motion.div variants={fadeUp} className="card p-6">
          <h3 className="text-[16px] font-bold" style={{ color: 'var(--text-primary)' }}>Departments</h3>
          <p className="text-[12.5px] mt-1 mb-4" style={{ color: 'var(--text-muted)' }}>Employee distribution</p>
          <ResponsiveContainer width="100%" height={170}>
            <RechartPie>
              <Pie data={departments} cx="50%" cy="50%" innerRadius={44} outerRadius={70} paddingAngle={3} dataKey="value">
                {departments.map((d, i) => <Cell key={i} fill={d.color} stroke="transparent" />)}
              </Pie>
              <Tooltip content={<ChartTooltip />} />
            </RechartPie>
          </ResponsiveContainer>
          <div className="space-y-3 mt-4">
            {departments.map(d => (
              <div key={d.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-full" style={{ background: d.color }} />
                  <span className="text-[13px]" style={{ color: 'var(--text-secondary)' }}>{d.name}</span>
                </div>
                <span className="text-[13px] font-bold" style={{ color: 'var(--text-primary)' }}>{d.value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
