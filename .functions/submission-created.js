const API_KEY = process.env.KEILA_API_KEY;

exports.handler = async event => {
  const { email, name } = JSON.parse(event.body).payload;
  const nameArr = name.split(" ");
  const first_name = nameArr.shift();
  const last_name = nameArr.join(" ");

  const body = {
    "data": {
      email,
      first_name,
      last_name,
    }
  }

  fetch("http://keila.jneidel.click/api/v1/contacts", {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }).then(res => res.json())
    .then(data => console.log("Successfully created contact in Keila"))
    .catch(error => console.error("Error creating the contact: ", error))
}
