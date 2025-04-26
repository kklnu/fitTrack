document.addEventListener('DOMContentLoaded', () => {
    const openBtn = document.getElementById('openProgressFormBtn');
    const closeBtn = document.getElementById('closeProgressFormBtn');
    const modal = document.getElementById('progressModal');
    const form = document.getElementById('progressForm');
    const progressId = document.getElementById('progressId');
  
    openBtn.addEventListener('click', () => {
      form.reset();
      progressId.value = '';
      modal.style.display = 'flex';
    });
  
    closeBtn.addEventListener('click', () => modal.style.display = 'none');
    window.addEventListener('click', (e) => e.target === modal && (modal.style.display = 'none'));
  
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const id = progressId.value;
      const method = id ? 'PUT' : 'POST';
      const url = id ? `/progress/${id}` : '/progress';
  
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          date: form.date.value,
          weight: form.weight.value,
          notes: form.notes.value
        })
      });
  
      response.ok ? location.reload() : alert('Failed to save progress log.');
    });
  
    document.querySelectorAll('.edit-progress-btn').forEach((btn) => {
      btn.addEventListener('click', async () => {
        const id = btn.getAttribute('data-id');
        const res = await fetch(`/progress/${id}`);
        const data = await res.json();
  
        progressId.value = data.id;
        form.date.value = data.date;
        form.weight.value = data.weight;
        form.notes.value = data.notes || '';
        modal.style.display = 'flex';
      });
    });
  
    document.querySelectorAll('.delete-progress-btn').forEach((btn) => {
      btn.addEventListener('click', async () => {
        const id = btn.getAttribute('data-id');
        const confirmDelete = confirm('Delete this progress log?');
        if (!confirmDelete) return;
  
        const res = await fetch(`/progress/${id}`, { method: 'DELETE' });
        res.ok ? location.reload() : alert('Failed to delete log.');
      });
    });
  });
  