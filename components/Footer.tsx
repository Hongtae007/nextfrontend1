export default function Footer(){
    const currentYear = new Date().getFullYear();
    return(
        <footer>
            copyright {currentYear} | Hongtae
        </footer>
    )
}