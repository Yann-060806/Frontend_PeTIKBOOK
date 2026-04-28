import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import DaftarBuku from "./pages/DaftarBuku/DaftarBuku.jsx";
import Login from "./pages/Login/Login.jsx";
import DashboardLayout from "./pages/DashboardLayout/DashboardLayout.jsx";
import Users from "./pages/Users/Users.jsx";
import Mahasantri from "./pages/Mahasantri/Mahasantri.jsx";
import AddMahasantri from "./pages/Mahasantri/AddMahasantri.jsx";
import EditMahasantri from "./pages/Mahasantri/EditMahasantri.jsx";
import AddUsers from "./pages/Users/AddUsers.jsx";
import EditUsers from "./pages/Users/EditUsers.jsx";
import AjukanPinjam from "./pages/AjukanPinjam/AjukanPinjam.jsx";
import StatusPeminjaman from "./pages/StatusPeminjaman/StatusPeminjaman.jsx";
import Penulis from "./pages/Penulis/Penulis.jsx";
import AddPenulis from "./pages/Penulis/AddPenulis.jsx";
import EditPenulis from "./pages/Penulis/EditPenulis.jsx";
import Penerbit from "./pages/Penerbit/Penerbit.jsx";
import AddPenerbit from "./pages/Penerbit/AddPenerbit.jsx";
import EditPenerbit from "./pages/Penerbit/EditPenerbit.jsx";
import Genre from "./pages/Genre/Genre.jsx";
import AddGenre from "./pages/Genre/AddGenre.jsx";
import EditGenre from "./pages/Genre/EditGenre.jsx";
import Buku from "./pages/Buku/Buku.jsx";
import AddBuku from "./pages/Buku/AddBuku.jsx";
import EditBuku from "./pages/Buku/EditBuku.jsx";
import ApprovePeminjaman from "./pages/ApprovePeminjaman/ApprovePeminjaman.jsx";
import HistoryAdmin from "./pages/HistoryAdmin/HistoryAdmin.jsx";
import DashboardAdmin from "./pages/DashboardAdmin/DashboardAdmin.jsx";
import Denda from "./pages/Denda/Denda.jsx";
import ProfilUser from "./pages/ProfilUser/ProfilUser.jsx";
import DetailBuku from "./pages/DetailBuku/DetailBuku.jsx";
import NotFound from "./pages/NotFound/NotFound.jsx";
import RiwayatDenda from "./pages/RiwayatDenda/RiwayatDenda.jsx";

import { ToastContainer } from "react-toastify";
import HistoryUser from "./pages/HistoryUser/HistoryUser.jsx";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./components/ProtectRoute/ProtectRoute.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/detail-buku/:id" element={<DetailBuku />} />
        <Route path="/daftarbuku" element={<DaftarBuku />} />
        <Route path="/peminjaman" element={<AjukanPinjam />} />
        <Route path="/statusPeminjaman" element={<StatusPeminjaman />} />
        <Route path="/history-peminjaman" element={<HistoryUser />} />
        <Route path="/profil-mahasantri" element={<ProfilUser />} />

        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route
            index
            element={
              <ProtectedRoute>
                <DashboardAdmin />
              </ProtectedRoute>
            }
          />

          {/* Buku */}
          <Route path="buku" element={<Buku />} />
          <Route path="buku/add" element={<AddBuku />} />
          <Route path="buku/edit/:id" element={<EditBuku />} />

          {/* Penulis */}
          <Route path="penulis" element={<Penulis />} />
          <Route path="penulis/add" element={<AddPenulis />} />
          <Route path="penulis/edit/:id" element={<EditPenulis />} />

          {/* Penerbit */}
          <Route path="penerbit" element={<Penerbit />} />
          <Route path="penerbit/add" element={<AddPenerbit />} />
          <Route path="penerbit/edit/:id" element={<EditPenerbit />} />

          {/* Genre */}
          <Route path="genre" element={<Genre />} />
          <Route path="genre/add" element={<AddGenre />} />
          <Route path="genre/edit/:id" element={<EditGenre />} />

          {/* Users */}
          <Route path="users" element={<Users />} />
          <Route path="users/add" element={<AddUsers />} />
          <Route path="users/edit/:id" element={<EditUsers />} />

          {/* Mahasantri */}
          <Route path="mahasantri" element={<Mahasantri />} />
          <Route path="mahasantri/add" element={<AddMahasantri />} />
          <Route path="mahasantri/edit/:id" element={<EditMahasantri />} />

          {/* Approve */}
          <Route path="approve" element={<ApprovePeminjaman />} />

          {/* History */}
          <Route path="history/admin" element={<HistoryAdmin />} />

          {/* Denda */}
          <Route path="denda" element={<Denda />} />
          <Route path="riwayat-denda" element={<RiwayatDenda />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>

      <ToastContainer position="top-right" autoClose={2000} theme="colored" />
    </>
  );
}

export default App;
