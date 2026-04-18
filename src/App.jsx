import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import DaftarBuku from "./pages/DaftarBuku/DaftarBuku.jsx";
import Login from "./pages/Login/Login.jsx";
import DashboardLayout from "./pages/DashboardLayout/DashboardLayout.jsx";
import Users from "./pages/Users/Users.jsx";
import AddUsers from "./pages/Users/AddUsers.jsx";
import AjukanPinjam from "./pages/AjukanPinjam/AjukanPinjam.jsx";
import StatusPeminjaman from "./pages/StatusPeminjaman/StatusPeminjaman.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/daftarbuku" element={<DaftarBuku />} />
      <Route path="/peminjaman" element={<AjukanPinjam />} />
      <Route path="/statusPeminjaman" element={<StatusPeminjaman />} />
      
      

      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route element={<h1>Dashboard</h1>} />

        {/* Pesanan */}
        <Route path="/dashboard/pesanan" element={<h1>Halo</h1>} />

        {/* Produk */}
        <Route path="/dashboard/pesanan" element={<h1>Halo</h1>} />

        {/* Jenis Produk */}
        <Route path="/dashboard/pesanan" element={<h1>Halo</h1>} />

        {/* Pelanggan */}
        <Route path="/dashboard/pesanan" element={<h1>Halo</h1>} />

        {/* Kartu */}
        <Route path="/dashboard/pesanan" element={<h1>Halo</h1>} />

        {/* Users */}
        <Route path="/dashboard/users" element={<Users />} />
        <Route path="/dashboard/users/add" element={<AddUsers />} />

        {/* History */}
        <Route path="/dashboard/pesanan" element={<h1>Halo</h1>} />
      </Route>
    </Routes>
  );
}

export default App;
