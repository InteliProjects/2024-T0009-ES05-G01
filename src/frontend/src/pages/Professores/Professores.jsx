import Tabela from '../../components/Tabela';
import Cover from '../../components/Cover';
import { Link, useParams } from 'react-router-dom';
import api from '../../api';
import { useEffect, useState } from 'react';

export default function Professores() {
  const { id } = useParams();

  const [professores, setProfessores] = useState(null);

  useEffect(() => {
    async function fetchProfessores() {
      const response = await api.get(`ongs/${id}/professores`);
      setProfessores(response.data.professores);
    }

    fetchProfessores();
  }, [id]);

  if (!professores || professores.length === 0) {
    return (
      <main className="flex flex-col items-center min-h-screen w-full">
        <Cover titulo="Professores" />
        <section className="w-full">
          <div className="flex justify-end items-center">
            <Link
              to={`/ongs/${id}/professores/cadastro`}
              className="py-2 px-4 border-none rounded bg-black text-white cursor-pointer transition duration-300"
            >
              Cadastrar
            </Link>
          </div>
          <div className="flex items-center justify-center w-full my-2">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="px-4">Professores</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          <div className="mt-4">
            <p className="text-center">Nenhum professor cadastrado</p>
          </div>
        </section>
      </main>
    );
  }

  const cabecalhos = [
    'Nome',
    'Área de Atuação',
    'Qualificações',
    'E-mail',
    'Telefone',
  ];
  const linhas = professores.map((professor) => {
    return [
      professor.nome,
      professor.area_atuacao,
      professor.qualificacoes,
      professor.email,
      professor.telefone,
    ];
  });

  return (
    <main className="flex flex-col items-center min-h-screen w-full">
      <Cover titulo="Professores" />
      <section className="w-full">
        <div className="flex justify-end items-center">
          <Link
            to={`/ongs/${id}/professores/cadastro`}
            className="py-2 px-4 border-none rounded bg-black text-white cursor-pointer transition duration-300"
          >
            Cadastrar
          </Link>
        </div>
        <div className="flex items-center justify-center w-full my-2">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="px-4">Professores</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
        <div className="mt-4">
          <Tabela
            dados={{
              cabecalhos: cabecalhos,
              linhas: linhas,
            }}
          />
        </div>
      </section>
    </main>
  );
}
