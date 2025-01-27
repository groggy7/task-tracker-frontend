import React from "react"
import { Calendar, ListTodo, Settings, CalendarRange, CalendarDays, ChevronLeft, ChevronRight } from "lucide-react"
import todo from "../assets/todo.png"
import { NavLink } from "react-router-dom"

interface SidebarItem {
    label: string
    icon: React.ReactNode
    to: string
    onClick?: () => void 
}

const SidebarItems: SidebarItem[] = [
    { label: "Today", icon: <Calendar size={20} />, to: "today" },
    { label: "Tasks", icon: <ListTodo size={20}  />, to: "tasks"},
    { label: "Week", icon: <CalendarRange size={20} />, to: "week"},
    { label: "Month", icon: <CalendarDays size={20} />, to: "month" },
    { label: "Settings", icon: <Settings size={20} />, to: "settings" }
]

export default function Sidebar() {
    const [selectedItem, setSelectedItem] = React.useState<string>("")
    const [open, setOpen] = React.useState<boolean>(true)

    const sidebarItems = SidebarItems.map(item => (
        <NavLink
            to={item.to}
            key={item.label}
            className={`flex items-center gap-4 p-3 cursor-pointer hover:opacity-75 rounded ${
                selectedItem === item.label ? 'bg-[#3A3B3D]' : ''} ${!open ? "justify-center" : ""}`}
            onClick={() => setSelectedItem(item.label)}
        >
            <span>{item.icon}</span>
            {open && <span>{item.label}</span>}
        </NavLink>
    ))

    return <div className={`bg-[#232627] fixed left-0 top-0 p-4 text-gray-100 h-full 
        flex flex-col gap-4 ${open ? 'w-64' : 'w-20'} transition-all duration-300`}>
        <div className="flex gap-4 p-2 items-center relative">
            <img src={todo} alt="app logo" className="w-7"/>
            {open && <span>sabotage1135</span>}
            <span 
                className="absolute -right-7 bg-[#3A3B3E] p-1 rounded-full cursor-pointer"
                onClick={() => setOpen(!open)}
            >
                {
                    open ? 
                    <ChevronLeft size={20} /> : 
                    <ChevronRight size={20} />
                }
            </span>
        </div>
        <div className="flex flex-col gap-2">
            {sidebarItems}
        </div>
    </div>
}