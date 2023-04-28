import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { API } from "./source";

export function Register() {
  const navigate = useNavigate();

  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function registerUser(event) {
    event.preventDefault();

    const response = await fetch(`${API}/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstname,
        lastname,
        email,
        password,
      }),
    });

    const data = await response.json();

    if (data.message === "Username Already Exists") {
      alert("User already exist try Another mail id");
    }

    if (data.message === "Password strength") {
      alert(
        "Password must have 1 caps 1 small letter , number, special charecter and should be min 8 characters"
      );
    }

    if (data.status === "ok") {
      alert("Successfully Registered");
      navigate("/login");
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
        <div>
          <form onSubmit={registerUser}>
            <div class="form-group">
              <label for="firstname">First Name</label>
              <br />
              <input
                className="input-width"
                required
                type="text"
                class="form-control"
                id="firstname"
                placeholder="Enter first name"
                onChange={(event) => setFirstName(event.target.value)}
              />
              <br />
            </div>
            <div class="form-group">
              <label for="lastname">Last Name</label>
              <br />
              <input
                required
                type="text"
                class="form-control"
                id="lastname"
                placeholder="Enter last name"
                onChange={(event) => setLastName(event.target.value)}
              />
              <br />
            </div>
            <div class="form-group">
              <label for="email">Email address</label>
              <br />
              <input
                required
                type="email"
                class="form-control"
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
                class="form-control"
                id="password"
                placeholder="Password"
                onChange={(event) => setPassword(event.target.value)}
              />
              <br />
            </div>
            <button type="submit" className="login-button">
              Register
            </button><br/>
            <span>Already have an account?</span>
            <button className="login-button" onClick={() => navigate("/login")}>
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
