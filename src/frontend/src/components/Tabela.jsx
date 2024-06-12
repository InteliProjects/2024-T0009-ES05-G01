import { PropTypes } from 'prop-types';
import { Table } from 'antd';

export default function Tabela({ dados }) {
  const columns = dados.cabecalhos.map((cabecalho) => ({
    title: cabecalho,
    dataIndex: cabecalho.toLowerCase(),
    key: cabecalho.toLowerCase(),
    ellipsis: true,
    width: 120,
  }));

  const dataSource = dados.linhas.map((linha, index) => ({
    key: index,
    ...linha.reduce(
      (acc, valor, index) => ({
        ...acc,
        [dados.cabecalhos[index].toLowerCase()]: valor,
      }),
      {},
    ),
  }));

  const larguraTotal = dados.cabecalhos.length * 100;

  return (
    <section className="w-full relative">
      <Table
        columns={columns}
        dataSource={dataSource}
        scroll={{ x: larguraTotal, y: 400 }}
      />
    </section>
  );
}

Tabela.propTypes = {
  dados: PropTypes.shape({
    cabecalhos: PropTypes.arrayOf(PropTypes.string).isRequired,
    linhas: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.any.isRequired))
      .isRequired,
  }),
};
