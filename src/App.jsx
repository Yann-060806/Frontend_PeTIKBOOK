import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import DaftarBuku from "./pages/DaftarBuku/DaftarBuku.jsx";
import Login from "./pages/Login/Login.jsx";
import DashboardLayout from "./pages/DashboardLayout/DashboardLayout.jsx";
import Users from "./pages/Users/Users.jsx";
import AddUsers from "./pages/Users/AddUsers.jsx";
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

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/daftarbuku" element={<DaftarBuku />} />

      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route element={<h1>Dashboard</h1>} />

        {/* Buku*/}
        <Route path="/dashboard/buku" element={<Buku />} />
        <Route path="/dashboard/buku/add" element={<AddBuku />} />
        <Route path="/dashboard/buku/edit/:id" element={<EditBuku />} />

        {/* Penulis*/}
        <Route path="/dashboard/penulis" element={<Penulis />} />
        <Route path="/dashboard/penulis/add" element={<AddPenulis />} />
        <Route path="/dashboard/penulis/edit/:id" element={<EditPenulis />} />

        {/* Penerbit */}
        <Route path="/dashboard/penerbit" element={<Penerbit />} />
        <Route path="/dashboard/penerbit/add" element={<AddPenerbit />} />
        <Route path="/dashboard/penerbit/edit/:id" element={<EditPenerbit />} />

        {/* Genre */}
        <Route path="/dashboard/genre" element={<Genre />} />
        <Route path="/dashboard/genre/add" element={<AddGenre />} />
        <Route path="/dashboard/genre/edit/:id" element={<EditGenre />} />

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
