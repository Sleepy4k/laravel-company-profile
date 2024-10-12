import { usePage } from "@inertiajs/react";

export default function trans(key: string, replacer?: any, args?: any[]): string {
  const translations: any = usePage().props.translations;

  if (!translations) return replacer || key;

  let translation: string = translations[key] || (replacer || key);

  if (args && args.length > 0) {
    args.forEach((arg, index) => {
      // Find all dynamic placeholders in the translation
      // example: :name, :email, :password
      const placeholders = translation.match(/:\w+/g);

      // If there are no placeholders, return the translation as is
      if (!placeholders) return translation;

      // Replace the placeholder with the argument
      translation = translation.replace(placeholders[index], arg);

      // If there are no more arguments to replace, return the translation
      if (index === args.length - 1) return translation;

      // If there are more arguments to replace, replace the next placeholder
      return translation;
    });
  }

  return translation;
}
