import {
	ButtonStyleTypes,
	// DrawerStylesType,
	IconButtonStyleTypes,
	// ButtonGroupStyleTypes,
	ThemeProvider,
	SelectStylesType,
	MenuStylesType,
	CardStylesType,
	CardHeaderProps,
	CardHeaderStylesType,
} from "@material-tailwind/react";

const ButtonStyles: ButtonStyleTypes | IconButtonStyleTypes = {
	defaultProps: {
		color: "primary" as any,
	},
	valid: {
		colors: ["primary", "secondary"],
	},
	styles: {
		variants: {
			filled: {
				primary: {
					background: "bg-primary-500 hover:bg-primary-600",
					color: "text-white",
				},
				secondary: {
					background: "bg-secondary-500 hover:bg-secondary-600",
					color: "text-white",
				},
			},
			text: {
				primary: {
					background: "bg-transparent hover:bg-primary-100 hover:bg-opacity-10",
					color: "text-primary-500",
				},
				secondary: {
					background: "bg-transparent hover:bg-secondary-100 hover:bg-opacity-10",
					color: "text-secondary-500",
				},
			},
			outlined: {
				primary: {
					border: "border-primary-500 hover:border-primary-600",
					background: "bg-transparent hover:bg-primary-100",
					color: "text-primary-500 hover:text-white",
				},
				secondary: {
					border: "border-secondary-500 hover:border-secondary-600",
					background: "bg-transparent hover:bg-secondary-100 hover:bg-opacity-10",
					color: "text-secondary-500 hover:text-white",
				},
			},
		},
	},
};

export const THEME = {
	drawer: {
		defaultProps: {
			className: "z-[9999]",
			overlayProps: {
				className: "fixed z-[9999]",
			},
		},
	} as CardStylesType,
	button: ButtonStyles as ButtonStyleTypes,
	iconButton: ButtonStyles as IconButtonStyleTypes,
	buttonGroup: {
		defaultProps: {
			// color: "secondary" as any,
		},
		valid: {
			// colors: ["primary", "secondary"],
		},
		styles: {
			base: {
				initial: {},
			},
			dividerColor: {
				primary: "primary-50",
				secondary: "secondary-50",
			},
		},
	} as ButtonStyleTypes,
	select: {
		styles: {
			base: {
				menu: {
					className: "py-2 px-0",
				},
				option: {
					initial: {
						className: "rounded-none",
					},
				},
			},
		},
	} as SelectStylesType,
	menu: {
		styles: {
			base: {
				menu: {
					className: "py-2 px-0",
				},
				item: {
					initial: {
						className: "rounded-none",
					},
				},
			},
		},
	} as MenuStylesType,
	card: {
		defaultProps: {
			className: "border border-gray-200 rounded-md",
		},
	} as CardStylesType,
	cardHeader: {
		defaultProps: {
			floated: false,
			shadow: false,
			className: "border-b border-gray-200 rounded-none py-2",
		},
	} as CardHeaderStylesType,
};
