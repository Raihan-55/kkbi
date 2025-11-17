function Profile() {
  return (
    <div className="text-center py-4">
      <h1 className="text-3xl font-semibold mb-2">Profile Page</h1>
      <div className=" mx-auto text-center border rounded-xl p-6 shadow">
        <a href="https://github.com/raihan-55">
          <img src="https://github.com/raihan-55.png" alt="Profile" className="w-32 h-32 rounded-full mx-auto mb-6 shadow-lg" />
        </a>
        <div className="text-lg space-y-1">
          <p>Raihan Sahaja</p>
          <p>21120123130093</p>
          <p>Kelompok Praktikum : 21</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
