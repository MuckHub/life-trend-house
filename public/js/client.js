const formRequest = document.querySelector('');

formRequest.addEventListener('submit', async (event) => {
  event.preventDefault();

  let formData = new FormData(formRequest);
  let parseData = Object.fromEntries(formData);

  const response = await fetch('/:id', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(parseData),
  });
  const data = await response;
}
});
