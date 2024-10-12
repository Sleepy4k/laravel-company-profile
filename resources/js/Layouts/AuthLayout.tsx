import { Head } from '@inertiajs/react';
import FlashMessages from '@/Components/Messages/FlashMessages';

interface AuthLayoutProps {
  title?: string;
  children: React.ReactNode;
}

export default function AuthLayout({ title, children }: AuthLayoutProps) {
  return (
    <>
      <Head title={title} />
      {/**
       * We need to scroll the content of the page, not the whole page.
       * So we need to add `scroll-region="true"` to the div below.
       *
       * [Read more](https://inertiajs.com/pages#scroll-regions)
       */}
      <div
        className="w-full overflow-hidden overflow-y-auto"
        scroll-region="true"
      >
        <div className="flex items-center justify-center min-h-screen p-6 bg-indigo-900">
          {children}
        </div>
      </div>
    </>
  );
}
