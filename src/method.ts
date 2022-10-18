type Args = {
  request: Request;
  params: { [key: string]: unknown };
};

type ReturnType = Response | Promise<Response>;

type Callback = (args: Args) => ReturnType;

type Methods = "get" | "post" | "put" | "patch" | "delete";

type Callbacks = Partial<{
  [key in Methods]: Callback;
}>;

export default function method(callbacks: Callback | Callbacks) {
  if (typeof callbacks === "function") {
    callbacks = { get: callbacks };
  }
  return (args: Args) => {
    const { request } = args;

    if (
      request.method === "PATCH" &&
      callbacks["put"] !== undefined &&
      callbacks["patch"] === undefined
    ) {
      callbacks["patch"] = callbacks["put"];
    }

    if (
      request.method === "PUT" &&
      callbacks["patch"] !== undefined &&
      callbacks["put"] === undefined
    ) {
      callbacks["put"] = callbacks["patch"];
    }

    const callback: Callback = callbacks[request.method.toLocaleLowerCase()];
    if (!callback) throw new Error(`Method ${request.method} not implemented`);

    return callback(args);
  };
}
