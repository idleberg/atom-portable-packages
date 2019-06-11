declare const _default: {
    compressionType: {
        title: string;
        description: string;
        type: string;
        default: string;
        enum: string[];
        order: number;
    };
    compressionLevel: {
        title: string;
        description: string;
        type: string;
        default: number;
        minimum: number;
        maximum: number;
        order: number;
    };
    ignoreFile: {
        title: string;
        description: string;
        type: string;
        default: string;
        enum: string[];
        order: number;
    };
    revealFile: {
        title: string;
        description: string;
        type: string;
        default: boolean;
        order: number;
    };
};
export default _default;
