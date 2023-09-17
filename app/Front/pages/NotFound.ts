import setTitle from "Front/Contexts/Title"

export default function () {
    /**
     * Seleciona um Titulo
     */
    setTitle("Erro 404")
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
            <h1>Erro interno do servidor</h1>
          <p>Ocorreu um erro interno do servidor. Tente novamente mais tarde.</p>
`;
}