import { Request, Response } from "express";
import Layout from "Front/components/Layout"
import config from "Front/Contexts/Express"
import { CorrentTitle } from "Front/Contexts/Title"
export default function (req: Request, res: Response) {
  /**
   * Carrega a context usada  
   */
  config(req, res);
  return `
        <!-- SSR Rendered -->
        ${Layout()}
        <script> 
        document.addEventListener("SSRStarted", function() {
          // Atualize o título da página
          document.title = "${CorrentTitle || "Desconhecido"}";
        });
        </script>
    `;
}
