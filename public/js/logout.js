function logout() {
    fetch("/logout", {
        method: "post",
        headers: { "Content-Type": "application/json" }
    })
        .then(function (response) {
            if (response.ok) {
                document.location.replace("/");
            } else {
                alert("Logout failed. Please try again.");
            }
        })
        .catch(err => console.log(err));
}

document.querySelector("#logout").addEventListener("click", logout);