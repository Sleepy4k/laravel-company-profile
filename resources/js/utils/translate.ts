import { usePage } from "@inertiajs/react";

export default function trans(key: string, replacer?: any): string {
    const translations: any = usePage().props.translations;

    if (!translations) return replacer || key;

    return translations[key] || (replacer || key);
}
