document.addEventListener('DOMContentLoaded', () => {
    const openBtn = document.getElementById('openFormBtn');
    const closeBtn = document.getElementById('closeFormBtn');
    const modal = document.getElementById('workoutModal');
    const newWorkoutForm = document.getElementById('newWorkoutForm');
    const workoutIdInput = document.getElementById('workoutId');
  
    // Open "Add" modal
    openBtn.addEventListener('click', () => {
      newWorkoutForm.reset();
      workoutIdInput.value = ''; // clear ID
      modal.style.display = 'flex';
    });
  
    // Close modal
    closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  
    // Close modal on outside click
    window.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    });
  
    // Submit workout form (create or edit)
    newWorkoutForm.addEventListener('submit', async (e) => {
      e.preventDefault();
  
      const id = workoutIdInput.value;
      const type = newWorkoutForm.type.value.trim();
      const duration = newWorkoutForm.duration.value;
      const caloriesBurned = newWorkoutForm.caloriesBurned.value;
      const date = newWorkoutForm.date.value;
  
      const url = id ? `/workouts/${id}` : '/workouts';
      const method = id ? 'PUT' : 'POST';
  
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type,
          duration,
          caloriesBurned,
          date
        })
      });
  
      if (response.ok) {
        location.reload();
      } else {
        alert('Failed to save workout.');
      }
    });
  
    // Delete workout
    document.querySelectorAll('.delete-btn').forEach((btn) => {
      btn.addEventListener('click', async (e) => {
        const id = e.target.getAttribute('data-id');
  
        const confirmDelete = confirm('Are you sure you want to delete this workout?');
        if (!confirmDelete) return;
  
        const response = await fetch(`/workouts/${id}`, {
          method: 'DELETE'
        });
  
        if (response.ok) {
          location.reload();
        } else {
          alert('Failed to delete workout.');
        }
      });
    });
  
    // Edit workout (load data into modal)
    document.querySelectorAll('.edit-btn').forEach((btn) => {
      btn.addEventListener('click', async (e) => {
        const id = e.target.getAttribute('data-id');
  
        const response = await fetch(`/workouts/${id}`);
        if (!response.ok) {
          alert('Failed to fetch workout.');
          return;
        }
  
        const data = await response.json();
  
        workoutIdInput.value = data.id;
        newWorkoutForm.type.value = data.type;
        newWorkoutForm.duration.value = data.duration;
        newWorkoutForm.caloriesBurned.value = data.caloriesBurned;
        newWorkoutForm.date.value = data.date;
  
        modal.style.display = 'flex';
      });
    });
  });
  