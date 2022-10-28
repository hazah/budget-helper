import {
  Observable,
  of,
  from,
  map,
  tap,
  merge,
  mergeMap,
  filter,
  pipe,
  catchError,
  OperatorFunction,
  throwError,
} from "rxjs";

type FormDataFunctionType<R> = (formData: FormData) => R;
type FunctionType<T, R> = (value: T) => R;
type AsyncFunctionType<T, R> = (value: T) => Promise<R>;
type ConditionType = (obj: any) => boolean;
type TrueType<T, R> = () => OperatorFunction<T, R>;
type FalseType<T> = () => OperatorFunction<T, T>;

export function asyncMap<T, R>(func: AsyncFunctionType<T, R>) {
  return pipe(
    map(func),
    mergeMap(promise => from(promise))
  );
}

export function ifElse<C extends ConditionType, T, R>(
  condition: C,
  ifTrue: TrueType<T, R>,
  ifFalse: FalseType<T>
) {
  return pipe(
    mergeMap(response =>
      merge(
        of(response).pipe(filter(condition), ifTrue()),
        of(response).pipe(
          filter(response => !condition(response)),
          ifFalse()
        )
      )
    )
  );
}

export function returnJson<T, V, R>({
  transformer,
  mapper,
  message,
}: {
  transformer: FunctionType<T, V>;
  mapper: FunctionType<V, R>;
  message: string;
}): TrueType<T, R> {
  return (): OperatorFunction<T, R> =>
    pipe(
      map(transformer),
      tap(data => console.info(message, data)),
      map(mapper)
    );
}

export function error<T>(): FalseType<T> {
  return (): OperatorFunction<T, T> =>
    pipe(
      tap(error => console.error("got unexpected response: ", error)),
      tap(error => {
        throw error;
      })
    );
}

export function runService<D, T, R>({
  getData,
  performOperation,
  returnJson,
  error,
  condition,
  message,
}: {
  getData: FormDataFunctionType<D>;
  performOperation: AsyncFunctionType<D, T>;
  returnJson: TrueType<T, R>;
  error: FalseType<T>;
  condition: ConditionType;
  message: string;
}) {
  return pipe(
    map(getData),
    tap(values => console.debug(message, values)),
    asyncMap(performOperation),
    ifElse(condition, returnJson, error),
    catchError(error =>
      of(error).pipe(
        tap(error => console.error("service operation failed", error)),
        tap(error => {
          throw new Response(error.code, {
            status: error.status,
          });
        })
      )
    )
  );
}

export default function createService<D, T>({
  formData,
  getData,
  performOperation,
  returnJson,
  error,
  condition,
  message,
}: {
  formData: FormData;
  getData: FormDataFunctionType<D>;
  performOperation: AsyncFunctionType<D, T>;
  returnJson: TrueType<T, Response>;
  error: FalseType<T>;
  condition: ConditionType;
  message: string;
}): Promise<Response> {
  const service = new Observable(subscriber => {
    subscriber.next(formData);
    subscriber.complete();
  }).pipe(
    runService({
      getData: getData,
      performOperation,
      returnJson,
      error,
      condition,
      message,
    })
  );

  return new Promise((next: (response: Response) => void, error) => {
    service.subscribe({
      next,
      error,
    });
  });
}
