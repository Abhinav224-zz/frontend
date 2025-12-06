import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// n8n Webhook URLs
const N8N_SIGNUP_WEBHOOK = 'https://abhinavk12.app.n8n.cloud/webhook/f37788ef-c088-4ebe-b88f-17a3b7dfacfa';
const N8N_GOOGLE_SHEETS_WEBHOOK = 'https://abhinavk12.app.n8n.cloud/webhook/f74af481-4430-44e4-936a-8b1f7a272680';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      const result = await signup(formData.name, formData.email, formData.password);
      
      if (result.success) {
        // Trigger n8n webhooks after successful signup (non-blocking)
        const signupData = {
          email: formData.email,
          name: formData.name,
          user: result.user || null
        };

        // Send email notification
        if (N8N_SIGNUP_WEBHOOK) {
          console.log('Calling n8n email webhook:', N8N_SIGNUP_WEBHOOK);
          fetch(N8N_SIGNUP_WEBHOOK, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(signupData),
          })
            .then(res => console.log('n8n email webhook response:', res.status))
            .catch(e => console.warn('n8n email webhook call failed (non-blocking):', e));
        }

        // Store data in Google Sheets
        if (N8N_GOOGLE_SHEETS_WEBHOOK) {
          console.log('Calling n8n Google Sheets webhook:', N8N_GOOGLE_SHEETS_WEBHOOK);
          fetch(N8N_GOOGLE_SHEETS_WEBHOOK, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(signupData),
          })
            .then(res => console.log('n8n Google Sheets webhook response:', res.status))
            .catch(e => console.warn('n8n Google Sheets webhook call failed (non-blocking):', e));
        }
        
        navigate('/dashboard');
      } else {
        setErrors({ submit: result.error || 'Sign up failed. Please try again.' });
      }
    } catch (error) {
      setErrors({ submit: error.message || 'An error occurred. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-title">Create Account</h1>
          <p className="auth-subtitle">Sign up to start shopping</p>
        </div>

        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-input"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-input"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-input"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              autoComplete="new-password"
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="form-input"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              autoComplete="new-password"
            />
            {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
          </div>

          {errors.submit && <span className="error-message">{errors.submit}</span>}

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <div className="auth-footer">
          Already have an account? <Link to="/login" className="auth-link">Sign In</Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

