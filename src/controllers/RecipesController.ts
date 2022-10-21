import Controller from "controllers/Controller";

export default class RecipessController extends Controller {
  public get title(): string {
    return Array.isArray(this.data)
      ? "Recipes"
      : (this.data as { name: string })?.name;
  }
}