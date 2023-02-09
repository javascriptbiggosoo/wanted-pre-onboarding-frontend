import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Signup({ token }) {
  const navigate = useNavigate();
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const handleSubmit = (ev) => {
    ev.preventDefault();
    const { email, password } = ev.target.elements;
    const data = {
      email: email.value,
      password: password.value,
    };
    fetchSignup(data);
  };
  const fetchSignup = async (data) => {
    const res = await fetch(
      "https://pre-onboarding-selection-task.shop/auth/signup",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    console.log(res);

    if (res.ok) {
      // window.location.href = "/signin";
      navigate("/signin");
    } else {
      alert("회원가입에 실패했습니다.");
    }
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
    console.log(isValidEmail, isValidPassword);
  };

  return (
    <div className="Signup">
      <h1>회원가입</h1>
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
          회원가입
        </button>
      </form>
    </div>
  );
}
