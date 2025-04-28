import { Coordinates, Geolocation, Geoposition } from "@ionic-native/geolocation/ngx";

import { Logger } from "../../providers/vvs-controller/util/logger";
const logger = Logger.get("GeoLocationMock");

export class GeoLocationMock extends Geolocation {

    getCurrentLocation(options?: GetNotificationOptions): Promise<Geoposition> {
        return new Promise( (resolve, reject) => {

            const coords: Coordinates = {} as Coordinates;
            coords.latitude = 34.0432464;
            coords.longitude = -118.267463;

            const geoposition: Geoposition = {} as Geoposition;
            geoposition.timestamp = new Date().getTime();
            geoposition.coords = coords;

            resolve(geoposition);
        });
    }

    // getPicture(options) {
    //     return new Promise((resolve,reject) => {
    //         // this.getRandomBase64("/random-image", (base64) => {
    //         this.getRandomBase64("/unsplash", (base64) => {
    //             logger.debug(base64.substring(0,50));
    //             resolve(base64.replace("data:image/jpeg;base64,",""));
    //         });
    //
    //     });
    // }
    //
    // getRandomBase64(url, callback) {
    //     var xhr = new XMLHttpRequest();
    //     xhr.onload = function() {
    //         var reader = new FileReader();
    //         reader.onloadend = function() {
    //             callback(reader.result);
    //         };
    //         reader.readAsDataURL(xhr.response);
    //     };
    //     xhr.open('GET', url);
    //     xhr.responseType = 'blob';
    //     xhr.send();
    // }

}
