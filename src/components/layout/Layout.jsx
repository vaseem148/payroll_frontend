import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

export default function Layout() {
  return (
    <div className="flex min-h-screen" style={{ background: 'var(--bg-body)' }}>
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-screen transition-all duration-200" style={{ marginLeft: 'var(--sidebar-width)' }}>
        <Navbar />
        <main className="flex-1 px-8 py-7"><Outlet /></main>
      </div>
    </div>
  );
}
