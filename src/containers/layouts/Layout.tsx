import { FC } from "react";
import { Header } from "../header/Header";

export const Layout: FC<any> = ({ children }) => {

	return (
		<>
			<div className="min-h-full">
				<Header />
				{children}
			</div>
		</>
	);
};

