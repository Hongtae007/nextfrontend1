import Link from "next/link"
import Image from "next/image"

export default function Navbar() {
    return (
        <nav>
            <div>
                <h1>RFID</h1>
            </div>
            <Link href="/">Home Page</Link>
            <Link href="/dashboard">Dashboard</Link>
        </nav>
    )
}