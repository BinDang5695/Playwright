import { COMPUTER_NAMES } from "../../constants/names";
import CheapCompEssComponent from "../components/computer/CheapCompEssComponent";
import ComputerEssentialComponent from "../components/computer/ComputerEssentialComponent";
import ExpensiveCompEssComponent from "../components/computer/ExpensiveCompEssComponent";
import StandardCompEssComponent from "../components/computer/StandardCompEssComponent";
import ProductEssentialComponent from "../components/ProductEssentialComponent";
import BasePage from "./crm/BasePage";
import { Page } from "@playwright/test";

export default class ComputerDetailsPage extends BasePage {

    constructor(page: Page){
        super(page);
    }

    // Variant of ComputerEssentialComponent
    public computerComponent(componentName: string): ComputerEssentialComponent{
        const componentLocator = this.page.locator(ProductEssentialComponent.SELECTOR);
        switch(componentName){
            case COMPUTER_NAMES.cheap:
                return new CheapCompEssComponent(componentLocator);
            case COMPUTER_NAMES.standard:
                return new StandardCompEssComponent(componentLocator);
            case COMPUTER_NAMES.expensive:
                return new ExpensiveCompEssComponent(componentLocator);
            default:
                throw new Error(`The component ${componentName} is invalid!`)
        }
    }

}