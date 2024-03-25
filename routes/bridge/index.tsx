import Bridge from "../../islands/Bridge.tsx";

export default function BridgePage() {

    const numero = 1234;

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      });

    //const myNumeral = numeral(1000);
    //console.log(myNumeral);
    return (
        <Bridge />
    );
}