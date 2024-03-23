"use client";

import React from "react";
import Link from "next/link";
import { useImmer } from "use-immer";

import { useCreateUserMutation } from "../../redux/backendApi";

import { useAuthErrorMessage, useValidateForm } from "../../utils/customHooks";

import { SignupBlockSuccess } from "../../components";

import cs from "../../scss/helpers.module.scss";
import s from "../signinBlock/signinBlock.module.scss";

type SignupBlockProps = {
  callbackUrl: string;
};

const initialFields = {
  fullname: "",
  email: "",
  password: "",
  passwordConfirm: "",
};

export const SignupBlock: React.FC<SignupBlockProps> = ({ callbackUrl }) => {
  const callback = `?callbackUrl=${callbackUrl}`;
  const formRef = React.useRef<HTMLFormElement>(null);

  const [createUser, { isSuccess }] = useCreateUserMutation();

  const { authMessage, setAuthError } = useAuthErrorMessage();

  const [fields, setFields] = useImmer(initialFields);

  const {
    isValidEmail,
    validateEmail,
    isValidPassLength,
    validatePassLength,
    isValidPassConfirm,
    validatePassConfirm,
  } = useValidateForm();

  // **
  const validateForm = () => {
    return [isValidEmail, isValidPassLength, isValidPassConfirm].every((el) =>
      !el ? !!el : Object.keys(el)?.[0]?.includes("data-validity-success"),
    );
  };

  // **
  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFields((o) => {
      o.email = e.target.value;
      return o;
    });

    validateEmail(e.target.value);
  };

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFields((o) => {
      o.password = e.target.value;
      return o;
    });

    validatePassLength(e.target.value);
  };

  const onPasswordConfirmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFields((o) => {
      o.passwordConfirm = e.target.value;
      return o;
    });

    validatePassConfirm(e.target.value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    const form = formRef.current;
    if (!form) return;

    const formData = new FormData(form);
    formData.delete("confirmPassword");

    const res = await createUser(formData);

    if ("error" in res) {
      if ("status" in res.error) {
        if (res.error.status === 409) {
          setAuthError("EmailRegistered");
          return;
        }
      }

      setAuthError("FetchError");
      return;
    }
  };

  return (
    <form className={s.root} onSubmit={(e) => e.preventDefault()} ref={formRef}>
      <p className={`${s.title} ${cs.title}`}>Sign-up</p>

      {isSuccess ? (
        <SignupBlockSuccess email={fields.email} />
      ) : (
        <div className={s.content}>
          <div className={`${s.inputWrapper} ${cs.inputWrapper}`} {...isValidEmail}>
            <input
              onChange={onEmailChange}
              className={`${s.input} ${cs.input}`}
              type="text"
              name="email"
              placeholder="Email"
              value={fields.email}
            />
          </div>

          <div className={`${s.inputWrapper} ${cs.inputWrapper}`} {...isValidPassLength}>
            <input
              onChange={onPasswordChange}
              className={`${s.input} ${cs.input}`}
              type="password"
              name="password"
              placeholder="Password"
              value={fields.password}
            />
          </div>

          <div className={`${s.inputWrapper} ${cs.inputWrapper}`} {...isValidPassConfirm}>
            <input
              onChange={onPasswordConfirmChange}
              className={`${s.input} ${cs.input}`}
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              value={fields.passwordConfirm}
            />
          </div>

          <div className={`${cs.btnWrapper} ${s.btnWrapper}`} {...authMessage}>
            <button
              onClick={onSubmit}
              className={`${s.btn} ${cs.btn} ${cs.btnLg}`}
              disabled={!validateForm()}
              type="submit">
              Submit
            </button>
          </div>

          <div className={s.descr}>
            <div className={s.descrWrapper}>
              <span className={s.descrText}>Already have an account?</span>
              <Link href={`/auth/signin${callback}`} className={s.descrLink} scroll={false}>
                Sign-in
              </Link>
            </div>
          </div>
        </div>
      )}
    </form>
  );
};
