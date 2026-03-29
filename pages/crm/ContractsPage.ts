import { Contract } from '@models/types/contract.model'
import { Button, Dropdown, Number, Input } from '@constants/crm';
import { CRMBasePage } from './CRMBasePage';

export class ContractsPage extends CRMBasePage {

    get buttonNewContract() {
        return this.getLinkByText(Button.NEWCONTRACT);
    }

    get inputCustomer() {
        return this.getDropdown(Dropdown.CLIENT_ID);
    }

    get searchCustomer() {
        return this.getDropdownSearch(Number.ONE);
    }

    get inputSubject() {
        return this.getInputById(Input.SUBJECT);
    }

    get inputContractValue() {
        return this.getInputValue(Input.CONTRACT_VALUE);
    }

    get selectContractType() {
        return this.getType(Number.ONE);
    }

    get inputStartDate() {
        return this.getInputById(Input.DATESTART);
    }

    get inputEndDate() {
        return this.getInputById(Input.DATEEND);
    }

    get inputDescription() {
        return this.getTextArea(Input.DESCRIPTION);
    }

    get buttonSave() {
        return this.getButton(Button.SUBMIT);
    }

    selectedCustomer(customer: string) {
        return this.getText(customer);
    }

    get selectedContractType() {
        return this.getText(Number.ONE);
    }

    get dropdownMore() {
        return this.getButtonByText(Button.MORE);
    }

    get buttonDelete() {
        return this.getLinkByText(Button.DELETE);
    }

    get searchContract() {
        return this.getInputAriaControls(Input.SEARCH_CONTRACT);
    }

    async clickNewContract() {
        await this.click(this.buttonNewContract);
    }

    async fillContractForm(data: Contract, haveDropdown: boolean = false) {
        if (haveDropdown) {
            await this.selectDropdown(Dropdown.CLIENT_ID, Number.TWO, data.customer);
        }
        await this.type(this.inputSubject, data.subject);
        await this.type(this.inputContractValue, data.value);
        if (haveDropdown) {
            await this.selectDropdown(Dropdown.CONTRACT_TYPE, Number.ONE, data.contractType);
        }
        await this.type(this.inputStartDate, data.startDate);
        await this.type(this.inputEndDate, data.endDate);
        await this.type(this.inputDescription, data.description);
        await this.click(this.buttonSave);
    }

    async verifyContract(data: Contract, message: string) {
        await this.verifyText(this.getAlert(), message);
        await this.verifyText(this.selectedCustomer(data.customer), data.customer);
        await this.verifyValue(this.inputSubject, data.subject);
        await this.verifyCurrency(this.inputContractValue, `${data.value}`);
        await this.verifyText(this.selectedContractType, data.contractType);
        await this.verifyValue(this.inputStartDate, data.startDate);
        await this.verifyValue(this.inputEndDate, data.endDate);
        await this.verifyValue(this.inputDescription, data.description);
    }

    async deleteContract() {
        await this.acceptAlert();
        await this.click(this.dropdownMore);
        await this.click(this.buttonDelete);
        await this.click(this.getCloseAlert());
    }

    async verifyDeletedContract(data: Contract) {
        await this.type(this.searchContract, data.subject);
        await this.waitVisible(this.getNoData());
    }

}
