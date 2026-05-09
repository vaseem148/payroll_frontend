import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AnimatePresence } from 'framer-motion';
import Layout from './components/layout/Layout';
import Dashboard from './components/dashboard/Dashboard';
import EmployeesPage from './components/employees/EmployeesPage';
import AttendancePage from './components/attendance/AttendancePage';
import PayrollPage from './components/payroll/PayrollPage';
import OnboardingForm from './components/onboarding/OnboardingForm';
import PayslipPage from './components/payslip/PayslipPage';
import PayrollCalendarPage from './components/calendar/PayrollCalendarPage';
import ReportsPage from './components/reports/ReportsPage';
import TaxPage from './components/tax/TaxPage';
import SettingsPage from './components/settings/SettingsPage';

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AnimatePresence mode="wait">
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/employees" element={<EmployeesPage />} />
              <Route path="/attendance" element={<AttendancePage />} />
              <Route path="/payroll" element={<PayrollPage />} />
              <Route path="/onboarding" element={<OnboardingForm />} />
              <Route path="/payslip" element={<PayslipPage />} />
              <Route path="/payroll-calendar" element={<PayrollCalendarPage />} />
              <Route path="/reports" element={<ReportsPage />} />
              <Route path="/tax" element={<TaxPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Route>
          </Routes>
        </AnimatePresence>
      </BrowserRouter>
    </ThemeProvider>
  );
}
