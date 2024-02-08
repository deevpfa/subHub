import { ValidatorError, ValidatorFn } from "../interfaces";

export class Validators {
    static required(value: any): ValidatorError | null {
        if (value === null || value === undefined || value === "") return { required: true };
        return null;
    }

    static email(value: any): ValidatorError | null {
        if (!value) return null;
        const emailRegex = new RegExp(/^[\w-.]+@([\w-]+\.)+[\w-]{2,5}$/);
        if (!emailRegex.test(value)) return { email: true };
        return null;
    }

    static minLength(min: number): ValidatorFn {
        return function minLengthFn(value: any): ValidatorError | null {
            if (!value) return null;
            if (value.length < min) return { minLength: { requiredLength: min, actualLength: value.length } };
            return null;
        };
    }

    static maxLength(max: number): ValidatorFn {
        return function maxLengthFn(value: any): ValidatorError | null {
            if (!value) return null;
            if (value.length > max) return { maxLength: { requiredLength: max, actualLength: value.length } };
            return null;
        };
    }

    static min(min: number): ValidatorFn {
        return function minFn(value: any): ValidatorError | null {
            if (!value) return null;
            if (value < min) return { min: { requiredValue: min, actualValue: value } };
            return null;
        };
    }

    static max(max: number): ValidatorFn {
        return function maxFn(value: any): ValidatorError | null {
            if (!value) return null;
            if (value > max) return { max: { requiredValue: max, actualValue: value } };
            return null;
        };
    }

    static enum(enumValues: any[]): ValidatorFn {
        return function enumFn(value: any): ValidatorError | null {
            if (!value) return null;
            if (!enumValues.includes(value)) return { enum: { allowedValues: enumValues, actualValue: value } };
            return null;
        };
    }

    static requiredTrue(value: any): ValidatorError | null {
        if (value !== true) return { requiredTrue: true };
        return null;
    }
}
