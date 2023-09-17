import NotFound from "Front/pages/NotFound";
import Home from "Front/pages/Home";
import Login from "Front/pages/Login";

import { context } from "Front/Contexts/Express";
/**
 * Controllador de Rotas
 * @returns Conteúdo
 */
export default function () {
    switch (context.req.query.path) {
        //   case "/":
        //     return Home;
        case "/":
            return Home();
        case "/auth/login":
            if(context.req.User) {
                return context.res.redirect("/");
            }
            return Login();
        default:
            // Página de erro 404 daqui a pouco
            return NotFound();
    }
}