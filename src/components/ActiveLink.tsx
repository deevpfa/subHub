import Link from "next/link";
import React from "react";
import { FC } from "react";
import { iActiveLink } from "../interfaces/components";

const ActiveLink: FC<iActiveLink> = (props) => {
	return !props.href ? (
		<button className={props.className ? props.className + " cursor-pointer w-full text-left" : ""} onClick={props.onClick ? props.onClick : () => {}}>
			{props.content ? props.content : ""}
		</button>
	) : (
		<Link target={props.target ? props.target : ""} onClick={props.onClick ? props.onClick : () => {}} className={props.className ? props.className : ""} href={props.href ? props.href : "#"}>
			{props.content ? props.content : ""}
		</Link>
	);
};

export default ActiveLink;
