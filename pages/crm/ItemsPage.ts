import { CRMBasePage } from './CRMBasePage';
import SystemHelper from '../../models/helpers/SystemHelper';
import { Button, Input, Number } from '@constants/crm';
import { Item } from '@models/types/item.model'

export class ItemsPage extends CRMBasePage {

      get buttonImportItems() {
          return this.getLinkByText(Button.IMPORTITEMS);
      }

      get buttonChooseFile() {
          return this.getInputById(Input.FILE_CSV);
      }

      get buttonImport() {
          return this.getButtonByText(Button.IMPORT);
      }

    file(data: Item) {
        return SystemHelper.getFilePath(data.file);
    }
    
      get inputSearchItems() {
          return this.getInputAriaControls(Input.DATATABLES);
      }

      tableDescription(description: string) {
          return this.getLinkByText(description);
      }

      tableLongDescription(longDescription: string) {
          return this.getTDText(longDescription);
      }

      tableRate(longDescription: string) {
          return this.getTDText(longDescription);
      }

      tableTax1(columnIndex: number, tax1: string) {
          return this.getTDText2(columnIndex, tax1);
      }

      tableTax2(columnIndex: number, tax2: string) {
          return this.getTDText2(columnIndex, tax2);
      }
      
      tableUnit(unit: string) {
          return this.getTDText(unit);
      }

    async clickButtonImportItems() {
        await this.click(this.buttonImportItems);
    }

    async importCSVFile(data: Item) {
        await this.buttonChooseFile.setInputFiles(this.file(data));
    }

    async clickToImportCSVFile() {
        await this.click(this.buttonImport);
    }

    async searchAndVerifyItems(data: Item) {
        await this.type(this.inputSearchItems, data.longDescription);
        await this.verifyText(this.tableDescription(data.description), data.description);
        await this.verifyText(this.tableLongDescription(data.longDescription), data.longDescription);
        await this.verifyText(this.tableRate(data.rate), data.rate);
        await this.verifyText(this.tableTax1(Number.FIVE, data.tax1), data.tax1);
        await this.verifyText(this.tableTax2(Number.SIX, data.tax2), data.tax2);
        await this.verifyText(this.tableUnit(data.unit), data.unit);
    }

    async deleteImportedItem(data: Item) {
        await this.acceptAlert();
        await this.hover(this.tableDescription(data.description));
        await this.click(this.getButtonDelete());
        await this.click(this.getbuttonCloseAlert());
    }

}
