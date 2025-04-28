import { WebElement } from 'protractor';
import { E2EUtil} from "../../../util/util.e2e-class";
import { CallbackStepDefinition } from 'cucumber';

const baseQuery = "modal-footer .footer-modal-buttons";

export class ModalFooter {

    async getSubmitButton() {
        return await E2EUtil.get().getElement(baseQuery + " .submit-button");
    }

    async getCancelButton() {
        return await E2EUtil.get().getElement(baseQuery + " .cancel-button");
    }

    async clickSubmitButton(done: CallbackStepDefinition) {
        const submitButton = await this.getSubmitButton()
		E2EUtil.get().clickElement(submitButton, done);
    }

    async clickCancelButton(done:CallbackStepDefinition) {
        const cancelButton = await this.getCancelButton()
		E2EUtil.get().clickElement(cancelButton, done);
    }
}
