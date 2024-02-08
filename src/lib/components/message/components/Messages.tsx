import React, { createContext } from "react";
import { MessageContainerProps, MessageTemplateProps, SetMessageInput } from "../interfaces";
import { useMessages } from "../hooks/useMessages";
import { Message } from "./Message";
import { MessageContainer } from "./MessageContainer";

interface Props<T = any> {
	Container?: React.FC<MessageContainerProps> | React.ComponentClass<MessageContainerProps>;

	Template?: React.FC<MessageTemplateProps<T>> | React.ComponentClass<MessageTemplateProps<T>>;

	children: React.ReactNode;
}

export const MessageContext = createContext<SetMessageInput | undefined>(undefined);

export function Messages({ Template = Message, Container = MessageContainer, children }: Props) {
	const { messages, emitMessage, removeMessage } = useMessages();
	return (
		<MessageContext.Provider value={{ messages, emitMessage, removeMessage }}>
			<Container>
				{messages.map(({ id, message, duration = 4000 }) => (
					<Template key={id} data={message} duration={duration} close={() => removeMessage(id)} />
				))}
			</Container>
			{children}
		</MessageContext.Provider>
	);
}
