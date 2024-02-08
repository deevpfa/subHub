import React from "react";
import { classNames } from "@/functions/classNames";
import { CheckboxField } from "../form/CheckboxField";

interface TableCheckboxProps extends Omit<React.HTMLProps<HTMLTableCellElement>, "children"> {
	name: string;

	as?: "th" | "td";

	onCheck?: (key: string, checked: boolean) => void;

	isSticky?: boolean;

	stickyDirection?: "left" | "right" | "top" | "left-top" | "right-top";
}

class TableCheckbox extends React.Component<TableCheckboxProps> {
	render() {
		const { as = "td", name, onCheck, className, isSticky = false, stickyDirection = "left", ...restProps } = this.props;

		if (as === "th") {
			return (
				<th
					scope="col"
					width={40}
					className={classNames(
						className,
						"bg-gray-50 bg-opacity-75 py-2 px-2",
						isSticky && stickyDirection === "left" ? "sticky left-0 z-10" : "",
						isSticky && stickyDirection === "right" ? "sticky right-0 z-10" : "",
						isSticky && stickyDirection === "top" ? "sticky top-0 z-10" : "",
						isSticky && stickyDirection === "left-top" ? "sticky left-0 top-0 z-10" : "",
						isSticky && stickyDirection === "right-top" ? "sticky right-0 top-0 z-10" : ""
					)}
					{...restProps}
				>
					<CheckboxField name={name} onChangeValue={this.handleOnChecked.bind(this)} />
				</th>
			);
		}

		return (
			<td
				scope="col"
				width={40}
				className={classNames(
					className,
					"border-t border-gray-300 bg-white whitespace-nowrap py-2 px-2",
					isSticky && stickyDirection === "left" ? "sticky left-0 z-10" : "",
					isSticky && stickyDirection === "right" ? "sticky right-0 z-10" : "",
					isSticky && stickyDirection === "top" ? "sticky top-0 z-10" : "",
					isSticky && stickyDirection === "left-top" ? "sticky left-0 top-0 z-10" : "",
					isSticky && stickyDirection === "right-top" ? "sticky right-0 top-0 z-10" : ""
				)}
				{...restProps}
			>
				<CheckboxField name={name} onChangeValue={this.handleOnChecked.bind(this)} />
			</td>
		);
	}

	private handleOnChecked(checked: boolean) {
		const { onCheck, name } = this.props;

		onCheck && onCheck(name, checked);
	}
}

export default TableCheckbox;
