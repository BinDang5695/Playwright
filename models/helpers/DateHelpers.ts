export class DateHelpers {
    
    // Format DD-MM-YYYY (en-GB)
    static getTodayDDMMYYYY(): string {
        return new Date().toLocaleDateString('en-GB').replaceAll('/', '-');
    }

    static getTodayRegex(): RegExp {
        const d = new Date();
        const day = d.getDate();
        const month = d.getMonth() + 1;
        const year = d.getFullYear();
        return new RegExp(`0?${day}[/\\-]0?${month}[/\\-]${year}`);
    }

    // Format MM/DD/YYYY (en-US)
    static getTodayMMDDYYYY(): string {
        return new Date().toLocaleDateString('en-US');
    }

    // Format YYYY-MM-DD (ISO)
    static getTodayISO(): string {
        return new Date().toISOString().slice(0, 10);
    }

    // Format option: getFormattedDate('en-GB', '/')  → 26/03/2026
    static getFormattedDate(locale: string = 'en-GB', separator: string = '-'): string {
        return new Date().toLocaleDateString(locale).replaceAll('/', separator);
    }

    // Format with offset date: getFutureDate(7) → 7 days later
    static getOffsetDate(days: number, locale: string = 'en-GB', separator: string = '-'): string {
        const date = new Date();
        date.setDate(date.getDate() + days);
        return date.toLocaleDateString(locale).replaceAll('/', separator);
    }
}