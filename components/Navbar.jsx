"use client";
import Link from "next/link";
import Image from "next/image";
import { IoIosSearch } from "react-icons/io";
import { SlMenu } from "react-icons/sl";
const Navbar = () => {
  function openMenu() {
    document.body.classList += " menu--open";
  }

  return (
    <div className="nb">
      <div className="nb_container">
        <div className="nb_site_title">
          <button className="nb_menu_button" onClick={openMenu}>
            <SlMenu color="white" fill="white" size={20} />
          </button>
          <Link className="beead_link" href="/">
            <Image
              className="beead_logo"
              src="/images/beeadlogo.png"
              height={40}
              width={40}
              alt={"Beaad Logo"}
            />
            <span className="beead_text">Beead</span>
          </Link>
        </div>
        <nav>
          <ul className="nb_list">
            <li className="nb_link">
              <Link href="/news">
                <span className="nb_link_text">NEWS</span>
              </Link>
            </li>
            <li className="nb_link">
              <Link href="/newreleases">
                <span className="nb_link_text">NEW RELEASES</span>
              </Link>
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
      <div className="nb_menu">
        <ul className="menu_list">
          <li>
            <Link href="/news">
              <span className="nb_link_text">NEWS</span>
            </Link>
          </li>
          <li>
            <Link href="/newreleases">
              <span className="nb_link_text">NEW RELEASES</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
