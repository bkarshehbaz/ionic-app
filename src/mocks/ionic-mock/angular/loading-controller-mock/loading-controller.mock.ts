import { LoadingOptions } from "ionic-angular";


export class LoadingMock {

    present(): Promise<any> {
        return Promise.resolve();
    }

    dismiss(): Promise<any> {
        return Promise.resolve();
    }

    onDidDismiss(): () => void {
        return;
    }

}
// tslint:disable-next-line:max-classes-per-file
export class LoadingControllerMock {

    present(): Promise<any> {
        return Promise.resolve();
    }

    dismiss(): Promise<any> {
        return Promise.resolve();
    }

    didDismiss(): () => void {
        return;
    }

    create(loadingOptios: LoadingOptions): LoadingMock {
        return new LoadingMock();
    }

}
