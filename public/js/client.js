
const button = document.querySelector('#request');
const submitButton = document.querySelector('#submitButton');
const requestForm = document.querySelector('#requestForm');
const container = document.querySelector('.container');

if (button) {
  container.addEventListener('click', async (event) => {
    event.preventDefault();

    if (button) {
      button.classList.add('hidden');
      requestForm.classList.remove('hidden');
    } if (event.target === submitButton) {

      let phone = requestForm.phone.value;
      let email = requestForm.email.value;

      const data = { phone, email }
      console.log(data);

      const response = await fetch(`/houses/${container.id}/request`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      // const result = await response;
      console.log(response.status);
    }
  });
}
