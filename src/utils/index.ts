class AssertionFailure {
    message: String;

    constructor(message?: String) {
        this.message = message ?? ""
    }
}

export function assert(predicate: boolean, message?: String) {
    if (process.env.NODE_ENV === 'production') { return }
    if (!predicate) {
        throw new AssertionFailure(message);
    }
};

export function assertPredicate(predicate: () => boolean, message?: String) {
    assert(predicate(), message);
};

