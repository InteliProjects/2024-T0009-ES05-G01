import { createContext } from 'react';
import PropTypes from 'prop-types';

export const PassoContext = createContext();

export function Passo({ children }) {
  return <>{children}</>;
}

Passo.propTypes = {
  children: PropTypes.node,
};
