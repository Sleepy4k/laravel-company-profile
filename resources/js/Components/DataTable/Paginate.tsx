import { HTMLAttributes } from 'react';
import { router } from '@inertiajs/react';

export default function InputError({ data, className = '', ...props }: HTMLAttributes<HTMLParagraphElement> & { data: any }) {
    const disablePrev = data.current_page === 1 || data.prev_page_url === null;
    const disableNext = data.current_page === data.last_page || data.next_page_url === null;

    const handleNext = () => router.visit(data.next_page_url);
    const handlePrev = () => router.visit(data.prev_page_url);
    const handleStart = () => router.visit(data.first_page_url);
    const handleEnd = () => router.visit(data.last_page_url);

    return (
        <div className="join lg:gap-2 gap-1">
            <button type='button' disabled={disablePrev} onClick={handleStart} className="join-item btn">{'<<'}</button>
            <button type='button' disabled={disablePrev} onClick={handlePrev} className="join-item btn">{'<'}</button>
            <button type='button' className="join-item btn">Page {data.current_page}</button>
            <button type='button' disabled={disableNext} onClick={handleNext} className="join-item btn">{'>'}</button>
            <button type='button' disabled={disableNext} onClick={handleEnd} className="join-item btn">{'>>'}</button>
        </div>
    );
}
