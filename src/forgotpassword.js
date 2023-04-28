import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { API } from "./source";

export function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  async function handlePassword(event) {
    event.preventDefault();

    const response = await fetch(`${API}/user/forgotpassword`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    });

    const data = await response.json();
    console.log(data);
    if (data.status === "User Not Exists") {
      alert("User does Not Exists");
    }
    if (data.status === "verified") {
      navigate("/login");
    }
    if (data.status === "ok") {
      alert("password reset LINK sent to your Mail check your Inbox");
    }
  }
  return (
    <div className="home-bg">
         <img
        className="offer-img"
        src="https://static.vecteezy.com/system/resources/previews/013/212/816/non_2x/discount-offer-tag-icon-shopping-coupon-symbol-sale-label-tag-with-percentage-sign-black-friday-discount-banner-or-coupon-vector.jpg"
        alt=""
      />
      <div className="login ">
        <div className="login-section">
         
          <form className="form-size " onSubmit={handlePassword}>
            <div class="form-group">
              <label for="email">Enter Registered Email </label><br/>
              <input
                required
                type="email"
                class="form-control"
                id="email"
                aria-describedby="emailHelp"
                placeholder="Eg:John@abc.com"
                onChange={(event) => setEmail(event.target.value)}
              /><br/>
            </div>
            <button type="submit" className="login-button">
              submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
