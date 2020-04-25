import express, { Application }  from 'express';
import { json, urlencoded } from 'body-parser';
import router from './router';

class App {
  private static instance: App;
  private static app: Application;

  private constructor() {
    App.app = express();
    App.app.use(json());
    App.app.use(urlencoded({
      extended: false
    }));
    App.app.use(router);
  }

  public static getApp() {
    if(!App.instance) {
      App.instance = new App();
    }
    return App.app;
  }
}

export default App.getApp();