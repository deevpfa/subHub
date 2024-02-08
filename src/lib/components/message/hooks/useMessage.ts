import { useContext } from "react";
import { MessageContext } from "../components/Messages";
import { MessageDefaultData, SetMessageInput } from "../interfaces";

export const useMessage = <T = MessageDefaultData>() => {
	const context = useContext(MessageContext) as SetMessageInput<T> | undefined;
	console.log(context);
	if (!context) throw new Error("useMessage must be used within a Messages");

	const { emitMessage } = context;

	return { emitMessage };
};
