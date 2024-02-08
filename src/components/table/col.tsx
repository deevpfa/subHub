import { classNames } from "@/functions/classNames";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { ChevronUpIcon } from "@heroicons/react/24/solid";
import React from "react";

interface TableColProps extends Omit<React.HTMLProps<HTMLTableCellElement>, "value" | "defaultValue"> {
	as?: "th" | "td";

	isSortable?: boolean;

	onSort?: (order: "asc" | "desc" | null) => void;

	defaultSort?: "asc" | "desc" | null;

	isSticky?: boolean;

	stickyDirection?: "left" | "right" | "top" | "left-top" | "right-top";

	value?: React.ReactNode;

	defaultValue?: React.ReactNode;
}

interface TableColState {
	order: "asc" | "desc" | null;
}

class TableCol extends React.Component<TableColProps, TableColState> {
	constructor(props: TableColProps) {
		super(props);
		this.state = {
			order: props.defaultSort || null,
		};
	}

	// componentDidUpdate(prevProps: Readonly<TableColProps>): void {
	// 	if (prevProps.defaultSort !== this.props.defaultSort) {
	// 		this.setState({
	// 			order: this.props.defaultSort || null,
	// 		});
	// 	}
	// }

	render() {
		const { as = "td", isSortable = false, isSticky = false, stickyDirection = "left", className, children, onClick, onSort, defaultSort, value, defaultValue = "-", ...restProps } = this.props;
		if (as === "th") {
			const { order } = this.state;
			return (
				<th
					scope="col"
					onClick={this.handleOnClick.bind(this)}
					className={classNames(
						className,
						"whitespace-nowrap bg-gray-50 bg-opacity-75 py-3.5 px-3.5 text-left text-sm font-semibold text-gray-900",
						isSticky && stickyDirection === "left" ? "sticky left-0 z-10" : "",
						isSticky && stickyDirection === "right" ? "sticky right-0 z-10" : "",
						isSticky && stickyDirection === "top" ? "sticky top-0 z-10" : "",
						isSticky && stickyDirection === "left-top" ? "sticky left-0 top-0 z-10" : "",
						isSticky && stickyDirection === "right-top" ? "sticky right-0 top-0 z-10" : "",
						isSortable ? "cursor-pointer hover:bg-gray-100" : ""
					)}
					{...restProps}
				>
					<div className="flex items-center">
						{children || value || defaultValue}
						{isSortable && (
							<div className="ml-2 flex flex-col">
								<ChevronUpIcon className={classNames("w-3 h-3", order === "asc" ? "text-gray-900" : "text-gray-400")} />
								<ChevronDownIcon className={classNames("w-3 h-3", order === "desc" ? "text-gray-900" : "text-gray-400")} />
							</div>
						)}
					</div>
				</th>
			);
		}
		return (
			<td
				scope="col"
				className={classNames(
					"whitespace-nowrap border-t border-gray-300 bg-white py-3.5 px-3.5 text-sm font-medium text-gray-800",
					isSticky && stickyDirection === "left" && "sticky left-0 z-10",
					isSticky && stickyDirection === "right" && "sticky right-0 z-10",
					isSticky && stickyDirection === "top" && "sticky top-0 z-10",
					isSticky && stickyDirection === "left-top" && "sticky left-0 top-0 z-10",
					isSticky && stickyDirection === "right-top" && "sticky right-0 top-0 z-10",
					className
				)}
				{...restProps}
			>
				{children || value || defaultValue}
			</td>
		);
	}

	handleOnClick(ev: React.MouseEvent<HTMLTableCellElement>) {
		const { isSortable, onClick, onSort } = this.props;
		if (onClick) onClick(ev);
		if (!isSortable) return;
		const { order } = this.state;
		let nOrder: "asc" | "desc" | null;
		switch (order) {
			case "asc":
				nOrder = "desc";
				break;
			case "desc":
				nOrder = null;
				break;
			default:
				nOrder = "asc";
				break;
		}
		this.setState({ order: nOrder });
		if (onSort) onSort(nOrder);
	}
}

export default TableCol;
