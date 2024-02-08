import Image from "next/image";
import { useState } from "react";
import { iCheckListProps } from "../interfaces/components";

export default function CheckList({ label, value, image, coin, onChange, amount }: iCheckListProps) {
	const onChecked = (e: any, checked: boolean) => {
		let selected: any = { value: e, checked };
		if (onChange) {
			onChange(selected);
		}
	};

	return (
		<div>
			<div className="mt-4 divide-y divide-gray-200 border-t border-b border-gray-200">
				<div key={label} className="w-100 relative flex items-center justify-between px-3 py-4">
					<div className="flex items-center">
						<div className="mr-3 h-6 items-center">
							<input
								onChange={(e) => {
									onChecked(value, e.target.checked);
								}}
								id={`${value}`}
								name={`${value}`}
								value={value}
								type="checkbox"
								className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
							/>
						</div>
						<div>{image ? <Image src={image} alt={label ? label : ""} width={60} height={60} /> : <p>{label}</p>}</div>
					</div>
					<div className="text-sm flex items-center leading-6">
						<label htmlFor={`${label}`} className="select-none font-medium text-gray-900">
							{amount}
						</label>
						<>{coin && <div className="ml-1">{coin}</div>}</>
					</div>
				</div>
			</div>
		</div>
	);
}
