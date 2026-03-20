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
    { name:"Products",href:"/product" },
    { name:"About",href:"/about" },
    { name:"Wishlist",href:"/wishlist" },
    { name:"Contact",href:"/contact" },
    ]

    export default function Header(){
    return(
        <header className="w-full border-b bg-white font-poppins ">

        <div className="container mx-auto flex items-center justify-between py-2 px-4 lg:px-6 xl:px-8">

            {/* Logo */}
            <Link href="/" className="flex items-center">
            <Image
                src="/logo.png"
                alt="logo"
                width={100}
                height={32}
            />
            </Link>

            {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6">
    {navLinks.map((item)=>(
        <Link
        key={item.name}
        href={item.href}
        className="font-medium text-sm text-black hover:text-primary"
        >
        {item.name}
        </Link>
    ))}
    </nav>

        {/* Desktop Right */}
    <div className="hidden lg:flex items-center gap-2">

    <div className="flex items-center border rounded-full overflow-hidden">

    <Input
    placeholder="Search"
    className="border-none focus-visible:ring-0 shadow-none font-inter"
    />

    <Button
    size="icon"
    className="bg-orange-500 hover:bg-orange-600 rounded-none"
    >
    <IconSearch size={18}/>
    </Button>

    </div>

    <Button className="rounded-full bg-[#1E3A8A] hover:bg-[#1E3A8A] text-xs px-6 h-8">
        Enquiries
    </Button>

    </div>

            {/* Mobile */}
            <div className="lg:hidden">
            <Sheet>
                <SheetTrigger>
                <div className="cursor-pointer">
                    <IconMenu2 size={22}/>
                </div>
                </SheetTrigger>

                <SheetContent side="left">
                <div className="flex flex-col gap-5 px-5 py-5">

                    <nav className="flex flex-col gap-4">
                    {navLinks.map((item)=>(
                        <Link
                        key={item.name}
                        href={item.href}
                        className="text-base font-medium"
                        >
                        {item.name}
                        </Link>
                    ))}
                    </nav>

                    <div className="flex items-center border rounded-full overflow-hidden h-8">

                    <Input
                        placeholder="Search"
                        className="border-none focus-visible:ring-0 shadow-none text-xs h-8 font-inter"
                    />

                    <Button
                        size="icon"
                        className="bg-orange-500 hover:bg-orange-600 rounded-none h-8 w-8"
                    >
                        <IconSearch size={16}/>
                    </Button>

                    </div>

                    <Button className="bg-[#1E3A8A] hover:bg-blue-800 text-xs h-8">
                    Enquiries
                    </Button>

                </div>
                </SheetContent>
            </Sheet>
            </div>

        </div>

        </header>
    )
    }