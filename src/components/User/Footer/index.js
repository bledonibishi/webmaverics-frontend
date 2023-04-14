import React from "react";
import AppleLogo from "../../../assets/images/Gjirafa50-AAR.png";
import LenovoLogo from "../../../assets/images/Lenovo.png";
import MSILogo from "../../../assets/images/MSI.png";
import SamsungLogo from "../../../assets/images/Samsung.png";
import SteelSLogo from "../../../assets/images/Steelseries.png";
import ZowieLogo from "../../../assets/images/Zowie.png";
import Logo from "../../../assets/images/logo.svg";
import VisaLogo from "../../../assets/images/visa.png";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceAngry } from "@fortawesome/free-solid-svg-icons";

function index() {
  return (
    <div className="footer">
      <div style={{ background: "#E4E4E4" }}>
        <div className="container d-flex justify-content-center">
          <div className="footer-logos__div">
            <img src={AppleLogo} alt="apple logo" />
          </div>
          <div className="footer-logos__div">
            <img src={LenovoLogo} alt="apple logo" />
          </div>
          <div className="footer-logos__div">
            <img src={MSILogo} alt="apple logo" />
          </div>
          <div className="footer-logos__div">
            <img src={SamsungLogo} alt="apple logo" />
          </div>
          <div className="footer-logos__div">
            <img src={SteelSLogo} alt="apple logo" />
          </div>
          <div className="footer-logos__div">
            <img src={ZowieLogo} alt="apple logo" />
          </div>
        </div>
      </div>

      <div className="bg-light" style={{ padding: "56px 0px" }}>
        <div className="container d-flex justify-content-right ">
          <div className="logo-footer__div col-3">
            <img src={Logo} alt="Logo" />
          </div>
          <div className="col-3 text-end">
            <h6>Llogaria</h6>
            <ul className=" footer-list">
              <li>
                <a href="#">Kyqu</a>
              </li>
              <li>
                <a href="#">Regjistrohu</a>
              </li>
              <li>
                <a href="#">Keni harruar fjalekalimin?</a>
              </li>
            </ul>
          </div>
          <div className="col-3 text-end">
            <h6>Kujdesi ndaj klienteve</h6>
            <ul className=" footer-list">
              <li>
                <a href="">Per gjirafa50</a>
              </li>
              <li>
                <a href="">Pagesa</a>
              </li>
              <li>
                <a href="">Qeshtje teknike</a>
              </li>
              <li>
                <a href="">Transporti</a>
              </li>
              <li>
                <a href="">Produktet/Porosite</a>
              </li>
              <li>
                <a href="">GjirafaFLEX</a>
              </li>
            </ul>
          </div>
          <div className="col-3 text-end">
            <h6>Kujdesi ndaj klienteve</h6>
            <ul className=" footer-list">
              <li>
                <a href="">Per gjirafa50</a>
              </li>
              <li>
                <a href="">Pagesa</a>
              </li>
              <li>
                <a href="">Qeshtje teknike</a>
              </li>
              <li>
                <a href="">Transporti</a>
              </li>
              <li>
                <a href="">Produktet/Porosite</a>
              </li>
              <li>
                <a href="">GjirafaFLEX</a>
              </li>
            </ul>
          </div>
        </div>
        <hr
          className="container"
          style={{ marginTop: "35px", marginBottom: "35px" }}
        />

        <div className="container d-flex ">
          <div className="col-7">
            <div className="d-flex align-items-center">
              <small className="col-3">Pagesat behen permes: </small>
              <div className="paymentMethods-footer__div">
                <img src={VisaLogo} alt="visalogo" />
              </div>
            </div>
          </div>
          <div className="col-5">
            <div className="d-flex justify-content-center align-items-center">
              <small className="col-4">Rri i lidhur me gjirafa50</small>
              <div className="d-flex social-icons">
                <FontAwesomeIcon icon={faFaceAngry} />
                <FontAwesomeIcon icon={faFaceAngry} />
                <FontAwesomeIcon icon={faFaceAngry} />
              </div>
            </div>
          </div>
        </div>
        <hr
          className="container"
          style={{ marginTop: "35px", marginBottom: "35px" }}
        />
        <div className="container d-flex justify-content-center">
          <div>
            <small>
              Mundesuar nga webMaverics,Inc - Te gjitha te drejtat te rezervuara
            </small>
            <ul className="d-flex footer-list">
              <li>
                <a href="">Termet dhe kushtet</a>
              </li>
              <li>
                <a href="">Politika e privatesise</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default index;
