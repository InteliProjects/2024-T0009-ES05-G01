import { Form, Input, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useContext } from 'react';
import { useEffect } from 'react';
import Button from '../components/Button';

import { Context } from '../contexts/Auth';

export default function Login() {
  const { handleLogin, handleLogout } = useContext(Context);

  useEffect(() => {
    handleLogout();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onFinish = async (values) => {
    handleLogin(values);
  };

  return (
    <section className="flex flex-col justify-center items-center min-h-screen bg-white p-8 md:flex-row">
      <div className="flex flex-col gap-9 justify-center items-center mb-12 md:w-1/2 md:items-start">
        <h1 className="text-6xl font-bold uppercase leading-tight text-center md:text-7xl md:text-left md:max-w-xl">
          Gerando Falcões
        </h1>
        <div className="flex flex-col gap-9 justify-center items-center w-full md:flex-row md:items-center md:justify-start">
          <img
            src="/logo_gf.svg"
            alt="Logo da Gerando Falcões"
            className="w-auto"
          />
          <p className="text-xl font-bold text-center leading-6 max-w-xs md:text-lg md:max-w-sm md:text-left">
            Rede de Excelência
          </p>
        </div>
      </div>

      <div className="w-full bg-[#2F2F2F] p-6 rounded-lg md:max-w-md md:p-8">
        <Form name="login" onFinish={onFinish}>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Por favor, insira seu e-mail' },
            ]}
          >
            <Input
              className="h-10"
              size="large"
              type="email"
              prefix={<UserOutlined />}
            />
          </Form.Item>
          <Form.Item
            name="senha"
            rules={[{ required: true, message: 'Por favor, insira sua senha' }]}
          >
            <Input
              className="h-10"
              size="large"
              type="password"
              prefix={<LockOutlined />}
            />
          </Form.Item>
          <div className="flex justify-between items-center mb-5 text-white text-sm">
            <Checkbox className="mr-2 text-white">Lembre-se de mim</Checkbox>
            <a href="#" className="underline">
              Esqueceu a senha?
            </a>
          </div>
          <div className="flex flex-col gap-4 mb-2">
            <Button type="submit" variant={'primary'}>
              Entrar
            </Button>
          </div>
          <div className="flex flex-col gap-4">
            <Button type="button" variant={'secondary'}>
              Criar Conta
            </Button>
          </div>
        </Form>
      </div>
    </section>
  );
}
