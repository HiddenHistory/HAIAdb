//Component for the nav bar, which will be shared by all webpages in site.
const Navbar = () => {
    return ( 
        <nav className="navbar">
            <div className="links">
                <a href="/">Home</a>
                <a href="/enter" style={{
                    color:"white",
                    backgroundColor: '#f1356d',
                    borderRadius: '8px'
                }}>make entries</a>
                <a href="/about">About</a>
                <a href="https://www.youtube.com/channel/UCaIHjtxqn6_ej_jNLUXMeiw">youtube</a>
            </div>
        </nav>
    );
}
 
export default Navbar;