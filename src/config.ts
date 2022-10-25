import {isClient} from "utils";

const config = isClient() ? {
  DATABASE_NAME: window.env.DATABASE_NAME,
  DATABASE_URL: window.env.DATABASE_URL
} : {
  DATABASE_NAME: process.env.DATABASE_NAME,
  DATABASE_URL: process.env.DATABASE_URL
};

export default config;
