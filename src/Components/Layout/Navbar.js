import "../Layout/Navbar.css";
function Navbar() {
  return (
    <header className="header">
      <div className="NavbarContainer">
        <div className="Dashboard">Stock analysis</div>
        <div className="NavSearch">
          <input className="input" placeholder="Search"></input>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
