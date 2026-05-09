import { motion } from 'framer-motion';
import { Download, Search, Filter, Eye, FileText } from 'lucide-react';

const employees = [
  { id: 1, name: 'Aria Patel', code: 'EMP-001', month: 'July 2025', amount: '₹1,36,280', status: 'Generated', initials: 'AP', bg: '#6c4cff' },
  { id: 2, name: 'David Kim', code: 'EMP-002', month: 'July 2025', amount: '₹1,19,346', status: 'Generated', initials: 'DK', bg: '#06b6d4' },
  { id: 3, name: 'Elena Vogt', code: 'EMP-003', month: 'July 2025', amount: '₹1,53,222', status: 'Generated', initials: 'EV', bg: '#a896ff' },
  { id: 4, name: 'Omar Hassan', code: 'EMP-004', month: 'July 2025', amount: '₹1,07,866', status: 'Pending', initials: 'OH', bg: '#10b981' },
];

const fadeUp = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.35 } } };
const stagger = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.05 } } };

export default function PayslipPage() {
  return (
    <motion.div variants={stagger} initial="hidden" animate="show">
      <div className="page-header mb-6">
        <h1 className="page-title">Payslips</h1>
        <p className="page-subtitle">Generate and manage employee payslips</p>
      </div>
      
      <motion.div variants={fadeUp} className="flex items-center gap-3 mb-5">
        <div className="flex items-center gap-2.5 flex-1 max-w-md px-4 py-2.5 rounded-xl"
          style={{ background: 'var(--bg-input)', border: '1px solid var(--border-color)' }}>
          <Search className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />
          <input type="text" placeholder="Search employees..." className="bg-transparent outline-none text-[13px] flex-1" style={{ color: 'var(--text-primary)' }} />
        </div>
        <button className="btn-secondary"><Filter className="w-4 h-4" /> Filter</button>
        <button className="btn-primary ml-auto"><FileText className="w-4 h-4" /> Generate All</button>
      </motion.div>

      <motion.div variants={fadeUp} className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead><tr><th>Employee</th><th>Month</th><th>Net Pay</th><th>Status</th><th style={{ width: 150 }}>Actions</th></tr></thead>
            <tbody>
              {employees.map((emp, i) => (
                <motion.tr key={emp.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}>
                  <td>
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: emp.bg }}>
                        <span className="text-white text-[12px] font-bold">{emp.initials}</span>
                      </div>
                      <div>
                        <p className="text-[13.5px] font-semibold" style={{ color: 'var(--text-primary)' }}>{emp.name}</p>
                        <p className="text-[11.5px]" style={{ color: 'var(--text-muted)' }}>{emp.code}</p>
                      </div>
                    </div>
                  </td>
                  <td className="font-medium">{emp.month}</td>
                  <td className="font-semibold" style={{ color: '#059669' }}>{emp.amount}</td>
                  <td><span className={`badge ${emp.status === 'Generated' ? 'badge-success' : 'badge-warning'}`}>{emp.status}</span></td>
                  <td>
                    <div className="flex gap-2">
                      <button className="w-8 h-8 rounded-lg flex items-center justify-center btn-secondary" style={{ padding: 0 }} title="View">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="w-8 h-8 rounded-lg flex items-center justify-center btn-secondary" style={{ padding: 0, color: '#6c4cff' }} title="Download PDF">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
}
