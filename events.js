document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById("toggle-theme");
    const body = document.body;

    // Dashboard elements
    const totalEventsElement = document.getElementById("total-events");
    const totalTeamsElement = document.getElementById("total-teams");

    // Initialize counts
    let totalEvents = 0;
    let totalTeams = 0;

    // Persist Dark Mode Preference
    if (localStorage.getItem("dark-theme") === "true") {
        body.classList.add("dark-theme");
        themeToggle.textContent = "☀️ Light Mode";
    }

    // Toggle Theme
    themeToggle.addEventListener("click", () => {
        body.classList.toggle("dark-theme");
        const isDark = body.classList.contains("dark-theme");
        themeToggle.textContent = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
        localStorage.setItem("dark-theme", isDark); // Save preference
    });

    // Form Submission Handling
    const eventForm = document.getElementById("event-form");
    const eventsContainer = document.getElementById("events");

    eventForm.addEventListener("submit", (e) => {
        e.preventDefault();

        // Simulate Loading (Add Loader)
        const loader = document.createElement("div");
        loader.className = "loader";
        eventsContainer.appendChild(loader);

        // Simulate delay for loader (e.g., data saving)
        setTimeout(() => {
            // Remove loader after delay
            loader.remove();

            // Capture form values
            const eventName = document.getElementById("event-name").value;
            const sportName = document.getElementById("sport-name").value;
            const team1 = document.getElementById("team1-name").value;
            const team2 = document.getElementById("team2-name").value;
            const venue = document.getElementById("venue").value;
            const date = document.getElementById("event-date").value;
            const description = document.getElementById("event-description").value;

            // Validation: Check if all fields are filled
            if (!eventName || !sportName || !team1 || !team2 || !venue || !date || !description) {
                alert("Please fill in all the fields.");
                return;
            }

            // Create event card
            const eventCard = document.createElement("div");
            eventCard.classList.add("event-card");
            eventCard.innerHTML = `
                <h3>${eventName}</h3>
                <p><strong>Sport:</strong> ${sportName}</p>
                <p><strong>Fixture:</strong> ${team1} vs ${team2}</p>
                <p><strong>Date:</strong> ${date}</p>
                <p><strong>Venue:</strong> ${venue}</p>
            `;

            // Add event card to the container
            eventsContainer.appendChild(eventCard);

            // Remove "No events scheduled yet." message if it exists
            const noEventsMessage = eventsContainer.querySelector("p");
            if (noEventsMessage) {
                noEventsMessage.style.display = "none";
            }

            // Scroll to the latest event
            eventCard.scrollIntoView({ behavior: "smooth" });

            // Update dashboard counts
            totalEvents++;
            totalTeams += 2; // Two teams are added per event
            totalEventsElement.textContent = totalEvents;
            totalTeamsElement.textContent = totalTeams;

            // Reset the form after submission
            eventForm.reset();
        }, 1000); // Simulated delay for loader
    });

    // Add Clear Events Button
    const clearButton = document.createElement("button");
    clearButton.textContent = "Clear All Events";
    clearButton.style.marginTop = "1rem";
    eventsContainer.after(clearButton);

    clearButton.addEventListener("click", () => {
        // Remove all event cards
        eventsContainer.innerHTML = `<p>No events scheduled yet.</p>`;
        // Reset dashboard counts
        totalEvents = 0;
        totalTeams = 0;
        totalEventsElement.textContent = totalEvents;
        totalTeamsElement.textContent = totalTeams;
    });
});
