$(document).ready(() => {
  //hide collapsable items
  $(".port-item").click(() => {
    $(".collapse").collapse("hide");
  });

  //ajax call to github api
  $.ajax({
    url: 'https://api.github.com/users/jibanez74/repos',
    data: {
      per_page: 8,
      client_id: "a4336bda98bbeddcdb4d",
      client_secret: "d0231a3f852d05c57d1059f98076958a52a13fb9",
    }
  }).done((repos) => {
    $.each(repos, (index, value) => {
      $("#repos").append(`
          <div class="card bg-light text-dark">
            <div class="card-body py-3">
              <h3 class="card-title">
                ${value.name}
              </h3>

              <p class="card-text">
                ${value.description}
              </p>

              <a href="${value.html_url}" class="card-link" target="_blank">
                Go to repo
              </a>
            </div>
          </div>
      `)
    });
  });

  //ajax form
  $("#myForm").submit((e) => {
    let valid_name;
    let valid_email;
    let valid_msg;
    let filter_email = $("#email").val();

    if ($("#name").val().length > 25 || $("#name").val().length < 2) {
      $("#alert-name").slideDown();
      valid_name = false;
    } else {
      valid_name= true;
    }

    if (/^\w+([\.-]?\ w+)*@\w+([\.-]?\ w+)*(\.\w{2,3})+$/.test(filter_email)) {
      valid_email = true;
    } else {
      $("#alert-email").slideDown();
      valid_email = false;
    }

    if ($("#message").val().length < 1) {
      $("#alert-msg").slideDown();
      valid_msg = false;
    } else {
      valid_msg = true;
    }

    if (valid_name === true && valid_email === true && valid_msg === true) {
      $.ajax({
        url: "contact.php",
        type: "POST",
        data: "name="+$('#name').val()+"&email="+$('#email').val()+"&message="+$('#message').val(),
        success: () => {
          $("#name, #email, #message").val("");
          $("#alert-good").slideDown();
        }
      }).done(() => {
        setTimeout(() => {
          $("#alert-good").slideUp();
        }, 10000);
      });
    } else {
      setTimeout(() => {
        $(".alert-danger").slideUp();
      }, 10000);
    }

    e.preventDefault();
  });
});