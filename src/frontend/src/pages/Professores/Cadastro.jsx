import { Form as CustomForm } from '../../components/Form';
import { Passo } from '../../components/Passo';
import { Form, Input, Select } from 'antd';
import api from '../../api';
import { useNavigate, useParams } from 'react-router-dom';

const { Item } = Form;

export default function CadastroProfessor() {
  const navigate = useNavigate();
  const params = useParams();

  const idOng = params.id;

  const handleFinalStep = (formData) => {
    console.log('Dados do formulário para enviar:', formData);
    formData.id_ong = idOng;
    formData.perfil = 'PROF';
    formData.data_inicio
      ? (formData.data_inicio = new Date(formData.data_inicio))
      : (formData.data_inicio = new Date());

    api
      .post('/usuarios', formData)
      .then(() => {
        alert('Professor cadastrado com sucesso!');
        navigate(`/ongs/${idOng}/professores`);
      })
      .catch((error) => {
        alert(
          'Erro ao enviar os dados para a API: ' + error.response.data.message,
        );
      });
  };

  return (
    <section className="container mx-auto pb-8">
      <h1 className="text-3xl font-bold mb-4">Cadastro de Professor</h1>
      <p className="mb-8 text-gray-600">
        Preencha os campos abaixo para cadastrar o professor na plataforma.
      </p>
      <CustomForm
        etapas={3}
        onFinalStep={handleFinalStep}
        stepTitles={['Identificação', 'Demografia', 'Detalhes Profissionais']}
      >
        <Passo>
          <Item name="nome" label="Nome completo">
            <Input placeholder="Nome completo" />
          </Item>
          <Item name="email" label="E-mail">
            <Input type="email" placeholder="E-mail" />
          </Item>
          <Item name="senha" label="Senha">
            <Input.Password placeholder="Senha" />
          </Item>
          <Item name="rg" label="RG">
            <Input placeholder="RG" />
          </Item>
          <Item name="cpf" label="CPF">
            <Input placeholder="CPF" />
          </Item>
          <Item name="data_nasc" label="Data de nascimento">
            <Input type="date" placeholder="Data de nascimento" />
          </Item>
          <Item name="telefone" label="Número de telefone">
            <Input type="tel" placeholder="Número de telefone" />
          </Item>
        </Passo>

        <Passo>
          <Item name="estado_civil" label="Estado civil">
            <Select
              showSearch
              placeholder="Selecione o estado civil"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Select.Option value="Solteiro(a)">Solteiro(a)</Select.Option>
              <Select.Option value="Casado(a)">Casado(a)</Select.Option>
              <Select.Option value="Divorciado(a)">Divorciado(a)</Select.Option>
              <Select.Option value="Viúvo(a)">Viúvo(a)</Select.Option>
            </Select>
          </Item>

          <Item name="etnia" label="Etnia">
            <Select
              showSearch
              placeholder="Selecione a etnia"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Select.Option value="Branco(a)">Branco(a)</Select.Option>
              <Select.Option value="Negro(a)">Negro(a)</Select.Option>
              <Select.Option value="Indígena">Indígena</Select.Option>
              <Select.Option value="Asiático(a)">Asiático(a)</Select.Option>
              <Select.Option value="Outro">Outro</Select.Option>
            </Select>
          </Item>
          <Item name="genero" label="Gênero">
            <Select
              showSearch
              placeholder="Selecione o gênero"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Select.Option value="feminino">Feminino</Select.Option>
              <Select.Option value="masculino">Masculino</Select.Option>
            </Select>
          </Item>
          <Item name="identidade" label="Identidade">
            <Select
              showSearch
              placeholder="Selecione a identidade"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Select.Option value="Cis">Mulher cis</Select.Option>
              <Select.Option value="Trans">Mulher Transgênero</Select.Option>
              <Select.Option value="Cis">Homem cis</Select.Option>
              <Select.Option value="Trans">Homem Transgênero</Select.Option>
              <Select.Option value="Gênero neutro">Gênero neutro</Select.Option>
              <Select.Option value="Não-binário">Não-binário</Select.Option>
              <Select.Option value="Agênero">Agênero</Select.Option>
            </Select>
          </Item>
          <Item name="nacionalidade" label="Nacionalidade">
            <Select
              showSearch
              placeholder="Selecione a identidade"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Select.Option value="Brasil">Brasil</Select.Option>
              <Select.Option value="Argentina">Argentina</Select.Option>
              <Select.Option value="Colômbia">Colômbia</Select.Option>
              <Select.Option value="Venezuela">Venezuela</Select.Option>
              <Select.Option value="Chile">Chile</Select.Option>
              <Select.Option value="Peru">Peru</Select.Option>
              <Select.Option value="Síria">Síria</Select.Option>
              <Select.Option value="Afeganistão">Afeganistão</Select.Option>
              <Select.Option value="Sudão">Sudão</Select.Option>
              <Select.Option value="Myanmar (Birmânia)">
                Myanmar (Birmânia)
              </Select.Option>
              <Select.Option value="Somália">Somália</Select.Option>
              <Select.Option value="Palestina">Palestina</Select.Option>
              <Select.Option value="Nigéria">Nigéria</Select.Option>
              <Select.Option value="Iraque">Iraque</Select.Option>
              <Select.Option value="Eritreia">Eritreia</Select.Option>
              <Select.Option value="Sri Lanka">Sri Lanka</Select.Option>
              <Select.Option value="Congo">Congo</Select.Option>
              <Select.Option value="Líbia">Líbia</Select.Option>
              <Select.Option value="Sudão do Sul">Sudão do Sul</Select.Option>
              <Select.Option value="Outro">Outro</Select.Option>
            </Select>
          </Item>
          <Item name="naturalidade" label="Naturalidade">
            <Input placeholder="Naturalidade" />
          </Item>
        </Passo>

        <Passo>
          <Item name="profissao" label="Ocupação/profissão">
            <Input placeholder="Ocupação/profissão" />
          </Item>
          <Item name="escolaridade" label="Nível de escolaridade">
            <Select
              showSearch
              placeholder="Selecione o nível de escolaridade"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Select.Option value="fundamental">Fundamental</Select.Option>
              <Select.Option value="medio">Médio</Select.Option>
              <Select.Option value="superior">Superior</Select.Option>
              <Select.Option value="pos-graduacao">Pós-graduação</Select.Option>
            </Select>
          </Item>
          <Item name="qualificacoes" label="Qualificações">
            <Input placeholder="Qualificações" />
          </Item>
          <Item name="area_atuacao" label="Área de atuação">
            <Input placeholder="Área de atuação" />
          </Item>
          <Item name="turno_inicio" label="Turno de início">
            <Select
              showSearch
              placeholder="Selecione o turno de início"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Select.Option value="manha">Manhã</Select.Option>
              <Select.Option value="tarde">Tarde</Select.Option>
              <Select.Option value="noite">Noite</Select.Option>
            </Select>
          </Item>
          <Item name="turno_fim" label="Turno de fim">
            <Select
              showSearch
              placeholder="Selecione o turno de fim"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Select.Option value="manha">Manhã</Select.Option>
              <Select.Option value="tarde">Tarde</Select.Option>
              <Select.Option value="noite">Noite</Select.Option>
            </Select>
          </Item>
          <Item name="voluntariado" label="Voluntário">
            <Select
              showSearch
              placeholder="Selecione se é voluntário"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Select.Option value={true}>Sim</Select.Option>
              <Select.Option value={false}>Não</Select.Option>
            </Select>
          </Item>
        </Passo>
      </CustomForm>
    </section>
  );
}
