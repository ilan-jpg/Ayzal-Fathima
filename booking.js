const BACKEND_URL = "https://nail-salon-backend-production-055c.up.railway.app";

document.addEventListener("DOMContentLoaded", () => {

  const form = document.querySelector("form");
  const submitBtn = form.querySelector("button[type=submit], .confirm-btn");

  const dateInput = form.querySelector("input[type=date]");
  const timeInput = form.querySelector("input[type=time]");

  dateInput?.addEventListener("change", async () => {
    const date = dateInput.value;
    if (!date) return;
    const res = await fetch(`${BACKEND_URL}/api/available-slots?date=${date}`);
    const { booked_times } = await res.json();
    window.__bookedTimes = booked_times;
  });

  timeInput?.addEventListener("change", () => {
    const chosen = timeInput.value;
    if (window.__bookedTimes?.includes(chosen)) {
      alert("That time slot is already taken. Please choose another.");
      timeInput.value = "";
    }
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const payload = {
      full_name: form.querySelector("[placeholder='Jane Doe'], [name=full_name], #full-name")?.value?.trim(),
      phone:     form.querySelector("[placeholder*='XXX'], [name=phone], #phone")?.value?.trim(),
      service:   form.querySelector("select")?.value,
      date:      dateInput?.value,
      time:      timeInput?.value,
    };

    if (!payload.full_name || !payload.phone || !payload.service || !payload.date || !payload.time) {
      showMessage("Please fill in all fields.", "error");
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = "Booking...";

    try {
      const res = await fetch(`${BACKEND_URL}/api/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        showMessage(`Appointment booked! Reference: #${data.booking_id}`, "success");
        form.reset();
      } else {
        showMessage(data.error || "Something went wrong.", "error");
      }
    } catch (err) {
      showMessage("Could not connect. Please try again.", "error");
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Confirm Reservation";
    }
  });

  function showMessage(text, type) {
    let el = document.getElementById("booking-message");
    if (!el) {
      el = document.createElement("p");
      el.id = "booking-message";
      el.style.cssText = "margin-top:14px;padding:12px 16px;border-radius:10px;font-size:14px;font-weight:500;text-align:center;";
      form.appendChild(el);
    }
    el.textContent = text;
    el.style.background = type === "success" ? "#e6fdf5" : "#fdeaea";
    el.style.color       = type === "success" ? "#00966e" : "#cc2222";
    setTimeout(() => el.remove(), 6000);
  }
});
