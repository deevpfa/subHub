"use client";
import React from "react";
import { FormErrors, FormGroup, FormStatus } from "../interfaces";

export interface FormProps<T extends object = any> extends Omit<React.FormHTMLAttributes<HTMLFormElement>, "onSubmit"> {
    group: FormGroup<T>;

    onSubmit?: (values: T, status: FormStatus, error: FormErrors<T>) => void;
}

export function Form({ group, onSubmit, ...rest }: FormProps) {
    const { values, errors, status } = group;

    function handleOnSubmit(ev: React.FormEvent<HTMLFormElement>) {
        ev.preventDefault();
        if (onSubmit) onSubmit(values, status, errors);
    }

    return <form onSubmit={handleOnSubmit} {...rest} />;
}
