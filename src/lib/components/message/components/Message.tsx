import React, { useEffect } from "react";
import { MessageDefaultData, MessageTemplateProps } from "../interfaces";


export interface MessageData {
	title?: string;
	message: string;
	type?: "success" | "error" | "warning" | "info";
}

export function Message({ data, duration, close }: MessageTemplateProps<MessageDefaultData>) {
	if (!data || !data.type || !data.message) throw new Error("Message data is not valid");
	const { message, type } = data;
	const timer = React.useRef<NodeJS.Timeout>();

	useEffect(() => {
		timer.current = setTimeout(() => {
			setClosed(true);
			setTimeout(() => close(), 300);
		}, duration - 300);

		return () => clearTimeout(timer.current);
	}, [duration, close]);

	const [closed, setClosed] = React.useState(false);

	const handleOnClick = () => {
		setClosed(true);
		clearTimeout(timer.current);
		setTimeout(() => close(), 300);
	};

	const handleOnEnter = () => {
		clearTimeout(timer.current);
	};

	const handleOnLeave = () => {
		timer.current = setTimeout(() => {
			setClosed(true);
			setTimeout(() => close(), 300);
		}, duration - 300);
	};

	const cn = ["message"];
	if (closed) cn.push("closed");

	return (
		<div className={cn.join(" ")} onMouseLeave={handleOnLeave} onMouseEnter={handleOnEnter}>
			{type === "success"}
			<span className="message-content">{message}</span>
			<button className="message-button" onClick={handleOnClick}>
				Cerrar
			</button>
		</div>
	);
}
