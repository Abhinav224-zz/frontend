import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Welcome, {user?.name || 'User'}!</h1>
        <p className="dashboard-subtitle">This is your dashboard</p>
      </div>

      <div className="dashboard-card">
        <h2 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Account Information</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div>
            <strong>Name:</strong> {user?.name}
          </div>
          <div>
            <strong>Email:</strong> {user?.email}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

