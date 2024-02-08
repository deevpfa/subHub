import { MutatorFn } from "../interfaces";

export class Mutators {
    static trim(value: any): any {
        if (typeof value === "string") return value.trim();
        return value;
    }

    static toLowerCase(value: any): any {
        if (typeof value === "string") return value.toLowerCase();
        return value;
    }

    static toUpperCase(value: any): any {
        if (typeof value === "string") return value.toUpperCase();
        return value;
    }

    static onlyNumbers(value: any) {
        if (value === null || value === "") return value;

        let digits = "";
        let hasDot = false;
        for (let i = 0; i < value.length; i++) {
            const char = value.charAt(i);
            if (char === "." && !hasDot) {
                digits += char;
                hasDot = true;
            } else if (!isNaN(char)) {
                digits += char;
            }
        }

        if (digits === "" || digits === ".") return "";
        if ((hasDot && digits.endsWith(".")) || digits.includes(".0")) return digits;
        if (hasDot && digits.startsWith(".")) return Number("0" + digits);
        return Number(digits);
    }
}
