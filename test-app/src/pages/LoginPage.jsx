import React, { useState } from "react";

const LoginPage = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-customGreen bg-opacity-30 p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-white text-2xl font-bold mb-6 text-center">
          Connexion
        </h2>
        <form>
          <div className="mb-4">
            <label className="block text-left text-white mb-2" htmlFor="login">
              Login
            </label>
            <input
              type="text"
              id="login"
              className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-customGreen"
            />
          </div>
          <div className="mb-2">
            <label
              className="block text-left text-white mb-2"
              htmlFor="password"
            >
              Mot de passe
            </label>
            <input
              type={passwordVisible ? "text" : "password"}
              id="password"
              className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-customGreen"
            />
          </div>
          <div className="mb-6 text-right">
            <button
              type="button"
              className="text-sm text-white underline focus:outline-none"
              onClick={togglePasswordVisibility}
            >
              {passwordVisible ? "Masquer" : "Afficher"} le mot de passe
            </button>
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-white bg-opacity-80 text-customGreen font-bold rounded-lg hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-white"
          >
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
