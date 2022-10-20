export default abstract class Controller {
  public constructor(protected readonly data: unknown) {}

  public abstract get title(): string;
}
