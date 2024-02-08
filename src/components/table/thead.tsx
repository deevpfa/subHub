import { classNames } from "@/functions/classNames";
import React from "react";

type TableHeadProps = React.HTMLProps<HTMLTableSectionElement> & {};

class TableHead extends React.Component<TableHeadProps> {
	render() {
		const { className, ...restProps } = this.props;

		return <thead className={classNames("bg-gray-50", className)} {...restProps} />;
	}
}

export default TableHead;
