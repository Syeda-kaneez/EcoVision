function toggleMenu() {
  document.getElementById("nav").classList.toggle("active");
}

// Toggle Menu (existing)
function toggleMenu() {
  document.getElementById("nav").classList.toggle("active");
}

// Alert Data (sample, will auto-generate)
const alerts = [
  { id: 1, location: "MG Road, Hyderabad", camera: "CAM-101", status: "pending", time: "10:45 AM" },
  { id: 2, location: "Charminar, Hyderabad", camera: "CAM-205", status: "process", time: "11:00 AM" },
  { id: 3, location: "Banjara Hills, Hyderabad", camera: "CAM-322", status: "resolved", time: "11:15 AM" }
];

function renderAlerts() {
  const container = document.getElementById("alerts-container");
  container.innerHTML = "";

  const search = document.getElementById("search").value.toLowerCase();
  const filter = document.getElementById("filter-status").value;

  let total = 0, pending = 0, process = 0, resolved = 0;

  alerts.forEach(alert => {
    if ((filter === "all" || alert.status === filter) &&
        (alert.location.toLowerCase().includes(search) || alert.camera.toLowerCase().includes(search))) {
      
      total++;
      if (alert.status === "pending") pending++;
      if (alert.status === "process") process++;
      if (alert.status === "resolved") resolved++;

      const card = document.createElement("div");
      card.className = `alert-card ${alert.status}`;
      card.innerHTML = `
        <h4>🚨 Alert #${alert.id}</h4>
        <p class="alert-meta"><strong>Location:</strong> ${alert.location}</p>
        <p class="alert-meta"><strong>Camera:</strong> ${alert.camera}</p>
        <p class="alert-meta"><strong>Status:</strong> <span class="status ${alert.status}">${alert.status}</span></p>
        <p class="alert-meta"><strong>Time:</strong> ${alert.time}</p>
      `;
      container.appendChild(card);
    }
  });

  // Update counters
  document.getElementById("total-alerts").innerText = alerts.length;
  document.getElementById("pending-count").innerText = pending;
  document.getElementById("process-count").innerText = process;
  document.getElementById("resolved-count").innerText = resolved;
}

document.getElementById("search").addEventListener("input", renderAlerts);
document.getElementById("filter-status").addEventListener("change", renderAlerts);

// Initial render
renderAlerts();

// Simulate real-time alert (every 10s)
setInterval(() => {
  const statuses = ["pending", "process", "resolved"];
  const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
  const newAlert = {
    id: alerts.length + 1,
    location: "New Area " + (alerts.length + 1),
    camera: "CAM-" + (100 + alerts.length),
    status: randomStatus,
    time: new Date().toLocaleTimeString()
  };
  alerts.unshift(newAlert); // add to top
  renderAlerts();
}, 10000);

// Contact form submission with EmailJS
document.getElementById("contact-form").addEventListener("submit", function(e) {
  e.preventDefault();

  const status = document.getElementById("form-status");
  status.innerText = "Sending...";

  emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
    from_name: document.getElementById("name").value,
    from_email: document.getElementById("email").value,
    subject: document.getElementById("subject").value,
    message: document.getElementById("message").value
  }, "YOUR_PUBLIC_KEY")
  .then(() => {
    status.innerText = "✅ Message sent successfully!";
    document.getElementById("contact-form").reset();
  })
  .catch(() => {
    status.innerText = "❌ Failed to send. Try again later.";
  });
});

// Get start 
document.getElementById("signinBtn").addEventListener("click", function () {
  window.location.href = "SignUp_LogIn.html"; // redirects to signin.html
});
