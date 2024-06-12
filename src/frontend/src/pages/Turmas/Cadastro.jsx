import { Form as CustomForm } from '../../components/Form';
import { Passo } from '../../components/Passo';
import { Form, Input, Select } from 'antd';
import api from '../../api';
import { useNavigate, useParams } from 'react-router-dom';

const { Item } = Form;

export default function CadastroTurma() {
  const navigate = useNavigate();
  const params = useParams();

  const idOng = params.id;
  const idOficina = params.idOficina;

  const handleFinalStep = (formData) => {
    // adiciona id da Oficina ao objeto formData
    formData.id_oficina = idOficina;
    api
      .post('/turmas', formData)
      .then(() => {
        alert('Turma cadastrada com sucesso!');
        navigate(`/ongs/${idOng}/oficinas/${idOficina}`);
      })
      .catch((error) => {
        alert('Erro ao enviar os dados para a API: ' + error.message);
      });
  };

  return (
    <section className="container mx-auto min-h-[60vh]">
      <h1 className="text-3xl font-bold mb-4">Cadastro de Turma</h1>
      <p className="mb-8 text-gray-600">
        Preencha os campos abaixo para cadastrar a turma na plataforma.
      </p>
      <CustomForm
        etapas={2}
        onFinalStep={handleFinalStep}
        stepTitles={['Informações básicas', 'Vagas e Local']}
      >
        <Passo>
          <Item name="nome" label="Nome da Turma">
            <Input placeholder="Nome da Turma" />
          </Item>
          <Item name="ativo" label="Turma está ativa?">
            <Select>
              <Select.Option value={true}>Sim</Select.Option>
              <Select.Option value={false}>Não</Select.Option>
            </Select>
          </Item>
        </Passo>

        <Passo>
          <Item name="vagas" label="Vagas">
            <Input type="number" placeholder="Vagas" />
          </Item>
          <Item name="local" label="Local">
            <Input type="text" placeholder="Local" />
          </Item>
        </Passo>
      </CustomForm>
    </section>
  );
}
