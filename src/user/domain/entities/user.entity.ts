import { BaseEntity } from "@/shared/domain/entities/base-entity";
import { UserValidatorFactory } from "../validators/user.validator";

export interface UserProps {
    name: string;
    email: string;
    password: string;
    createdAt?: Date;
}

export class UserEntity extends BaseEntity<UserProps> {
    constructor(
        public readonly props: UserProps,
        id?: string,
    ) {
        UserEntity.validate(props);
        super(props, id);
        this.props.createdAt = this.props.createdAt ?? new Date();
    }

    update(value: string) {
        UserEntity.validate({ ...this.props, name: value });
        this.props.name = value;
    }

    updatePassword(value: string) {
        UserEntity.validate({ ...this.props, password: value });
        this.props.password = value;
    }

    static validate(props: UserProps) {
        const validator = UserValidatorFactory.create();
        validator.validate(props);
    }

    get name() {
        return this.props.name;
    }

    private set name(name: string) {
        this.props.name = name;
    }

    get email() {
        return this.props.email;
    }

    get password() {
        return this.props.password;
    }

    private set password(password: string) {
        this.props.password = password;
    }

    get createdAt() {
        return this.props.createdAt;
    }
}
