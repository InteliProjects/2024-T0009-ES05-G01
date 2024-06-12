import PropTypes from 'prop-types';

export default function Button({
  onClick,
  children,
  variant,
  type = 'button',
}) {
  let buttonClasses = 'py-2 px-4 rounded';

  if (variant === 'primary') {
    buttonClasses += ' bg-black hover:bg-gray-700 text-white font-sans';
  } else if (variant === 'secondary') {
    buttonClasses += ' bg-gray-100 hover:bg-gray-200 text-black font-sans';
  } else if (variant === 'dangerPrimary') {
    buttonClasses +=
      ' bg-gray-100 hover:bg-gray-200 text-red-500 border border-red-500 font-sans';
  } else if (variant === 'dangerSecondary') {
    buttonClasses += ' bg-gray-400 hover:bg-gray-700 text-white font-sans';
  }

  return (
    <button className={buttonClasses} onClick={onClick} type={type}>
      {children}
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf([
    'primary',
    'secondary',
    'dangerPrimary',
    'dangerSecondary',
  ]),
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
};
