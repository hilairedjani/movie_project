const editProfile = async (profileParams) => {
  try {
    const response = await $.ajax({
      url: "/users/profile",
      type: "PATCH",
      data: profileParams,
    });

    alert("Profile updated successfully");

    // Refresh profile page
    window.location.replace("/users/profile");
  } catch (error) {
    console.log(error.responseText);
    return alert(error.responseJSON.message);
  }
};

const handleEditProfile = async () => {
  const firstname = $("input#user-firstname").val();
  const lastname = $("input#user-lastname").val();
  const email = $("input#user-email").val();
  const username = $("input#user-username").val();
  const role = $("select#user-role").val();

  if (username.length <= 0) {
    return alert("Please enter a username");
  }

  if (email.length <= 0) {
    return alert("Please enter a email");
  }

  if (role.length <= 0) {
    return alert("Please choose a role");
  }

  await editProfile({ firstname, lastname, email, username, role });
};

$(document).ready(function () {
  $("form#edit-profile-form").on("submit", function (event) {
    event.preventDefault();
    handleEditProfile();
  });
});
