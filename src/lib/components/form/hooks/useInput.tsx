import { useReducer } from "react";
import { InputControl, InputOptions, InputState, MutatorFn, ValidatorError, ValidatorFn } from "../interfaces";

type InputAction =
    | { type: "SET_VALUE"; payload: any }
    | { type: "SET_ERROR"; payload: ValidatorError | null }
    | { type: "SET_PENDING" }
    | { type: "SET_DIRTY"; payload: boolean }
    | { type: "SET_TOUCHED"; payload: boolean }
    | { type: "SET_INDETERMINATE" }
    | { type: "ADD_VALIDATORS"; payload: { validators: ValidatorFn[]; emitSelf: boolean } }
    | { type: "ADD_MUTATORS"; payload: { mutators: MutatorFn[]; emitSelf: boolean } }
    | { type: "SET_VALIDATORS"; payload: { validators: ValidatorFn[]; emitSelf: boolean } }
    | { type: "SET_MUTATORS"; payload: { mutators: MutatorFn[]; emitSelf: boolean } };

function inputControl(state: InputState, action: InputAction): InputState {
    const { type } = action;

    if (type === "SET_VALUE") {
        const value = action.payload;

        let error: ValidatorError | null = null;
        for (const validator of state.validators) {
            error = validator(value);
            if (!error) continue;
            break;
        }

        return {
            ...state,
            value,
            error,
            status: error ? "invalid" : "valid",
        };
    }

    if (type === "SET_ERROR") {
        const error = action.payload;
        return {
            ...state,
            error,
            status: error ? "invalid" : "valid",
        };
    }

    if (type === "SET_PENDING") {
        return {
            ...state,
            status: "pending",
        };
    }

    if (type === "SET_DIRTY") {
        const isDirty = action.payload;
        return {
            ...state,
            isDirty,
        };
    }

    if (type === "SET_TOUCHED") {
        const isTouched = action.payload;
        return {
            ...state,
            isTouched,
        };
    }

    if (type === "SET_INDETERMINATE") {
        return {
            ...state,
            indeterminate: !state.indeterminate,
        };
    }

    if (type === "ADD_VALIDATORS") {
        const { validators, emitSelf } = action.payload;

        const actualValidators = state.validators;

        for (const validator of validators) {
            const isExist = actualValidators.findIndex((v) => v.name === validator.name);
            if (isExist !== -1) continue;
            actualValidators.push(validator);
        }

        if (!emitSelf) return { ...state, validators: actualValidators };

        let error: ValidatorError | null = null;
        for (const validator of actualValidators) {
            error = validator(state.value);
            if (!error) continue;
            break;
        }

        return {
            ...state,
            validators: actualValidators,
            error,
            status: error ? "invalid" : "valid",
        };
    }

    if (type === "ADD_MUTATORS") {
        const { mutators, emitSelf } = action.payload;

        const actualMutators = state.mutators;

        for (const mutator of mutators) {
            const isExist = actualMutators.findIndex((m) => m.name === mutator.name);
            if (isExist !== -1) continue;
            actualMutators.push(mutator);
        }

        if (!emitSelf) return { ...state, mutators: actualMutators };

        let value = state.value;
        for (const mutator of actualMutators) {
            value = mutator(value);
        }

        let error: ValidatorError | null = null;
        for (const validator of state.validators) {
            error = validator(value);
            if (!error) continue;
            break;
        }

        return {
            ...state,
            value,
            mutators: actualMutators,
            error,
            status: error ? "invalid" : "valid",
        };
    }

    if (type === "SET_VALIDATORS") {
        const { validators, emitSelf } = action.payload;

        if (!emitSelf) return { ...state, validators };

        let error: ValidatorError | null = null;
        for (const validator of validators) {
            error = validator(state.value);
            if (!error) continue;
            break;
        }

        return {
            ...state,
            validators,
            error,
            status: error ? "invalid" : "valid",
        };
    }

    if (type === "SET_MUTATORS") {
        const { mutators, emitSelf } = action.payload;

        if (!emitSelf) return { ...state, mutators };

        let value = state.value;
        for (const mutator of mutators) {
            value = mutator(value);
        }

        let error: ValidatorError | null = null;
        for (const validator of state.validators) {
            error = validator(value);
            if (!error) continue;
            break;
        }

        return {
            ...state,
            value,
            mutators,
            error,
            status: error ? "invalid" : "valid",
        };
    }

    return state;
}

function setInitialStateBySchema({ value = null, validators = [], mutators = [] }: InputOptions): InputState {
    for (const mutator of mutators) {
        value = mutator(value);
    }

    let error: ValidatorError | null = null;
    for (const validator of validators) {
        error = validator(value);
        if (!error) continue;
        break;
    }

    return {
        value,
        validators,
        mutators,
        error,
        status: error ? "invalid" : "valid",
        indeterminate: false,
        isDirty: false,
        isTouched: false,
    };
}

export function useInput({
    control,
    value: defaultValue,
    validators: defaultValidators,
    mutators: defaultMutators,
}: InputOptions): InputControl {
    const initialState = setInitialStateBySchema({
        value: defaultValue,
        validators: defaultValidators,
        mutators: defaultMutators,
    });
    const [state, dispatch] = useReducer(inputControl, initialState);

    if (control) return control;

    function setValue(value: any) {
        dispatch({ type: "SET_VALUE", payload: value });
    }
    function setError(error: ValidatorError | null) {
        dispatch({ type: "SET_ERROR", payload: error });
    }
    function setPending() {
        dispatch({ type: "SET_PENDING" });
    }
    function markAsTouched() {
        dispatch({ type: "SET_TOUCHED", payload: true });
    }
    function markAsUntouched() {
        dispatch({ type: "SET_TOUCHED", payload: false });
    }
    function markAsDirty() {
        dispatch({ type: "SET_DIRTY", payload: true });
    }
    function markAsPristine() {
        dispatch({ type: "SET_DIRTY", payload: false });
    }
    function markAsIndeterminate() {
        dispatch({ type: "SET_INDETERMINATE" });
    }
    function addValidators(validators: ValidatorFn[], emitSelf: boolean = true) {
        dispatch({ type: "ADD_VALIDATORS", payload: { validators, emitSelf } });
    }
    function addMutators(mutators: MutatorFn[], emitSelf: boolean = true) {
        dispatch({ type: "ADD_MUTATORS", payload: { mutators, emitSelf } });
    }
    function setValidators(validators: ValidatorFn[], emitSelf: boolean = true) {
        dispatch({ type: "SET_VALIDATORS", payload: { validators, emitSelf } });
    }
    function setMutators(mutators: MutatorFn[], emitSelf: boolean = true) {
        dispatch({ type: "SET_MUTATORS", payload: { mutators, emitSelf } });
    }
    function clearValidators(emitSelf: boolean = true) {
        dispatch({ type: "SET_VALIDATORS", payload: { validators: [], emitSelf } });
    }
    function clearMutators() {
        dispatch({ type: "SET_MUTATORS", payload: { mutators: [], emitSelf: true } });
    }

    return {
        ...state,
        setValue,
        setError,
        setPending,
        markAsTouched,
        markAsUntouched,
        markAsDirty,
        markAsPristine,
        markAsIndeterminate,
        addValidators,
        addMutators,
        setValidators,
        setMutators,
        clearValidators,
        clearMutators,
    };
}
