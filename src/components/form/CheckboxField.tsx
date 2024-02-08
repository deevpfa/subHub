import React from "react";
import { Checkbox, CheckboxProps } from "@material-tailwind/react";
import { InputStatus } from "@/interfaces/components";
import { ValidatorError, ValidatorFn, useInput } from "@/lib/components/form";

interface Props extends Omit<CheckboxProps, "ref"> {
	name: string;

	validators?: ValidatorFn[];

	onChangeValue?: (value: any) => void;

	onErrors?: (errors: ValidatorError | null) => void;

	onStatus?: (status: InputStatus) => void;

	ref?: React.Ref<HTMLInputElement>;
}

export function CheckboxField({ name, defaultChecked, validators, className, ref, onBlur, onChange, onChangeValue, ...rest }: Props) {
	const { value, status, isDirty, isTouched, markAsTouched, setValue } = useInput({});

	const handleOnBlur = (ev: React.FocusEvent<HTMLInputElement>) => {
		markAsTouched();

		if (onBlur) onBlur(ev);
	};

	const handleOnChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
		const { checked } = ev.currentTarget;
		setValue(checked);

		if (onChangeValue) onChangeValue(checked);

		if (onChange) onChange(ev);
	};

	const cn = [];
	if (className) cn.push(className);
	if (isDirty) cn.push("is-dirty");
	if (isTouched) cn.push("is-touched");
	if (status) cn.push(status);

	return (
		<div className="checkbox-field">
			<Checkbox className={cn.join(" ")} name={name} defaultChecked={value} onChange={handleOnChange} onBlur={handleOnBlur} ref={ref} {...rest} />
		</div>
	);
}
