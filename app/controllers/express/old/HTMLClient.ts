export default`
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        /* Estilos para o ícone de carregamento (spinner) */
        .spinner {
            border: 4px solid rgba(0, 0, 0, 0.1);
            border-left: 4px solid #3498db;
            border-radius: 50%;
            width: 30px;
            height: 30px;
            animation: spin 1s linear infinite;
            position: absolute;
            top: 50%;
            left: 50%;
            margin-top: -15px;
            margin-left: -15px;
            display: none; /* Inicialmente oculto */
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    </style>
</head>
<body>
    <!-- Indicador de carregamento (spinner) -->
    <div class="spinner"></div>

    <!-- Conteúdo da página -->
    <div id="content">
    </div>

    <!-- Params -->
    <script>
        function loadContent() {
            var contentElement = document.getElementById("content");
            
            // Mostra o indicador de carregamento
            var spinner = document.querySelector(".spinner");
            spinner.style.display = "block";
        
            // Obtém o caminho atual do URL
            var currentPath = window.location.pathname;
        
            // Define a URL da solicitação com o caminho atual
            var url = "/render?path=" + encodeURIComponent(currentPath);
        
            // Define o cabeçalho Accept para texto simples
            var headers = new Headers({
                'Accept': 'text/plain'
            });
        
            fetch(url, {
                method: 'GET',
                headers: headers
            })
            .then(function (response) {
                return response.text(); // Solicitação bem-sucedida, obtém o corpo da resposta como texto
            })
            .then(function (textContent) {
                // Criar um elemento div temporário
                var tempDiv = document.createElement('div');
                tempDiv.innerHTML = textContent;
            
                // Remover todos os scripts dentro da div "content" antes de adicionar novos
                var contentScripts = contentElement.querySelectorAll('script');
                contentScripts.forEach(function (script) {
                    script.parentNode.removeChild(script);
                });
            
                // Atualiza o conteúdo da div "content" com o novo conteúdo
                contentElement.innerHTML = tempDiv.innerHTML;
            
                // Esconde o indicador de carregamento
                spinner.style.display = "none";

                // Remove o script de fetch atual, se existir
                var oldFetchScript = document.querySelector('script[src*="render"]');
                if (oldFetchScript) {
                    oldFetchScript.parentNode.removeChild(oldFetchScript);
                }

                // Encontrar todos os scripts no conteúdo carregado
                var scripts = tempDiv.querySelectorAll('script');

                // Manter um registro dos IDs dos scripts adicionados
                var addedScriptIds = [];

                function gen(length) {
                    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                    let randomString = '';
                
                    for (let i = 0; i < length; i++) {
                        const randomIndex = Math.floor(Math.random() * characters.length);
                        randomString += characters.charAt(randomIndex);
                    }
                
                    return randomString;
                }
                
                // Função para carregar e executar scripts de forma assíncrona
                function loadScriptAsync(scriptText, scriptId) {
                    var newScript = document.createElement('script');
                    newScript.text = scriptText; // Copiar o conteúdo do script
                    newScript.async = true; // Carregar e executar de forma assíncrona
                    newScript.id = scriptId; // Atribuir um ID único
                    document.body.appendChild(newScript);

                    // Adicionar o ID à lista de scripts adicionados
                    addedScriptIds.push(scriptId);
                }

                // Carregar e executar os scripts de forma assíncrona, atribuindo um ID único a cada um
                scripts.forEach(function (script, index) {
                    loadScriptAsync(script.text, gen(12) + index);
                });
                
                var loadEvent = new Event('SSRStarted');
                document.dispatchEvent(loadEvent);
            })
            
            .catch(function (error) {
                // Lida com o erro exibindo uma mensagem de erro
                spinner.style.display = "none";
                contentElement.innerHTML = "<p>Erro ao carregar o conteúdo: " + error.message + "</p>";
            });
        }

        // Chama a função para carregar o conteúdo quando a página carrega
        window.addEventListener("DOMContentLoaded", loadContent);
    </script>
</body>
</html>

`;