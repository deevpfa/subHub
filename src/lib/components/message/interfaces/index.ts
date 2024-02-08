export interface Message<T = MessageDefaultData> {
	id: string;
	message: T;
	duration?: number;
}

export interface MessageTemplateProps<T = MessageDefaultData> {
	data: T;
	duration: number;
	close: () => void;
}

export interface MessageContainerProps {
	children: React.ReactNode;
}

export interface SetMessageInput<T = MessageDefaultData> {
	messages: Message<T>[];
	emitMessage: (message: T, duration?: number) => void;
	removeMessage: (uid: string) => void;
}

export interface MessageDefaultData {
	type: MessageType;
	message: string;
}

export type MessageType = "info" | "success" | "warning" | "error";
