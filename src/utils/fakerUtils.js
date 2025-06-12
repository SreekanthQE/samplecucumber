import { faker } from '@faker-js/faker';

export class FakerUtils{

    static async generateRandomFirstName(){
        return faker.person.firstName();
    }
    static async generateRandomLastName(){
        return faker.person.lastName();
    }
    static async generateRandomEmail(){
        return faker.internet.email();
    }
    static async generateRandomePassWord(){
        return faker.internet.password();
    }
    static async generateRandomState(){
        return faker.location.state();
    }
    static async generateRandomCity(){
        return faker.location.city();
    }
    static async generateRandomStreetAddress(){
        return faker.location.streetAddress();
    }
    static async generateRandomZipCode(){
        return faker.location.zipCode();
    }
    static async generateRandomPhoneNumber(){
        return faker.internet.password(10); 
    }
    static async generateRandomJobTitle(){
        return faker.person.jobTitle();
    }
    static async generateRandomProductName(){
        return faker.commerce.productName();
    }
    static async generateRandomCompany(){
        return faker.company.name();
    }
    static async generateRandomSubject(){
        return faker.lorem.sentence(6);
    }
    static async generateRandomMessage(){
        return faker.lorem.paragraph(3);
    }

}