const newFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#name').value.trim();
  const userName = document.querySelector('#userName').value.trim();
  const email = document.querySelector('#email').value.trim();

  const password = document.querySelector('#password').value.trim();
  const reenteredPassword = document
    .querySelector('#reEnterPassword')
    .value.trim();

  if (password.length < 8) {
    alert('Password should be at least 8 characters long');
    return;
  }

  if (password !== reenteredPassword) {
    alert('Passwords must match');
    return;
  }

  // ...rest of your code...  let fostering;
  if (document.querySelector('#fosteringYes').checked) {
    fostering = document.querySelector('#fosteringYes').value;
  } else if (document.querySelector('#fosteringNo').checked) {
    fostering = document.querySelector('#fosteringNo').value;
  } else {
    alert(
      'Please select whether you are interested in fostering a senior dog.'
    );
    return;
  }
  const hasPets = parseInt(document.querySelector('#hasPets').value, 10);
  if (isNaN(hasPets)) {
    alert('Please select a pet type.');
    return;
  }
  let fencedYard = document.querySelector('input[name="fencedYard"]:checked');
  fencedYard = fencedYard ? fencedYard.value : null;
  let hasKids = document.querySelector('input[name="hasKids"]:checked');
  hasKids = hasKids ? hasKids.value : null;
  let previousExp = parseInt(document.querySelector('#previousExp').value, 10);
  if (isNaN(previousExp) || previousExp < 1 || previousExp > 4) {
    alert('Please select a valid experience level.');
    return;
  }
  const anythingElse = document.querySelector('#anythingElse').value.trim();
  const why = document.querySelector('#why').value.trim();

  // Log form data
  console.log(`name: ${name}`);
  console.log(`userName: ${userName}`);
  console.log(`email: ${email}`);
  console.log(`password: ${password}`);
  console.log(`fostering: ${fostering}`);
  console.log(`hasPets: ${hasPets}`);
  console.log(`fencedYard: ${fencedYard}`);
  console.log(`hasKids: ${hasKids}`);
  console.log(`previousExp: ${previousExp}`);
  console.log(`anythingElse: ${anythingElse}`);
  console.log(`why: ${why}`);

  if (
    name &&
    userName &&
    email &&
    password &&
    fostering !== undefined &&
    hasPets !== undefined &&
    fencedYard !== undefined &&
    hasKids !== undefined &&
    previousExp &&
    anythingElse &&
    why
  ) {
    fetch(`api/userRoutes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        userName,
        email,
        password,
        fostering,
        hasPets,
        hasKids,
        fencedYard,
        previousExp,
        anythingElse,
        why,
      }),
    })
      .then((response) => response.text())
      .then((data) => {
        if (data) {
          let jsonData = JSON.parse(data);
          console.log(jsonData);
          if (jsonData.ok) {
            document.location.replace('/profile');
          } else {
            alert('Failed to create user');
          }
        } else {
          console.log('Empty response');
        }
      })
      .catch((error) => console.error('Error:', error));
  }
};
