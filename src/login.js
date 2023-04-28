import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { API } from "./source";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function loginUser(event) {
    event.preventDefault();

    const response = await fetch(`${API}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();
    console.log(data);

    if (data.message === "Successfully login") {
      localStorage.setItem("token", data.email);
      window.localStorage.setItem("token", data.data);
      navigate("/products");
    } else {
      alert("Invalid Credentials");
    }
  }
  return (
    <div className="home-bg">
      <img
        className="offer-img"
        src="https://static.vecteezy.com/system/resources/previews/013/212/816/non_2x/discount-offer-tag-icon-shopping-coupon-symbol-sale-label-tag-with-percentage-sign-black-friday-discount-banner-or-coupon-vector.jpg"
        alt=""
      />

      <div className="login">
        <div className="login-section">
          <form className="form-size " onSubmit={loginUser}>
            <div class="form-group">
              <label for="email">Email address</label>
              <br />
              <input
                required
                type="email"
                className="form-control"
                id="email"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                onChange={(event) => setEmail(event.target.value)}
              />
              <br />
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <br />
              <input
                required
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
                onChange={(event) => setPassword(event.target.value)}
              />
              <br />
            </div>
            <button type="submit" className="login-button">
              Login
            </button>
            <br />
            <div className="text-center">
              <p
                className="forgotpassword-link"
                onClick={() => navigate("/forgotpassword")}
              >
                Forget Pasword?
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
