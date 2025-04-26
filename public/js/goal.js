document.addEventListener('DOMContentLoaded', () => {
    const openBtn = document.getElementById('openGoalFormBtn');
    const closeBtn = document.getElementById('closeGoalFormBtn');
    const modal = document.getElementById('goalModal');
    const goalForm = document.getElementById('goalForm');
    const goalId = document.getElementById('goalId');
  
    // Open "Add Goal" Modal
    openBtn.addEventListener('click', () => {
      goalForm.reset();
      goalId.value = '';
      modal.style.display = 'flex';
    });
  
    // Close Modal
    closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  
    window.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    });
  
    // Handle form submit (Add or Edit)
    goalForm.addEventListener('submit', async (e) => {
      e.preventDefault();
  
      const id = goalId.value;
      const description = goalForm.description.value.trim();
      const targetDate = goalForm.targetDate.value;
  
      const url = id ? `/goals/${id}` : '/goals';
      const method = id ? 'PUT' : 'POST';
  
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description, targetDate }),
      });
  
      if (response.ok) {
        location.reload();
      } else {
        alert('Failed to save goal.');
      }
    });
  
    // Edit button logic
    document.querySelectorAll('.edit-goal-btn').forEach((btn) => {
      btn.addEventListener('click', async () => {
        const id = btn.getAttribute('data-id');
        const res = await fetch(`/goals/${id}`);
        if (!res.ok) return alert('Goal not found');
        const data = await res.json();
  
        goalId.value = data.id;
        goalForm.description.value = data.description;
        goalForm.targetDate.value = data.targetDate;
  
        modal.style.display = 'flex';
      });
    });
  
    // Delete button logic
    document.querySelectorAll('.delete-goal-btn').forEach((btn) => {
      btn.addEventListener('click', async () => {
        const id = btn.getAttribute('data-id');
        const confirmDelete = confirm('Delete this goal?');
        if (!confirmDelete) return;
  
        const res = await fetch(`/goals/${id}`, {
          method: 'DELETE',
        });
  
        if (res.ok) location.reload();
        else alert('Failed to delete goal.');
      });
    });
  
    // Mark Complete
    document.querySelectorAll('.mark-complete-btn').forEach((btn) => {
      btn.addEventListener('click', async () => {
        const id = btn.getAttribute('data-id');
        const res = await fetch(`/goals/complete/${id}`, {
          method: 'PUT',
        });
  
        if (res.ok) location.reload();
        else alert('Failed to mark as complete.');
      });
    });
  });
  