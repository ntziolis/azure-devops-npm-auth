declare class IniConfig {
    filePath: string;
    config: {
        [key: string]: string;
    };
    constructor(filePath: string, createIfNotExists?: boolean);
    get: (key: string) => string;
    set: (key: string, value: string) => string;
    save: () => void;
    load: () => {
        [key: string]: any;
    };
}
export default IniConfig;
