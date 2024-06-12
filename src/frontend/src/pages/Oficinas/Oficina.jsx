import Tabela from '../../components/Tabela';
import api from '../../api';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CoverImage from '../../components/CoverImage';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';

export default function Oficina() {
  const params = useParams();
  const id = params.idOficina;
  const idOng = params.id;

  // busca as turmas da oficina em turmas/oficinas/:idOficina
  const [turmas, setTurmas] = useState([]);
  const [oficina, setOficina] = useState([]);

  useEffect(() => {
    api.get(`/turmas/oficinas/${id}`).then((response) => {
      const colunas = ['ID', 'Nome', 'Ativo', 'Vagas', 'Local', 'Detalhes'];
      const dados = {
        linhas: response.data.turmas.map((turma) => {
          return [
            turma.id,
            turma.nome,
            turma.ativo ? 'Sim' : 'Não',
            turma.vagas,
            turma.local,
            <Link
              to={`/ongs/${idOng}/oficinas/${id}/turmas/${turma.id}`}
              className="text-primary"
              key={turma.id}
            >
              Ver detalhes da turma
            </Link>,
          ];
        }),
        cabecalhos: colunas,
      };

      setTurmas(dados);
    });
  }, [id, idOng]);

  useEffect(() => {
    api.get(`/oficinas/${id}`).then((response) => {
      setOficina(response.data.oficina);
    });
  }, [id]);

  return (
    <main className="flex flex-col min-h-screen w-full">
      {oficina && (
        <div className="mb-12 w-full">
          <CoverImage
            titulo={oficina?.nome}
            imagem={
              oficina.imagem
                ? oficina.imagem
                : 'https://cvee2f.p3cdn1.secureserver.net/wp-content/uploads/2022/04/JOVEM-FALCAO-NO-PROCESSO-DE-APRENDIZAGEM.png?time=1709242985'
            }
            descricao={oficina?.descricao}
          />
        </div>
      )
      }
      <h2 className="text-3xl font-bold mb-4">Turmas</h2>
      <p className="mb-8 text-gray-600">
        Estas são as turmas associadas a esta oficina.
      </p>
      <div className="col-span-full flex justify-end lg:col-start-4 -mt-20 mb-8">
        <Link to={`/ongs/${idOng}/oficinas/${id}/turmas/cadastro`}>
          <Button variant="primary">Cadastrar Turma</Button>
        </Link>
      </div>
      {
        turmas && turmas.linhas && turmas.linhas.length !== 0 && (
          <Tabela dados={turmas} />
        )
      }
    </main >
  );
}
