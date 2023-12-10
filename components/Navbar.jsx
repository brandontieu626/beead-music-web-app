import Link from "next/link";

const Navbar = () => {
  return (
    <div className="nav_container">
      <div className="nb_container">
        <div>
          <Link href="/">Beead</Link>
        </div>
        <nav className="nb_list_container">
          <ul className="nb_list">
            <li>
              <Link href="/music" className="nb_link">
                MUSIC
              </Link>
            </li>
            <li>
              <Link href="/newreleases">NEW RELEASES</Link>
            </li>
            <li>
              <form>
                <input type="text" placeholder="Search music"></input>
              </form>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
