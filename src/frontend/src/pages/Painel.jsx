import { useState } from 'react';
import { AgChartsReact } from 'ag-charts-react';
import { Statistic, Card, Menu } from 'antd';

export default function Painel() {
  const [graficoOficinas, setGraficoOficinas] = useState({
    data: [
      { month: 'Janeiro', Oficina1: 30, Oficina2: 45 },
      { month: 'Março', Oficina1: 20, Oficina2: 30 },
      { month: 'Maio', Oficina1: 70, Oficina2: 12 },
      { month: 'Julho', Oficina1: 40, Oficina2: 19 },
      { month: 'Setembro', Oficina1: 30, Oficina2: 63 },
      { month: 'Novembro', Oficina1: 25, Oficina2: 44 },
    ],
    series: [
      { type: 'line', xKey: 'month', yKey: 'Oficina1', yName: 'Oficina 1' },
      { type: 'line', xKey: 'month', yKey: 'Oficina2', yName: 'Oficina 2' },
    ],
  });

  const [graficoCrescimento, setGraficoCrescimento] = useState({
    title: {
      text: 'Crescimento Organizacional',
    },
    data: [
      {
        mes: 'Janeiro',
        pessoas: 200,
      },
      {
        mes: 'Março',
        pessoas: 350,
      },
      {
        mes: 'Maio',
        pessoas: 400,
      },
      {
        mes: 'Julho',
        pessoas: 400,
      },
      {
        mes: 'Setembro',
        pessoas: 400,
      },
      {
        mes: 'Novembro',
        pessoas: 400,
      },
    ],
    series: [
      {
        type: 'line',
        xKey: 'mes',
        yKey: 'pessoas',
        yName: 'Pessoas',
      },
    ],
  });

  const [graficoCrescimentoOficinas, setGraficoCrescimentoOficinas] = useState({
    title: {
      text: 'Crescimento - Turmas',
    },
    data: [
      {
        mes: 'Janeiro',
        turmas: 200,
      },
      {
        mes: 'Março',
        turmas: 350,
      },
      {
        mes: 'Maio',
        turmas: 400,
      },
      {
        mes: 'Julho',
        turmas: 400,
      },
      {
        mes: 'Setembro',
        turmas: 400,
      },
      {
        mes: 'Novembro',
        turmas: 400,
      },
    ],
    series: [
      {
        type: 'line',
        xKey: 'mes',
        yKey: 'turmas',
        yName: 'Turmas',
      },
    ],
  });

  const [graficoCrescimentoBeneficiados, setGraficoCrescimentoBeneficiados] =
    useState({
      title: {
        text: 'Crescimento - Beneficiados',
      },
      data: [
        {
          mes: 'Janeiro',
          beneficiados: 200,
        },
        {
          mes: 'Março',
          beneficiados: 350,
        },
        {
          mes: 'Maio',
          beneficiados: 400,
        },
        {
          mes: 'Julho',
          beneficiados: 400,
        },
        {
          mes: 'Setembro',
          beneficiados: 400,
        },
        {
          mes: 'Novembro',
          beneficiados: 400,
        },
      ],
      series: [
        {
          type: 'line',
          xKey: 'mes',
          yKey: 'beneficiados',
          yName: 'Beneficiados',
        },
      ],
    });

  const [graficoPizzaUsuarios, setGraficoPizzaUsuarios] = useState({
    data: [
      { category: 'Admin', value: 20 },
      { category: 'Líder', value: 40 },
      { category: 'Beneficiado', value: 30 },
      { category: 'Professor', value: 10 },
    ],
    title: {
      text: 'Tipos de Usuário',
    },
    background: {
      visible: false,
    },
    series: [
      {
        type: 'donut',
        angleKey: 'value',
        // labelKey: 'category',
        sectorLabelKey: 'value',
        calloutLabelKey: 'category',
        innerRadiusRatio: 0.7,
      },
    ],
  });

  const [graficoPizzaPresencas, setGraficosPizzaPresencas] = useState({
    data: [
      { category: 'Vagas ocupadas', value: 20 },
      { category: 'Vagas Totais', value: 40 },
    ],
    title: {
      text: 'Frequência de Presença',
    },
    background: {
      visible: false,
    },
    series: [
      {
        type: 'donut',
        angleKey: 'value',
        // labelKey: 'category',
        sectorLabelKey: 'value',
        calloutLabelKey: 'category',
        innerRadiusRatio: 0.7,
      },
    ],
  });

  const [graficoPizzaTemasOficinas, setGraficoPizzaTemas] = useState({
    data: [
      { category: 'Saúde', value: 20 },
      { category: 'Dança', value: 40 },
      { category: 'Yoga', value: 30 },
      { category: 'Boxe', value: 50 },
      { category: 'Musculação', value: 31 },
      { category: 'Violão', value: 41 },
    ],
    title: {
      text: 'Temas',
    },
    background: {
      visible: false,
    },
    series: [
      {
        type: 'donut',
        angleKey: 'value',
        // labelKey: 'category',
        sectorLabelKey: 'value',
        calloutLabelKey: 'category',
        innerRadiusRatio: 0.7,
      },
    ],
  });

  const [graficoPizzaEtnias, setGraficoPizzaEtnias] = useState({
    data: [
      { category: 'Branco', value: 20 },
      { category: 'Negro', value: 40 },
      { category: 'Indígena', value: 30 },
      { category: 'Asiático', value: 50 },
      { category: 'Outro', value: 20 },
    ],
    title: {
      text: 'Etnias',
    },
    background: {
      visible: false,
    },
    series: [
      {
        type: 'donut',
        angleKey: 'value',
        // labelKey: 'category',
        sectorLabelKey: 'value',
        calloutLabelKey: 'category',
        innerRadiusRatio: 0.7,
      },
    ],
  });

  const [graficoPizzaIdentidade, setGraficoPizzaIdentidade] = useState({
    data: [
      { category: 'Mulher cis', value: 20 },
      { category: 'Mulher transgênero', value: 40 },
      { category: 'Homem cis', value: 30 },
      { category: 'Homem transgênero', value: 50 },
      { category: 'Gênero neutro', value: 20 },
      { category: 'Não-binário', value: 20 },
      { category: 'Agênero', value: 20 },
    ],
    title: {
      text: 'Identidade',
    },
    background: {
      visible: false,
    },
    series: [
      {
        type: 'donut',
        angleKey: 'value',
        // labelKey: 'category',
        sectorLabelKey: 'value',
        calloutLabelKey: 'category',
        innerRadiusRatio: 0.7,
      },
    ],
  });

  const [graficoPizzaRegioes, setGraficoPizzaRegioes] = useState({
    data: [
      { category: 'Centro-Oeste', value: 20 },
      { category: 'Nordeste', value: 40 },
      { category: 'Norte', value: 30 },
      { category: 'Sudeste', value: 50 },
      { category: 'Sul', value: 20 },
    ],
    title: {
      text: 'Regiões',
    },
    background: {
      visible: false,
    },
    series: [
      {
        type: 'donut',
        angleKey: 'value',
        // labelKey: 'category',
        sectorLabelKey: 'value',
        calloutLabelKey: 'category',
        innerRadiusRatio: 0.7,
      },
    ],
  });

  const [graficoFrequenciaTurma, setGraficoFrequenciaTurma] = useState({
    title: {
      text: 'Frequência por turma',
    },
    data: [
      {
        mes: 'Janeiro',
        frequencia: 200,
      },
      {
        mes: 'Março',
        frequencia: 350,
      },
      {
        mes: 'Maio',
        frequencia: 400,
      },
      {
        mes: 'Julho',
        frequencia: 400,
      },
      {
        mes: 'Setembro',
        frequencia: 400,
      },
      {
        mes: 'Novembro',
        frequencia: 400,
      },
    ],
    series: [
      {
        type: 'line',
        xKey: 'mes',
        yKey: 'frequencia',
        yName: 'Frequencia',
      },
    ],
  });
  const [graficoIdade, setGraficoIdade] = useState({
    title: {
      text: 'Idades',
    },
    data: [
      {
        intervalo: '0 a 4',
        idade: 200,
      },
      {
        intervalo: '5 a 8',
        idade: 350,
      },
      {
        intervalo: '9 a 12',
        idade: 400,
      },
      {
        intervalo: '13 a 17',
        idade: 400,
      },
      {
        intervalo: '18 a 25',
        idade: 400,
      },
      {
        intervalo: '26 a 30',
        idade: 400,
      },
      {
        intervalo: '31 a 40',
        idade: 400,
      },
      {
        intervalo: '41 a 50',
        idade: 400,
      },
      {
        intervalo: '51 a 60',
        idade: 400,
      },
      {
        intervalo: '61 a 70',
        idade: 400,
      },
      {
        intervalo: '70+',
        idade: 400,
      },
    ],
    series: [
      {
        type: 'bar',
        xKey: 'intervalo',
        yKey: 'idade',
        yName: 'Idade',
      },
    ],
  });

  const [paginaAtual, setPaginaAtual] = useState('ONG');

  function handleMenu(e) {
    setPaginaAtual(e.key);
  }

  function renderizaConteudoPagina() {
    switch (paginaAtual) {
      case 'ONG':
        return (
          <div>
            <div className="flex flex-wrap gap-x-4 gap-y-4 justify-between mb-10">
              <Card className="flex-1">
                <Statistic title="Líderes" value="400" />
              </Card>
              <Card className="flex-1">
                <Statistic title="Professores" value="200" />
              </Card>
              <Card className="flex-1">
                <Statistic title="Beneficiados" value="100" />
              </Card>
              <Card className="flex w-[25%]">
                <Statistic title="Oficinas" value="150" className="w-[100%]" />
              </Card>
            </div>
            <div className="flex justify-between mb-10">
              <div className="w-1/2 h-96">
                <AgChartsReact options={graficoCrescimento} />
              </div>
              <div className="w-1/2 h-96">
                <AgChartsReact options={graficoPizzaUsuarios} />
              </div>
            </div>
            <div className="flex justify-between">
              <div className="">
                <AgChartsReact options={graficoPizzaPresencas} />
              </div>
              <div className="w-1/2 h-96">
                <AgChartsReact options={graficoOficinas} />
              </div>
            </div>
          </div>
        );
      case 'Oficina':
        return (
          <div>
            <div className="flex flex-wrap gap-x-4 gap-y-4 justify-between mb-10">
              <Card className="flex-1">
                <Statistic title="Oficinas" value="1213" />
              </Card>
              <Card className="flex-1">
                <Statistic title="Horas Ativas" value="1213" />
              </Card>
              <Card className="flex-1">
                <Statistic title="Número de Turmas" value="1213" />
              </Card>
              <Card className="flex-1">
                <Statistic title="Vagas Ocupadas" value="1213" />
              </Card>
              <Card className="flex-1">
                <Statistic title="Vagas Totais" value="1213" />
              </Card>
            </div>
            <div className="flex justify-between mb-10">
              <div className="w-1/2 h-96">
                <AgChartsReact options={graficoCrescimentoOficinas} />
              </div>
              <div className="w-1/2 h-96">
                <AgChartsReact options={graficoPizzaTemasOficinas} />
              </div>
            </div>
            <div className="flex justify-between">
              <div className="w-full h-96">
                <AgChartsReact options={graficoFrequenciaTurma} />
              </div>
            </div>
          </div>
        );
      case 'Beneficiados':
        return (
          <div>
            <div className="flex flex-wrap gap-x-4 gap-y-4 justify-between mb-10">
              <Card className="flex-1">
                <Statistic title="Beneficiados" value="1213" />
              </Card>
              <Card className="flex-1">
                <Statistic title="Número de Turmas" value="1213" />
              </Card>
              <Card className="flex-1">
                <Statistic title="Vagas Totais" value="1213" />
              </Card>
            </div>
            <div className="flex justify-between mb-10">
              <div className="w-1/2 h-96">
                <AgChartsReact options={graficoCrescimentoBeneficiados} />
              </div>
              <div className="w-1/2 h-96">
                <AgChartsReact options={graficoPizzaEtnias} />
              </div>
            </div>
            <div className="flex justify-between">
              <div className="w-1/2 h-96">
                <AgChartsReact options={graficoPizzaIdentidade} />
              </div>
              <div className="w-1/2 h-96">
                <AgChartsReact options={graficoPizzaRegioes} />
              </div>
            </div>
            <div className="w-full h-96">
              <AgChartsReact options={graficoIdade} />
            </div>
          </div>
        );
    }
  }

  return (
    <div>
      <Menu
        onClick={handleMenu}
        selectedKeys={[paginaAtual]}
        mode="horizontal"
        className="mb-5"
      >
        <Menu.Item key="ONG">ONG</Menu.Item>
        <Menu.Item key="Oficina">Oficina</Menu.Item>
        <Menu.Item key="Beneficiados">Beneficiados</Menu.Item>
      </Menu>
      {renderizaConteudoPagina()}
    </div>
  );
}
