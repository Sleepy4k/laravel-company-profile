export interface User {
  id: number;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
  role: string|null;
  permissions: string[];
}

export interface Auth {
  user: User;
}

export interface AppSetting {
  debug: boolean;
  name: string;
  description: string;
  logo: string;
  favicon: string;
}

export type PaginatedData<T> = {
  data: T[];
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };

  meta: {
    current_page: number;
    from: number;
    last_page: number;
    path: string;
    per_page: number;
    to: number;
    total: number;

    links: {
      url: null | string;
      label: string;
      active: boolean;
    }[];
  };
};

export type DashboardMenuMeta = {
  translation_key: string;
  route: string;
  permission: string[];
  parameters: string | null;
  active_routes: string[];
  is_sortable: boolean;
  is_parent: boolean;
};

export type DashboardMenu = {
  name: string;
  order: string;
  meta: DashboardMenuMeta;
  child: DashboardMenu[];
};

export type QueryParams = {
  page: number | null;
  search: string | null;
  sort_field: string | null;
  sort_direction: string | null;
};

export type PageProps<
  T extends Record<string, unknown> = Record<string, unknown>
> = T & {
  auth: Auth;
  flash: {
    success: string | null;
    error: string | null;
  };
  app: AppSetting;
  menus: DashboardMenu[];
  // Record object or empty object
  errors: Record<string, any>|null;
  translations: Record<string, any>|null;
};
