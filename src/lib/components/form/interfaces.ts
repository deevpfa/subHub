export type FormSchema<T extends object = any> = {
    [K in keyof T]: InputSchema<T[K]>;
};

export type TNullable<T extends object = any> = { [K in keyof T]: T[K] | null };

export interface InputSchema<V = any> {
    value: V | null;
    validators?: ValidatorFn[];
    mutators?: MutatorFn[];
}

export interface RadioSchema<V = any> {
    value: V;
    id?: string;
    label?: React.ReactNode;
    checked?: boolean;
}

export type FormStatus = "pending" | "valid" | "invalid";

export type FormErrors<T = any> = { [K in keyof T]: ValidatorError | null };

export type FormState<T extends object = any> = {
    [K in keyof T]: InputState<T[K]>;
};

export type FormControls<T extends object = any> = {
    [K in keyof T]: InputControl<T[K]>;
};

export interface FormGroup<T extends object = any> {
    values: T;
    controls: FormControls<T>;
    errors: FormErrors<T>;
    status: FormStatus;
    isValid: boolean;
    isInvalid: boolean;
    setValue: (values: Partial<TNullable<T>>) => void;
}

export interface InputState<V = any> {
    value: V;
    validators: ValidatorFn[];
    mutators: MutatorFn[];
    error: ValidatorError | null;
    status: FormStatus;
    isDirty: boolean;
    isTouched: boolean;
    indeterminate: boolean;
}

export interface InputControl<V = any> extends InputState<V> {
    /** Establece el nuevo valor del input */
    setValue: (value: V | null) => void;
    /** Establece un error customizado del input */
    setError: (error: ValidatorError | null) => void;
    /** Establece el estado en `pending` */
    setPending: () => void;
    /** Establece que el input fue marcado */
    markAsTouched: () => void;
    /** Establece que el input no fue marcado */
    markAsUntouched: () => void;
    /** Establece que el input esta puerco */
    markAsDirty: () => void;
    /** Establece que el input no esta puerco */
    markAsPristine: () => void;
    /** Establece que el input esta indeterminado */
    markAsIndeterminate: () => void;
    /** Agrega validadores al array, el emitSelf determina si es necesario realizar la validación con los nuevos validadores */
    addValidators: (validators: ValidatorFn[], emitSelf?: boolean) => void;
    /** Agrega mutadores al array, el emitSelf determina si es necesario realizar la mutación con los nuevos mutadores */
    addMutators: (mutators: MutatorFn[], emitSelf?: boolean) => void;
    /** Elimina los viejos validadores y pone unos nuevos, emitSelf determina si es necesario realizar la validación con los nuevos validadores */
    setValidators: (validators: ValidatorFn[], emitSelf?: boolean) => void;
    /** Elimina los viejos mutadores y pone unos nuevos, emitSelf determina si es necesario realizar la mutación con los nuevos mutadores */
    setMutators: (mutators: MutatorFn[], emitSelf?: boolean) => void;
    /** Elimina todos los validadores, emitSelf determina si es necesario realizar la validación */
    clearValidators: (emitSelf?: boolean) => void;
    /** Elimina todos los mutadores, emitSelf determina si es necesario realizar la mutación */
    clearMutators: (emitSelf?: boolean) => void;
}

export type ValidatorFn = (value: any) => ValidatorError | null;

export type MutatorFn = (value: any) => any;

export type ValidatorError = {
    [key: string]: any;
};

export interface InputOptions {
    control?: InputControl;
    value?: any;
    isChecked?: boolean;
    validators?: ValidatorFn[];
    mutators?: MutatorFn[];
}
