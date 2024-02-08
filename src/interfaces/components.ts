import { ButtonProps } from "@material-tailwind/react";

export interface iActiveLink {
	content?: any;
	href?: any;
	target?: string;
	className?: string;
	onClick?: (e?: any) => void;
}

export interface iCheckListProps {
	label?: string;
	value?: any;
	title?: any;
	image?: string | null;
	placeholder?: string;
	error?: boolean;
	coin?: any;
	amount?: any;
	onChange?: (e: any) => any;
}

export interface iMyButton extends Omit<ButtonProps, "color"> {
	color?: ButtonProps["color"] | "primary" | "secondary";
	isFetching?: boolean;
}

export type InputStatus = "valid" | "invalid" | "pending";
