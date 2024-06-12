import Tabela from '../../components/Tabela';
import Label from '../../components/Label';
import Cover from '../../components/Cover';
import { useParams } from 'react-router-dom';
import api from '../../api';
import { useEffect, useState } from 'react';

export default function Beneficiados() {
  const { id } = useParams();

  const [beneficiados, setBeneficiados] = useState([]);

  useEffect(() => {
    async function fetchBeneficiados() {
      const response = await api.get(`/ongs/${id}/beneficiados`);
      setBeneficiados(response.data.beneficiados);
    }
    fetchBeneficiados();
  }, [id]);

  if (beneficiados.length === 0) {
    return (
      <main className="flex flex-col items-center min-h-screen w-full">
        <Cover titulo="Beneficiados" />
        <section className="w-full">
          <div className="flex justify-end items-center">
            <button className="py-2 px-4 border-none rounded bg-black text-white cursor-pointer transition duration-300">
              <a href={`/ongs/${id}/beneficiados/cadastro`}>Cadastrar</a>
            </button>
          </div>
          <div className="flex items-center justify-center w-full my-2">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="px-4">Beneficiados</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          <div className="mt-4">
            <p className="text-center">Nenhum beneficiado cadastrado</p>
          </div>
        </section>
      </main>
    );
  }

  function formatarOficinas(oficinas) {
    const oficinasFormatadas = oficinas.map((oficina) => {
      return (
        <Label key={oficina.nome} color={oficina.cor}>
          {oficina.nome}
        </Label>
      );
    });
    return oficinasFormatadas;
  }

  function calcularIdade(dataNascimento) {
    const hoje = new Date();
    const nascimento = new Date(dataNascimento);
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mesAtual = hoje.getMonth();
    const mesNascimento = nascimento.getMonth();

    if (
      mesAtual < mesNascimento ||
      (mesAtual === mesNascimento && hoje.getDate() < nascimento.getDate())
    ) {
      idade--;
    }

    return idade;
  }

  const cabecalhos = ['Foto', 'Nome', 'Idade', 'Oficinas', 'Naturalidade'];
  const linhas = beneficiados.map((beneficiado) => {
    return [
      <img
        key={beneficiado.nome}
        src={'/eclipse.svg'}
        alt={beneficiado.nome}
        className="w-10 h-10 rounded-full"
      />,
      beneficiado.nome,
      calcularIdade(beneficiado.data_nasc),
      formatarOficinas(beneficiado.oficinas || []),
      beneficiado.naturalidade,
    ];
  });

  return (
    <main className="flex flex-col items-center min-h-screen w-full">
      <Cover titulo="Beneficiados" />
      <section className="w-full">
        <div className="flex justify-end items-center">
          <button className="py-2 px-4 border-none rounded bg-black text-white cursor-pointer transition duration-300">
            <a href={`/ongs/${id}/beneficiados/cadastro`}>Cadastrar</a>
          </button>
        </div>
        <div className="flex items-center justify-center w-full my-2">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="px-4">Beneficiados</span>
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
