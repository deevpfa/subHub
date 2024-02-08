import React from "react";
import { Select, SelectProps, Typography } from "@material-tailwind/react";
import { InputStatus } from "@/interfaces/components";
import { classNames } from "@/functions/classNames";
import { InputControl, ValidatorError, ValidatorFn, useInput } from "@/lib/components/form";

interface Props extends Omit<SelectProps, "variant" | "ref" | "onChange"> {
	name: string;

	variant?: SelectProps["variant"] | "before" | "after";

	validators?: ValidatorFn[];

	hasFeedback?: boolean;

	successTip?: (value: any) => React.ReactNode;

	errorTip?: (errors: ValidatorError) => React.ReactNode;

	onChangeValue?: (value: any) => void;

	onErrors?: (errors: ValidatorError | null) => void;

	onStatus?: (status: InputStatus) => void;

	ref?: React.Ref<HTMLDivElement>;
	
	control? : InputControl	

}

export function SelectField({ name, defaultValue, validators, variant, hasFeedback, control, labelProps, label, errorTip, successTip, onChangeValue, onBlur, className, ref, ...rest }: Props) {
	const { value, status, error, isDirty, isTouched, setValue, markAsTouched } = useInput({ control, value: defaultValue, validators });

	const cn = [];
	if (className) cn.push(className);
	if (isDirty) cn.push("is-dirty");
	if (isTouched) cn.push("is-touched");
	if (status) cn.push(status);
	if (variant === "before") cn.push("rounded-r-none border-r-none");
	if (variant === "after") cn.push("rounded-l-none border-l-none");

	const handleOnBlur = (ev: React.FocusEvent<HTMLDivElement>) => {
		markAsTouched();

		if (onBlur) onBlur(ev);
	};

	const handleOnChange = (value?: string) => {
		if (!value) return;

		setValue(value);

		if (onChangeValue) onChangeValue(value);
	};

	return (
		<div className="select-field">
			<Select
				className={cn.join(" ")}
				name={name}
				defaultValue={value}
				selected={(element) =>
					element &&
					React.cloneElement(element, {
						className: "flex items-center px-0 gap-2 pointer-events-none",
					})
				}
				// containerProps={{
				// 	...containerProps,
				// 	className: classNames(containerProps?.className, variant === "before" || variant === "after" ? "min-w-[75px]" : ""),
				// }}
				labelProps={{
					...labelProps,
					className: classNames(labelProps?.className, label ? "" : "before:mr-0 after:ml-0", variant === "before" ? "after:rounded-r-none" : "", variant === "after" ? "before:rounded-l-none" : ""),
				}}
				label={label}
				variant={variant === "before" || variant === "after" ? "outlined" : variant}
				onChange={handleOnChange}
				onBlur={handleOnBlur}
				error={hasFeedback && isTouched && isDirty && !!error && status === "invalid"}
				success={hasFeedback && isTouched && isDirty && !error && status === "valid"}
				ref={ref}
				{...rest}
			/>
			{hasFeedback && isTouched && isDirty && !!error && status === "invalid" && errorTip && (
				<Typography variant="small" className="text-red-600">
					{errorTip(error)}
				</Typography>
			)}
			{hasFeedback && isTouched && isDirty && !error && status === "valid" && successTip && (
				<Typography variant="small" className="text-green-600">
					{successTip(value)}
				</Typography>
			)}
		</div>
	);
}
