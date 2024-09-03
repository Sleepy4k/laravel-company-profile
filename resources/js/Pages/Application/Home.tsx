import { PageProps } from '@/types';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Home({ auth, app }: PageProps) {
    return (
        <AuthenticatedLayout user={auth.user} app={app} title="Application">
            
        </AuthenticatedLayout>
    );
}
