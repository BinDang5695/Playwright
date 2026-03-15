import PageBodyComponent from "../components/PageBodyComponent";
import BasePage from "./crm/BasePage";

export default class HomePage extends BasePage {
    
    public pageBodyComponent(): PageBodyComponent {
        return new PageBodyComponent(this.page.locator(PageBodyComponent.SELECTOR));
    }

    


}