import React from 'react';
import { Link } from 'react-router-dom';

import './footer.scss';

const Footer = () => (
  <div className="footer">
    <Link className="footer-menu-navlink" to="/conditionsdutilisation">Conditions générales</Link>
    <a className="footer-menu-admin" href="http://34.228.57.17/Vous-etes-le-heros/Back/Heroes_App/public/">admin</a>
    <Link className="footer-menu-navlink" to="/a-propos">A propos</Link>
  </div>
);

export default Footer;
