import PropTypes from 'prop-types';

export default function BlogCard({
  titulo,
  descricao,
  nomeLink = 'Ver todos',
  link,
}) {
  return (
    // card com fundo branco, h2, p e link (geralmente ver todos)
    <div className="w-[100%] rounded overflow-hidden shadow-lg transition duration-500 ease-in-out transform hover:shadow-md hover:scale-105 p-8 flex flex-col gap-4">
      <h3
        className="text-base truncate font-bold md:text-lg lg:text-xl xl:text-2xl mb-3.5 mt-1.5"
        title={titulo}
      >
        {titulo}
      </h3>
      <p
        className="line-clamp-5 leading-relaxed text-neutral-grey md:text-sm lg:text-base xl:text-lg mb-3.5"
        title={descricao}
      >
        {descricao}
      </p>
      <a href={link} className="hover:underline text-sm font-bold">
        {nomeLink}
      </a>
    </div>
  );
}

BlogCard.propTypes = {
  titulo: PropTypes.string.isRequired,
  descricao: PropTypes.string.isRequired,
  nomeLink: PropTypes.string,
  link: PropTypes.string.isRequired,
};
