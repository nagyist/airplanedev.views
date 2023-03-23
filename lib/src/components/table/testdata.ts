import { faker } from "@faker-js/faker";

import { CellType } from "./Cell";
import { Column } from "./Table.types";

faker.seed(123);

export type SimpleUser = {
  userID: string;
  username: string;
};

export const SIMPLE_USER_COLUMNS: Column<SimpleUser>[] = [
  {
    label: "User ID",
    accessor: "userID",
    wrap: true,
  },
  {
    label: "Username",
    accessor: "username",
  },
];

export const EDITABLE_COLUMNS: Column<User>[] = [
  {
    label: "User ID",
    accessor: "userID",
    canEdit: true,
  },
  {
    label: "Username",
    accessor: "username",
    canEdit: true,
  },
  {
    label: "Email",
    accessor: "email",
    canEdit: true,
  },
  {
    label: "Address",
    accessor: "address",
    canEdit: true,
    wrap: true,
  },
  {
    label: "Password",
    accessor: "password",
    canEdit: true,
  },
  {
    label: "Birthdate",
    accessor: "birthdate",
    canEdit: true,
    type: "date",
  },
  {
    label: "Registered At",
    accessor: "registeredAt",
    canEdit: true,
    type: "datetime",
  },
  {
    label: "Age",
    accessor: "age",
    canEdit: true,
    typeOptions: { numberMin: 0, numberMax: 100 },
  },
  {
    label: "JSON",
    accessor: "json",
    canEdit: true,
    type: "json",
  },
  {
    label: "Mood",
    accessor: "mood",
    canEdit: true,
    type: "select",
    typeOptions: {
      selectData: [
        { label: "Happy", value: "happy" },
        { label: "Sad", value: "sad" },
        "frustrated",
      ],
    },
  },
  {
    label: "Cool",
    accessor: "isCool",
    canEdit: true,
  },
  {
    label: "Link",
    accessor: "link",
    type: "link",
    wrap: true,
  },
];

export const WRAPPED_COLUMNS: Column<User>[] = [
  {
    label: "User ID",
    accessor: "userID",
    wrap: true,
  },
  {
    label: "Username",
    accessor: "username",
    wrap: true,
  },
  {
    label: "Email",
    accessor: "email",
    wrap: true,
  },
  {
    label: "Address",
    accessor: "address",
    wrap: true,
  },
  {
    label: "Password",
    accessor: "password",
    wrap: true,
  },
  {
    label: "Birthdate",
    accessor: "birthdate",
    wrap: true,
    type: "date",
  },
  {
    label: "Registered At",
    accessor: "registeredAt",
    wrap: true,
    type: "date",
  },
  {
    label: "Age",
    accessor: "age",
    wrap: true,
  },
  {
    label: "JSON",
    accessor: "json",
    wrap: true,
    type: "json",
  },
  {
    label: "Cool",
    accessor: "isCool",
    wrap: true,
  },
  {
    label: "Link",
    accessor: "link",
    type: "link",
    wrap: true,
  },
];

export const createRandomSimpleUser = (): SimpleUser => ({
  userID: faker.datatype.uuid(),
  username: faker.internet.userName(),
});

export const createRandomSimpleUsers = (count: number): SimpleUser[] => {
  const users: SimpleUser[] = [];
  for (let i = 0; i < count; i++) {
    users.push(createRandomSimpleUser());
  }
  return users;
};

export type User = {
  userID: string;
  username: string;
  email: string;
  address: string;
  password: string;
  birthdate: string;
  registeredAt: string;
  age: number;
  json: string;
  isCool: boolean;
  mood: "happy" | "sad" | "frustrated";
  link: string;
};

export const USER_COLUMNS: Column<User>[] = [
  {
    label: "User ID",
    accessor: "userID",
    wrap: true,
  },
  {
    label: "Username",
    accessor: "username",
  },
  {
    label: "Email",
    accessor: "email",
  },
  {
    label: "Address",
    accessor: "address",
  },
  {
    label: "Password",
    accessor: "password",
  },
  {
    label: "Birthdate",
    accessor: "birthdate",
    type: "date",
  },
  {
    label: "Registered At",
    accessor: "registeredAt",
  },
  {
    label: "Age",
    accessor: "age",
  },
  {
    label: "Is cool",
    accessor: "isCool",
  },
  {
    label: "JSON",
    accessor: "json",
    type: "json",
  },
  {
    label: "Link",
    accessor: "link",
    type: "link",
  },
];

export const createRandomUser = (): User => ({
  userID: faker.datatype.uuid(),
  username: faker.internet.userName(),
  email: faker.internet.email(),
  address: faker.address.streetAddress(true),
  password: faker.internet.password(),
  birthdate: faker.date.birthdate().toISOString(),
  registeredAt: faker.date
    .between("2020-01-01T00:00:00.000Z", "2030-01-01T00:00:00.000Z")
    .toISOString(),
  age: faker.datatype.number({ min: 18, max: 95 }),
  json: faker.datatype.json(),
  isCool: faker.datatype.boolean(),
  mood: faker.helpers.arrayElement(["happy", "sad", "frustrated"]),
  link: "https://www.google.com",
});

export const createRandomUsers = (count: number): User[] => {
  const users: User[] = [];
  for (let i = 0; i < count; i++) {
    users.push(createRandomUser());
  }
  return users;
};

export type Product = {
  name: string;
  dept: string;
  price: string;
  desc: string;
};

export const createRandomProduct = (): Product => ({
  name: faker.commerce.product(),
  dept: faker.commerce.department(),
  price: faker.commerce.price(10, 2000, 2, "$"),
  desc: faker.commerce.productDescription(),
});

export const createRandomProducts = (count: number): Product[] => {
  const products: Product[] = [];
  for (let i = 0; i < count; i++) {
    products.push(createRandomProduct());
  }
  return products;
};

export const PRODUCT_COLUMNS: Column<Product>[] = [
  {
    label: "Name",
    accessor: "name",
  },
  {
    label: "Department",
    accessor: "dept",
  },
  {
    label: "Price",
    accessor: "price",
  },
  {
    label: "Description",
    accessor: "desc",
  },
];

export const NULL_DATA_COLUMNS: Record<CellType, Column> = {
  string: {
    accessor: "string",
    label: "string",
    type: "string",
    canEdit: true,
  },
  number: {
    accessor: "number",
    label: "number",
    type: "number",
    canEdit: true,
  },
  boolean: {
    accessor: "boolean",
    label: "boolean",
    type: "boolean",
    canEdit: true,
  },
  date: { accessor: "date", label: "date", type: "date", canEdit: true },
  datetime: {
    accessor: "datetime",
    label: "datetime",
    type: "datetime",
    canEdit: true,
  },
  select: {
    accessor: "select",
    label: "select",
    type: "select",
    canEdit: true,
    typeOptions: { selectData: ["A"] },
  },
  json: { accessor: "json", label: "json", type: "json", canEdit: true },
  link: { accessor: "link", label: "link", type: "link", canEdit: true },
};
