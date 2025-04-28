// import { Storage } from '@ionic/storage';
// // let storage: Storage = new Storage(['sqlite','indexeddb','websql']);
// const storage: Storage = new Storage({});

import { sample, values } from "lodash";
import * as MI from "../../lib/vvs-bridge";

import * as cf from "../../constants/constant-fields";

import { init as initialize} from "../mock-data/json/initialize.mock.spec";
import { $makes } from "../mock-data/json/makes.mock.spec";
import { $models } from "../mock-data/json/models.mock.spec";

// tslint:disable-next-line:no-duplicate-imports
import { NumericMap } from '../../lib/vvs-bridge';
import * as lib from "../../util/index";

import { Logger } from "../../providers/vvs-controller/util/logger";
const logger = Logger.get("NavParamsMock");

export class NavParamsMock {

    static returnParam = {};

    static setParams(key, value: any) {
        NavParamsMock.returnParam[key] = value;
    }

    public get(key): any {
        return NavParamsMock.returnParam[key];
    }

    // get(val: string|number) {

    //     switch (val) {
    //         case cf.ticket:

    //             // let _currentTicket = sample(initialize.CurrentTicket);
    //             //
    //             // let ta = lib.processFullTicket(currentTicket.currentTicketID,
    //             //                         <any>initialize.CurrentTicket,
    //             //                         <any>initialize.Customer,
    //             //                         <any>initialize.Car,
    //             //                         <any>initialize.Color,
    //             //                         <any>initialize.TicketType,
    //             //                         <any>initialize.TicketSequence,
    //             //                         <any>initialize.LoginUser,
    //             //                         $makes.$makes,
    //             //                         $models.$model
    //             //                         );
    //             //
    //             //
    //             // logger.lta);

    //             // let _currentTicket  :MI.ICurrentTicket            = $values[0][ticketID                      ];

    //             const _currentTicket: any = sample(values(initialize.CurrentTicket));
    //             const ticketID = _currentTicket.currentTicketID;

    //             // logger.lJSON.stringify(_currentTicket));
    //             // //logger.debug("_currentTicket >> ", _currentTicket);
    //             const _currentCustomer: MI.ICustomer                 = initialize.Customer[_currentTicket .customerID    ];
    //             const _currentCar     : MI.ICar                      = initialize.Car[_currentTicket .carID         ];
    //             const _currentColor   : MI.IColor                    = initialize.Color[_currentCar    .colorID       ];
    //             const _ticketType     : MI.ITicketType               = initialize.TicketType[_currentTicket .ticketTypeID  ];
    //             const _ticketSequence : MI.ITicketSequence           = initialize.TicketSequence[ticketID                      ];
    //             const _parkLocation   : MI.IParkLocation             = _ticketSequence.parkLocationID ? initialize.ParkLocation[_ticketSequence.parkLocationID] : undefined;
    //             const _parkArea       : MI.IParkArea                 = {} as any;// _parkLocation.parkAreaID ? initialize.ParkArea[_parkLocation.parkAreaID] : undefined;

    //             // let _selectedProperty:Property                = initialize.;

    //             const _selectedMake    : MI.IMake                    = $makes.$makes[_currentCar    .makeID        ];
    //             const _selectedModel   : MI.IModel                   = $models.$model[_currentCar   .modelID        ];

    //             const _loginUser       : any                    = initialize.LoginUser;
    //             const _propertyUserData: any     = initialize.PropertyUser;
    //             // _currentCustomer.middleNameInitial = (toString(_currentCustomer.customerMiddleName).length > 0) ?
    //             //                                      (toString(_currentCustomer.customerMiddleName)[0] + ". " ) : "";


    //             const _recentActivities      : NumericMap<MI.IRecentActivity>     = initialize.RecentActivity;
    //             const _recentActivityTypes   : NumericMap<MI.IRecentActivityType> = initialize.RecentActivityType;

    //             // let _recentActivityItems:RecentActivityItem[] = [];

    //             const data = lib.processFullTicket(
    //                                         {} as any,
    //                                         ticketID         ,
    //                                         _currentTicket   ,
    //                                         _currentCustomer ,
    //                                         _currentCar      ,
    //                                         _currentColor    ,
    //                                         _ticketType      ,
    //                                         _ticketSequence  ,
    //                                         _parkArea        ,
    //                                         _parkLocation    ,
    //                                         _selectedCompany ,
    //                                         _selectedMake    ,
    //                                         _selectedModel   ,
    //                                         _loginUser       ,
    //                                         _propertyUserData,
    //                                         _recentActivities,
    //                                         _recentActivityTypes);
    //             return data;
    //             // return sample(values(initialize.CurrentTicket));
    //             // let currentTicket = {};
    //             // storage.get(storageKeys.CurrentTicket)
    //             //        .then( (currentTicketData: any) => {
    //             //             logger.l{ currentTicketID: sample(Object.keys(currentTicketData)) });
    //             //             currentTicket = { currentTicketID: sample(Object.keys(currentTicketData)) };
    //             //        });
    //             // return currentTicket;

    //         case cf.user:

    //             return initialize.LoginUser;
    //             // logger.debug('user >> ', document.URL);
    //             // let user = {};
    //             // storage.get(storageKeys.LoginUser)
    //             //        .then( (loginUser:myInterfaces.User) => {
    //             //           // logger.debug("LoginUser  >>  ", loginUser);
    //             //           user = loginUser;
    //             //        });
    //             //        return user;
    //             // break;
    //         case cf.type:
    //             // logger.debug('type >> ', document.URL);
    //             break;
    //     }
    // }



}
