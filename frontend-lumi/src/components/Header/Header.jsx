import './Header.css'

export function Header() {
    return (
        <>
            <nav>
                <div className="input-search">
                    <i className="bi bi-search"></i>
                    <input type="text" />
                </div>
            </nav>
        </>
    )
}