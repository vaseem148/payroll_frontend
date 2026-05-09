import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { User, Briefcase, CreditCard, CheckCircle2, ChevronRight, ChevronLeft, Upload, AlertCircle } from 'lucide-react';

const steps = [
  { id: 1, title: 'Personal Details', desc: 'Basic information', icon: User },
  { id: 2, title: 'Job Information', desc: 'Role & department', icon: Briefcase },
  { id: 3, title: 'Compensation', desc: 'Salary & banking', icon: CreditCard },
  { id: 4, title: 'Review & Submit', desc: 'Confirm details', icon: CheckCircle2 },
];

const slideVars = {
  enter: (d) => ({ x: d > 0 ? 250 : -250, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (d) => ({ x: d < 0 ? 250 : -250, opacity: 0 }),
};

export default function OnboardingForm() {
  const { theme } = useTheme();
  const [step, setStep] = useState(1);
  const [dir, setDir] = useState(0);
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '', dateOfBirth: '', gender: '',
    employeeCode: '', designation: '', department: '', role: 'EMPLOYEE', joinDate: '',
    baseSalary: '', bankAccount: '', bankName: '', panNumber: '', ifscCode: '',
  });

  const u = (f, v) => setForm(p => ({ ...p, [f]: v }));
  const next = () => { setDir(1); setStep(s => Math.min(s + 1, 4)); };
  const prev = () => { setDir(-1); setStep(s => Math.max(s - 1, 1)); };

  function Input({ label, field, type = 'text', placeholder, required }) {
    return (
      <div>
        <label className="block text-[12.5px] font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
          {label} {required && <span style={{ color: '#f43f5e' }}>*</span>}
        </label>
        <input type={type} value={form[field]} onChange={e => u(field, e.target.value)}
          placeholder={placeholder} className="form-input" />
      </div>
    );
  }

  function Select({ label, field, options, required }) {
    return (
      <div>
        <label className="block text-[12.5px] font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
          {label} {required && <span style={{ color: '#f43f5e' }}>*</span>}
        </label>
        <select value={form[field]} onChange={e => u(field, e.target.value)} className="form-input">
          <option value="">Select...</option>
          {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <div className="page-header">
        <h1 className="page-title">Employee Onboarding</h1>
        <p className="page-subtitle">Add a new team member with a guided setup wizard</p>
      </div>

      {/* Step Indicator */}
      <div className="card p-6 section-gap">
        <div className="flex items-center justify-between">
          {steps.map((s, i) => (
            <div key={s.id} className="flex items-center flex-1">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center transition-colors"
                  style={{
                    background: step >= s.id ? '#6c4cff' : 'var(--bg-input)',
                    border: step >= s.id ? 'none' : '1px solid var(--border-color)',
                    boxShadow: step >= s.id ? '0 2px 8px rgba(108, 76, 255, 0.3)' : 'none',
                  }}>
                  <s.icon className="w-5 h-5" style={{ color: step >= s.id ? '#fff' : 'var(--text-muted)' }} />
                </div>
                <div className="hidden md:block">
                  <p className="text-[13px] font-semibold" style={{ color: step >= s.id ? 'var(--text-primary)' : 'var(--text-muted)' }}>{s.title}</p>
                  <p className="text-[11px] mt-0.5" style={{ color: 'var(--text-muted)' }}>{s.desc}</p>
                </div>
              </div>
              {i < steps.length - 1 && (
                <div className="flex-1 mx-5 h-[2px] rounded-full" style={{ background: step > s.id ? '#6c4cff' : 'var(--border-color)' }} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Form Body */}
      <div className="card p-8 overflow-hidden" style={{ minHeight: 380 }}>
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div key={step} custom={dir} variants={slideVars}
            initial="enter" animate="center" exit="exit"
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}>

            {step === 1 && (
              <div>
                <h3 className="text-[16px] font-semibold mb-6" style={{ color: 'var(--text-primary)' }}>Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Input label="First Name" field="firstName" placeholder="John" required />
                  <Input label="Last Name" field="lastName" placeholder="Doe" required />
                  <Input label="Email Address" field="email" type="email" placeholder="john@company.com" required />
                  <Input label="Phone Number" field="phone" placeholder="+91 98765 43210" />
                  <Input label="Date of Birth" field="dateOfBirth" type="date" />
                  <Select label="Gender" field="gender" options={[
                    { value: 'MALE', label: 'Male' }, { value: 'FEMALE', label: 'Female' }, { value: 'OTHER', label: 'Other' }
                  ]} />
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h3 className="text-[16px] font-semibold mb-6" style={{ color: 'var(--text-primary)' }}>Job Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Input label="Employee Code" field="employeeCode" placeholder="EMP-001" required />
                  <Input label="Designation" field="designation" placeholder="Sr. Software Engineer" required />
                  <Select label="Department" field="department" required options={[
                    { value: 'eng', label: 'Engineering' }, { value: 'design', label: 'Design' },
                    { value: 'marketing', label: 'Marketing' }, { value: 'sales', label: 'Sales' },
                    { value: 'hr', label: 'HR & Operations' },
                  ]} />
                  <Select label="Role" field="role" required options={[
                    { value: 'EMPLOYEE', label: 'Employee' }, { value: 'MANAGER', label: 'Manager' },
                    { value: 'HR_MANAGER', label: 'HR Manager' }, { value: 'ADMIN', label: 'Admin' },
                  ]} />
                  <Input label="Joining Date" field="joinDate" type="date" required />
                  <div className="flex items-end">
                    <button className="btn-secondary h-[42px]"><Upload className="w-4 h-4" /> Upload Documents</button>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h3 className="text-[16px] font-semibold mb-6" style={{ color: 'var(--text-primary)' }}>Compensation & Banking</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Input label="Base Salary (₹ / month)" field="baseSalary" type="number" placeholder="50000" required />
                  <Input label="PAN Number" field="panNumber" placeholder="ABCDE1234F" required />
                  <Input label="Bank Account Number" field="bankAccount" placeholder="123456789012" required />
                  <Input label="Bank Name" field="bankName" placeholder="HDFC Bank" required />
                  <Input label="IFSC Code" field="ifscCode" placeholder="HDFC0001234" />
                </div>
                <div className="flex items-start gap-3 mt-6 p-4 rounded-xl" style={{ background: 'rgba(108, 76, 255, 0.06)', border: '1px solid rgba(108, 76, 255, 0.12)' }}>
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" style={{ color: '#6c4cff' }} />
                  <div>
                    <p className="text-[13px] font-medium" style={{ color: '#6c4cff' }}>Salary Breakdown</p>
                    <p className="text-[12px] mt-1" style={{ color: 'var(--text-secondary)' }}>
                      HRA (20%), DA (10%), Conveyance (₹1,600), Medical (₹1,250) will be auto-calculated during payroll processing.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div>
                <h3 className="text-[16px] font-semibold mb-6" style={{ color: 'var(--text-primary)' }}>Review Details</h3>
                <p className="text-[13px] mb-5" style={{ color: 'var(--text-secondary)' }}>Please verify all information before submitting.</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {Object.entries(form).filter(([, v]) => v).map(([key, value]) => (
                    <div key={key} className="p-4 rounded-xl" style={{ background: 'var(--bg-input)', border: '1px solid var(--border-light)' }}>
                      <p className="text-[10px] uppercase tracking-widest font-bold mb-1" style={{ color: 'var(--text-muted)' }}>
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </p>
                      <p className="text-[14px] font-semibold" style={{ color: 'var(--text-primary)' }}>{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-5">
        <button onClick={prev} disabled={step === 1} className="btn-secondary disabled:opacity-30 disabled:cursor-not-allowed">
          <ChevronLeft className="w-4 h-4" /> Previous Step
        </button>
        <div className="flex items-center gap-2">
          {steps.map(s => (
            <div key={s.id} className="w-2 h-2 rounded-full transition-colors"
              style={{ background: step >= s.id ? '#6c4cff' : 'var(--border-color)' }} />
          ))}
        </div>
        <button onClick={step === 4 ? () => alert('Employee successfully onboarded!') : next} className="btn-primary">
          {step === 4 ? 'Submit & Onboard' : 'Next Step'} <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}
