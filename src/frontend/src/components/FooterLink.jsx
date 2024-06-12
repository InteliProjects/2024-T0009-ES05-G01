import { PropTypes } from 'prop-types';

export default function FooterLink({ nome, href }) {
  return (
    <a
      className="text-black no-underline font-sans font-bold w-[75px] text-start sm:text-center hover:underline hover:text-black"
      href={href}
    >
      {nome}
    </a>
  );
}

FooterLink.propTypes = {
  nome: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
};
