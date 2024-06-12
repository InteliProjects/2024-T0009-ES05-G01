import PropTypes from 'prop-types';

export default function CoverImage({ titulo, imagem, descricao = '' }) {
  return (
    <div className="bg-black w-full text-white flex flex-col md:flex-row items-center justify-start">
      <img
        src={imagem}
        alt={titulo}
        className="w-[400px] h-[370px] object-cover"
      />
      <div className="flex flex-col gap-4 p-8">
        <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-6xl">
          {titulo}
        </h1>
        <p className="text-lg md:text-xl lg:text-xl xl:text-xl">{descricao}</p>
      </div>
    </div>
  );
}

CoverImage.propTypes = {
  titulo: PropTypes.string.isRequired,
  imagem: PropTypes.string.isRequired,
  descricao: PropTypes.string,
};
