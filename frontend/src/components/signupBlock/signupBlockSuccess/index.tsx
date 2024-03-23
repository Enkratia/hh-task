import React from "react";
import Link from "next/link";

import cs from "../../../scss/helpers.module.scss";
import s from "./signupBlockSuccess.module.scss";
import Trophy from "../../../../public/img/trophy.svg";

type SignupBlockSuccessProps = {
  email: string;
};

export const SignupBlockSuccess: React.FC<SignupBlockSuccessProps> = ({ email }) => {
  return (
    <div className={s.root}>
      <Trophy aria-hidden="true" />

      <div className={s.content}>
        <div className={s.main}>
          <p className={s.descr}>Congratulations, your account has been successfully created.</p>
        </div>

        <Link href="/auth/signin" className={`${cs.btn}`}>
          Sign-in
        </Link>
      </div>
    </div>
  );
};
