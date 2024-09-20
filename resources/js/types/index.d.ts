export interface User {
    id: number;
    name: string;
    email: string;
    created_at: string;
    updated_at: string;
    role: string|null;
    permissions: string[];
}

export interface AppSetting {
    debug: boolean;
    name: string;
    description: string;
    logo: string;
    favicon: string;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
    app: AppSetting;
    // Record object or empty object
    errors: Record<string, any>|null;
    translations: Record<string, any>|null;
};
