const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#recipe-name").value.trim();
  const contents = document.querySelector("#recipe-instructions").value.trim();


  if (title && contents) {

    const response = await fetch(`/api/blogpost`, {
      method: "POST",
      body: JSON.stringify({
        title,
        contents,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/");
    } else {
      alert("Failed to create project");
    }
  }
};

document.querySelector(".new-recipe-form").addEventListener("submit", newFormHandler);
