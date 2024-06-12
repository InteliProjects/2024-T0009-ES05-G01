# Inteli - Instituto de Tecnologia e Liderança

<p align="center">
    <a href= "https://www.inteli.edu.br/"><img src="imagens/inteli.png" alt="Inteli - Instituto de Tecnologia e Liderança" border="0" width=40% height=40%></a>
</p>

<br>

# A.S.A.S. - Aplicação de Software Ágil e Simples

## Grupo Asas 🦅

## 👨‍🎓 Integrantes: 
- <a href="https://br.linkedin.com/in/davi-ferreira-arantes">Davi Ferreira Arantes</a>
- <a href="https://br.linkedin.com/in/kaiane-souza-cordeiro-696076268">Kaiane Souza Cordeiro</a>
- <a href="https://br.linkedin.com/in/kaleb-carvalho-286735250">Kaleb Carvalho</a>
- <a href="https://br.linkedin.com/in/leandro-dos-santos-gomes-803703215">Leandro dos Santos Gomes</a>
- <a href="https://www.linkedin.com/in/victor-gabriel-marques/">Victor Gabriel Marques</a>

## 📜 Descrição

O projeto proposto se destaca como uma solução inovadora concebida para revolucionar a maneira como as Organizações Não Governamentais (ONGs) gerenciam dados e avaliam o impacto de seus atendimentos. Desenvolvido para atender às necessidades específicas das ONGs parceiras da Gerando Falcões, esta aplicação web busca preencher uma lacuna significativa no setor social, onde mais de 80% das organizações ainda carecem de um sistema próprio para gestão de atendimentos. Através do uso de tecnologias avançadas e de uma interface intuitiva, o sistema visa oferecer uma solução robusta para o registro, organização e análise de dados de atendimento, melhorando assim a transparência e a eficácia operacional dessas organizações.

Adotando NodeJS para o backend e ExpressJS para a criação de APIs robustas, o projeto se alinha com as melhores práticas de desenvolvimento de software, garantindo escalabilidade, segurança e facilidade de manutenção. JEST foi utilizado para implementar testes automatizados, assegurando a confiabilidade e a qualidade do código. Para o frontend, ReactJS foi empregado juntamente com a biblioteca de componentes _Ant Design_, proporcionando uma experiência de usuário rica e responsiva, crucial para garantir a acessibilidade em áreas com conectividade limitada. Essa combinação tecnológica não só facilita o desenvolvimento e a implementação rápida de funcionalidades mas também suporta o objetivo de tornar a aplicação acessível em dispositivos móveis, permitindo que os usuários gerenciem informações de atendimento em tempo real, independentemente de sua localização.

Portanto, além de resolver desafios operacionais imediatos, o projeto visa também promover uma mudança significativa na maneira como as ONGs avaliam o impacto de suas ações. Ao fornecer ferramentas para a geração de relatórios detalhados e análises de impacto, a aplicação permitirá que as organizações não apenas meçam, mas também comuniquem o valor de seu trabalho de maneira mais eficaz. Isso, por sua vez, pode melhorar a captação de recursos, fortalecer parcerias e, mais importante, ampliar o alcance e a efetividade dos programas sociais oferecidos.

## Estrutura de Pastas 🗂️

```
documentos/
imagens/
src/
└── backend/
    └── controllers/
    └── database/
        └── config/
        └── migrations/
        └── models/
        └── seeders/
        └── mock/
    └── errors/
    └── middlewares/
    └── repositories/
    └── routes/
    └── services/
    └── tests/
    └── utils/
└── frontend/
    └── public/
    └── src/
        └── assets/
        └── components/
        └── contexts/
        └── pages/
```

### Pasta ``documentos/``

Esta pasta contém todos os documentos relacionados ao projeto, como especificações técnicas, documentação de requisitos e guias para desenvolvedores. Serve como um repositório centralizado para manter toda a documentação necessária para entender e trabalhar no projeto.

### Pasta ``imagens/``

Esta pasta contém todas as imagens utilizadas no projeto, como logotipos, capturas de tela e diagramas. As imagens são organizadas de acordo com o contexto em que são utilizadas, facilitando a referência e a inclusão em documentos e apresentações.

### Pasta ``src/``

Esta pasta contém todo o código fonte do projeto, dividido em duas subpastas: ``backend/`` e ``frontend/``. Cada subpasta contém os arquivos e diretórios necessários para executar a aplicação, incluindo o código fonte, os testes, os arquivos de configuração e as dependências.

#### Pasta ``backend/``

Esta pasta contém o código fonte do backend da aplicação, responsável por fornecer APIs RESTful para o frontend e gerenciar a lógica de negócios. O backend é construído com NodeJS e ExpressJS, seguindo as melhores práticas de desenvolvimento de software para garantir escalabilidade, segurança e facilidade de manutenção.

- ``controllers/``: Contém os controladores da aplicação, responsáveis por manipular as solicitações recebidas e enviar as respostas para o cliente.
- ``database/``:
    - ``config/``: Armazena os arquivos de configuração do banco de dados, incluindo conexões e parâmetros.
    - ``migrations/``: Contém os scripts de migração que ajudam a gerenciar as versões do esquema do banco de dados.
    - ``models/``: Define os modelos de dados, representando as tabelas do banco de dados e suas relações.
    - ``seeders/``: Contém os arquivos seed, que são usados para popular o banco de dados com dados iniciais para desenvolvimento e testes.
    - ``mock/``: Armazena dados fictícios utilizados para testes ou para simulação de funcionalidades durante o desenvolvimento.
- ``errors/``: Gerencia os erros da aplicação, centralizando a lógica de tratamento e padronização das respostas de erro.
- ``middlewares/``: Contém os middlewares do Express, utilizados para interceptar e modificar as requisições ou respostas, ou para executar verificações e lógicas específicas.
- ``repositories/``: Implementa o padrão de repositório para abstrair a lógica de acesso aos dados, facilitando a manutenção e testabilidade.
- ``routes/``: Define as rotas da aplicação e associa cada rota aos seus respectivos controladores.
- ``services/``: Contém os serviços da aplicação, onde a lógica de negócios é implementada, promovendo a reutilização de código e a separação de conceitos.
- ``tests/``: Armazena os testes automatizados do back-end, garantindo a verificação contínua da lógica de negócios e da integração com o banco de dados.
- ``utils/``: Contém funções utilitárias e helpers comuns a vários pontos da aplicação, facilitando a manutenção do código.

#### Pasta ``frontend/``

Esta pasta contém o código fonte do frontend da aplicação, responsável por fornecer a interface do usuário e interagir com o backend através de APIs RESTful. O frontend é construído com ReactJS e _Ant Design_, proporcionando uma experiência de usuário rica e responsiva.

- ``public/``: Contém os arquivos estáticos do frontend, como HTML, imagens e outros recursos que são servidos diretamente ao cliente.
- ``src/``:
    - ``assets/``: Armazena os arquivos de ativos, como imagens, fontes e estilos, utilizados no frontend.
    - ``components/``: Contém os componentes reutilizáveis do React, que são combinados para formar a interface do usuário.
    - ``contexts/``: Define os contextos do React, que permitem compartilhar dados entre componentes sem a necessidade de passar props manualmente.
    - ``pages/``: Define as páginas da aplicação, que representam as diferentes telas e funcionalidades disponíveis para o usuário.

## Como rodar a aplicação ▶️

```bash
# Clone este repositório
$ git clone ...

# Acesse a pasta do backend no terminal
$ cd 2024-T0009-ES05-G01/src/backend

# Builde a imagem do Docker
$ docker build -t api-asas .

# Crie um arquivo .env com as variáveis de ambiente (SECRET, SECRET_REFRESH, ACCESS_TOKEN_EXPIRATION, REFRESH_TOKEN_EXPIRATION)

# Rode o container
$ docker run -p 3000:3000 --env-file ./.env api-asas

# Acesse a pasta do frontend no terminal
$ cd 2024-T0009-ES05-G01/src/frontend

# Builde a imagem do Docker
$ docker build -t front-asas .

# Rode o container
$ docker run -p 5173:5173 front-asas

# O servidor inciará na porta:3000 - acesse http://localhost:3000
# O frontend inciará na porta:5173 - acesse http://localhost:5173
```

## 🗃 Histórico de lançamentos

> Para visualizar o histórico de lançamentos completo deste projeto, consulte as [tags neste repositório](https://github.com/Inteli-College/2024-T0009-ES05-G01/tags), ou diretamente as [releases](https://github.com/Inteli-College/2024-T0009-ES05-G01/releases)

## 📋 Licença/License

<img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1"><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1"><p xmlns:cc="http://creativecommons.org/ns#" xmlns:dct="http://purl.org/dc/terms/"><a property="dct:title" rel="cc:attributionURL" href="https://github.com/Inteli-College/2024-T0009-ES05-G01">ASAS</a> by <a rel="cc:attributionURL dct:creator" property="cc:attributionName">Inteli, - <a href="https://br.linkedin.com/in/davi-ferreira-arantes">Davi Ferreira Arantes</a>, <a href="https://br.linkedin.com/in/kaiane-souza-cordeiro-696076268">Kaiane Souza Cordeiro</a>, <a href="https://br.linkedin.com/in/kaleb-carvalho-286735250">Kaleb Carvalho</a>, <a href="https://br.linkedin.com/in/leandro-dos-santos-gomes-803703215">Leandro dos Santos Gomes</a>, <a href="https://www.linkedin.com/in/victor-gabriel-marques/">Victor Gabriel Marques</a> </a> is licensed under <a href="http://creativecommons.org/licenses/by/4.0/?ref=chooser-v1" target="_blank" rel="license noopener noreferrer" style="display:inline-block;">Attribution 4.0 International</a>.</p>
