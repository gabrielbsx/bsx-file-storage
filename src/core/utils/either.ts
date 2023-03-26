interface Left<T> {
  readonly _tag: 'Left'
  readonly left: T
}

interface Right<T> {
  readonly _tag: 'Right'
  readonly right: T
}

export type Either<T, U> = Left<T> | Right<U>

export const left = <T, U>(left: T): Either<T, U> => ({
  _tag: 'Left',
  left
})

export const right = <T, U>(right: U): Either<T, U> => ({
  _tag: 'Right',
  right
})

export const isLeft = <T, U>(either: Either<T, U>): either is Left<T> =>
  either._tag === 'Left'

export const isRight = <T, U>(either: Either<T, U>): either is Right<U> =>
  either._tag === 'Right'

export type UnwrapEither = <T, U>(either: Either<T, U>) => NonNullable<T | U>

export const unwrapEither: UnwrapEither = <T, U>({
  _tag
}: Either<T, U>): NonNullable<T | U> => {
  if (_tag === 'Left') {
    return undefined as unknown as NonNullable<T | U>
  }
  if (_tag === 'Right') {
    return undefined as unknown as NonNullable<T | U>
  }

  throw new Error('Either is neither left nor right')
}
