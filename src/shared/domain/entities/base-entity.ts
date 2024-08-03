import { v4 as uuid } from "uuid";

export abstract class BaseEntity<T> {
    public readonly _id: string;
    public readonly props: T;

    constructor(props: T, id?: string) {
        this.props = props;
        this._id = id || uuid();
    }

    get id() {
        return this._id;
    }

    toPlain(): Required<{ id: string } & T> {
        return {
            id: this._id,
            ...this.props,
        } as Required<{ id: string } & T>;
    }
}
