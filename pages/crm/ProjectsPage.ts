import { Header, Input, Label, Option, Button, Status, Dropdown, Number, Message } from '@constants/crm';
import { CRMBasePage } from './CRMBasePage';
import { Project } from '@models/types/project.model'

export class ProjectsPage extends CRMBasePage {

    get titleProjectPage() {
        return this.getValue(Header.PROJECTSSUMMARY);
    }

    get buttonNewProject() {
        return this.getLinkByText(Button.NEWPROJECT);
    }

    get inputSearchProject() {
        return this.getInputAriaControls(Input.PROJECTS);
    }

    itemCustomerFirst(name: string) {
        return this.getLinkByText(name);
    }

    get inputProjectName() {
        return this.getInputById(Input.NAME);
    }

    get checkBoxCalculate() {
        return this.getLabelText(Label.CALCULATE);
    }

    get saveProject() {
        return this.getButtonByText(Button.SAVE);
    }

    projectNameCustomer(verifyProjectNameCustomer: string) {
        return this.getButtonByTitle(verifyProjectNameCustomer);
    }

    get projectProgress() {
        return this.getButtonByP(Input.PROJECT_INFO);
    }

    get customer() {
        return this.getValue8(Option.CUSTOMER);
    }

    projectNameCreated(customer: string) {
        return this.getLinkByText(customer);
    }

    get statusProject() {
        return this.getValue9(Status.INPROGRESS);
    }

    projectNameOnProjectTab(data: string) {
        return this.getLinkByText(data);
    }

    get sliderTrack() {
        return this.getButton5(Input.UI_SLIDER);
    }

    async clickNewProject() {
        await this.click(this.buttonNewProject);
    }

    async verifyNavigateToProjectPage() {
        await this.verifyText(this.titleProjectPage, Header.PROJECTSSUMMARY);
    }

    async moveSliderToMiddle() {
        const track = this.sliderTrack;
        const box = await track.boundingBox();
        if (!box) throw new Error('Slider track not visible');

        const y = box.y + box.height / 2;
        const startX = box.x + 2;
        const middleX = box.x + box.width / 2;

        await this.page.mouse.move(startX, y);
        await this.page.mouse.down();
        await this.page.mouse.move(middleX, y, { steps: 20 });
        await this.page.mouse.up();
    }

    async submitDataForNewProject(data: Project) {
        await this.type(this.inputProjectName, data.name);
        await this.selectDropdown(Dropdown.CLIENT_ID, Number.SIX, data.customer);
        await this.click(this.checkBoxCalculate);
        await this.moveSliderToMiddle();
        await this.selectDropdownNotSearch(Dropdown.BILLING_TYPE, Option.PROJECTHOURS);
        await this.click(this.saveProject);
    }

    async verifyProjectCreated(data: Project) {
        await this.verifyText(this.getAlert(), Message.CREATEDPROJECT);
        await this.verifyText(this.projectNameCustomer(data.verifyProjectNameCustomer), data.verifyProjectNameCustomer);
        await this.verifyText(this.projectNameCreated(data.customer), data.customer);
        await this.verifyText(this.statusProject, data.verifyStatusProject);
    }

    async searchAndCheckProjectInTable(data: Project) {
        await this.type(this.inputSearchProject, data.name);
        await this.verifyText(this.itemCustomerFirst(data.name), data.name);
    }

    async moveToProjectName(data: Project) {
        await this.hover(this.projectNameOnProjectTab(data.name));
    }

    async clickAndDeleteProject() {
        await this.acceptAlert();
        await this.click(this.getButtonDelete());
        await this.click(this.getCloseAlert());
    }

    async searchAndverifyNoData(data: Project) {
        await this.type(this.inputSearchProject, data.name);
        await this.waitVisible(this.getNoData());
    }
}
