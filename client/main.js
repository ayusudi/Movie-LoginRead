const baseUrl = "http://localhost:3000"

function showPage(string) {
  let listPage = ["#loginPage", "#homePage", "#errorPage"]
  listPage.forEach(el => {
    $(el).hide()
  })
  $(string).show()

  if (string === "#loginPage") {
    $("#logOut").hide()
  } else {
    $("#logOut").show()
  }

  if (string === "#homePage") {
    fetchDataMovie()
  }
}

function fetchDataMovie() {
  $("tbody#movies").empty()
  $.ajax({
    type: "GET",
    url: `${baseUrl}/movies`,
    headers: {
      access_token: localStorage.getItem("access_token")
    }
  })
    .done(res => {
      console.log(res);
      res.forEach(el => {
        let { id, poster, title, createdAt } = el
        let stringHTML = `
        <tr>
          <th scope="row">${id}</th>
          <td>
            <img style="object-fit:cover; width:220px; height: 330px;"
             src="${poster}">
          </td>
          <td>${title}</td>
          <td>${createdAt}</td>
        </tr>
        `
        $("tbody#movies").append(stringHTML)
      })
    })
    .fail(err => {
      console.log(err);
    })
}

function postLogin(email, password) {
  $.ajax({
    type: "POST",
    url: `${baseUrl}/login`,
    data: {
      email,
      password
    }
  })
    .then(res => {
      localStorage.setItem("access_token", res.access_token)
      localStorage.setItem("email", res.user.email)
      showPage("#homePage")
    })
    .fail(err => {
      console.log(err);
      Swal.fire({
        title: 'Error!',
        text: 'Failed Login',
        icon: 'error',
        confirmButtonText: 'Try Again'
      })
    })
    .always(() => {
      $("#inputLoginEmail").val("")
      $("#inputLoginPassword").val("")
    })
}


$(function () {
  $("nav").show()
  // ! Pengecekan access_token
  if (localStorage.getItem("access_token")) {
    showPage("#homePage")
  } else {
    showPage("#loginPage")
  }

  // ! Form & Anchor 
  $("#formLogin").on("submit", (e) => {
    e.preventDefault()
    let email = $("#inputLoginEmail").val()
    let password = $("#inputLoginPassword").val()
    postLogin(email, password);
  })
  $("#logOut").on("click", (e) => {
    e.preventDefault()
    localStorage.clear()
    showPage("#loginPage")
  })
})