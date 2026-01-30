export default function Navbar() {
  return (
    <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow">

      <h2 className="text-lg font-semibold">
        Banking Admin
      </h2>

      <div className="flex items-center gap-3">
        <span className="text-sm">Admin</span>
        <img
          src="https://i.pravatar.cc/40"
          className="w-9 h-9 rounded-full"
        />
      </div>

    </div>
  );
}
