import Kernel from "controllers/Kernel";
import Express from 'controllers/Express';
import Index from "Front/Index"
// Criando uma instância do Kernel (anteriormente EventEmitter)
const emitter = new Kernel();

// Definindo um ouvinte para o evento "mensagem"
emitter.on("express", (port: number) => {
  const app = new Express(port);
  // Rota para renderizar o conteúdo
  app.get('/render', async (req, res) => {
    const rendered = await Index(req, res)
    // Envie uma resposta simples para este exemplo
    res.send(rendered);
  });
  // Rota GET
  app.get('/', (req, res) => {
    res.send('Hello, Express GET!');
  });
  app.get('/error', (req, res) => {
    const error = new Error('Um erro personalizado ocorreu');
    throw error;
  });
  app.start()

});

// Emitindo o evento "mensagem" com dados
emitter.emit("express", 3000);

// Você verá a saída no console:
// Evento "mensagem" emitido com a mensagem: Olá, mundo!