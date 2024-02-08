import { classNames } from "@/functions/classNames";
import React from "react";

interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {}

class TableBody extends React.Component<TableBodyProps> {
	render() {
		const { className, ...restProps } = this.props;

		return <tbody className={classNames("bg-white", className)} {...restProps} />;
	}
}

export default TableBody;
