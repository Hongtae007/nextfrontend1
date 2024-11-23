import '../styles/globals.css'; // นำเข้าไฟล์ CSS ทั่วไป

export default function Footer() {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="footer">
            <p>&copy; {currentYear} | Hongtae</p>
        </footer>
    );
}
