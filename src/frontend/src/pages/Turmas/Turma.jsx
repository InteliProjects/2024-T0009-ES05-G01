import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import api from '../../api';
import Cover from '../../components/Cover';
import Tabela from '../../components/Tabela';
import { Link } from 'react-router-dom';
import { Modal } from 'antd';
import Button from '../../components/Button';
import { Form, Input, Select, Statistic, Card, Checkbox, message } from 'antd';
import { Context } from '../../contexts/Auth';

export default function Turma() {
  const params = useParams();
  const [turma, setTurma] = useState(null);
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const { userData } = useContext(Context);
  const [modalPresencaOpen, setModalPresencaOpen] = useState(false);
  const [aulaIdAtual, setAulaIdAtual] = useState(null);
  const [presencas, setPresencas] = useState([]);
  const [todosPresentes, setTodosPresentes] = useState(false);
  const [modalKey, setModalKey] = useState(0);

  const usuario = userData.usuario || {};

  // Carrega os dados da turma ao montar o componente
  useEffect(() => {
    api
      .get(`/turmas/${params.idTurma}`)
      .then((response) => {
        setTurma(response.data.turma);
      })
      .catch((error) => {
        // valida se é 404 e redireciona para a página de erro
        if (error.response.status === 404) {
          navigate('/404');
        }
      });
  }, [params, navigate]);

  // Função para cadastrar uma nova aula
  const handleSubmitAulas = (values) => {
    api
      .post('/aulas', values)
      .then((response) => {
        setModalOpen(false);
        setAulaIdAtual(response.data.aula.id);
        abrirModalPresenca();
        api
          .get(`/turmas/${params.idTurma}`)
          .then((response) => {
            setTurma(response.data.turma);
          })
          .catch((error) => {
            console.error('Erro ao carregar turma', error);
          });
      })
      .catch((error) => {
        console.error('Erro ao cadastrar aula', error);
      });
  };

  // Função para abrir o modal de presença
  const abrirModalPresenca = () => {
    const beneficiados = turma.usuarios
      .filter((usuario) =>
        usuario.permissoes.some(
          (permissao) => permissao.perfil === 'BENEFICIADO',
        ),
      )
      .map((beneficiado) => ({
        id: beneficiado.id,
        nome: beneficiado.nome,
        presente: false,
      }));
    setPresencas(beneficiados);
    setModalPresencaOpen(true);
    setModalKey((prevKey) => prevKey + 1);
  };

  // Função para atualizar o estado de presença de um beneficiado
  const togglePresenca = (id) => {
    const presencasAtualizadas = presencas.map((presenca) =>
      presenca.id === id
        ? { ...presenca, presente: !presenca.presente }
        : presenca,
    );
    setPresencas(presencasAtualizadas);

    const todosMarcados = presencasAtualizadas.every(
      (presenca) => presenca.presente,
    );
    setTodosPresentes(todosMarcados);
  };

  // Enviando as presenças para o servidor
  const enviarPresencas = () => {
    const presencasEnviadas = presencas
      .filter((p) => p.presente)
      .map((p) => p.id);

    api
      .post(`/aulas/${aulaIdAtual}/presencas`, { presencas: presencasEnviadas })
      .then(() => {
        setModalPresencaOpen(false);
      })
      .catch((error) => {
        console.error('Erro ao enviar presenças', error);
      });
  };

  // Função para marcar todos os beneficiados como presentes ou ausentes
  const marcarTodosPresentes = (presente) => {
    setTodosPresentes(presente);
    setPresencas(
      presencas.map((beneficiado) => ({ ...beneficiado, presente })),
    );
  };

  // Função para abrir o modal de presença para uma aula específica
  const abrirModalPresencasParaAula = (idAula) => {
    api
      .get(`/aulas/${idAula}/presencas`)
      .then((response) => {
        // Obtém os IDs dos usuários presentes a partir da resposta da API
        const idsUsuariosPresentes = response.data.presencas.map(
          (presenca) => presenca.id_usuario,
        );

        // Prepara a lista de todos os beneficiados, marcando os presentes conforme os IDs
        const presencasDaAula = turma.usuarios
          .filter((usuario) =>
            usuario.permissoes.some(
              (permissao) => permissao.perfil === 'BENEFICIADO',
            ),
          )
          .map((beneficiado) => ({
            id: beneficiado.id,
            nome: beneficiado.nome,
            presente: idsUsuariosPresentes.includes(beneficiado.id), // Marca como presente se o ID está na lista de presentes
          }));

        setPresencas(presencasDaAula);
        setAulaIdAtual(idAula);
        setModalPresencaOpen(true);
        // Verifica se todos estão presentes para atualizar o checkbox 'Selecionar Todos'
        setTodosPresentes(
          presencasDaAula.length === idsUsuariosPresentes.length,
        );
      })
      .catch((error) => console.error('Erro ao carregar presenças', error));
  };

  // Função para baixar o template de presenças em CSV
  // Com os IDs e e-mails dos beneficiados, marcados como ausentes
  const baixarTemplateCSV = () => {
    const cabecalho =
      'id_usuario,email_usuario,presente (1 para presente e 0 para ausente)\n';
    const linhas = turma.usuarios
      .filter((usuario) =>
        usuario.permissoes.some(
          (permissao) => permissao.perfil === 'BENEFICIADO',
        ),
      )
      .map((usuario) => `${usuario.id},${usuario.email},${0}`)
      .join('\n');

    const csvContent = cabecalho + linhas;
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'template_presencas.csv');
    document.body.appendChild(link);

    link.click();
    document.body.removeChild(link);
  };

  const anexarPlanilha = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = async (e) => {
      const text = e.target.result;
      const lines = text.split('\n').slice(1); // Ignora o cabeçalho

      // Prepara uma lista com os IDs dos usuários marcados como presentes
      const presencasIds = lines
        .map((line) => {
          const [id_usuario, , presente] = line.split(',');
          return { id: id_usuario.trim(), presente: presente.trim() === '1' };
        })
        .filter(({ presente }) => presente)
        .map(({ id }) => id);

      // Agora, enviar essa lista para o servidor
      try {
        await api.post(`/aulas/${aulaIdAtual}/presencas`, {
          presencas: presencasIds,
        });
        message.success('Presenças enviadas com sucesso!');
        setModalPresencaOpen(false); // Fecha o modal após o sucesso
      } catch (error) {
        console.error('Erro ao enviar presenças', error);
        message.error('Erro ao enviar presenças. Tente novamente.');
      }
    };

    reader.readAsText(file);

    event.target.value = '';
    event.target.files = null;
  };

  return (
    <div>
      {turma ? (
        <>
          <Cover titulo={`${turma?.nome}`} />
          <section className="flex justify-between flex-wrap gap-1">
            <Card
              style={{ minWidth: '15%', borderColor: '#000' }}
              className="transform transition duration-500 hover:scale-105"
            >
              <Statistic
                title="Professor"
                value={
                  turma?.usuarios.find((usuario) =>
                    usuario?.permissoes.some(
                      (permissao) => permissao?.perfil === 'PROF',
                    ),
                  )?.nome
                }
              />
            </Card>
            <Card
              style={{ minWidth: '15%', borderColor: '#1f6516' }}
              className="transform transition duration-500 hover:scale-105"
            >
              <Statistic title="Vagas" value={turma?.vagas} />
            </Card>
            <Card
              style={{ minWidth: '15%', borderColor: '#f50' }}
              className="transform transition duration-500 hover:scale-105"
            >
              <Statistic
                title="Beneficiados"
                value={
                  turma?.usuarios.filter((usuario) =>
                    usuario?.permissoes.some(
                      (permissao) => permissao?.perfil === 'BENEFICIADO',
                    ),
                  ).length
                }
              />
            </Card>
            <Card
              style={{ minWidth: '15%', borderColor: '#108ee9' }}
              className="transform transition duration-500 hover:scale-105"
            >
              <Statistic title="Local" value={turma?.local} />
            </Card>
            <Card
              style={{ minWidth: '15%', borderColor: '#dfe61b' }}
              className="transform transition duration-500 hover:scale-105"
            >
              <Statistic
                title="Status"
                value={turma?.ativo ? 'Ativa' : 'Inativa'}
              />
            </Card>
          </section>
          {usuario?.perfil.includes('prof') ? (
            <div className="flex justify-start items-center mt-8 mb-2">
              <Button onClick={() => setModalOpen(true)} variant="primary">
                Cadastrar
              </Button>
            </div>
          ) : (
            <br />
          )}
          <div className="flex items-center justify-center w-full my-2">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="px-4">Aulas</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          <Tabela
            dados={{
              cabecalhos: ['Data', 'Horário', 'Ações'],
              linhas: turma?.aulas.map((aula) => [
                aula.dia,
                aula.horario,
                <Button
                  onClick={() => abrirModalPresencasParaAula(aula.id)}
                  variant="secondary"
                  key={aula.id}
                >
                  Presenças
                </Button>,
              ]),
            }}
          />
          {usuario?.perfil.includes('prof') ? (
            <div className="flex justify-start items-center mb-2">
              <Link
                to={`/turmas/${params.idTurma}/aulas/cadastro`}
                className="py-2 px-4 border-none rounded bg-black text-white cursor-pointer transition duration-300"
              >
                Adicionar
              </Link>
            </div>
          ) : null}
          <div className="flex items-center justify-center w-full mb-4">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="px-4">Beneficiados</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          <Tabela
            dados={{
              cabecalhos: ['ID', 'Nome', 'RG', 'E-mail'],
              linhas: turma?.usuarios
                .filter((usuario) =>
                  usuario?.permissoes.some(
                    (permissao) => permissao?.perfil === 'BENEFICIADO',
                  ),
                )
                .map((usuario) => [
                  usuario.id,
                  usuario?.nome,
                  usuario?.rg,
                  usuario?.email,
                ]),
            }}
          />
          <Modal
            title="Nova aula"
            centered
            open={modalOpen}
            onCancel={() => setModalOpen(false)}
            okButtonProps={{
              style: {
                display: 'none',
              },
            }}
            cancelButtonProps={{
              style: {
                display: 'none',
              },
            }}
          >
            <Form
              layout="vertical"
              onFinish={handleSubmitAulas}
              name="form_cadastro_aula"
            >
              <Form.Item name="id_turma" hidden initialValue={params.idTurma} />
              <Form.Item label="Dia" name="dia">
                <Input type="date" />
              </Form.Item>
              <Form.Item label="Horário" name="horario">
                <Input type="time" />
              </Form.Item>
              <Form.Item label="Professor" name="id_professor">
                <Select>
                  {turma?.usuarios
                    .filter((usuario) =>
                      usuario?.permissoes.some(
                        (permissao) => permissao?.perfil === 'PROF',
                      ),
                    )
                    .map((usuario) => (
                      <Select.Option key={usuario.id} value={usuario.id}>
                        {usuario.nome}
                      </Select.Option>
                    ))}
                </Select>
              </Form.Item>
              <Form.Item style={{ display: 'flex', justifyContent: 'end' }}>
                <Button type="submit" variant="primary">
                  Cadastrar
                </Button>
              </Form.Item>
            </Form>
          </Modal>
          <Modal
            title="Presenças da Aula"
            centered
            open={modalPresencaOpen}
            onCancel={() => setModalPresencaOpen(false)}
            footer={[
              <Button
                key="sumbit"
                type="submit"
                onClick={enviarPresencas}
                variant="primary"
              >
                Enviar
              </Button>,
            ]}
            okButtonProps={{
              style: {
                display: 'none',
              },
            }}
            cancelButtonProps={{
              style: {
                display: 'none',
              },
            }}
          >
            <div className="flex justify-between items-center">
              <Button onClick={baixarTemplateCSV} variant="secondary">
                Baixar Template (Planilha)
              </Button>
              <Button variant="primary">
                <label htmlFor="planilha" className="cursor-pointer">
                  Anexar Planilha
                </label>
                <input
                  type="file"
                  id="planilha"
                  accept=".csv"
                  onChange={anexarPlanilha}
                  style={{ display: 'none' }}
                  key={modalKey}
                />
              </Button>
            </div>
            <Checkbox
              checked={todosPresentes}
              onChange={(e) => marcarTodosPresentes(e.target.checked)}
              className="mt-4"
            >
              <span className="font-bold">Marcar todos como presentes</span>
            </Checkbox>
            {presencas.map((beneficiado, index) => (
              <div key={index} className="flex items-center my-4">
                <Checkbox
                  checked={beneficiado.presente}
                  onChange={() => togglePresenca(beneficiado.id)}
                >
                  {beneficiado.nome}
                </Checkbox>
              </div>
            ))}
          </Modal>
        </>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
}
