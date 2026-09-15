import { Link, useLocation } from 'react-router-dom';

function Sidebar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        Order<span className="logo-accent">Platform</span>
      </div>

      <nav className="sidebar-nav">
        <Link to="/" className={`sidebar-link ${isActive('/') ? 'active' : ''}`}>
          <span className="sidebar-icon">▣</span> Dashboard
        </Link>
        <Link
          to="/cadastrar"
          className={`sidebar-link ${isActive('/cadastrar') ? 'active' : ''}`}
        >
          <span className="sidebar-icon">＋</span> Cadastrar produto
        </Link>
      </nav>

      <div className="sidebar-footer">
        <span>OrderPlatform v1.0</span>
      </div>
    </aside>
  );
}

export default Sidebar;