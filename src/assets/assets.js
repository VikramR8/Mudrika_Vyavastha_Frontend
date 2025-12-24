import logo from "./logo.png"
import loginBg from "./loginBg.jpg"
import { Coins, FunnelPlus, LayoutDashboard, List, Wallet } from "lucide-react"

export const assets ={
    logo,
    loginBg,
}

export const SIDE_BAR_DATA = 
[
    {
        id: "01",
        label:"Dashboard",
        icon:LayoutDashboard,
        path:"/dashboard",
    },
    {
        id: "02",
        label:"Category",
        icon:List,
        path:"/category",
    },
    {
        id: "03",
        label:"Income",
        icon:Wallet,
        path:"/incomes",
    },
    {
        id: "04",
        label:"Expense",
        icon:Coins,
        path:"/expenses",
    },
    {
        id: "05",
        label:"Filters",
        icon:FunnelPlus,
        path:"/filter",
    },
]