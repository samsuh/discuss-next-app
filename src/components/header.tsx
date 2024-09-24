import Link from 'next/link'
import { auth } from '@/auth'
import {
  Input,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from '@nextui-org/react'

export default async function Header() {
  const session = await auth()
  return (
    <Navbar>
      <NavbarBrand>
        <Link href="/" className="font-bold">
          Discuss
        </Link>
      </NavbarBrand>
      <NavbarContent justify="center">
        <NavbarItem>
          <Input />
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          {session?.user ? <div>Signed In</div> : <div>Signed Out</div>}
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}
