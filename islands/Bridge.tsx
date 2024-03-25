import { h, Component, render } from 'https://esm.sh/preact';
import { useSignal } from "@preact/signals";
import { IoMdArrowRoundDown,
         IoMdTime } from "react-icons/io";
import { BsFillFuelPumpFill,
         BsClockHistory } from "react-icons/bs";
import { FaHatWizard,
         FaLink } from "react-icons/fa";

import { useState, useEffect } from "preact/hooks";
import { chains, retrieveSelectedChainData } from "../utils/commons.ts";
import { spinner_white,
         spinner_violet,
         spider } from "../utils/assets.ts";

import Chains from "./Chains.tsx";

interface BridgerState {
    from: { chainId: string; value: string };
    to: { chainId: string; value: string };
}
interface StepperState {
    in: string;
    out: string;
}

export default function MyIsland() {

    const [ loading, setLoading ] = useState(false);
    const [ toSend, setToSend ] = useState({value: ""});
    const [ toRevieve, setToRevieve ] = useState({value: ""});
    const [ blur, setBlur ] = useState(false);
    const [ changeChain, setChangeChain ]  = useState({show: false, scope: ""});
    const [ startBridge, setStartBridge ] = useState(false);
    const [ canBridge, setCanBridge ] = useState(false);
    const [ burn, setBurn ] = useState<boolean | null>(null);
    const [ mint, setMint ] = useState<boolean | null>(null);
    const [ minted, setMinted ] = useState<boolean | null>(null);
    const [ nextStep, setNextStep ] = useState<StepperState>({in: "", out: ""});
    const [ pricesOnChain, setPriceOnChain ] = useState({ARB: 0.01555, AVAX: 0.009647, BASE: 0.14567, BSC: 0.010546, ETH: 0.0194754});

    const [ bridger, setBridger ] = useState<BridgerState>({from: { chainId: "", value: "" },
                                                            to: { chainId: "", value: "" }})
//py-2 bg-transparent focus:outline-none font-bold text-4xl placeholder:text-neutrals-slate500

    const [ pija, setPija ] = useState("");
  const count = useSignal(0);

    const handleBridge = () => {
        //handleStepper("burn", "");
        stepBurn();
        setStartBridge(true);
        setCanBridge(false);
    }
    
    const handleStepper = (in_:string, out_:string) => {

        stepBurn();
        

        /*
        const nextStepUpdate = {...nextStep};
        nextStepUpdate.in = in_;
        nextStepUpdate.out = out_;
        setNextStep(nextStepUpdate);
        */
    }
    const stepBurn = () => {
        setBurn(true);
        setTimeout(() => {
            setBurn(false);
            stepMint();
        }, 5000);
    }
    const stepMint = () => {
        setMint(true);
        setTimeout(() => {
            setMint(false);
            stepMinted();
        }, 5000);
    }
    const stepMinted = () => {
        setMinted(true)
    }

    const handleReset = () => {
        const bridgerUpdate = {...bridger};
        bridgerUpdate.from.chainId = "";
        bridgerUpdate.from.value = "";
        bridgerUpdate.to.chainId = "";
        bridgerUpdate.to.value = "";
        setBridger(bridgerUpdate);
        setBurn(null);
        setMint(null);
        setMinted(null);
        setStartBridge(false);
    }

    const handleChangeField = (event: Event) => {

        
        const bridgerUpdate = {...bridger};

        const target = event.target as HTMLInputElement;
        const targetBridge = target.name as keyof BridgerState;

        if(targetBridge in bridger){
            //bridgerUpdate[targetBridge].value = target.value;
            const str = target.value.replace(/,/g, '.');
            console.log("str", str)
            const dots = str.split('.').length - 1;
            //let value = target.value;
            console.log("dots", dots)
            if(dots <= 1){ 
                bridgerUpdate.from.value = str;//target.value.replace(/\./g, '.');
                bridgerUpdate.to.value = bridgerUpdate.from.value;
             };

                
        }
        console.log(bridgerUpdate)
        setBridger(bridgerUpdate);
        

        
        /*
        const toSendUpdate = {...toSend};
        toSendUpdate.value = target.value.replace(/\./g, '.');
        setToSend(toSendUpdate);

        const toRecieveUpdate = {...toRevieve};
        toRecieveUpdate.value = target.value.replace(/\./g, '.');
        setToRevieve(toRecieveUpdate);
        */
    }

    const handleChangeChain = (scope: string) => {
        setChangeChain(prev => ({ ...prev, scope: scope, show: !changeChain.show }));
        setBlur(true);
    }

    useEffect(() => {
      
        if(!changeChain.show){
            setBlur(false);
        }
    
      return () => {}
    }, [changeChain])

    useEffect(() => {
      console.log("bridger:::: ", bridger)

      if(bridger.from.value.length && bridger.from.chainId.length && bridger.to.chainId.length){
        setCanBridge(true);
      }
      
      
      return () => {}
    }, [bridger])

    useEffect(() => {
        console.log("nextStep", nextStep)
        // Establecer el temporizador cuando el componente se monta
        if(nextStep.in.length || nextStep.out.length){
            const timerId = setTimeout(() => {
                handleStepper("mint", "");
            }, 5000); // 5 segundos
        }
    
        // Retorno de la función de limpieza para cancelar el temporizador cuando el componente se desmonta
        return () => {/*clearTimeout(timerId)*/};
      }, [nextStep]);
    

    //
    

  return (
    <div class="flex justify-center items-center h-full">

            {changeChain.show ?
            <div class="fixed w-full h-full transition ease-in-out bg-dark-zinc950/70 z-50">
                <div class="absolute top-[50%] -translate-y-[50%] left-[50%] -translate-x-[50%]">
                    <Chains
                        bridger={bridger}
                        setBridger={setBridger}
                        changeChain={changeChain}
                        setChangeChain={setChangeChain}
                    />
                </div>
            </div>: ""}
            <div class={`flex flex-col transition ease-in-out ${blur ? "blur-lg" : ""}`}>
                <div class="flex justify-center">
                    <div class="w-[95%] h-[40px] flex items-center justify-between bg-dark-slate900 px-3 rounded-t-lg text-neutrals-slate300">
                        <div class="gas_cost flex flex-row items-center text-xs">
                            <BsFillFuelPumpFill class="text-sm" /> <p class="ml-2">0.01 US$ estimated gas rate</p>
                        </div> 
                        <div class="time_cost flex flex-row items-center text-xs">
                            <BsClockHistory class="text-sm" /> <p class="ml-2">00:15 estimated time</p>
                        </div> 
                    </div>
                </div>
                <div class={`w-[550px] p-2 border-solid border-2 rounded-xl border-brand-violet950 shadow-2xl shadow-brand-indigo950 focus:outline-none text-neutrals-slate300`}>
                    {loading ?
                        <>cargando</>
                    :
                    <>
                    <div class="relative">
                        

                        {/* FROM */}
                        
                        <div class="flex justify-start relative w-full mb-1 p-2 bg-dark-slate900 z-10">
                            <div class="w-1/2 px-3">
                                <div class="text-sm font-bold">From</div>
                                <input 
                                    name="from"
                                    class="py-1 bg-transparent focus:outline-none font-medium text-6xl placeholder:text-neutrals-slate500"
                                    type="text"
                                    value={bridger.from.value}
                                    placeholder="0"
                                    onInput={handleChangeField}
                                    disabled={startBridge}
                                />
                                <div class={`destiny_price text-xs text-neutrals-slate500`}>
                                    {`$${(pricesOnChain[bridger.from.chainId as keyof typeof pricesOnChain] * parseFloat(toRevieve.value)).toLocaleString()}`}
                                </div>
                            </div>
                            <div class="flex flex-row items-center absolute -right-[45px] top-[50%] -translate-y-[50%]">
                                <div class="flex flex-col items-end mr-2">
                                    <div class="font-extrabold text-3xl text-neutrals-slate300 cursor-default">DZHV</div>
                                    <div class="font-regular text-xs text-neutrals-slate400 cursor-default">{ retrieveSelectedChainData(bridger.from.chainId, "name") }</div>
                                </div>
                                <div 
                                    onClick={() => handleChangeChain("from")}
                                    class="w-[80px] h-[80px] border-2 flex justify-center items-center rounded-full border-brand-violet950 p-3 bg-dark-stone950 cursor-pointer hover:border-brand-lime600"
                                >
                                    {bridger.from.chainId ?
                                    <img src={retrieveSelectedChainData(bridger.from.chainId, "logo")} />
                                    : <FaLink class="text-brand-violet950 text-2xl"/>}
                                </div>
                            </div>

                            <div class={`flex justify-center items-center rounded-full absolute w-[35px] h-[35px] overflow-hidden -bottom-[20px] left-1/2 transform -translate-x-1/2 bg-neutrals-slate300 z-20 ${startBridge ? "transition duration-500 ease-in-out scale-150" : ""}`}>
                                {startBridge ? 
                                    minted === true ?
                                    <img src={spider} />
                                    :
                                    <img class="w-[35px] h-[35px] fill-neutrals-slate300" src={spinner_violet} />
                                :
                                    <FaHatWizard class="text-brand-violet950 text-xl" />
                                }
                            </div>

                        </div>
                        
                        <div class={`bridge mb-1 stripes h-0 bg-dark-slate950 transition-height ease-out duration-500  ${startBridge ? "h-[200px]" : ""}`}>
                            <div class={`process_stepper flex items-center justify-center h-full relative ${burn === null ? "blur-2xl opacity-0" : ""} ${burn === true ? "transition duration-300 ease-in-out blur-none opacity-100" : ""} ${burn === false ? "transition duration-300 ease-in-out blur-2xl opacity-0 hidden" : ""}`}>
                                <div class="burning flex flex-row items-center absolute">
                                    <div class="w-[60px] h-[60px] rounded-full bg-brand-violet950 p-2 absolute">
                                        <img src={retrieveSelectedChainData(bridger.from.chainId, "logo")} />
                                    </div>
                                    <div class="flex flex-row py-2 pr-3 pl-4 ml-[50px] text-sm rounded-r-lg whitespace-nowrap bg-brand-violet950">
                                        <p><span class="font-extrabold text-brand-red700">Burning</span> DZHV on {retrieveSelectedChainData(bridger.from.chainId, "name")}</p>
                                        <img class="ml-2" src={spinner_white} alt="" />
                                    </div>
                                </div>
                            </div>
                            <div class={`process_stepper flex items-center justify-center h-full relative ${mint === null ? "blur-2xl opacity-0" : ""} ${mint === true ? "transition duration-300 ease-in-out blur-none opacity-100" : ""} ${mint === false ? "transition duration-300 ease-in-out blur-2xl opacity-0 hidden" : ""}`}>
                                <div class="burning flex flex-row items-center absolute">
                                    <div class="w-[60px] h-[60px] rounded-full bg-brand-violet950 p-2 absolute">
                                        <img src={retrieveSelectedChainData(bridger.to.chainId, "logo")} />
                                    </div>
                                    <div class="flex flex-row py-2 pr-3 pl-4 ml-[50px] text-sm rounded-r-lg whitespace-nowrap bg-brand-violet950">
                                        <p><span class="font-extrabold text-brand-lime600">Minting</span> DZHV on {retrieveSelectedChainData(bridger.to.chainId, "name")}</p>
                                        <img class="ml-2" src={spinner_white} alt="" />
                                    </div>
                                </div>
                            </div>
                            <div class={`process_stepper flex items-center justify-center h-full relative ${minted === null ? "blur-2xl opacity-0" : ""} ${minted === true ? "transition duration-300 ease-in-out blur-none opacity-100" : ""} ${minted === false ? "transition duration-300 ease-in-out blur-2xl opacity-0" : ""}`}>
                                <div class="burning flex flex-row items-center absolute">
                                    <div class="flex flex-row py-2 pr-3 pl-4 ml-[50px] text-sm rounded-lg whitespace-nowrap bg-dark-slate950 shadow-halo shadow-brand-lime600/20">
                                        <p><span class="font-extrabold text-brand-lime600">Bridge complete</span>, final cost 0.05 US$</p>
                                        <button 
                                            onClick={handleReset}
                                            type="button" class="bg-brand-lime600 text-brand-violet950 font-bold text-xs rounded-md px-2 ml-3 cursor-pointer hover:bg-brand-violet950 hover:text-brand-lime600"
                                        >Close</button>
                                    </div>
                                </div>
                            </div>
                            {/* <img class="w-[35px] h-[35px] fill-neutrals-slate300" src={spinner_white} /> */}
                        </div>

                        {/* TO */}
                        <div class="flex justify-end relative w-full mb-1 p-2 bg-dark-slate900">
                            <div class="flex flex-col items-end px-3">
                                <div class="text-sm font-bold">To</div>
                                <input 
                                    name="to"
                                    class="py-1 bg-transparent focus:outline-none font-medium text-6xl placeholder:text-neutrals-slate500 text-right"
                                    type="text"
                                    value={bridger.to.value}
                                    placeholder="0"
                                    onInput={handleChangeField}
                                    disabled={startBridge}
                                />
                                <div class={`destiny_price text-xs text-neutrals-slate500`}>
                                    {`$${(pricesOnChain[bridger.from.chainId as keyof typeof pricesOnChain] * parseFloat(toRevieve.value)).toLocaleString()}`}
                                </div>
                            </div>
                            <div class="flex flex-row-reverse items-center absolute -left-[45px] top-[50%] -translate-y-[50%]">
                                <div class="flex flex-col ml-2">
                                    <div class="font-extrabold text-3xl text-neutrals-slate300 cursor-default">DZHV</div>
                                    <div class="font-regular text-xs text-neutrals-slate400 cursor-default">{ retrieveSelectedChainData(bridger.to.chainId, "name") }</div>
                                </div>
                                <div 
                                    onClick={() => handleChangeChain("to")}
                                    class="w-[80px] h-[80px] border-2 flex justify-center items-center rounded-full border-brand-violet950 p-3 bg-dark-stone950 cursor-pointer hover:border-brand-lime600"
                                >
                                    {bridger.to.chainId ?
                                    <img src={retrieveSelectedChainData(bridger.to.chainId, "logo")} />
                                    : <FaLink class="text-brand-violet950 text-2xl"/>}
                                </div>
                            </div>
                        </div>
                    </div>
                    <button 
                        type="button"
                        class="w-full py-3 border border-brand-violet950 bg-brand-violet950  disabled:opacity-30 enabled:hover:text-brand-violet950 enabled:hover:bg-brand-lime600"
                        onClick={handleBridge}
                        disabled={!canBridge}
                    >
                        Bridge
                    </button>
                    </>
                    }
                </div>
            </div>
        </div>
  );
}