import Controller from "controllers/Controller";

export default class StoressController extends Controller {
  public get title(): string {
    return Array.isArray(this.data)
      ? "Shopping Lists"
      : (this.data as { name: string })?.name;
  }
}
