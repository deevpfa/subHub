import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { classNames } from "../functions/classNames";

interface iProps {
	selectItems: any;
	label?: string;
	onSelect?: (e: any) => any;
	title?: any;
	value: any;
	image?: string;
	placeholder?: string;
	error?: boolean;
}

export default function Select({ selectItems, label, image, title, placeholder, error, onSelect, value }: iProps) {
	const [selected, setSelected] = useState(null);

	const { t } = useTranslation("global");

	const handleSelected = (e: any) => {
		setSelected(e);
		if (onSelect) {
			value ? onSelect(e[value]) : onSelect(e);
		}
	};

	return (
		<Listbox value={selected} onChange={(e) => handleSelected(e)}>
			{({ open }) => (
				<>
					{title && (
						<>
							<Listbox.Label className="block text-sm font-medium text-gray-700">{title}</Listbox.Label>
						</>
					)}
					<div className="relative mt-1">
						<Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
							<span className="flex items-center">
								{selected && (
									<>
										{image && (
											<>
												<Image className="h-6 w-6 flex-shrink-0 rounded-full" src={image ? selected[image] : selected} alt="user photo profile" width={24} height={24} />
											</>
										)}
										<span className="ml-3 block truncate">{label ? selected[label] : selected}</span>
									</>
								)}
								{!selected && (
									<div>
										<span className="ml-3 block truncate">{placeholder ? placeholder : t("global.selectOption")}</span>
									</div>
								)}
							</span>

							<span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
								<ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
							</span>
						</Listbox.Button>

						<Transition show={open} as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
							<Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
								{selectItems.map((item: any, index: number) => (
									<Listbox.Option
										key={index}
										className={({ active }) => classNames(active ? "text-white bg-indigo-600" : "text-gray-900", "relative cursor-default select-none py-2 pl-3 pr-9")}
										value={item}
									>
										{({ selected, active }) => (
											<>
												<div className="flex items-center">
													{image && (
														<>
															<Image className="h-6 w-6 flex-shrink-0 rounded-full" src={image ? item[image] : item} alt="user photo profile" width={24} height={24} />
														</>
													)}
													<span className={classNames(selected ? "font-semibold" : "font-normal", "ml-3 block truncate")}>{label ? item[label] : item}</span>
												</div>

												{selected ? (
													<span className={classNames(active ? "text-white" : "text-indigo-600", "absolute inset-y-0 right-0 flex items-center pr-4")}>
														<CheckIcon className="h-5 w-5" aria-hidden="true" />
													</span>
												) : null}
											</>
										)}
									</Listbox.Option>
								))}
							</Listbox.Options>
						</Transition>
					</div>
				</>
			)}
		</Listbox>
	);
}
