export interface User {
    id: number;
    name: string;
    email: string;
    created_at: string;
    updated_at: string;
}

export interface AppSetting {
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
};
