import Image from "next/image";
const Footer = () => {
  return (
    <div className="footer">
      <div className="row footer_container">
        <div className="nb_site_title">
          <Image
            className="beead_logo"
            src="/images/beeadlogo.png"
            height={22.5}
            width={22.5}
          />
          <span className="beead_text_footer">Beead</span>
        </div>
        <span>© 2024 Beead Music</span>
      </div>
    </div>
  );
};

export default Footer;
