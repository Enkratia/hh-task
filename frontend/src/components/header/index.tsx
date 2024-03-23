import React from "react";

import { ModalNav, Nav, OpenMenuBtn } from "../../components";

import s from "./header.module.scss";
import cs from "../../scss/helpers.module.scss";

export const Header: React.FC = () => {
  return (
    <header className={s.root}>
      <div className={`${s.container} ${cs.container} ${cs.containerWide}`}>
        <ModalNav>
          <Nav />
        </ModalNav>

        <OpenMenuBtn />
      </div>
    </header>
  );
};
