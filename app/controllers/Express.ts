import express, { Application, Request, Response, NextFunction } from 'express';
import HTTPError from 'controllers/express/HTMLError';
import HTTPClient from 'controllers/express/HTMLClient';
export default class Express {
  private app: Application;
  private port: number;
  private server: any;

  constructor(port: number) {
    this.app = express();
    this.port = port;
    this.server = null;

    this.config();
  }

  private config() {
    // Configurações gerais do Express
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(express.static("./app/Front/static"));
    this.app.use(this.HTMLRender.bind(this));
  }

  private HTTPHumanError(req: Request, res: Response, error: any) {
    console.error(error);
    // Verifique o cabeçalho Accept da solicitação
    const acceptHeader = req.headers.accept;
    if (acceptHeader && acceptHeader.includes('text/html')) {
      // Se o cliente aceita HTML, renderize uma página de erro HTML
      res.status(500).send(HTTPError(error));
    } else {
      // Caso contrário, retorne uma resposta JSON
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  private HTMLRender(req: Request, res: Response, next: NextFunction) {
    const acceptHeader = req.headers.accept;
    if (acceptHeader && acceptHeader.includes('text/html')) {
      // Se o cliente aceita HTML, renderize uma página HTML
      res.status(200).send(HTTPClient);
    } else {
      // Caso contrário, passe para o próximo middleware
      next();
    }
  }

  get(route: string, handler: (req: Request, res: Response) => void) {
    this.app.get(route, (req, res) => {
      try {
        handler(req, res);
      } catch (error) {
        this.HTTPHumanError(req, res, error);
      }
    });
  }

  post(route: string, handler: (req: Request, res: Response) => void) {
    this.app.post(route, (req, res) => {
      try {
        handler(req, res);
      } catch (error) {
        this.HTTPHumanError(req, res, error);
      }
    });
  }

  put(route: string, handler: (req: Request, res: Response) => void) {
    this.app.put(route, (req, res) => {
      try {
        handler(req, res);
      } catch (error) {
        this.HTTPHumanError(req, res, error);
      }
    });
  }

  delete(route: string, handler: (req: Request, res: Response) => void) {
    this.app.delete(route, (req, res) => {
      try {
        handler(req, res);
      } catch (error) {
        this.HTTPHumanError(req, res, error);
      }
    });
  }

  patch(route: string, handler: (req: Request, res: Response) => void) {
    this.app.patch(route, (req, res) => {
      try {
        handler(req, res);
      } catch (error) {
        this.HTTPHumanError(req, res, error);
      }
    });
  }

  options(route: string, handler: (req: Request, res: Response) => void) {
    this.app.options(route, (req, res) => {
      try {
        handler(req, res);
      } catch (error) {
        this.HTTPHumanError(req, res, error);
      }
    });
  }

  head(route: string, handler: (req: Request, res: Response) => void) {
    this.app.head(route, (req, res) => {
      try {
        handler(req, res);
      } catch (error) {
        this.HTTPHumanError(req, res, error);
      }
    });
  }

  use(middleware: (req: Request, res: Response, next: NextFunction) => void) {
    this.app.use(middleware);
  }

  start() {
    this.server = this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }

  stop() {
    if (this.server) {
      this.server.close();
      console.log('Server has been stopped.');
    }
  }

  restart() {
    this.stop();
    this.start();
  }
}
