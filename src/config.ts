import {isClient} from "utils";

const config = isClient() ? {
  DATABASE_NAME: window.env.DATABASE_NAME,
  DATABASE_URL: window.env.DATABASE_URL,
  TEST_MODE: window.env.TEST_MODE,
} : {
  DATABASE_NAME: process.env.DATABASE_NAME,
  DATABASE_URL: process.env.DATABASE_URL,
  TEST_MODE: process.env.TEST_MODE,
};

export default config;
