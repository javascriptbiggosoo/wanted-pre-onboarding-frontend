import { Link, useNavigate } from "react-router-dom";
import { setItem } from "../localStorage";
import { useState } from "react";

export default function Signin({ setToken }) {
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const handleSubmit = (ev) => {
    ev.preventDefault();
    const { email, password } = ev.target.elements;
    const data = {
      email: email.value,
      password: password.value,
    };
    fetchSignin(data);
  };
  const fetchSignin = async (data) => {
    const res = await fetch(
      "https://pre-onboarding-selection-task.shop/auth/signin",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const resData = await res.json();
    console.log(resData);
    // res.ok && alert("로그인 성공.");
    console.log(res);
    if (res.ok) {
      setToken(resData.access_token);
    } else {
      alert("로그인에 실패했습니다.");
    }

    setItem("access_token", resData.access_token);
  };
  const handleEmailInputChange = (ev) => {
    const { value } = ev.target;
    if (value.includes("@")) {
      setIsValidEmail(true);
    }
  };
  const handlePasswodrInputChange = (ev) => {
    const { value } = ev.target;
    if (value.length >= 8) {
      setIsValidPassword(true);
    }
    // console.log(isValidEmail, isValidPassword);
  };

  return (
    <div className="Signin">
      <h1>로그인</h1>
      <form onSubmit={handleSubmit}>
        <input
          data-testid="email-input"
          placeholder="email"
          name="email"
          type={"email"}
          required="required"
          onChange={handleEmailInputChange}
        />
        <input
          placeholder="password"
          data-testid="password-input"
          name="password"
          minLength="8"
          type="password"
          required="required"
          onChange={handlePasswodrInputChange}
        />
        <button
          disabled={!(isValidEmail && isValidPassword)}
          data-testid="signup-button"
        >
          로그인
        </button>
      </form>
      <Link to={"/signup"}>회원가입</Link>
    </div>
  );
}
