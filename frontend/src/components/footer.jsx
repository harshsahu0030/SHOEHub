import { Link, useNavigate } from "react-router-dom";
import LogoDark from "../assets/logo_dark.png";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="footer_container">
      <div className="footer_wrapper">
        <div className="footer_top">
          <div className="footer_top_left">
            <img src={LogoDark} alt="logo" onClick={() => navigate("/")} />
            <p>
              Uplinq Corporation <br />
              7014 East Camelback Road <br /> Scottsdale AZ, 85251
            </p>
          </div>
          <div className="footer_top_right">
            <ul>
              <h4>Quick Links</h4>
              <li>
                <Link to={"/"}>Home</Link>
              </li>
              <li>
                <Link to={"/products/newandfeatured"}>New & featured</Link>
              </li>
              <li>
                <Link to={"/products/men"}>Men</Link>
              </li>
              <li>
                <Link to={"/peoducts/women"}>Women</Link>
              </li>
              <li>
                <Link to={"/products/unisex"}>Unisex</Link>
              </li>
              <li>
                <Link to={"/products/sale"}>Sale</Link>
              </li>
            </ul>
            <ul>
              <h4>Company</h4>
              <li>
                <Link to={"/"}>FAQs</Link>
              </li>
              <li>
                <Link to={"/"}>Careers</Link>
              </li>
              <li>
                <Link to={"/"}>Our Story</Link>
              </li>
              <li>
                <Link to={"/"}>Security</Link>
              </li>
              <li>
                <Link to={"/"}>Press</Link>
              </li>
              <li>
                <Link to={"/"}>Contact</Link>
              </li>
            </ul>
            <ul>
              <h4>Follow Us</h4>
              <li>
                <Link to={"/"}>Facebook</Link>
              </li>
              <li>
                <Link to={"/"}>Instagram</Link>
              </li>
              <li>
                <Link to={"/"}>Twitter</Link>
              </li>
              <li>
                <Link to={"/"}>LinkedIn</Link>
              </li>
              <li>
                <Link to={"/"}>Whasapp</Link>
              </li>
              <li>
                <Link to={"/"}>Gmail</Link>
              </li>
            </ul>
          </div>
        </div>
        <hr />
        <div className="footer_bottom">
          <p>© 2024 ShoeHub Inc. All rights reserved.</p>
          <p>Developed By Harsh</p>
          <ul>
            <li>terms</li>
            <li>privacy</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
