
// export class ViewControllerMock extends ViewController {
//
//     _setHeader(directive: any) {
//
//     }
//
// }

// tslint:disable:ban-types

export class ViewControllerMock {

    public readReady: any = {
        emit(): void {

        },
        subscribe(): any {

        }
    };

    public writeReady: any = {
        emit(): void {

        },
        subscribe(): any {

        }
    };

    public contentRef(): any {
        return new Promise(function (resolve: Function): void {
            resolve();
        });
    }

    public didEnter(): any {
        return new Promise(function (resolve: Function): void {
            resolve();
        });
    }

    public didLeave(): any {
        return new Promise(function (resolve: Function): void {
            resolve();
        });
    }

    public onDidDismiss(): any {
        return new Promise(function (resolve: Function): void {
            resolve();
        });
    }

    public onWillDismiss(): any {
        return new Promise(function (resolve: Function): void {
            resolve();
        });
    }

    public willEnter(): any {
        return new Promise(function (resolve: Function): void {
            resolve();
        });
    }

    public willLeave(): any {
        return new Promise(function (resolve: Function): void {
            resolve();
        });
    }

    public willUnload(): any {
        return new Promise(function (resolve: Function): void {
            resolve();
        });
    }

    public dismiss(): any {
        return true;
    }

    public enableBack(): any {
        return true;
    }

    public getContent(): any {
        return true;
    }

    public hasNavbar(): any {
        return true;
    }

    public index(): any {
        return true;
    }

    public isFirst(): any {
        return true;
    }

    public isLast(): any {
        return true;
    }

    public pageRef(): any {
        return true;
    }

    public setBackButtonText(): any {
        return true;
    }

    public showBackButton(): any {
        return true;
    }

    public _setHeader(): any {
        return true;
    }

    public _setIONContent(): any {
        return true;
    }

    public _setIONContentRef(): any {
        return true;
    }

    public _setNavbar(): any {
        return true;
    }

    public _setContent(): any {
        return true;
    }

    public _setContentRef(): any {
        return true;
    }

    public _setFooter(): any {
        return true;
    }

}
// tslint:enable:ban-types
