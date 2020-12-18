import { mongoose } from "@typegoose/typegoose";

export type contextType = {
  db: typeof mongoose;
};

export type timestamp = number;

export type Location = { lat: number; lon: number };

export enum urgency {
  "low",
  "normal",
  "high",
  "emergency"
}

export enum permission {
  "inventory",
  "clients",
  "drone",
  "suppliers",
  "reports",
  "admin"
}

export type taskPermission = {
  permittedAssignments: employeeId[];
};

export type employeeId = string;

export type contact = {
  name: string;
  phone: phoneNumber;
  email: string;
  address: address;
};

export type phoneNumber = {
  countryCode: string;
  number: number;
};

export type address = {
  country: string;
  province: string;
  city: string;
  district: string;
  neighborhood: string;
  otherDetails?: string;
};

export type incident = {
  title: string;
  details: string;
  peopleInvolved: (employeeId | string)[];
  date: timestamp;
  location: location;
  startDate?: timestamp;
  endDate?: timestamp;
};
