import IniConfig from "./ini-config";
declare class NpmConfig extends IniConfig {
    constructor(basePath: string, createIfNotExists?: boolean);
    getRegistries(): string[];
    getRegistryRefreshToken(registry: string): string;
    setRegistryAuthToken(registry: string, token: string): void;
    setRegistryRefreshToken(registry: string, token: string): void;
}
declare class UserNpmConfig extends NpmConfig {
    constructor(createIfNotExists?: boolean);
}
declare class ProjectNpmConfig extends NpmConfig {
    constructor();
}
export { NpmConfig, UserNpmConfig, ProjectNpmConfig };
