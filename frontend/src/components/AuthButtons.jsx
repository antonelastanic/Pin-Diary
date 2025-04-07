export default function AuthButtons({
    currentUser,
    onLogout,
    onLoginClick,
    onRegisterClick
  }) {
    return currentUser ? (
      <button className="button logout" onClick={onLogout}>
        Log out
      </button>
    ) : (
      <div className="buttons">
        <button className="button login" onClick={onLoginClick}>
          Login
        </button>
        <button className="button register" onClick={onRegisterClick}>
          Register
        </button>
      </div>
    );
  }
  