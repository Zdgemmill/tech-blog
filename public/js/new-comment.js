const newCommentFormHandler = async (event) => {
  event.preventDefault();
  //get the recipe id from the URL
  const recipe_id = parseInt(window.location.pathname.split("/").pop());

  //get the content of the new comment from input field
  const content = document.querySelector("#content-new-comment").value.trim();

  if (content) {
    //send post request to create a new comment with the input values as JSON data
    const response = await fetch(`/api/comments`, {
      method: "POST",
      body: JSON.stringify({ content, recipe_id }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.reload(); //if successful reload the same page
    } else {
      console.log("Response status:", response.status);
      console.log("Response text:", await response.text());
      alert("Failed to create a comment."); //if unsuccessful give error
    }
  }
};

//event listeners
const newCommentForm = document.querySelector(".new-comment-form");
if (newCommentForm) {
  newCommentForm.addEventListener("submit", newCommentFormHandler);
}
