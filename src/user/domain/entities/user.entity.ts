import { BaseEntity } from "@/shared/domain/entities/base-entity";

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
        super(props, id);
        this.props.createdAt = this.props.createdAt ?? new Date();
    }

    get name() {
        return this.props.name;
    }

    get email() {
        return this.props.email;
    }

    get password() {
        return this.props.password;
    }
}
