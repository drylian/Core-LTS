export default function (Error:any) {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Erro interno do servidor</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  background-color: #f4f4f4;
                  margin: 0;
                  padding: 0;
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  justify-content: center;
                  height: 100vh;
              }
  
              h1 {
                  color: #e74c3c;
              }
  
              p {
                  font-size: 18px;
              }
  
              .error-box {
                  border: 2px solid #e74c3c;
                  padding: 10px; /* Adicionando padding de 10px */
                  background-color: #fff;
                  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
                  max-width: 80%; /* Largura máxima da caixa de erro */
                  max-height: 600px;
                  overflow: auto;
              }
          </style>
      </head>
      <body>
          <h1>Erro interno do servidor</h1>
          <p>Ocorreu um erro interno do servidor. Tente novamente mais tarde.</p>
          <p>Mensagem: ${Error.message ? Error.message : Error}</p>
          <div class="error-box">
              ${Error.stack ? `<p>Stack:<br>${Error.stack}</p>`: `<!-- Sem Stack -->`}
          </div><div style="top:10px"></div>

      </body>
      </html>
    `;
  }
  