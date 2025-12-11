* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
}

body {
  font-family: Arial, sans-serif;
  line-height: 1.6;
  color: #333;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f5f5f5;
}

header {
  text-align: center;
  padding: 20px 0;
  margin-bottom: 30px;
  background-color: #1a237e;
  color: white;
  border-radius: 5px;
}

header h1 {
  margin-bottom: 10px;
}

main {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  justify-content: center;
}

@media (min-width: 768px) {
  main {
    grid-template-columns: 2fr 1fr;
  }
}

section {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
}

section h3 {
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ddd;
  color: #1a237e;
}

.activity-card {
  margin-bottom: 15px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.activity-card h4 {
  margin-bottom: 10px;
  color: #0066cc;
}

.activity-card p {
  margin-bottom: 8px;
}

/* Estilos para la sección de participantes */
.participants-section {
  margin-top: 12px;
  padding-top: 10px;
  border-top: 1px solid #e0e0e0;
}

.participants-section h5 {
  margin-bottom: 8px;
  font-size: 15px;
  color: #3949ab;
  font-weight: bold;
}

.participants-list {
  list-style-type: disc;
  padding-left: 22px;
  margin-bottom: 0;
}

.participants-list li {
  margin-bottom: 4px;
  font-size: 15px;
  color: #333;
  transition: background 0.2s;
  border-radius: 3px;
  padding: 2px 4px;
}

.participants-list li:hover {
  background: #f1f3fa;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

button {
  background-color: #1a237e;
  color: white;
  border: none;
  padding: 10px 15px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s;
}

button:hover {
  background-color: #3949ab;
}

.message {
  margin-top: 20px;
  padding: 10px;
  border-radius: 4px;
}

.success {
  background-color: #e8f5e9;
  color: #2e7d32;
  border: 1px solid #a5d6a7;
}

.error {
  background-color: #ffebee;
  color: #c62828;
  border: 1px solid #ef9a9a;
}

.info {
  background-color: #d1ecf1;
  color: #0c5460;
  border: 1px solid #bee5eb;
}

.hidden {
  display: none;
}

footer {
  text-align: center;
  margin-top: 30px;
  padding: 20px;
  color: #666;
}

/* Código JavaScript para manejar actividades y participantes */

// Ejemplo de estructura de actividades con participantes
const activities = [
  {
    id: 1,
    title: "Yoga en el parque",
    description: "Clase de yoga para todos los niveles.",
    date: "2024-06-15",
    participants: [
      { name: "Ana", email: "ana@email.com" },
      { name: "Luis", email: "luis@email.com" }
    ]
  },
  // ...otras actividades...
];

function renderActivities() {
  const activitiesContainer = document.getElementById('activities');
  activitiesContainer.innerHTML = '';
  activities.forEach(activity => {
    const card = document.createElement('div');
    card.className = 'activity-card';
    card.innerHTML = `
      <h4>${activity.title}</h4>
      <p>${activity.description}</p>
      <p><strong>Fecha:</strong> ${new Date(activity.date).toLocaleDateString()}</p>
    `;

    // Sección de participantes (solo emails, como en la imagen)
    const participantsSection = document.createElement('div');
    participantsSection.className = 'participants-section';

    const participantsTitle = document.createElement('div');
    participantsTitle.innerHTML = '<strong>Participants:</strong>';
    participantsTitle.style.marginBottom = '6px';
    participantsSection.appendChild(participantsTitle);

    const participantsList = document.createElement('ul');
    participantsList.className = 'participants-list';
    if (activity.participants && activity.participants.length > 0) {
      activity.participants.forEach(participant => {
        const li = document.createElement('li');
        // Si el participante es string (solo email) o es objeto
        li.textContent = participant.email ? participant.email : participant;
        participantsList.appendChild(li);
      });
    } else {
      const li = document.createElement('li');
      li.textContent = 'No participants yet.';
      participantsList.appendChild(li);
    }
    participantsSection.appendChild(participantsList);
    card.appendChild(participantsSection);

    activitiesContainer.appendChild(card);
  });
}

// Llamar a la función para renderizar actividades al cargar la página
document.addEventListener('DOMContentLoaded', renderActivities);