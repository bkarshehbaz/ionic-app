import { Pipe, PipeTransform } from '@angular/core';
// import { orderBy, values } from "lodash";
import { VVSApp } from '../../providers/vvs-controller/vvs-controller';

@Pipe({
    name: 'color'
})
export class ColorPipe implements PipeTransform {

    constructor(private vvsApp: VVSApp) { }

    /**
     * @param object and it must contain a recentActivityID
     * @return array
     */
    transform(id: any, ...args: string[]): Promise<string> {
        return this.vvsApp.lss.getColorData()
        .then( (colors) => {
            if (colors[id]) {
                return colors[id].colorHex;
            }
        });
    }

}
