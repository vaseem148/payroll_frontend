import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Plus, MoreHorizontal, Download, Users, UserCheck, UserX, Clock } from 'lucide-react';

const employees = [
  { id: 1, code: 'EMP-001', name: 'Aria Patel', email: 'aria@company.com', role: 'Sr. Software Engineer', dept: 'Engineering', salary: '₹1,20,000', joined: 'Jan 2023', status: 'Active', initials: 'AP', bg: '#6c4cff' },
  { id: 2, code: 'EMP-002', name: 'David Kim', email: 'david@company.com', role: 'Lead Product Designer', dept: 'Design', salary: '₹1,05,000', joined: 'Mar 2023', status: 'Active', initials: 'DK', bg: '#06b6d4' },
  { id: 3, code: 'EMP-003', name: 'Elena Vogt', email: 'elena@company.com', role: 'Product Manager', dept: 'Product', salary: '₹1,35,000', joined: 'Nov 2022', status: 'Active', initials: 'EV', bg: '#a896ff' },
  { id: 4, code: 'EMP-004', name: 'Omar Hassan', email: 'omar@company.com', role: 'DevOps Engineer', dept: 'Engineering', salary: '₹95,000', joined: 'Jun 2023', status: 'On Leave', initials: 'OH', bg: '#10b981' },
  { id: 5, code: 'EMP-005', name: 'Sarah Chen', email: 'sarah@company.com', role: 'Marketing Head', dept: 'Marketing', salary: '₹1,10,000', joined: 'Feb 2022', status: 'Active', initials: 'SC', bg: '#f59e0b' },
  { id: 6, code: 'EMP-006', name: 'James Wilson', email: 'james@company.com', role: 'Sales Manager', dept: 'Sales', salary: '₹88,000', joined: 'Aug 2023', status: 'Inactive', initials: 'JW', bg: '#9b95ab' },
  { id: 7, code: 'EMP-007', name: 'Priya Sharma', email: 'priya@company.com', role: 'HR Manager', dept: 'HR & Ops', salary: '₹92,000', joined: 'Apr 2023', status: 'Active', initials: 'PS', bg: '#f43f5e' },
  { id: 8, code: 'EMP-008', name: 'Alex Martinez', email: 'alex@company.com', role: 'Frontend Developer', dept: 'Engineering', salary: '₹78,000', joined: 'Sep 2024', status: 'Active', initials: 'AM', bg: '#14b8a6' },
];

const statusBadge = { Active: 'badge-success', 'On Leave': 'badge-warning', Inactive: 'badge-danger' };
const stagger = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.05 } } };
const fadeUp = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.35 } } };

export default function EmployeesPage() {
  const [search, setSearch] = useState('');
  const filtered = employees.filter(e =>
    e.name.toLowerCase().includes(search.toLowerCase()) || e.code.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <motion.div variants={stagger} initial="hidden" animate="show">
      {/* Summary */}
      <motion.div variants={fadeUp} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-7">
        {[
          { label: 'Total Employees', value: employees.length, icon: Users, bg: 'metric-lavender', color: '#7c3aed', iconBg: '#ede9fe' },
          { label: 'Active', value: employees.filter(e => e.status === 'Active').length, icon: UserCheck, bg: 'metric-mint', color: '#059669', iconBg: '#d1fae5' },
          { label: 'On Leave', value: employees.filter(e => e.status === 'On Leave').length, icon: Clock, bg: 'metric-amber', color: '#d97706', iconBg: '#fef3c7' },
          { label: 'Inactive', value: employees.filter(e => e.status === 'Inactive').length, icon: UserX, bg: 'metric-peach', color: '#e11d48', iconBg: '#ffe4e6' },
        ].map(s => (
          <div key={s.label} className={`card ${s.bg} p-5`}>
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: s.iconBg }}>
                <s.icon className="w-5 h-5" style={{ color: s.color }} />
              </div>
              <div>
                <p className="text-[24px] font-bold" style={{ color: 'var(--text-primary)' }}>{s.value}</p>
                <p className="text-[12px]" style={{ color: 'var(--text-muted)' }}>{s.label}</p>
              </div>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Actions */}
      <motion.div variants={fadeUp} className="flex items-center gap-3 mb-5">
        <div className="flex items-center gap-2.5 flex-1 max-w-md px-4 py-2.5 rounded-xl"
          style={{ background: 'var(--bg-input)', border: '1px solid var(--border-color)' }}>
          <Search className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />
          <input type="text" placeholder="Search employees..." value={search}
            onChange={e => setSearch(e.target.value)}
            className="bg-transparent outline-none text-[13px] flex-1"
            style={{ color: 'var(--text-primary)' }} />
        </div>
        <button className="btn-secondary"><Filter className="w-4 h-4" /> Filter</button>
        <button className="btn-secondary"><Download className="w-4 h-4" /> Export</button>
        <button className="btn-primary"><Plus className="w-4 h-4" /> Add Employee</button>
      </motion.div>

      {/* Table */}
      <motion.div variants={fadeUp} className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead><tr><th>Employee</th><th>Department</th><th>Designation</th><th>Joined</th><th>Salary</th><th>Status</th><th style={{ width: 48 }}></th></tr></thead>
            <tbody>
              {filtered.map((emp, i) => (
                <motion.tr key={emp.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                  <td>
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: emp.bg }}>
                        <span className="text-white text-[12px] font-bold">{emp.initials}</span>
                      </div>
                      <div>
                        <p className="text-[13.5px] font-semibold" style={{ color: 'var(--text-primary)' }}>{emp.name}</p>
                        <p className="text-[11.5px] mt-0.5" style={{ color: 'var(--text-muted)' }}>{emp.code} · {emp.email}</p>
                      </div>
                    </div>
                  </td>
                  <td><span className="badge badge-neutral">{emp.dept}</span></td>
                  <td>{emp.role}</td>
                  <td style={{ color: 'var(--text-muted)' }}>{emp.joined}</td>
                  <td className="font-semibold" style={{ color: 'var(--text-primary)' }}>{emp.salary}</td>
                  <td><span className={`badge ${statusBadge[emp.status]}`}>{emp.status}</span></td>
                  <td>
                    <button className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ color: 'var(--text-muted)' }}
                      onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-card-hover)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between px-5 py-4" style={{ borderTop: '1px solid var(--border-color)' }}>
          <p className="text-[12.5px]" style={{ color: 'var(--text-muted)' }}>Showing {filtered.length} of {employees.length}</p>
          <div className="flex gap-1.5">
            {[1, 2, 3].map(p => (
              <button key={p} className="w-8 h-8 rounded-lg flex items-center justify-center text-[12px] font-medium"
                style={{ background: p === 1 ? '#6c4cff' : 'transparent', color: p === 1 ? '#fff' : 'var(--text-muted)', border: p === 1 ? 'none' : '1px solid var(--border-color)' }}>{p}</button>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
