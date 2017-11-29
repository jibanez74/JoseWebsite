$(document).ready(() => {
  //ajax call to github
  $.ajax({
    url: "https://api.github.com/users/jibanez74/",
    data: {
      per_page: 10
    }
  }).done((repos) => {
    $.each(repos, (index, value) => {
      $("#repos").append(`
          <div class="card bg-warning text-dark">
            <div class="card-header">
              <h3 class="card-title"> ${value.name} </h3>
            </div>

            <div class="card-body">
              <p class="card-text"> ${value.description} </p>
            </div>

            <div class="card-footer">
              <a class="card-link" href="${value.html_url}" target="_blank"> Go to repo </a>
            </div>
          </div>
      `);
    }); // end of .each
  });//end of done
  
  //hide collapsable items
  $(".port-item").click(() => {
    $(".collapse").collapse("hide");
  });
});