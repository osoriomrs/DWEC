const userWidget = document.getElementById("user-widget");
const postsWidget = document.getElementById("posts-widget");
const spinner = document.getElementById("loading-spinner");

Promise.all([
  fetch("https://jsonplaceholder.typicode.com/users/1").then(res => res.json()).catch(()=>null),
  fetch("https://jsonplaceholder.typicode.com/posts?userId=1").then(res => res.json()).catch(()=>null)
])
.then(([user, posts])=>{
  spinner.style.display = "none";

  if(user){
    userWidget.innerHTML = `
      <h5>${user.name}</h5>
      <p><strong>Email:</strong> ${user.email}</p>
      <p><strong>Compañía:</strong> ${user.company.name}</p>
      <p><strong>Teléfono:</strong> ${user.phone}</p>
    `;
  } else {
    userWidget.innerHTML = '<p class="text-danger">Error al cargar la información del usuario.</p>';
  }

  if(posts){
    const lastThree = posts.slice(-3).reverse();
    postsWidget.innerHTML = '<h5>Últimos Posts</h5>';
    lastThree.forEach(post => {
      const div = document.createElement("div");
      div.className = "mb-3";
      div.innerHTML = `<strong>${post.title}</strong><p>${post.body}</p>`;
      postsWidget.appendChild(div);
    });
  } else {
    postsWidget.innerHTML = '<p class="text-danger">Error al cargar los posts.</p>';
  }
});
