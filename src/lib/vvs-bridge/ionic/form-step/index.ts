import { ICarPhoto } from '../car-photo.interface';
import { ICarStepModel } from '../car-step-model.interface';
import { ICustomerStepModel } from '../customer-step-model.interface';
import { INote } from '../misc.interfaces';

type Step = "car"|"customer"|"carphotos";
export interface ICustomerStepOutput {
    previousStatus?: boolean;
    nextStatus?: boolean;
    data?: ICustomerStepModel;
    currentStep?: Step;
}

export interface ICarStepOutput {
    previousStatus?: boolean;
    nextStatus?: boolean;
    data?: ICarStepModel;
    currentStep?: Step;
}

export interface ICarPhotosStepOutput {
    previousStatus?: boolean;
    nextStatus?: boolean;
    carPhotos?: ICarPhoto[];
    notes?: INote[];
    currentStep?: Step;
}
