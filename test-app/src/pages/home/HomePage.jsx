const HomePage = () => {
  const handleLogout = () => {
    // Logique de déconnexion à implémenter ici
    console.log("Déconnexion...");
  };

  return (
    <div className="flex flex-col items-center justify-center text-white min-h-screen">
      <h1 className="text-4xl font-bold mb-8">Connecté</h1>
      <button
        onClick={handleLogout}
        className="bg-customPink px-4 py-2 text-gray-800 font-semibold rounded-lg shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
      >
        Se déconnecter
      </button>
    </div>
  );
};

export default HomePage;
