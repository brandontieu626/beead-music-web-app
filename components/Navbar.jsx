"use client";
import Link from "next/link";
import { IoIosSearch } from "react-icons/io";
const Navbar = () => {
  return (
    <div className="nb">
      <div className="nb_container">
        <div className="nb_site_title">
          <Link href="/">Beead</Link>
        </div>
        <nav className="nb_list_container">
          <ul className="nb_list">
            <li className="nb_link">
              <Link href="/news">NEWS</Link>
            </li>
            <li className="nb_link">
              <Link href="/newreleases">NEW RELEASES</Link>
            </li>
            <li className="nb_search_container">
              <form action="/search" className="nb_search">
                <input
                  type="text"
                  name="query"
                  placeholder="Search music"
                  className="nb_input"
                ></input>
                <button type="submit" className="nb_search_button">
                  <IoIosSearch color="black" fill="black" size={20} />
                </button>
              </form>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
