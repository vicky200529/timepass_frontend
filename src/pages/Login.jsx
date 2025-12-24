import { useState } from "react";

function Login() {
  const [form, setForm] = useState({
    gmail: "",
    password: ""
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://timepass-backend-ihwp.onrender.com/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();
      console.log(data);

      // Save token if login successful
      if (res.ok) {
        localStorage.setItem("token", data.token);
        alert("Login successful");
      } else {
        alert(data.message);
      }

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="gmail"
          value={form.gmail}
          onChange={(e) =>
            setForm({ ...form, gmail: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="password"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button type="submit">LOGIN</button>
      </form>
    </div>
  );
}

export default Login;
