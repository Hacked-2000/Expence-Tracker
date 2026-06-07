import { Box } from '@mui/material';
import Footer from './Footer';

const AuthLayout = ({ children }) => (
  <div className="auth-layout">
    <div className="auth-bg-animation" aria-hidden="true">
      <span className="auth-blob auth-blob-1" />
      <span className="auth-blob auth-blob-2" />
      <span className="auth-blob auth-blob-3" />
      <span className="auth-blob auth-blob-4" />
    </div>
    <Box className="auth-wrapper">{children}</Box>
    <Footer />
  </div>
);

export default AuthLayout;
