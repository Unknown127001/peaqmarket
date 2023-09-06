import React from "react";
import { ConnectWallet } from "@thirdweb-dev/react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, ButtonGroup, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Card, CardBody, Input, Image, CardFooter, CardHeader,Divider} from "@nextui-org/react";
import styles from "../styles/Home.module.css";
import {AcmeLogo} from "./AcmeLogo";
import {SearchIcon} from "./SearchIcon";
import {MoonIcon} from "./moon";
import {SunIcon} from "./sun";
import { NextPage } from "next";
import {useTheme} from "next-themes";
import { useRouter } from 'next/router';

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

export default Home;
