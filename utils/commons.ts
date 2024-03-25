import { logo_arb,
         logo_avax,
         logo_base,
         logo_bsc,
         logo_eth } from "./assets.ts";

export const chains = [{logo: logo_arb, name: "Arbitrum", chandId: "ARB"},
                       {logo: logo_avax, name: "Avalanche", chandId: "AVAX"},
                       {logo: logo_base, name: "Base", chandId: "BASE"},
                       {logo: logo_bsc, name: "BNB Chain", chandId: "BSC"},
                       {logo: logo_eth, name: "Etherium", chandId: "ETH"}];

export const retrieveSelectedChainData = (chainId: string, what: string) => {
    const ch = chains.filter(c => c.chandId === chainId);
    if(ch.length){
        if(what === "logo"){ return ch[0].logo }
        if(what === "name"){ return ch[0].name }
    }
    return "";
}

