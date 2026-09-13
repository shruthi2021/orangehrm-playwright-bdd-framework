import { faker } from '@faker-js/faker';

export class TestDataGenerator {

    static generateEmployeeData() {
        return {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            username: faker.internet.username(),
            password:  "Admin@123"
        };
    }

}
