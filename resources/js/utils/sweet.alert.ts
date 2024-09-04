import Swal from 'sweetalert2';

const alert = Swal.mixin({
    customClass: {
        container: 'bg-base-100 dark:bg-base-800 text-base-content dark:text-base-100',
        popup: 'bg-base-200 dark:bg-base-700 text-base-content dark:text-base-100',
        title: 'text-base-content dark:text-neutral-100 text-lg font-semibold',
        closeButton: 'text-base-content dark:text-neutral-100 hover:text-base-200',
        htmlContainer: 'text-base-content dark:text-neutral-100 text-base',
        input: 'text-base-content dark:text-neutral-100 bg-base-300 dark:bg-base-600 border-none',
        inputLabel: 'text-base-content dark:text-neutral-100 text-base',
        validationMessage: 'text-base-content dark:text-neutral-100 text-base',
        actions: 'text-base-content dark:text-neutral-100 flex gap-2',
        confirmButton: 'btn btn-primary mr-2',
        cancelButton: 'btn btn-error ml-2',
    },
    buttonsStyling: false,
});

export default alert;
