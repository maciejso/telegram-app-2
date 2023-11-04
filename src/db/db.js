import bitcoinImg from "../images/bitcoin.png";
import ethereumImg from "../images/ethereum.png";
import tonImg from "../images/ton.png";

export function getData() {
  return [
    { title: "Bitoin", price: 17.99, Image: bitcoinImg,id:1 },
    { title: "Ethereum", price: 15, Image: ethereumImg,id:2 },
    { title: "Tom", price: 3.5, Image: tonImg ,id:3},
  ];
}
