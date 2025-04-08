import { faker } from "@faker-js/faker";

export const CREDENTIAL = {
  name: "steamme113",
  password: "steam.auto.tests@gmail.com1",
};

export const USERDATA = {
  profileName: faker.person.firstName(),
  realName: faker.person.fullName(),
  summary: faker.lorem.text(),
};
