export function NavBar({ children }) {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  );
}
export function ErrorMessage({ message }) {
  return (
    <p className="error">
      <span>🥺</span>
      {message}
    </p>
  );
}
function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}
export function Main({ children }) {
  return <main className="main">{children}</main>;
}
