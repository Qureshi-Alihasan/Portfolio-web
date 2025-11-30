/* ============================================================
   CONTACT FORM + SEND TO BACKEND (STEP 5)
============================================================ */

const form = $("#contactForm");
const formStatus = $("#formStatus");

if (form) {
    form.addEventListener("submit", async e => {
        e.preventDefault();

        // Get form data
        const formData = {
            name: form.querySelector("input[name='name']").value,
            email: form.querySelector("input[name='email']").value,
            message: form.querySelector("textarea[name='message']").value
        };

        // Show sending animation
        formStatus.innerHTML = "Sending...";
        formStatus.style.color = "var(--accent)";
        formStatus.classList.add("loading");

        try {
            const res = await fetch("http://localhost:5000/send", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            // SUCCESS
            if (data.success) {
                formStatus.classList.remove("loading");
                formStatus.classList.add("success");

                formStatus.innerHTML = "✔ Message Sent Successfully!";
                formStatus.style.color = "#2ecc71";

                form.reset();

                // Clear message after 4s
                setTimeout(() => {
                    formStatus.innerHTML = "";
                    formStatus.classList.remove("success");
                }, 4000);
            } else {
                throw new Error("Email failed");
            }

        } catch (err) {
            // ERROR HANDLER
            formStatus.innerHTML = "❌ Something went wrong. Try again.";
            formStatus.style.color = "#ff4d4d";
            console.error("MAIL ERROR:", err);
        }
    });
}
