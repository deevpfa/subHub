import { useState } from "react";
import { Message, MessageDefaultData } from "../interfaces";
import { newUid } from "@/functions/uid";

export const useMessages = () => {
	const [messages, setMessages] = useState<Message[]>([]);
	const emitMessage = <T = MessageDefaultData>(message: T, duration: number = 4000) => {
		const id = newUid();
		//@ts-ignore
		setMessages((messages) => [...messages, { id, message, duration }]);
	};
	const removeMessage = (id: string) => {
		setMessages((messages) => messages.filter((message) => message.id !== id));
	};
	return {
		messages,
		emitMessage,
		removeMessage,
	};
};
