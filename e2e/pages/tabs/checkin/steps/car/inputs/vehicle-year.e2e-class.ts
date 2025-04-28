import { ItemUtil } from "../../../../../components/item/item.e2e-class";
import { IonDateTimeColumn } from "../ion-datetime-column/ion-datetime-column.e2e-class";
import { E2EUtil } from "../../../../../../util/util.e2e-class";
import { Done } from "../../../../../../config/helpers/chai-imports";

export class VehicleYearItem extends ItemUtil {

	constructor() {
		super("car-step ion-item", E2EUtil.get().getCarFields().vehicleYear.index);
	}

	async selectYear(year, done: Done) {
		await this.clickItemByCurrentIndexAsync();
		new IonDateTimeColumn().clickRowByNameUsingRecursion(year, 0, done);
	}

}
