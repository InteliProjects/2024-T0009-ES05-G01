import Card from '../../components/Card';
import api from '../../api';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';

export default function Ongs() {
  const [ongs, setOngs] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await api.get('/ongs');
      setOngs(response.data.ongs);
    }
    fetchData();
  }, []);

  return (
    <section className="flex flex-col items-center gap-8 pb-12">
      <h1 className="font-bold text-center text-3xl">
        Rede de Líderes Gerando Falcões
      </h1>
      <p className="text-center">
        A Rede de Líderes Gerando Falcões abrange diversas ONGs que atuam em
        prol de comunidades carentes. Conheça as ONGs parceiras.
      </p>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 -mt-2">
        <div className="col-span-full flex justify-end lg:col-start-4">
          <Link to="/ongs/cadastro">
            <Button variant="primary">Cadastrar ONG</Button>
          </Link>
        </div>
        {ongs &&
          ongs.map((ong) => (
            <Link to={`/ongs/${ong.id}`} key={ong.id}>
              <Card
                imagem={
                  ong.imagem
                    ? ong.imagem
                    : 'https://placehold.co/400x380/000000/fff?text=Gerando%20Falc%C3%B5es'
                }
                titulo={ong.nome}
                descricao={ong.descricao}
              />
            </Link>
          ))}
      </div>
    </section>
  );
}
