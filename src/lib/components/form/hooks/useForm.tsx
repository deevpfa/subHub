"use client";
import { useMemo, useReducer } from "react";
import {
    FormControls,
    FormErrors,
    FormGroup,
    FormSchema,
    FormState,
    InputControl,
    MutatorFn,
    TNullable,
    ValidatorError,
    ValidatorFn,
} from "../interfaces";

type FormAction<T extends object = any> =
    | { type: "SET_FORM"; payload: { values: Partial<TNullable<T>> } }
    | { type: "SET_VALUE"; payload: { path: keyof T; value: T[keyof T] | null } }
    | { type: "SET_ERROR"; payload: { path: keyof T; error: ValidatorError | null } }
    | { type: "SET_PENDING"; payload: { path: keyof T } }
    | { type: "SET_DIRTY"; payload: { path: keyof T; isDirty: boolean } }
    | { type: "SET_TOUCHED"; payload: { path: keyof T; isTouched: boolean } }
    | { type: "SET_INDETERMINATE"; payload: { path: keyof T } }
    | { type: "ADD_VALIDATORS"; payload: { path: keyof T; validators: ValidatorFn[]; emitSelf: boolean } }
    | { type: "ADD_MUTATORS"; payload: { path: keyof T; mutators: MutatorFn[]; emitSelf: boolean } }
    | { type: "SET_VALIDATORS"; payload: { path: keyof T; validators: ValidatorFn[]; emitSelf: boolean } }
    | { type: "SET_MUTATORS"; payload: { path: keyof T; mutators: MutatorFn[]; emitSelf: boolean } };

function formGroup<T extends object = any>(state: FormState<T>, action: FormAction<T>) {
    const { type } = action;

    if (type === "SET_FORM") {
        const { values } = action.payload;

        let nextState = { ...state };
        for (const path in values) {
            let value = values[path];
            const { mutators = [], validators = [] } = state[path];

            if(mutators) {
                for (const mutator of mutators) {
                    value = mutator(value);
                }
            }

            let error: ValidatorError | null = null;
            for (const validator of validators) {
                error = validator(value);
                if (!error) continue;
                break;
            }

            let statePath = {
                ...state[path],
                value,
                error,
                status: error ? "invalid" : "valid",
            };

            nextState = { ...nextState, [path]: statePath };
        }

        return nextState;
    }

    if (type === "SET_VALUE") {
        let { path, value } = action.payload;
        const { mutators, validators } = state[path];

        for (const mutator of mutators) {
            value = mutator(value);
        }

        let error: ValidatorError | null = null;
        for (const validator of validators) {
            error = validator(value);
            if (!error) continue;
            break;
        }

        let statePath = {
            ...state[path],
            value,
            error,
            status: error ? "invalid" : "valid",
        };

        return { ...state, [path]: statePath };
    }

    if (type === "SET_ERROR") {
        let { path, error } = action.payload;
        let statePath = {
            ...state[path],
            error,
            status: error ? "invalid" : "valid",
        };
        return { ...state, [path]: statePath };
    }

    if (type === "SET_PENDING") {
        let { path } = action.payload;
        let statePath = {
            ...state[path],
            status: "pending",
        };
        return { ...state, [path]: statePath };
    }

    if (type === "SET_DIRTY") {
        let { path, isDirty } = action.payload;
        let statePath = {
            ...state[path],
            isDirty,
        };
        return { ...state, [path]: statePath };
    }

    if (type === "SET_TOUCHED") {
        let { path, isTouched } = action.payload;
        let statePath = {
            ...state[path],
            isTouched,
        };
        return { ...state, [path]: statePath };
    }

    if (type === "SET_INDETERMINATE") {
        let { path } = action.payload;
        let statePath = {
            ...state[path],
            indeterminate: !state[path].indeterminate,
        };
        return { ...state, [path]: statePath };
    }

    if (type === "ADD_VALIDATORS") {
        let { path, validators, emitSelf } = action.payload;

        const actualValidators = state[path].validators;

        for (const validator of validators) {
            const isExist = actualValidators.findIndex((v) => v.name === validator.name);
            if (isExist !== -1) continue;
            actualValidators.push(validator);
        }

        let statePath = state[path];
        statePath.validators = actualValidators;
        if (!emitSelf) return { ...state, [path]: statePath };

        const { value } = state[path];

        let error: ValidatorError | null = null;
        for (const validator of actualValidators) {
            error = validator(value);
            if (!error) continue;
            break;
        }
        statePath.error = error;
        statePath.status = error ? "invalid" : "valid";

        return { ...state, [path]: statePath };
    }

    if (type === "ADD_MUTATORS") {
        let { path, mutators, emitSelf } = action.payload;

        const actualMutators = state[path].mutators;

        for (const mutator of mutators) {
            const isExist = actualMutators.findIndex((m) => m.name === mutator.name);
            if (isExist !== -1) continue;
            actualMutators.push(mutator);
        }

        let statePath = state[path];
        statePath.mutators = actualMutators;
        if (!emitSelf) return { ...state, [path]: statePath };

        let { value } = state[path];
        for (const mutator of actualMutators) {
            value = mutator(value);
        }

        statePath.value = value;

        let error: ValidatorError | null = null;
        for (const validator of statePath.validators) {
            error = validator(value);
            if (!error) continue;
            break;
        }

        statePath.error = error;
        statePath.status = error ? "invalid" : "valid";

        return { ...state, [path]: statePath };
    }

    if (type === "SET_VALIDATORS") {
        let { path, validators, emitSelf } = action.payload;

        let statePath = state[path];
        statePath.validators = validators;

        if (!emitSelf) return { ...state, [path]: statePath };

        const { value } = state[path];

        let error: ValidatorError | null = null;
        for (const validator of validators) {
            error = validator(value);
            if (!error) continue;
            break;
        }

        statePath.error = error;
        statePath.status = error ? "invalid" : "valid";

        return { ...state, [path]: statePath };
    }

    if (type === "SET_MUTATORS") {
        let { path, mutators, emitSelf } = action.payload;

        let statePath = state[path];
        statePath.mutators = mutators;

        if (!emitSelf) return { ...state, [path]: statePath };

        let { value } = state[path];
        for (const mutator of mutators) {
            value = mutator(value);
        }

        statePath.value = value;

        let error: ValidatorError | null = null;
        for (const validator of statePath.validators) {
            error = validator(value);
            if (!error) continue;
            break;
        }

        statePath.error = error;
        statePath.status = error ? "invalid" : "valid";

        return { ...state, [path]: statePath };
    }

    return state;
}

function setInitialStateBySchema<T extends object = any>(schema: FormSchema<T>): FormState<T> {
    let form: FormState = {};

    for (const key in schema) {
        let { value, validators = [], mutators = [] } = schema[key];

        for (const mutator of mutators) {
            value = mutator(value);
        }

        let error: ValidatorError | null = null;
        for (const validator of validators) {
            error = validator(value);
            if (!error) continue;
            break;
        }

        form[key] = {
            value,
            validators,
            mutators,
            error,
            indeterminate: false,
            status: error ? "invalid" : "valid",
            isDirty: false,
            isTouched: false,
        };
    }

    return form;
}

export function useForm<T extends object = any>(schema: FormSchema<T>): FormGroup<T> {
    const initialState = setInitialStateBySchema(schema);

    const [form, dispatch] = useReducer<typeof formGroup<T>>(formGroup, initialState);

    const values = useMemo((): T => {
        let values: T = {} as T;
        for (const key in form) {
            values[key as keyof T] = form[key].value;
        }
        return values;
    }, [form]);

    const errors = useMemo((): FormErrors<T> => {
        let errors: FormErrors = {};
        for (const key in form) {
            errors[key as keyof T] = form[key].error;
        }
        return errors;
    }, [form]);

    const status = useMemo(() => {
        let status: "valid" | "invalid" = "valid";
        for (const key in form) {
            if (form[key].status === "invalid") {
                status = "invalid";
                break;
            }
        }
        return status;
    }, [form]);

    const isValid = useMemo(() => status === "valid", [status]);

    const isInvalid = useMemo(() => status === "invalid", [status]);

    const setValue = (values: Partial<TNullable<T>>) => {
        dispatch({ type: "SET_FORM", payload: { values } });
    };

    const controls = useMemo((): FormControls<T> => {
        let controls: FormControls = {};
        for (const key in form) {
            const states = form[key];
            controls[key] = {
                ...states,
                setValue: function (value: T[keyof T] | null) {
                    dispatch({ type: "SET_VALUE", payload: { path: key as keyof T, value } });
                },
                setError: function (error: ValidatorError) {
                    dispatch({ type: "SET_ERROR", payload: { path: key as keyof T, error } });
                },
                setPending: function () {
                    dispatch({ type: "SET_PENDING", payload: { path: key as keyof T } });
                },
                markAsDirty: function () {
                    dispatch({ type: "SET_DIRTY", payload: { path: key as keyof T, isDirty: true } });
                },
                markAsPristine: function () {
                    dispatch({ type: "SET_DIRTY", payload: { path: key as keyof T, isDirty: false } });
                },
                markAsTouched: function () {
                    dispatch({ type: "SET_TOUCHED", payload: { path: key as keyof T, isTouched: true } });
                },
                markAsUntouched: function () {
                    dispatch({ type: "SET_TOUCHED", payload: { path: key as keyof T, isTouched: false } });
                },
                markAsIndeterminate: function () {
                    dispatch({ type: "SET_INDETERMINATE", payload: { path: key as keyof T } });
                },
                addValidators: function (validators: ValidatorFn[], emitSelf: boolean = true) {
                    dispatch({ type: "ADD_VALIDATORS", payload: { path: key as keyof T, validators, emitSelf } });
                },
                addMutators: function (mutators: MutatorFn[], emitSelf: boolean = true) {
                    dispatch({ type: "ADD_MUTATORS", payload: { path: key as keyof T, mutators, emitSelf } });
                },
                setValidators: function (validators: ValidatorFn[], emitSelf: boolean = true) {
                    dispatch({ type: "SET_VALIDATORS", payload: { path: key as keyof T, validators, emitSelf } });
                },
                setMutators: function (mutators: MutatorFn[], emitSelf: boolean = true) {
                    dispatch({ type: "SET_MUTATORS", payload: { path: key as keyof T, mutators, emitSelf } });
                },
                clearValidators: function (emitSelf: boolean = true) {
                    dispatch({ type: "SET_VALIDATORS", payload: { path: key as keyof T, validators: [], emitSelf } });
                },
                clearMutators: function (emitSelf: boolean = true) {
                    dispatch({ type: "SET_MUTATORS", payload: { path: key as keyof T, mutators: [], emitSelf } });
                },
            } as InputControl<T>;
        }
        return controls;
    }, [form]);

    return {
        values,
        errors,
        status,
        isValid,
        isInvalid,
        controls,
        setValue,
    };
}
