document.addEventListener("DOMContentLoaded", () => {
  const activitiesList = document.getElementById("activities-list");
  const activitySelect = document.getElementById("activity");
  const signupForm = document.getElementById("signup-form");
  const messageDiv = document.getElementById("message");

  // Function to fetch activities from API
  async function fetchActivities() {
    try {
      const response = await fetch("/activities");
      const activities = await response.json();
  
      // Clear loading message
      activitiesList.innerHTML = "";
  
      // Limpia el select antes de llenarlo de nuevo
      activitySelect.innerHTML = '<option value="">-- Select an activity --</option>';
  
      // Populate activities list
      Object.entries(activities).forEach(([name, details]) => {
        const activityCard = document.createElement("div");
        activityCard.className = "activity-card";
  
        const spotsLeft = details.max_participants - details.participants.length;
  
        activityCard.innerHTML = `
          <h4>${name}</h4>
          <p>${details.description}</p>
          <p><strong>Schedule:</strong> ${details.schedule}</p>
          <p><strong>Availability:</strong> ${spotsLeft} spots left</p>
        `;
  
        // Sección de participantes
        const participantsSection = document.createElement("div");
        participantsSection.className = "participants-section";
        const participantsTitle = document.createElement("div");
        participantsTitle.innerHTML = "<strong>Participants:</strong>";
        participantsTitle.style.marginBottom = "6px";
        participantsSection.appendChild(participantsTitle);
  
        const participantsList = document.createElement("ul");
        participantsList.className = "participants-list no-bullets";
        if (details.participants && details.participants.length > 0) {
          details.participants.forEach(email => {
            const li = document.createElement("li");
            li.className = "participant-item";
            // Contenedor para email y botón
            const span = document.createElement("span");
            span.textContent = email;
            li.appendChild(span);
  
            // Botón de eliminar
            const deleteBtn = document.createElement("button");
            deleteBtn.className = "delete-participant-btn";
            deleteBtn.title = "Remove participant";
            deleteBtn.innerHTML = "&#128465;"; // icono de papelera
            deleteBtn.style.marginLeft = "8px";
            deleteBtn.onclick = async () => {
              if (confirm(`Remove ${email} from ${name}?`)) {
                try {
                  const response = await fetch(`/activities/${encodeURIComponent(name)}/unregister?email=${encodeURIComponent(email)}`, { method: "DELETE" });
                  const result = await response.json();
                  if (response.ok) {
                    fetchActivities();
                    messageDiv.textContent = result.message;
                    messageDiv.className = "success";
                  } else {
                    messageDiv.textContent = result.detail || "Error removing participant";
                    messageDiv.className = "error";
                  }
                  messageDiv.classList.remove("hidden");
                  setTimeout(() => messageDiv.classList.add("hidden"), 5000);
                } catch (error) {
                  messageDiv.textContent = "Failed to remove participant.";
                  messageDiv.className = "error";
                  messageDiv.classList.remove("hidden");
                }
              }
            };
            li.appendChild(deleteBtn);
            participantsList.appendChild(li);
          });
        } else {
          const li = document.createElement("li");
          li.textContent = "No participants yet.";
          participantsList.appendChild(li);
        }
        participantsSection.appendChild(participantsList);
        activityCard.appendChild(participantsSection);
  
        activitiesList.appendChild(activityCard);
  
        // Add option to select dropdown
        const option = document.createElement("option");
        option.value = name;
        option.textContent = name;
        activitySelect.appendChild(option);
      });
    } catch (error) {
      activitiesList.innerHTML = "<p>Failed to load activities. Please try again later.</p>";
      console.error("Error fetching activities:", error);
    }
  }
  
  // Handle form submission
  signupForm.addEventListener("submit", async (event) => {
    event.preventDefault();
  
    const email = document.getElementById("email").value;
    const activity = document.getElementById("activity").value;
  
    try {
      const response = await fetch(
        `/activities/${encodeURIComponent(activity)}/signup?email=${encodeURIComponent(email)}`,
        {
          method: "POST",
        }
      );
  
      const result = await response.json();
  
      if (response.ok) {
        messageDiv.textContent = result.message;
        messageDiv.className = "success";
        signupForm.reset();
        // Refresca la lista de actividades para mostrar el nuevo participante
        fetchActivities();
      } else {
        messageDiv.textContent = result.detail || "An error occurred";
        messageDiv.className = "error";
      }
  
      messageDiv.classList.remove("hidden");
  
      // Hide message after 5 seconds
      setTimeout(() => {
        messageDiv.classList.add("hidden");
      }, 5000);
    } catch (error) {
      messageDiv.textContent = "Failed to sign up. Please try again.";
      messageDiv.className = "error";
      messageDiv.classList.remove("hidden");
      console.error("Error signing up:", error);
    }
  });
  
  // Initialize app
  fetchActivities();
});
  async function fetchActivities() {
    try {
      const response = await fetch("/activities");
      const activities = await response.json();

      // Clear loading message
      activitiesList.innerHTML = "";

      // Limpia el select antes de llenarlo de nuevo
      activitySelect.innerHTML = '<option value="">-- Select an activity --</option>';

      // Populate activities list
      Object.entries(activities).forEach(([name, details]) => {
        const activityCard = document.createElement("div");
        activityCard.className = "activity-card";

        const spotsLeft = details.max_participants - details.participants.length;

        activityCard.innerHTML = `
          <h4>${name}</h4>
          <p>${details.description}</p>
          <p><strong>Schedule:</strong> ${details.schedule}</p>
          <p><strong>Availability:</strong> ${spotsLeft} spots left</p>
        `;

        // Sección de participantes
        const participantsSection = document.createElement("div");
        participantsSection.className = "participants-section";
        const participantsTitle = document.createElement("div");
        participantsTitle.innerHTML = "<strong>Participants:</strong>";
        participantsTitle.style.marginBottom = "6px";
        participantsSection.appendChild(participantsTitle);

        const participantsList = document.createElement("ul");
        participantsList.className = "participants-list no-bullets";
        if (details.participants && details.participants.length > 0) {
          details.participants.forEach(email => {
            const li = document.createElement("li");
            li.className = "participant-item";
            // Contenedor para email y botón
            const span = document.createElement("span");
            span.textContent = email;
            li.appendChild(span);

            // Botón de eliminar
            const deleteBtn = document.createElement("button");
            deleteBtn.className = "delete-participant-btn";
            deleteBtn.title = "Remove participant";
            deleteBtn.innerHTML = "&#128465;"; // icono de papelera
            deleteBtn.style.marginLeft = "8px";
            deleteBtn.onclick = async () => {
              if (confirm(`Remove ${email} from ${name}?`)) {
                try {
                  const response = await fetch(`/activities/${encodeURIComponent(name)}/unregister?email=${encodeURIComponent(email)}`, { method: "DELETE" });
                  const result = await response.json();
                  if (response.ok) {
                    fetchActivities();
                    messageDiv.textContent = result.message;
                    messageDiv.className = "success";
                  } else {
                    messageDiv.textContent = result.detail || "Error removing participant";
                    messageDiv.className = "error";
                  }
                  messageDiv.classList.remove("hidden");
                  setTimeout(() => messageDiv.classList.add("hidden"), 5000);
                } catch (error) {
                  messageDiv.textContent = "Failed to remove participant.";
                  messageDiv.className = "error";
                  messageDiv.classList.remove("hidden");
                }
              }
            };
            li.appendChild(deleteBtn);
            participantsList.appendChild(li);
          });
        } else {
          const li = document.createElement("li");
          li.textContent = "No participants yet.";
          participantsList.appendChild(li);
        }
        participantsSection.appendChild(participantsList);
        activityCard.appendChild(participantsSection);

        activitiesList.appendChild(activityCard);

        // Add option to select dropdown
        const option = document.createElement("option");
        option.value = name;
        option.textContent = name;
        activitySelect.appendChild(option);
      });
    } catch (error) {
      activitiesList.innerHTML = "<p>Failed to load activities. Please try again later.</p>";
      console.error("Error fetching activities:", error);
    }
  }

  // Handle form submission
  signupForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const activity = document.getElementById("activity").value;

    try {
      const response = await fetch(
        `/activities/${encodeURIComponent(activity)}/signup?email=${encodeURIComponent(email)}`,
        {
          method: "POST",
        }
      );

      const result = await response.json();

      if (response.ok) {
        messageDiv.textContent = result.message;
        messageDiv.className = "success";
        signupForm.reset();
        // Refresca la lista de actividades para mostrar el nuevo participante
        fetchActivities();
      } else {
        messageDiv.textContent = result.detail || "An error occurred";
        messageDiv.className = "error";
      }

      messageDiv.classList.remove("hidden");

      // Hide message after 5 seconds
      setTimeout(() => {
        messageDiv.classList.add("hidden");
      }, 5000);
    } catch (error) {
      messageDiv.textContent = "Failed to sign up. Please try again.";
      messageDiv.className = "error";
      messageDiv.classList.remove("hidden");
      console.error("Error signing up:", error);
    }
  });

  // Initialize app
  fetchActivities();
});
