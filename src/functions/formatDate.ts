type FormatDateTime = "short" | "medium" | "long" | "full";
type FormatDate = "shortDate" | "mediumDate" | "longDate" | "fullDate";
type FormatTime = "shortTime" | "mediumTime" | "longTime" | "fullTime";

export const formatDate = (value: string | number | Date, locale: string | string[] = "en-US", format: FormatDateTime | FormatDate | FormatTime | string = "shortDate") => {
	if (typeof value === "string") value = Number(value);

	let opts: Intl.DateTimeFormatOptions = {};

	switch (format) {
		case "short":
		case "medium":
		case "long":
		case "full":
			opts.dateStyle = format;
			break;
		case "shortDate":
			opts.day = "numeric";
			opts.month = "numeric";
			opts.year = "2-digit";
			break;
		case "mediumDate":
			opts.day = "numeric";
			opts.month = "short";
			opts.year = "numeric";
			break;
		case "longDate":
			opts.day = "numeric";
			opts.month = "long";
			opts.year = "numeric";
			break;
		case "fullDate":
			opts.day = "numeric";
			opts.month = "long";
			opts.year = "numeric";
			opts.weekday = "long";
			break;
		case "shortTime":
			opts.hour = "numeric";
			opts.minute = "numeric";
			break;
		case "mediumTime":
			opts.hour = "numeric";
			opts.minute = "numeric";
			opts.second = "numeric";
			break;
		case "longTime":
			opts.hour = "numeric";
			opts.minute = "numeric";
			opts.second = "numeric";
			opts.timeZoneName = "short";
			break;
		case "fullTime":
			opts.hour = "numeric";
			opts.minute = "numeric";
			opts.second = "numeric";
			opts.timeZoneName = "long";
			break;
		default:
			break;
	}

	return new Intl.DateTimeFormat(locale, opts).format(value);
};
