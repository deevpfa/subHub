import React, { useCallback, useEffect, useMemo } from "react";
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { Button, IconButton, Menu, MenuHandler, MenuItem, MenuList, Typography } from "@material-tailwind/react";
import { PAGE_SIZES } from "@/constants/common";
import { useTranslation } from "react-i18next";

interface Props {
	/** Tamaño de Registros visibles */
	size: number;
	/** Total de Registros */
	total: number;
	/** Evento de Cambio de pagina */
	onChangePage?: (page: number) => void;
	/** Evento de Cambio de tamaño de registros visibles */
	onChangeSize?: (size: number) => void;
}

function usePagination(size: number, total: number) {
	const [actualPage, setActualPage] = React.useState(1);
	const [pages, setPages] = React.useState<number[]>([]);

	useEffect(() => {
		const pages = [];
		for (let i = 1; i <= Math.ceil(total / size); i++) {
			pages.push(i);
		}

		setPages(pages);
	}, [size, total]);

	const changeActualPage = (page: number) => {
		if (page < 1) return;
		if (page > pages.length) return;

		setActualPage(page);
	};

	const isDisabledArrow = useCallback(
		(direction: "left" | "right") => {
			if (direction === "left") {
				if (actualPage - 1 < 1) return true;
				return false;
			}

			if (direction === "right") {
				if (actualPage + 1 > pages.length) return true;
				return false;
			}
		},
		[actualPage, pages]
	);

	const from = useMemo(() => actualPage * size - size + 1, [actualPage, size]);
	const to = useMemo(() => actualPage * size, [actualPage, size]);

	return { actualPage, pages, from, to, isDisabledArrow, changeActualPage };
}

export function Pagintation({ size = 10, total, onChangePage, onChangeSize }: Props) {
	const { actualPage, pages, from, to, isDisabledArrow, changeActualPage } = usePagination(size, total);
	const { t } = useTranslation('global');

	const handleChangePageSize = (size: number) => {
		if (onChangeSize) onChangeSize(size);
	};

	const handleChangePage = (page: number) => {
		changeActualPage(page);
		if (onChangePage) onChangePage(page - 1);
	};

	return (
		<div className="flex justify-between items-center mt-4">
			<div className="flex items-center gap-2">
				{/* <Typography variant="small">{t("global.pagination.showing")}</Typography>
				<Menu>
					<MenuHandler>
						<Button variant="text" className="p-1 text-sm flex items-center">
							{size}
							<ChevronDownIcon className="w-3 h-3 ml-1" />
						</Button>
					</MenuHandler>
					<MenuList>
						{PAGE_SIZES.map((size) => (
							<MenuItem key={size} onClick={() => handleChangePageSize(size)}>
								{size}
							</MenuItem>
						))}
					</MenuList>
				</Menu>
				<Typography variant="small">{t("global.pagination.results")}</Typography> */}
			</div>
			{pages.length > 0 && total > size ? (
				<div className="flex justify-end items-center gap-2">
					<Typography variant="small">{t("global.pagination.label", { from, to, total })}</Typography>
					<IconButton variant="text" size="sm" className="rounded-full" disabled={isDisabledArrow("left")} onClick={() => handleChangePage(actualPage - 1)}>
						<ChevronLeftIcon strokeWidth={2} className="w-4 h-4" />
					</IconButton>
					<div className="flex items-center gap-1">
						{pages.map((page) => (
							<IconButton key={page} variant={page === actualPage ? "filled" : "text"} size="sm" className="rounded-full" onClick={() => handleChangePage(page)}>
								{page}
							</IconButton>
						))}
					</div>
					<IconButton variant="text" size="sm" className="rounded-full" disabled={isDisabledArrow("right")} onClick={() => handleChangePage(actualPage + 1)}>
						<ChevronRightIcon strokeWidth={2} className="w-4 h-4" />
					</IconButton>
				</div>
			) : null}
		</div>
	);
}
