import PropTypes from 'prop-types';
import { useContext } from 'react';
import { PassoContext } from './Passo';

export function Input({ etapa, name, ...props }) {
  const { passosAtuais, formData, handleInputChange } =
    useContext(PassoContext);
  const handleChange = (e) => {
    handleInputChange(e.target.name, e.target.value);
  };

  return passosAtuais === etapa ? (
    <input
      {...props}
      name={name}
      value={formData[name] || ''}
      onChange={handleChange}
    />
  ) : null;
}

Input.propTypes = {
  etapa: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};
