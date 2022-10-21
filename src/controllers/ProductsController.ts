import Controller from "controllers/Controller";

export default class ProductsController extends Controller {
  public get title(): string {
    return Array.isArray(this.data)
      ? "Products"
      : (this.data as { name: string })?.name;
  }
}
