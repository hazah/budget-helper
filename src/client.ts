import renderClient from "renderClient";

renderClient();

if (module.hot) {
  module.hot.accept();
}
