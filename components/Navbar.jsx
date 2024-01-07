"use client";
import Link from "next/link";

const Navbar = () => {
  function handleSearch(term) {
    console.log(term);
  }

  function submitFunc() {
    event.preventDefault();
    console.log("submit");
  }

  return (
    <div>
      <div className="nb_container">
        <div className="nb_site_title">
          <Link href="/">Beead</Link>
        </div>
        <nav className="nb_list_container">
          <ul className="nb_list">
            <li>
              <Link href="/music">MUSIC</Link>
            </li>
            <li>
              <Link href="/newreleases">NEW RELEASES</Link>
            </li>
            <li>
              <form action="/search">
                <input
                  type="text"
                  name="query"
                  placeholder="Search music"
                ></input>
                <button type="submit">search</button>
              </form>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
