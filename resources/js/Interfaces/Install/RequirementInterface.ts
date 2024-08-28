interface IRequirementsResultProps {
    extensions: {
        [key: string]: boolean;
    };
    php: {
        [key: string]: boolean;
    };
    functions: {
        [key: string]: boolean;
    };
}

interface IRequirementsRecommendProps {
    php: {
        [key: string]: boolean;
    };
    functions: {
        [key: string]: boolean;
    };
}

interface IRequirementsProps {
    results: IRequirementsResultProps
    recommended: IRequirementsRecommendProps;
    errors: boolean|null;
}

export default IRequirementsProps;
