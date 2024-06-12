import Footer from './Footer';
import { Header } from './Header';
import PropTypes from 'prop-types';
import { Context } from '../contexts/Auth';
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';

export default function Page({ children }) {
  const { loading, authenticated } = useContext(Context);

  if (loading) {
    return null;
  }

  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Header />
      <main className="px-12 pt-12 pb-8 bg-bg-primary">{children}</main>
      <Footer />
    </>
  );
}

Page.propTypes = {
  children: PropTypes.node.isRequired,
};
