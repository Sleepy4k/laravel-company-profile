interface IPermissionResultProps {
    folder: string;
    isSet: boolean;
    permission: string;
}

interface IPermissionProps {
    errors: boolean|null;
    results: Array<IPermissionResultProps>;
}

export default IPermissionProps;
