class AssertionFailure {
  message: string;

  constructor(message?: string) {
    this.message = message ?? ""
  }
}

export function assertFail(message?: string) {
  throw new AssertionFailure(message);
}

export function assert(predicate: boolean, message?: string) {
  if (process.env.NODE_ENV === 'production') { return }
    if (!predicate) {
      throw new AssertionFailure(message);
    }
  };

  export function assertPredicate(predicate: () => boolean, message?: string) {
    assert(predicate(), message);
  };

