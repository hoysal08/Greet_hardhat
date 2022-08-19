import "./App.css";
import { useState } from "react";
import { ethers } from "ethers";
import Greeter from "./artifacts/contracts/Lock.sol/Greeter.json";

const greeteraddr = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

function App() {

  const[messsage,setmessage] =useState('');

  async function requestAccount(){
    await window.ethereum.request({method:'eth_requestAccounts'});
  }
  async function fetchGreeting(){
     if(typeof window.ethereum!== "undefined"){
      const provider=new ethers.providers.Web3Provider(window.ethereum);
      const contract=new ethers.Contract(greeteraddr,Greeter.abi,provider);
      try{
              const data=await contract.greet();
              console.log("data",data);
      }catch(err)
      {
        console.log(err);
      }
     }
  }

  async function setGreeting() {

    if(typeof window.ethereum!== "undefined"){
      const provider=new ethers.providers.Web3Provider(window.ethereum);
      const signer=provider.getSigner();
      const contract=new ethers.Contract(greeteraddr,Greeter.abi,signer);
      try{
              let txn=await contract.setGreeting(messsage);
              setmessage(" ");
              txn= await txn.wait();
              console.log("txn",txn);
              console.log("updated greeting")
              fetchGreeting();

      }catch(err)
      {
        console.log(err);
      }
     }
  }

  return (
    <div className="App">
      <div className="App-header">
        <div className="description">
          <h1>Greeter.sol</h1>
          <h3>Full stack dapp using React.js and Hardhat</h3>
        </div>

        <div className="custom-buttons">
          <button onClick={fetchGreeting} style={{ backgroundColor: "green" }}>Fetch Greeting</button>
          <button onClick={setGreeting} style={{ backgroundColor: "red" }}>Set Greeting</button>
        </div>

        <input type="text" 
        value={messsage}
         placeholder="Set Greeting Message here" 
         onChange={(e)=>{setmessage(e.target.value)}} />

      </div>
    </div>
  );
}

export default App;
