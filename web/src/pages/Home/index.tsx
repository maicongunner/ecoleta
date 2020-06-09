import React from "react";
import { Link } from "react-router-dom";

import "./styles.css";
import { FiLogIn } from "react-icons/fi";

import logo from "../../assets/logo.svg";

const Home: React.FC = () => {
  return (
    <div id="page-home">
      <div className="content">
        <header>
          <img src={logo} alt="Ecoleta" />
        </header>

        <main>
          <h1>Seu market place de coleta de resíduos</h1>
          <p>
            Ajudamos pessoas a encontrarem os pontos de colta de forma
            eficiente.
          </p>

          <Link to="/create-point">
            <span>
              <FiLogIn />
            </span>
            <strong>Cadastre um ponto de coleta</strong>
          </Link>
        </main>
      </div>
    </div>
  );
};

export default Home;
