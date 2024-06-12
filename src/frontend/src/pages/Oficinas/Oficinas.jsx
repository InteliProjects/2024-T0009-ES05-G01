import SearchBar from '../../components/SearchBar';
import Card from '../../components/Card';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';

export default function Oficinas() {
  const params = useParams();
  const idOng = params.id;
  const [oficinas, setOficinas] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await api.get(`/oficinas/ongs/${idOng}`);
      setOficinas(response.data.oficinas);
    }
    fetchData();
  }, [idOng]);

  const setImagePlaceholder = (oficina) => {
    return oficina.imagem
      ? oficina.imagem
      : 'https://cvee2f.p3cdn1.secureserver.net/wp-content/uploads/2022/04/JOVEM-FALCAO-NO-PROCESSO-DE-APRENDIZAGEM.png?time=1709242985';
  };

  return (
    <div className="flex flex-col items-center gap-8 pb-12">
      <h1 className="font-bold text-center text-3xl">Oficinas</h1>
      <div className="mb-4 flex justify-center">
        <SearchBar />
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 -mt-2">
        <div className="col-span-full flex justify-end lg:col-start-4">
          <Link to={`/ongs/${idOng}/oficinas/cadastro`}>
            <Button variant="primary">Cadastrar Oficina</Button>
          </Link>
        </div>
        {oficinas &&
          oficinas.map((oficina) => (
            <Link to={`/ongs/${idOng}/oficinas/${oficina.id}`} key={oficina.id}>
              <Card
                imagem={setImagePlaceholder(oficina)}
                titulo={oficina.nome}
                descricao={oficina.descricao}
              />
            </Link>
          ))}
      </div>
    </div>
  );
}
