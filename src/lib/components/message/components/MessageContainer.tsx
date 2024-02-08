import React from "react";

interface Props {
	children: React.ReactNode;
}

export function MessageContainer({ children }: Props) {
	return <div className="message-container">{children}</div>;
}
