import type { Express } from 'express';
import express from 'express';

export class App {
  private _app: Express;

  constructor() {
    this._app = express();
    this.configure();
  }

  public get app(): Express {
    return this._app;
  }

  public start(port: number): void {
    this._app.listen(port, () => console.log(`[INFO] server started on port: ${port}`));
  }

  private configure(): void {
    this.configureGlobalMiddlewares();
    this.configureRoutes();
  }

  private configureGlobalMiddlewares(): void {
    this._app.use(express.json());
  }

  private configureRoutes(): void {
    // this.app.use();
  }
}
