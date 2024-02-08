export const formatNumber = (value: string | number, locale: string | string[] = "es-AR", digitFormat: string = "1.0-0") => {
	if (typeof value === "string") value = Number(value);

	const [minIntDig, fracDig] = digitFormat.split(".");

	if (!minIntDig || !fracDig) throw new Error("Invalid digit format");

	const [minFracDig, maxFracDig] = fracDig.split("-");

	if (!minFracDig || !maxFracDig) throw new Error("Invalid digit format");

	return new Intl.NumberFormat(locale, {
		style: "decimal",
		useGrouping: true,
		minimumIntegerDigits: Number(minIntDig),
		minimumFractionDigits: Number(minFracDig),
		maximumFractionDigits: Number(maxFracDig),
	}).format(value);
};
