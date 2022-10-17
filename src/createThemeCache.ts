import createCache from "@emotion/cache";

export default function createThemeCache() {
  return createCache({ key: "css" });
}
