import { Form as CustomForm } from '../../components/Form';
import { Passo } from '../../components/Passo';
import { Form, Input, Select } from 'antd';
import api from '../../api';
import { useNavigate, useParams } from 'react-router-dom';

const { Item } = Form;

export default function CadastroOficina() {
  const navigate = useNavigate();
  const params = useParams();

  const idOng = params.id;

  const handleFinalStep = (formData) => {
    // adiciona idOng ao objeto formData
    formData.id_ong = idOng;
    api
      .post('/oficinas', formData)
      .then(() => {
        alert('Oficina cadastrada com sucesso!');
        navigate(`/ongs/${idOng}/oficinas`);
      })
      .catch((error) => {
        alert('Erro ao enviar os dados para a API: ' + error.message);
      });
  };

  return (
    <section className="container mx-auto min-h-[60vh]">
      <h1 className="text-3xl font-bold mb-4">Cadastro de Oficina</h1>
      <p className="mb-8 text-gray-600">
        Preencha os campos abaixo para cadastrar a oficina na plataforma.
      </p>
      <CustomForm
        etapas={2}
        onFinalStep={handleFinalStep}
        stepTitles={[
          'Identificação',
          'Demografia',
          'Detalhes Socioeconômicos',
          'Endereço',
        ]}
      >
        <Passo>
          <Item name="nome" label="Nome da Oficina">
            <Input placeholder="Nome da Oficina" />
          </Item>
          <Item name="descricao" label="Descrição da oficina">
            <Input type="text" placeholder="Descrição" />
          </Item>
          <Item name="tema" label="tema">
            <Select
              showSearch
              placeholder="Selecione o tema da oficina"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Select.Option value="Criatividade">
                Criatividade e Artes
              </Select.Option>
              <Select.Option value="Linguagem">
                Linguagem e Comunicação
              </Select.Option>
              <Select.Option value="Ciência">
                Ciência e Tecnologia
              </Select.Option>
              <Select.Option value="Culinária">
                Culinária e Nutrição
              </Select.Option>
              <Select.Option value="Bem-estar">Bem-estar e Saúde</Select.Option>
              <Select.Option value="Música">Música e Performance</Select.Option>
              <Select.Option value="História">História e Cultura</Select.Option>
              <Select.Option value="Meio">
                Meio Ambiente e Sustentabilidade
              </Select.Option>
              <Select.Option value="Negócios">
                Negócios e Empreendedorismo
              </Select.Option>
              <Select.Option value="Desenvolvimento">
                Desenvolvimento Pessoal
              </Select.Option>
            </Select>
          </Item>
        </Passo>

        <Passo>
          <Item name="data_inicio" label="Data Início">
            <Input type="date" placeholder="Data" />
          </Item>
          <Item name="data_fim" label="Data Fim">
            <Input type="date" placeholder="Data" />
          </Item>
        </Passo>
      </CustomForm>
    </section>
  );
}
