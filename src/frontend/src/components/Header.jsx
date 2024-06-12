import { useState, useEffect, useContext } from 'react';
import { MenuOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Context } from '../contexts/Auth';
import { Link } from 'react-router-dom';

export function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const { handleLogout, userData } = useContext(Context);

  const usuario = userData.usuario || {};

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  useEffect(() => {
    const handleResize = () => {
      // Atualiza o estado baseado na largura da janela
      setIsMobileView(window.innerWidth <= 768);
    };

    // Adiciona o evento de redimensionamento da janela
    window.addEventListener('resize', handleResize);
    handleResize();

    // Limpeza do componente
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Define os links baseados nos perfis do usuário
  const links = [
    {
      label: 'ONGs',
      requiredPerfis: ['admin'],
      url: '/ongs',
    },
    { label: 'Painel', requiredPerfis: ['admin'], url: '/painel' },
    {
      label: usuario.ong.nome,
      requiredPerfis: ['lider'],
      url: `/ongs/${usuario.ong.id}`,
    },
    {
      label: 'Oficinas',
      requiredPerfis: ['lider', 'prof', 'beneficiado'],
      url: `/ongs/${usuario.ong.id}/oficinas`,
    },
    {
      label: 'Sair',
      action: handleLogout,
      requiredPerfis: ['admin', 'lider', 'prof', 'beneficiado'],
    },
  ];

  // Filtra os links que devem ser exibidos com base nos perfis do usuário
  const filteredLinks = links.filter((link) =>
    link.requiredPerfis.some((perfil) => usuario.perfil.includes(perfil)),
  );

  // Remove links duplicados
  const uniqueLinks = Array.from(
    new Map(filteredLinks.map((link) => [link['label'], link])).values(),
  );

  const renderLinks = () =>
    uniqueLinks.map((link, index) => (
      <div key={index}>
        {link.url ? (
          <Link
            to={link.url}
            className="transition-colors font-sans hover:text-gray-500 text-foreground text-black cursor-pointer"
          >
            {link.label}
          </Link>
        ) : link.action ? (
          <span
            onClick={link.action}
            className="transition-colors font-sans hover:text-gray-500 text-foreground text-black cursor-pointer"
          >
            {link.label}
          </span>
        ) : (
          <span className="transition-colors font-sans hover:text-gray-500 text-foreground text-black cursor-pointer">
            {link.label}
          </span>
        )}
      </div>
    ));

  return (
    <header className="bg-white border-b flex justify-between items-center min-w-full top-0 px-9 font-sans">
      <div>
        <Link to="/">
          <img src="/ASAS.png" alt="Logo ASAS" className="w-16 h-16" />
        </Link>
      </div>
      {isMobileView ? (
        <div>
          {isModalOpen ? (
            <CloseCircleOutlined
              onClick={toggleModal}
              className="cursor-pointer"
            />
          ) : (
            <MenuOutlined onClick={toggleModal} className="cursor-pointer" />
          )}
        </div>
      ) : (
        <div className="flex items-center justify-between w-fit gap-32">
          {renderLinks()}
        </div>
      )}
      {isModalOpen && isMobileView && (
        <div className="fixed inset-0 overflow-y-auto bg-gray-500 bg-opacity-50 z-40">
          <div className="flex justify-end">
            <div className="absolute right-0 w-1/2 bg-white h-full p-4">
              <div className="flex justify-end">
                <CloseCircleOutlined
                  onClick={toggleModal}
                  className="cursor-pointer"
                />
              </div>
              <div className="flex flex-col gap-4 mt-8">{renderLinks()}</div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
