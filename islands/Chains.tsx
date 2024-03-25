import { useSignal } from "@preact/signals";
import { useState } from "preact/hooks";
import { chains } from "../utils/commons.ts";

interface Props {
    changeChain: { show: boolean; scope: string };
    setChangeChain: (value: { show: boolean; scope: string; }) => void;
    bridger: {
        from: { chainId: string; value: string };
        to: { chainId: string; value: string };
      };
      setBridger: (value: {
        from: { chainId: string; value: string };
        to: { chainId: string; value: string };
      }) => void;
}

export default function Chains(props: Props) {

    const { changeChain, 
            setChangeChain,
            bridger,
            setBridger } = props;

    //const scope_ = changeChain.scope as keyof typeof bridger;
    const opposite = changeChain.scope === "from" ? "to" : "from";


    const handleChangeField = (event: Event) => {
    }

    const handleChangeChain = (chandId: string) => {

        const scopeValue = changeChain.scope;

        const updatedBridger = {
            ...bridger,
            [changeChain.scope]: {
                ...bridger[changeChain.scope as keyof typeof bridger],
                chainId: chandId,
            },
        };
          
        setBridger(updatedBridger);

          
        setChangeChain({ ...props.changeChain, show: !changeChain.show });
        //setBridger()
    }

    return (
        <div class="">
            <div class="w-full mb-2 capitalize text-base text-center font-semibold text-neutrals-slate300">
                { changeChain.scope }
            </div>
            <div class="flex flex-row justify-between w-[500px]">
                {chains.map((chain, index) => {

                    if(bridger[opposite].chainId === chain.chandId){ return null; }

                    return(
                        <div 
                            onClick={() => handleChangeChain(chain.chandId)}
                            class="flex flex-col justify-center items-center py-3 w-[85px] border rounded-lg border-transparent hover:border-brand-lime600 cursor-pointer"
                        >
                            <div class="w-[50px] h-[50px]">
                                <img src={chain.logo} />
                            </div>
                            <div class="font-regular text-xs text-neutrals-slate300 mt-2">
                                {chain.name}
                            </div>
                        </div>
                    )
                })}
                {/* <div 
                    onClick={handleClose}
                    class="flex flex-col justify-center items-center py-3 border rounded-lg border-transparent hover:border-brand-lime600 cursor-pointer"
                >
                    <div class="w-[50px] h-[50px]">
                        <img src={logo_arb} />
                    </div>
                    <div class="font-regular text-xs text-neutrals-slate300 mt-2">
                        Arbitum
                    </div>
                </div>
                <div class="flex flex-col justify-center items-center py-3 border rounded-lg border-transparent hover:border-brand-lime600 cursor-pointer">
                    <div class="w-[50px] h-[50px]">
                        <img src={logo_avax} />
                    </div>
                    <div class="font-regular text-xs text-neutrals-slate300 mt-2">
                        Avalanche
                    </div>
                </div>
                <div class="flex flex-col justify-center items-center py-3 border rounded-lg border-transparent hover:border-brand-lime600 cursor-pointer">
                    <div class="w-[50px] h-[50px]">
                        <img src={logo_base} />
                    </div>
                    <div class="font-regular text-xs text-neutrals-slate300 mt-2">
                        Base
                    </div>
                </div>
                <div class="flex flex-col justify-center items-center py-3 border rounded-lg border-transparent hover:border-brand-lime600 cursor-pointer">
                    <div class="w-[50px] h-[50px]">
                        <img src={logo_bsc} />
                    </div>
                    <div class="font-regular text-xs text-neutrals-slate300 mt-2">
                        BNB Chain
                    </div>
                </div>
                <div class="flex flex-col justify-center items-center py-3 border rounded-lg border-transparent hover:border-brand-lime600 cursor-pointer">
                    <div class="w-[30px] h-[30px]">
                        <img src={logo_eth} />
                    </div>
                    <div class="font-regular text-xs text-neutrals-slate300 mt-2">
                        Etherium
                    </div>
                </div> */}
            </div>
        </div>
    );
}