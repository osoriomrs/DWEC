document.addEventListener("DOMContentLoaded", function() {
  const commentsList = document.getElementById("comments-list");
  const commentForm = document.getElementById("comment-form");
  const message = document.getElementById("message");

  const xhr = new XMLHttpRequest();
  xhr.open("GET", "json/comments.json", true);
  xhr.onload = function() {
    if(xhr.status === 200){
      const comments = JSON.parse(xhr.responseText);
      comments.forEach(addCommentToList);
    } else {
      message.textContent = "Error al cargar los comentarios.";
      message.className = "text-danger fw-bold";
    }
  };
  xhr.send();

  function addCommentToList(comment){
    const li = document.createElement("li");
    li.className = "list-group-item";
    li.innerHTML = `<strong>${comment.author}</strong> <small class="text-muted">[${new Date(comment.timestamp).toLocaleString()}]</small><br>${comment.commentText}`;
    commentsList.appendChild(li);
  }

  commentForm.addEventListener("submit", function(e){
    e.preventDefault();
    const newComment = {
      author: document.getElementById("author").value,
      commentText: document.getElementById("commentText").value,
      timestamp: new Date().toISOString()
    };

    const submitBtn = commentForm.querySelector("button");
    submitBtn.disabled = true;
    message.textContent = "Enviando comentario...";
    message.className = "text-primary fw-bold";

    const xhrPost = new XMLHttpRequest();
    const url = "https://webhook.site/1342c671-ca15-4ba0-98d8-0b5f0379827b";
    xhrPost.open("POST", url, true);
    xhrPost.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    xhrPost.onload = function(){
      submitBtn.disabled = false;
      if(xhrPost.status >= 200 && xhrPost.status < 300){
        message.textContent = "Comentario enviado!";
        message.className = "text-success fw-bold";
        addCommentToList(newComment);
        commentForm.reset();
      } else {
        message.textContent = "Error al enviar el comentario.";
        message.className = "text-danger fw-bold";
      }
    };

    xhrPost.onerror = function(){
      submitBtn.disabled = false;
      message.textContent = "Error de conexión.";
      message.className = "text-danger fw-bold";
    };

    xhrPost.send(JSON.stringify(newComment));
  });
});
