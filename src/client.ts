import renderClient from "renderClient";
import createThemeCache from "createThemeCache";

const cache = createThemeCache();

renderClient(cache);

if (module.hot) {
  module.hot.accept();
}
