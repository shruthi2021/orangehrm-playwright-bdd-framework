import { EmployeePage } from "../../pages/pim/EmployeePage";

export class EmployeeService {

    constructor(private employeePage: EmployeePage)
     {}

    async createEmployee(employeeData: any): Promise<string> {
        await this.employeePage.clickPIM();
        await this.employeePage.clickAddEmployee();
        await this.employeePage.enterFirstName(employeeData.firstName);
        await this.employeePage.enterLastName(employeeData.lastName );
        await this.employeePage.uploadEmployeePhoto("D:/Playwright-BDD/src/data/images/empImage.png" );
        await this.employeePage.enableLoginDetails();
        await this.employeePage.enterUsername(employeeData.username);
        await this.employeePage.enterPassword(employeeData.password);
        await this.employeePage.enterConfirmPassword(employeeData.password);
        const employeeId = await this.employeePage.getEmployeeId();

        await this.employeePage.clickSave();
        await this.employeePage.waitForFirstNameField();

        return employeeId;

    }
}
