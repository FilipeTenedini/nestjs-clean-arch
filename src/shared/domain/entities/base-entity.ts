import { v4 as uuid } from "uuid";

export abstract class BaseEntity<Props> {
    public readonly _id: string;
    public readonly props: Props;

    constructor(props: Props, id?: string) {
        this.props = props;
        this._id = id || uuid();
    }

    get id() {
        return this._id;
    }

    toPlain(): Required<{ id: string } & Props> {
        return {
            id: this._id,
            ...this.props,
        } as Required<{ id: string } & Props>;
    }
}
