import React, { FC } from "react";
import { iMyButton } from "../interfaces/components";
import { Spinner, Button as Mbutton } from "@material-tailwind/react";
import { Redirect } from "next";
import { classNames } from "@/functions/classNames";

const Button: FC<iMyButton> = ({ disabled, isFetching = false, children, ...props }) => {
	return (
		<>
			<Mbutton disabled={isFetching || disabled} className="flex items-center"  {...(props as any)}>
				<span>{ children }</span>
				<Spinner width={props.size == "md" || props.size == "lg" ? 18 : 12} height={props.size == "md" || props.size == "lg" ? 18 : 12} className={classNames(`text-gray-200 animate-spin ml-2`, isFetching ? 'visible' : 'hidden')} />
			</Mbutton>
		</>
	);
};

export default Button;
