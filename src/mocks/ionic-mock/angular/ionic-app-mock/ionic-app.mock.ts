
export class IonicAppMock {

    // constructor() {
    //     super();
    // }
    //
    // tslint:disable-next-line:use-life-cycle-interface
    ngOnInit() {

    }

    _getPortal(portals?: number) {
        return {length: () => 0} as any;
    }

    _getActivePortal() {
        return {} as any;
    }

    _disableScroll(shouldDisableScroll: boolean) {
        return {} as any;
    }

    stopScroll(): Promise<boolean> {
        return Promise.resolve(true);
    }


}
