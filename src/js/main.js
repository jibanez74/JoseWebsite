$(document).ready(() => {
  //hide collapsable items
  $(".port-item").click(() => {
    $(".collapse").collapse("hide");
  });

  ajax_form();

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
});

function ajax_form () {
  $("#myForm").submit(() => {
    $.ajax({
      url: 'contact.php',
      type: 'POST',
      data: 'name='+$("#name").val()+'&email='+$("#email").val()+'&message='+$("#message").val(),
      success: () => {
        $("#name, #email, #message").val("");
        $("#alert-good").html(`
          <div class="alert alert-success text-center">
            <h3> Your message was sent successfully!  I will get back to you as soon as possible. </h4>
          </div>
        `);
      }
    });
    setTimeout(() => {
      $("#alert-good").fadeOut("slow");
    }, 7000);
    return false;
  });
}
