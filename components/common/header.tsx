"use client"

import Link from "next/link"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import {
Sheet,
SheetContent,
SheetTrigger
} from "@/components/ui/sheet"

import {
IconMenu2,
IconSearch
} from "@tabler/icons-react"

const navLinks = [
{ name:"Home",href:"/" },
{ name:"Products",href:"/products" },
{ name:"About",href:"/about" },
{ name:"Wishlist",href:"/wishlist" },
{ name:"Contact",href:"/contact" },
]

export default function Header(){

return(

<header className="w-full border-b bg-white">

<div className="container mx-auto flex items-center justify-between py-3 px-4 lg:px-8 xl:px-12">



<Link href="/" className="flex items-center">
<Image
src="/logo.png"
alt="logo"
width={120}
height={40}
/>
</Link>



<nav className="hidden lg:flex items-center gap-8">

{navLinks.map((item)=>(
<Link
key={item.name}
href={item.href}
className="text-sm font-medium text-[#374151] hover:text-primary"
>
{item.name}
</Link>
))}

</nav>



<div className="hidden lg:flex items-center gap-4">

<div className="flex items-center border rounded-full overflow-hidden">

<Input
placeholder="Search"
className="border-none focus-visible:ring-0 shadow-none"
/>

<Button
size="icon"
className="bg-[#F97316] hover:bg-[#F97316] rounded-none"
>
<IconSearch size={18}/>
</Button>

</div>

<Button className="rounded-full bg-[#1E3A8A]  hover:bg-[#1E3A8A]">
Request Quote
</Button>

</div>



<div className="lg:hidden">

<Sheet>

<SheetTrigger>

<div className="cursor-pointer">
<IconMenu2 size={26}/>
</div>

</SheetTrigger>

<SheetContent side="left">

<div className="flex flex-col gap-6 px-6 py-6">

<nav className="flex flex-col gap-6">

{navLinks.map((item)=>(
<Link
key={item.name}
href={item.href}
className="text-lg font-medium"
>
{item.name}
</Link>
))}

</nav>

<div className="flex items-center border rounded-full overflow-hidden">

<Input
placeholder="Search"
className="border-none focus-visible:ring-0 shadow-none"
/>

<Button
size="icon"
className="bg-orange-500 hover:bg-orange-600 rounded-none"
>
<IconSearch size={18}/>
</Button>

</div>

<Button className="bg-blue-900 hover:bg-blue-800">
Request Quote
</Button>

</div>

</SheetContent>

</Sheet>

</div>

</div>

</header>

)

}