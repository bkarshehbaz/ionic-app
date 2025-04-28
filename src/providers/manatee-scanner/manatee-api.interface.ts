import { IManateeConstants } from "./manatee-constants.interface";

export interface ManateeScannerApi {

    getConstants?: () => IManateeConstants;

    getDeviceID?: () => {};
    initDecoder?: () => {};
    loadSettings: (settings: any) => Promise<any>;
    resizePartialScanner: (x: number, y: number, width: number, height: number) => {};
    resumeScanning?: () => {};

    /**
     * @name scanImage
     * @params
     *  imageUri *required
     *  callback *optional will get replaced by a default callback if it's missing
     *
     * @description scan an image from an URI
     *
     * @callback results
     * result.code - string representation of barcode result
     * result.type - type of barcode detected or 'Cancel' if scanning is canceled
     * result.bytes - bytes array of raw barcode result
     * result.isGS1 - (boolean) barcode is GS1 compliant
     * result.location - contains rectangle points p1,p2,p3,p4 with the corresponding x,y
     * result.imageWidth - Width of the scanned image
     * result.imageHeight - Height of the scanned image
     */
    scanImage?: () => {};
    setBlinkingLineVisible: (visible: any) => {};
    setCallback: (callback: any) => {};
    setKey: (key: string) => Promise<boolean>;
    setScannerOverlayMode: (overlayMode: any) => {};


    /**
     *   @name startScanning
     *   @description proxy method for starting the scanner with different params (in view/ fullscreen).
     *   This should be called from outside, usually from an UI element that triggers a click/tap event
     *
     */
    startScanning?: () => Promise<any>;
    toggleFlash?: () => {};
    togglePauseResume?: () => {};
    toggleZoom?: () => {};
}
