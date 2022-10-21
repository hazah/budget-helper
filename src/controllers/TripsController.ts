import Controller from "controllers/Controller";

export default class TripsController extends Controller {
  public get title(): string {
    return Array.isArray(this.data)
      ? "Trips"
      : (this.data as { name: string })?.name;
  }
}
