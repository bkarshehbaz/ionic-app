import { Pipe, PipeTransform } from '@angular/core';
import { filter, map } from 'lodash';
import { includesIgnoreCase } from '../../util/equals-ignore-case';

@Pipe({
    name: "filterListBy",
})
export class FilterListByPipe implements PipeTransform {

    transform(list: any[], filterTerm: string, ...args: string[]): any[] {
		return filter(list, (item: any) => {
			return filter(args, arg => includesIgnoreCase(item[arg], filterTerm)).length > 0;
		});
    }
}
