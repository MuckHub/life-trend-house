const button = document.querySelector('#request');
const submitButton = document.querySelector('#submitButton');
const deleteButton = document.querySelector('#delete-btn');
const requestForm = document.querySelector('#requestForm');
const editButton = document.querySelector('#house-edit');
const container = document.querySelector('.container');

if (button) {
  container.addEventListener('click', async (event) => {
    if (event.target === button) {
      event.preventDefault();
      button.classList.add('hidden');
      requestForm.classList.remove('hidden');
    }
    if (event.target === submitButton) {
      const phone = requestForm.phone.value;
      const email = requestForm.email.value;

      const data = { phone, email };

      const response = await fetch(`/houses/${container.id}/request`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
    }
    if (event.target === deleteButton) {
      event.preventDefault();
      const response = await fetch(`/houses/${container.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status) {
        event.preventDefault();
        console.log(response.status);
        location.assign('/houses');
      }
    }
  });
} else if (false) {
  editButton.addEventListener('click', async (event) => {
    event.preventDefault();
    console.log('clicked');
  });
}
