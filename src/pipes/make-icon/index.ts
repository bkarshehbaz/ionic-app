import { Pipe, PipeTransform } from '@angular/core';
import { kebabCase } from "lodash";

const makes = {
    mini: 1,
    fiat: 1,
    mclaren: 1,
    "mclaren-alt": 1,
    "alfa-romeo": 1,
    dodge: 1,
    ram: 1,
    subaru: 1,
    "subaru-alt": 1,
    "ram-alt": 1,
    volvo: 1,
    spyker: 1,
    "spyker-alt": 1,
    mazda: 1,
    lotus: 1,
    "lotus-alt": 1,
    lamborghini: 1,
    "lamborghini-alt": 1,
    "jeep-alt": 1,
    jeep: 1,
    jaguar: 1,
    "jaguar-alt": 1,
    "aston-martin": 1,
    "aston-martin-alt": 1,
    "mercedes-benz": 1,
    saab: 1,
    "saab-alt": 1,
    acura: 1,
    "alfa-romeo-alt": 1,
    "am-general": 1,
    audi: 1,
    bentley: 1,
    bmw: 1,
    bugatti: 1,
    buick: 1,
    cadillac: 1,
    chevrolet: 1,
    chrysler: 1,
    daewoo: 1,
    eagle: 1,
    ferrari: 1,
    "fiat-alt": 1,
    fisker: 1,
    ford: 1,
    genesis: 1,
    geo: 1,
    gmc: 1,
    honda: 1,
    hummer: 1,
    hyundai: 1,
    infiniti: 1,
    isuzu: 1,
    kia: 1,
    "land-rover": 1,
    lexus: 1,
    lincoln: 1,
    maserati: 1,
    maybach: 1,
    "mazda-alt": 1,
    "mercedes-benz-alt": 1,
    mercury: 1,
    "mini-alt": 1,
    mitsubishi: 1,
    nissan: 1,
    oldsmobile: 1,
    panoz: 1,
    plymouth: 1,
    pontiac: 1,
    porsche: 1,
    "rolls-royce": 1,
    saturn: 1,
    scion: 1,
    smart: 1,
    suzuki: 1,
    tesla: 1,
    toyota: 1,
    volkswagen: 1,
    "volvo-alt": 1
};

@Pipe({
    name: 'makeIcon'
})
export class MakeIconPipe implements PipeTransform {

    /**
     * @param object and it must contain a recentActivityID
     * @return array
     */
    transform(str: string): string {
        const make = kebabCase(str);
        if (makes[make]) {
            return `car-${make}`;
        }
        
        return "fa fa-car";
    }

}
