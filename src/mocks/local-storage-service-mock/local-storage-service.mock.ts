// tslint:disable-next-line:no-import-side-effect
// import 'rxjs/add/operator/map';
// tslint:disable-next-line:no-import-side-effect
// import 'rxjs/add/operator/toPromise';
import { ENV } from "../../environments/index";

import { LocalStorageService } from '../../providers/local-storage-service/local-storage-service';


// import { Storage } from '@ionic/storage';
// let storage: Storage = new Storage(['sqlite','indexeddb','websql']);
// let storageConfig:StorageConfig = <StorageConfig> {};

// const storage: Storage = new Storage({});


import { IMake, IModel, NumericMap } from '../../lib/vvs-bridge';
import { $makes } from "../mock-data/json/makes.mock.spec";
import { $models } from "../mock-data/json/models.mock.spec";
// import * as $jsonInit from "../mock-data/json/initialize.mock";

// let lss:LocalStorageService = new LocalStorageService(storage, <any> {}, <any> {}, <any> {});

import { Logger } from "../../providers/vvs-controller/util/logger";
import { from } from "rxjs";
const logger = Logger.get("LocalStorageServiceMock");

export class LocalStorageServiceMock extends LocalStorageService {

    // RecentActivityService: any;
    // RecentActivityObserver: any;

    // initRecentActivityService():void {
    //     this.RecentActivityService = new Observable((observer: any) => {
    //         this.RecentActivityObserver = observer;
    //     });
    // }

    // /*
    // * RecentActivity Observables
    // */
    // sendRecentActivities(data:MI.RecentActivityObservableData, callAgain?:boolean):void {
    //     this.RecentActivityObserver
    //         .next(<MI.RecentActivityObservable> {
    //                                  category:"recentActivities",
    //                                  data:data
    //                               });
    //
    // }
    //
    // getRecentActivityToDisplay():void {
    //     Promise.all([
    //         storage.get("RecentActivity"),
    //         storage.get("RecentActivityType"),
    //         storage.get("PropertyUser"),
    //         storage.get("CurrentTicke")
    //     ])
    //     .then( (value) => {
    //         // logger.debug(value);
    //         let data:MI.RecentActivityObservableData = this.processRecentActivityToDisplay(value);
    //
    //         this.sendRecentActivities(data);
    //     });
    //
    // }

    // getCurrentTicketToDisplayIn() {
    //     super.getCurrentTicketToDisplayIn();
    // }

    loadMakes(cb?: any) {
        logger.i("loadMakes", ENV);
        if (ENV.environment !== "unittesting") {
            return super.loadMakes();
        } else {
            return from(this.getMakes(cb));
        }
    }

    loadModels(cb?: any) {
        if (ENV.environment !== "unittesting") {
            return super.loadModels();
        } else {
            return from(this.getModels());
        }
    }

    getMakes(cb?: any) {
        // logger.l(this);
        // if (checkValue(makes)) {

        if (ENV.environment === "unittesting") {
            return new Promise<NumericMap<IMake>>( (resolve, reject) => {
                this.global_makes = $makes;
                resolve($makes);
                cb && cb();
             });
        } else {
            return super.getMakes();
        }

        // }
        // else{
        //     return Promise.resolve(this.readMakesFromFile())
        //                   .catch(this.hE);
        // }
    }

    getModels() {
        // if (checkValue(models)) {
        // return new Promise<{[key: number]:Model}>( (resolve, reject) => resolve($jsonModels.$model) );
        // }
        // else{
        //     return Promise.resolve(this.readModelsFromFile())
        //                   .catch(this.hE);
        // }

        if (ENV.environment === "unittesting") {
            return new Promise<NumericMap<IModel>>( (resolve, reject) => {
                this.global_models = $models;
                resolve($models);
                // cb && cb();
            });
        } else {
            return super.getModels();
        }
    }


}
