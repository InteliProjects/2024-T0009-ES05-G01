import PropTypes from 'prop-types';

export default function Cover({ titulo }) {
  return (
    <div className="bg-black w-full text-white flex items-center justify-center p-8 mb-4">
      <h1 className="text-3xl">{titulo}</h1>
    </div>
  );
}

Cover.propTypes = {
  titulo: PropTypes.string.isRequired,
};
