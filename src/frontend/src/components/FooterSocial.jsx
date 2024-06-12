import { PropTypes } from 'prop-types';

export default function FooterSocial({ nome, href, img }) {
  return (
    <a className="mx-3 sm:mx-5" href={href} target="_blank">
      <img className="w-10 h-10  mx-3 sm:mx-5" src={img} alt={nome} />
    </a>
  );
}

FooterSocial.propTypes = {
  nome: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
};
