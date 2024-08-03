import { IsDate, IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";
import { UserProps } from "../entities/user.entity";
import { ClassValidatorFields } from "@/shared/domain/validators/class-validator-fields";

export class UserRules {
    @IsString()
    @MaxLength(255)
    @IsNotEmpty()
    name: string;

    @IsString()
    @MaxLength(255)
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @MaxLength(100)
    @IsNotEmpty()
    password: string;

    @IsDate()
    @IsOptional()
    createdAt?: Date;

    constructor(userData: UserProps) {
        return Object.assign(this, userData);
    }
}

export class UserValidator extends ClassValidatorFields<UserRules> {
    validate(data: UserProps): boolean {
        return super.validate(new UserRules(data ?? ({} as UserProps)));
    }
}

export class UserValidatorFactory {
    static create(): UserValidator {
        return new UserValidator();
    }
}
