import { motion } from 'framer-motion';
import { Shield, FileText, Download } from 'lucide-react';

const compliance = [
  { id: 1, name: 'Form 16 (TDS Certificate)', desc: 'Annual certificate of TDS for employees', dueDate: 'May 31, 2025', status: 'Ready' },
  { id: 2, name: 'PF Return', desc: 'Provident Fund monthly return', dueDate: '15 Jul, 2025', status: 'Pending' },
  { id: 3, name: 'ESI Return', desc: 'Employee State Insurance monthly contribution', dueDate: '15 Jul, 2025', status: 'Pending' },
  { id: 4, name: 'Professional Tax', desc: 'State-wise professional tax filing', dueDate: 'Varies', status: 'In Progress' },
];

const fadeUp = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.35 } } };
const stagger = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.05 } } };

export default function TaxPage() {
  return (
    <motion.div variants={stagger} initial="hidden" animate="show">
      <div className="page-header mb-6">
        <h1 className="page-title">Tax & Compliance</h1>
        <p className="page-subtitle">Manage statutory filings and forms</p>
      </div>

      <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
        <div className="card metric-lavender p-6 flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: '#ede9fe' }}>
            <Shield className="w-6 h-6" style={{ color: '#7c3aed' }} />
          </div>
          <div>
            <h3 className="text-[16px] font-bold" style={{ color: 'var(--text-primary)' }}>100% Compliant</h3>
            <p className="text-[12.5px] mt-1" style={{ color: 'var(--text-secondary)' }}>All previous month filings have been completed successfully without any delays.</p>
          </div>
        </div>
      </motion.div>

      <motion.div variants={fadeUp} className="card overflow-hidden">
        <table className="data-table">
          <thead><tr><th>Compliance Form</th><th>Description</th><th>Due Date</th><th>Status</th><th>Action</th></tr></thead>
          <tbody>
            {compliance.map((item, i) => (
              <motion.tr key={item.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}>
                <td className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4" style={{ color: '#6c4cff' }} /> {item.name}
                  </div>
                </td>
                <td style={{ color: 'var(--text-muted)' }}>{item.desc}</td>
                <td className="font-medium">{item.dueDate}</td>
                <td>
                  <span className={`badge ${item.status === 'Ready' ? 'badge-success' : item.status === 'In Progress' ? 'badge-progress' : 'badge-warning'}`}>
                    {item.status}
                  </span>
                </td>
                <td>
                  <button className="btn-outline" style={{ padding: '6px 12px', fontSize: '11.5px' }}>
                    <Download className="w-3.5 h-3.5 mr-1" /> Download
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </motion.div>
  );
}
