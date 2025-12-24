import { useState } from "react";

function Dashboard() {
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setMsg("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("https://timepass-backend-ihwp.onrender.com/api/dashboard", {
    
      method: "POST",
    headers: {
  Authorization: `Bearer ${token}`
},

      body: formData
    });

    const data = await res.json();
    setMsg(data.message);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Dashboard – Upload File</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <br /><br />
        <button type="submit">Upload</button>
      </form>

      {msg && <p>{msg}</p>}
    </div>
  );
}

export default Dashboard;
