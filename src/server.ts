import { App } from './app';

const PORT = Number(process.env.PORT) || 3000;

new App().start(PORT);
