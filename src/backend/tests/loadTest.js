const axios = require('axios');
const Papa = require('papaparse');
const fs = require('fs');

/**
 * Classe responsável por realizar testes de carga em endpoints de API,
 * suportando solicitações do tipo GET e POST.
 */
class TestadorDeCargaAPI {
  /**
   * Constrói uma instância do testador de carga.
   * 
   * @param {string} url URL do endpoint da API.
   * @param {Object} dados Dados a serem enviados na solicitação.
   * @param {number} quantidadeDeThreads Número de solicitações simultâneas.
   * @param {('GET'|'POST')} metodo Método HTTP da solicitação.
   */
  constructor(url, dados, quantidadeDeThreads, metodo = 'POST') {
    this.url = url;
    this.dados = dados;
    this.quantidadeDeThreads = quantidadeDeThreads;
    this.metodo = metodo;
    this.resultados = [];
  }

  /**
   * Envia uma solicitação HTTP para o endpoint configurado.
   */
  async enviarSolicitacao() {
    const inicio = new Date();
    try {
      let resposta;
      if (this.metodo === 'POST') {
        resposta = await axios.post(this.url, this.dados);
      } else if (this.metodo === 'GET') {
        resposta = await axios.get(this.url, { params: this.dados });
      } else {
        console.error('Método de solicitação não suportado.');
        return;
      }

      const fim = new Date();
      const tempoDeResposta = fim - inicio;
      this.resultados.push({
        Timestamp: inicio.toISOString(),
        URL: this.url,
        StatusCode: resposta.status,
        TempoDeResposta: tempoDeResposta,
      });

      console.log(`Solicitação ${this.metodo} para ${this.url} concluída | Código de Status: ${resposta.status} | Tempo: ${tempoDeResposta}ms`);
    } catch (erro) {
      console.error(`Erro na solicitação: ${erro}`);
    }
  }

  /**
   * Inicia o teste de carga, enviando o número configurado de solicitações simultâneas.
   */
  async iniciarTeste() {
    console.log('Iniciando teste de carga...');
    const solicitacoes = Array.from({ length: this.quantidadeDeThreads }, () => this.enviarSolicitacao());
    await Promise.all(solicitacoes);
    console.log('Teste de carga concluído. Resultado:');
    this.imprimirResumo();
    this.exportarParaCsv();
  }

  /**
   * Imprime um resumo dos resultados do teste de carga.
   */
  imprimirResumo() {
    console.log(this.resultados);
  }

  /**
   * Exporta os resultados do teste de carga para um arquivo CSV.
   */
  exportarParaCsv() {
    const csv = Papa.unparse(this.resultados);
    fs.writeFileSync('./resultados_teste_carga_api.csv', csv);
    console.log('Resultados exportados para arquivo CSV: ./resultados_teste_carga_api.csv');
  }
}

const URL = 'http://localhost:3000/login'; 
const DADOS = {
  email: 'johndoe@ong.teste.com',
  senha: '123456',
};
const QUANTIDADE_DE_THREADS = 1000; // Número de solicitações simultâneas
const METODO = 'POST'; // ou 'GET'

const testador = new TestadorDeCargaAPI(URL, DADOS, QUANTIDADE_DE_THREADS, METODO);
testador.iniciarTeste();
