import React, { useEffect, useRef } from "react";
import { Input, InputProps, Typography } from "@material-tailwind/react";
import { InputStatus } from "@/interfaces/components";
import { InputControl, ValidatorError, ValidatorFn, useInput } from "@/lib/components/form";
import Skeleton from "../Skeleton";

interface Props extends Omit<InputProps, "ref" | "icon"> {
	name?: string;

	validators?: ValidatorFn[];

	hasFeedback?: boolean;

	infoTip?: React.ReactNode | ((value: any) => React.ReactNode);

	errorTip?: (errors: ValidatorError) => React.ReactNode;

	before?: React.ReactNode;

	after?: React.ReactNode;

	leading?: React.ReactNode;

	trailing?: React.ReactNode;

	onChangeValue?: (value: any , input : InputControl) => void;

	onChangeStatus?: (status: InputStatus, input: InputControl) => void;

	onErrors?: (errors: ValidatorError | null) => void;

	onStatus?: (status: InputStatus) => void;

	ref?: React.Ref<HTMLInputElement>;

	loading?: boolean;

	control? : InputControl	
}

export const TextField = ({
	name,
	control,
	defaultValue,
	before,
	leading,
	after,
	loading,
	trailing,
	onChange,
	onChangeValue,
	onChangeStatus,
	onBlur,
	validators,
	hasFeedback,
	infoTip,
	errorTip,
	ref,
	className,
	labelProps,
	...restProps
}: Props) => {
	const input = useInput({control , value : defaultValue, validators });

	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		// console.log(inputRef)
		if (!inputRef.current) return;
		if (inputRef.current?.value !== input.value) {
			inputRef.current.value = input.value;
		}
	}, [input.value]);

	useEffect(() => {
		if (onChangeStatus) onChangeStatus(input.status, input);
	}, [input.status]);

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		const { value } = e.currentTarget;

		input.setValue(value);

		if(!input.isDirty) input.markAsDirty()

		if (onChangeValue) onChangeValue(value, input);

		if (onChange) onChange(e);
	}

	

	function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
		if(!input.isTouched) input.markAsTouched();

		if (onBlur) onBlur(e);
	}

	const cn = [];
	if (className) cn.push(className);
	if (input.isDirty) cn.push("is-dirty");
	if (input.isTouched) cn.push("is-touched");
	if (before) cn.push("rounded-l-none");
	if (leading) cn.push("rounded-l-none !border-l-0");
	if (after) cn.push("rounded-r-none");
	if (trailing) cn.push("rounded-r-none !border-r-0");
	if (input.status) cn.push(input.status);

	const cnLabel = [];
	if (labelProps?.className) cnLabel.push(labelProps.className);
	if (before) cnLabel.push("before:rounded-tl-none");
	if (leading) cnLabel.push("before:rounded-tl-none");
	if (after) cnLabel.push("after:rounded-tr-none");
	if (trailing) cnLabel.push("after:rounded-tr-none");

	return (
		<>
			{loading ? (
				<Skeleton classNames="h-10" />
			) : (
				<div className="text-field">
					<div className="relative flex items-stretch">
						{before ? before : null}
						{leading ? <div className="flex items-center rounded-md border border-r-0 border-white">{leading}</div> : null}
						<Input
							className={cn.join(" ")}
							name={name}
							type="text"
							onChange={handleChange}
							onBlur={handleBlur}
							error={hasFeedback && input.isTouched && input.isDirty && !!input.error && input.status === "invalid"}
							labelProps={{ className: cnLabel.join(" "), ...labelProps }}
							inputRef={inputRef}
							{...restProps}
						/>
						{after ? after : null}
						{trailing ? <div className="flex items-center h-full rounded-md border border-l-0 border-white ">{trailing}</div> : null}
					</div>
					{hasFeedback && input.isTouched && input.isDirty && !!input.error && input.status === "invalid" && errorTip && (
						<Typography variant="small" className="ml-0.5 mt-0.5 absolute text-red-600">
							{errorTip(input.error)}
						</Typography>
					)}
					{!input.error && infoTip && (
						<Typography variant="small" className="ml-0.5 mt-0.5 absolute text-gray-500">
							{
								typeof infoTip === "function" ? infoTip(input.value) : infoTip
							}
						</Typography>
					)}
				</div>
			)}
		</>
	);
};
