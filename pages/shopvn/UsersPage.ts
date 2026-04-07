import { expect } from '@playwright/test';
import { ShopvnBasePage } from '@pages/shopvn/ShopvnBasePage';
import { User } from '@models/types/shopvn/users.model';
import { DateHelpers } from '@models/helpers/DateHelpers';

export class UsersPage extends ShopvnBasePage {

    private get btnAddUser() {
        return this.page.getByText('＋ Thêm User')
    }

    private get inputFullName() {
        return this.page.getByTestId('add-user-name')
    }

    private get inputUserName() {
        return this.page.getByTestId('add-user-username')
    }

    private get inputPassword() {
        return this.page.getByTestId('add-user-password')
    }

    private get dropdownPermission() {
        return this.page.getByTestId('add-user-role')
    }

    private get btnCreateUser() {
        return this.page.getByRole('button', { name: 'Tạo User' })
    }

    private get columnAction() {
        return this.page.locator("//tr[1]/td[6]/select[1]")
    }
    
    private get btnDeleteOfAddedUser() {
        return this.page.locator("(//button[@class='btn-del-one'])[1]")
    }

    private get btnOperation() {
        return this.page.locator("//button[@class='btn-delete-confirm']")
    }

    async addNewUser(data: User) {
        await this.btnAddUser.click();
        await this.inputFullName.fill(data.fullName);
        await this.inputUserName.fill(data.userName);
        await this.inputPassword.fill(data.password);
        await this.dropdownPermission.selectOption(data.role)
        await this.btnCreateUser.click();
    }

    async verifyAddedUser(data: User) {
        await expect(this.alertSuccess()).toHaveText('✅ Thêm user thành công!');
        await expect(this.verifyTable(1,2)).toHaveText(data.userName);
        await expect(this.verifyTable(1,3)).toHaveText(data.fullName);
        await expect(this.verifyTable(1,4)).toHaveText(data.role);
        await expect(this.verifyTable(1,5)).toHaveText(DateHelpers.getTodayRegex());
        await expect(this.columnAction).toHaveValue(data.action);
    }

    async deleteAddedUser() {
        await this.btnDeleteOfAddedUser.click();
        await this.btnOperation.click();
        await expect(this.alertSuccess()).toHaveText('✅ Đã xoá user thành công!');
        //await this.page.waitForTimeout(5000);
    }

}