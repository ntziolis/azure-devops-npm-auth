import { Issuer, Client } from "openid-client";
declare class MsoIssuer<TClient extends Client> extends Issuer<TClient> {
    static discover(tenant?: string): Promise<Issuer<Client>>;
}
export default MsoIssuer;
