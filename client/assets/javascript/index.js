const login = async (username, password) => {
  try {
    const response = await $.ajax({
      url: "/auth/login",
      type: "POST",
      data: { username, password },
    });

    alert("Logged in successfully");

    // Go to movies page
    window.location.replace("/movies");
  } catch (error) {
    console.log(error.responseText);
    return alert(error.responseJSON.message);
  }
};

const handleLogin = async () => {
  const username = $("input#login-user-username-email").val();
  const password = $("input#login-user-password").val();

  if (username.length <= 0) {
    return alert("Please enter a username");
  }

  if (password.length <= 0) {
    return alert("Please enter a password");
  }

  await login(username, password);
};

const register = async (registerParams) => {
  try {
    const response = await $.ajax({
      url: "/auth/register",
      type: "POST",
      data: registerParams,
    });

    alert("Registered successfully");

    // Go to movies page
    window.location.replace("/movies");
  } catch (error) {
    console.log(error.responseText);
    return alert(error.responseJSON.message);
  }
};

const handleRegister = async () => {
  const firstname = $("input#register-user-firstname").val();
  const lastname = $("input#register-user-lastname").val();
  const email = $("input#register-user-email").val();
  const username = $("input#register-user-username").val();
  const password = $("input#register-user-password").val();
  const confirmPassword = $("input#register-user-confirm-password").val();
  const role = $("select#register-user-role").val();

  if (email.length <= 0) {
    return alert("Please enter an email");
  }

  if (username.length <= 0) {
    return alert("Please enter an username");
  }

  if (password.length <= 0) {
    return alert("Please enter a password");
  }

  if (confirmPassword.length <= 0) {
    return alert("Please confirm your password");
  }

  if (role.length <= 0) {
    return alert("Please choose a role");
  }

  if (password !== confirmPassword) {
    return alert("Passwords do not match");
  }

  console.log("Registering");
  await register({ firstname, lastname, email, username, password, role });
};

$(document).ready(function () {
  $("form#login-form").on("submit", function (event) {
    event.preventDefault();
    handleLogin();
  });

  $("form#register-form").on("submit", function (event) {
    event.preventDefault();
    handleRegister();
  });
});
