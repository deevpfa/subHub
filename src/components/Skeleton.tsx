import React from "react";

interface iProps {
	columns?: number;
	heightRow?: number;
	paddingRow?: number;
	classNames?: string;
}

const Skeleton = ({ columns = 1, classNames = "", heightRow = 4, paddingRow = 2 }: iProps) => {
	let arrColumns = Array(columns).fill(0);
	return (
		<div className={classNames}>
			{arrColumns.map((_: any, i: number) => (
				<div key={i} className={`flex animate-pulse flex-col space-y-3 py-${paddingRow}`}>
					<div key={i} className={`bg-gray-300 h-${heightRow} rounded-md`}></div>
				</div>
			))}
		</div>
	);
};

export default Skeleton;
