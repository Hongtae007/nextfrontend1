import Link from "next/link"

export default function Navbar() {
    return (
        <nav className="navbar">
            <div className="logo">
                <h1>RFID</h1>
            </div>
            <div className="links">
                <Link href="/"> HomePage </Link>
                <Link href="/dashboard"> Dashboard </Link>
                <Link href="/login"> Login </Link>
            </div>
        </nav>
    );
}