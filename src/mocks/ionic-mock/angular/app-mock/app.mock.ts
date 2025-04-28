import { App } from "ionic-angular";

import { IonicAppMock } from "../ionic-app-mock/ionic-app.mock";

export class AppMock extends App {

    _appRoot = new IonicAppMock() as any;

}
