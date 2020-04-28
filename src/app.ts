import express, { Application }  from 'express';
import { json, urlencoded } from 'body-parser';
import cors from 'cors';
import { errorHandler } from 'middleware/error-handler';
import router from './router';

class App {
  private static instance: App;
  private static app: Application;

  private constructor() {
    App.app = express();
    App.app.use(cors());
    App.app.use(json());
    App.app.use(urlencoded({extended: false}));
    App.app.use(router);
    App.app.use(errorHandler);
  }

  public static getApp(): Application {
    if(!App.instance) {
      App.instance = new App();
    }
    return App.app;
  }
}

export default App.getApp();