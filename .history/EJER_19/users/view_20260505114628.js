export const loginView = () => {
  return `
  <h1>Login</h1>
  <form method="POST" action="/login">
    <input name="username" placeholder="usuario"/>
    <input name="password" type="password" placeholder="password"/>
    <button>Entrar</button>
  </form>
  `;
};