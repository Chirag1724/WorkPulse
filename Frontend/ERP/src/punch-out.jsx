<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Punch Out</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: 'Segoe UI', sans-serif;
      background: linear-gradient(to right, #fce4ec, #f8bbd0);
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .card {
      background: white;
      padding: 40px 30px;
      border-radius: 15px;
      box-shadow: 0 8px 20px rgba(0,0,0,0.1);
      width: 320px;
      text-align: center;
    }

    .card h2 {
      margin-bottom: 25px;
      color: #c2185b;
    }

    input {
      width: 100%;
      padding: 12px;
      font-size: 16px;
      margin-bottom: 20px;
      border-radius: 8px;
      border: 1px solid #ccc;
    }

    .datetime {
      margin-bottom: 20px;
      font-size: 15px;
      color: #555;
    }

    button {
      width: 100%;
      padding: 12px;
      background: #c2185b;
      color: white;
      font-size: 16px;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      transition: background 0.3s ease;
    }

    button:hover {
      background: #880e4f;
    }

    .success {
      margin-top: 20px;
      font-size: 14px;
      color: green;
    }
  </style>
</head>
<body>

  <div class="card">
    <h2>Punch Out</h2>
    <input type="text" id="teacherName" placeholder="Enter your name" />

    <div class="datetime">
      <span id="date"></span><br>
      <span id="time"></span>
    </div>

    <button onclick="punchOut()">Punch Out</button>

    <div class="success" id="successMsg"></div>
  </div>

  <script>
    function updateDateTime() {
      const now = new Date();
      const date = now.toLocaleDateString();
      const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      document.getElementById("date").textContent = `Date: ${date}`;
      document.getElementById("time").textContent = `Time: ${time}`;
    }

    function punchOut() {
      const name = document.getElementById("teacherName").value.trim();
      if (!name) {
        alert("Please enter your name.");
        return;
      }

      updateDateTime();
      document.getElementById("successMsg").textContent = `Goodbye ${name}, your punch out has been recorded!`;
      setTimeout(() => {
        window.location.href = "punchin.html"; // Optional: Go back to punch-in or another page
      }, 2000);
    }

    updateDateTime();
    setInterval(updateDateTime, 1000);
  </script>

</body>
</html>