import { e2eUtil } from "../../../../../util/util.e2e-class";

import { ItemUtil } from "../../../../../components/item/item.e2e-class";
import { ionDateTimeColumn } from "../ion-datetime-column/ion-datetime-column.e2e-class";

class VehicleYearItem extends ItemUtil {

    run(year:string|number) {
        // super.run();
        describe("CarYear", () => {

            it("Click Year Item to later select " + year, (done:DoneFn) => {
                this.clickItemByCurrentIndex(done);
            });

            it("Choose this year: " + year, (done:DoneFn) => {
                ionDateTimeColumn.clickRowByNameUsingRecursion(year, 0, done);
            });

        });

    }
}
export const vehicleYearItem = new VehicleYearItem("car-step ion-item", e2eUtil.getCarFields().vehicleYear.index);
