import React, { useEffect, useState } from "react";
import TableBody from "./tbody";
import TableHead from "./thead";
import TableRow from "./row";
import TableCol from "./col";
import TableCheckbox from "./checkbox";
import { classNames } from "@/functions/classNames";
import Skeleton from "../Skeleton";
import { Pagintation } from "../Pagintation";
import { PAGE_SIZES } from "@/constants/common";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { Input } from "@material-tailwind/react";

interface iTableProps {
	data: any;
	dataMapped: (data: any) => void;
	isFetching?: boolean;
	className?: string;
	pagination?: boolean;
	size?: number;
	searchBy?: string[];
	search?: boolean;
}

type TableProps = React.HTMLProps<HTMLTableElement> & iTableProps;

const Table = ({ search, searchBy = ['id'], size = 10, pagination = true, dataMapped, data = [], className, isFetching, ...rest }: TableProps) => {

	const [dataPaginated, setDataPaginated] = useState([])
	// sirve para hacer dinamica la paginacion
	const [auxData, setAuxData] = useState(data)

	useEffect(() => { dataMapped && dataMapped(dataPaginated) }, [dataPaginated])

	useEffect(() => { setDataPaginated(data.slice(0, size)) }, [data])

	// cambio de pagina
	const onChangePage = (page: number) => {
		const start = page * size
		const end = start + size
		setDataPaginated(auxData.slice(start, end))
	}

	// cambio de tamaño de pagina
	const onChangeSize = (size: number) => {
		// setPageSize(size)
		const start = (1 - 1) * size
		const end = start + size
		setDataPaginated(auxData.slice(start, end))
	}

	const searchTable = (value: string, searchBy: string[]) => {
		if (value === "" || !value) {
			onChangePage(1)
			setDataPaginated(data.slice(0, size))
			setAuxData(data)
			return
		}
		const searchData = data.filter((item: any) => {
			let itemValue = ""
			searchBy.forEach((element: any) => {
				itemValue += item[element]
			});
			return itemValue.toLowerCase().includes(value.toLowerCase())
		})
		setAuxData(searchData)
		setDataPaginated(searchData.slice(0, size))
	}

	return (
		<>
			{
				isFetching ?
					<>
						<Skeleton columns={5} classNames="mt-2" paddingRow={4} heightRow={4} key={1} />
					</>
					:
					<>
						{
							search &&
							<div className="flex flex-col items-center justify-between gap-4 md:flex-row">
								<div></div>
								<div className="w-full md:w-72 mb-5">
									<Input
										type="text"
										onChange={(e) => searchTable(e.target.value, searchBy)}
										label="Search"
										icon={<MagnifyingGlassIcon className="h-5 w-5" />}
									/>
								</div>
							</div>
						}
						<div className="overflow-auto z-0 shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
							<table className={classNames("w-full table-auto border-separate border-spacing-0", className)} {...rest} />
							{
								(!dataPaginated || dataPaginated.length == 0) && !isFetching && <div className="flex justify-center items-center h-32">
									<p className="text-gray-500">No hay datos</p>
								</div>
							}
							{
								auxData.length > 0 && !isFetching && pagination &&
								<div className="mb-5">
									<Pagintation total={auxData.length} onChangePage={(page) => onChangePage(page)} size={size} onChangeSize={(size) => onChangeSize(size)} />
								</div>
							}
						</div>
					</>
			}
		</>
	);
	// }
}

export default Table;
