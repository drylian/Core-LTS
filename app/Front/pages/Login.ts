import setTitle from "Front/Contexts/Title";

export default function () {
    // Define o título da página
    setTitle("Login");

    return `
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

      .login-box {
        background-color: #fff;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        padding: 20px;
        border-radius: 5px;
        max-width: 400px;
        width: 100%;
        text-align: center;
      }

      h1 {
        color: #333;
      }

      input[type="text"],
      input[type="password"] {
        width: 100%;
        padding: 10px;
        margin: 10px 0;
        border: 1px solid #ccc;
        border-radius: 3px;
      }

      button {
        background-color: #007BFF;
        color: #fff;
        border: none;
        padding: 10px 20px;
        border-radius: 3px;
        cursor: pointer;
        font-size: 16px;
      }

      button:hover {
        background-color: #0056b3;
      }
    </style>
    <div class="login-box">
      <h1>Login</h1>
      <form>
        <input type="text" placeholder="Usuário" />
        <input type="password" placeholder="Senha" />
        <button type="submit">Entrar</button>
      </form>
      <script type="module">
        // Importe o Axios
        import axios from '/axios/esm/axios.min.js';

        // Selecione os elementos do formulário
        const usernameInput = document.getElementById('username');
        const passwordInput = document.getElementById('password');
        const loginButton = document.getElementById('loginButton');

        // Adicione um ouvinte de clique ao botão de login
        loginButton.addEventListener('click', async () => {
            event.preventDefault();

            // Obtenha os valores do usuário e senha dos campos de entrada
            const username = usernameInput.value;
            const password = passwordInput.value;

            try {
            // Envie uma solicitação de login para o servidor
            const response = await axios.post('/api/login', { username, password });

            // Verifique se o login foi bem-sucedido
            if (response.data.success) {
                alert('Login bem-sucedido!'); // Exemplo de tratamento de sucesso
            } else {
                alert('Falha no login. Verifique suas credenciais.'); // Exemplo de tratamento de falha
            }
            } catch (error) {
            console.error('Erro na solicitação de login:', error);
            }
        });
    </script>   

    </div>
  `;
}
