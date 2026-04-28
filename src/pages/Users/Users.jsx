import { useEffect, useState } from "react";
import { NavLink, useNavigate, useOutletContext } from "react-router-dom";
import { FaPlusCircle } from "react-icons/fa";
import axiosInstance from "../../utils/axiosInstance";
import Swal from "sweetalert2";
import "./Users.css";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [currentpage, setCurrentPage] = useState(1);
  const { search } = useOutletContext();
  const navigate = useNavigate();

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const result = await axiosInstance.get("/user");
      setUsers(result.data.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Hapus User?",
      text: "Data tidak bisa dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus!",
    });

    if (!confirm.isConfirmed) return;

    try {
      await axiosInstance.delete(`/user/hapus/${id}`);

      Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "User dihapus",
        timer: 1500,
        showConfirmButton: false,
      });

      getUsers();
    } catch (error) {
      console.log(error.response || error);
    }
  };

  const filterData = users.filter((item) =>
    item.username?.toLowerCase().includes(search.toLowerCase()),
  );

  const ITEMS_PER_PAGE = 10;
  const totalPages = Math.ceil(filterData.length / ITEMS_PER_PAGE);

  const paginatedData = filterData.slice(
    (currentpage - 1) * ITEMS_PER_PAGE,
    currentpage * ITEMS_PER_PAGE,
  );

  return (
    <div>
      <div className="users-header">
        <h3>Daftar User</h3>

        <NavLink to={"/dashboard/users/add"}>
          <FaPlusCircle /> Tambah User
        </NavLink>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Foto</th>
              <th>Username</th>
              <th>Role</th>
              <th>Aksi</th>
            </tr>
          </thead>

          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((item, index) => (
                <tr key={item.id}>
                  <td>{(currentpage - 1) * ITEMS_PER_PAGE + index + 1}</td>

                  <td>
                    <img src={item.profil} alt="foto" width={80} />
                  </td>

                  <td>{item.username}</td>
                  <td>{item.role}</td>

                  <td>
                    <button
                      className="btn-edit"
                      onClick={() =>
                        navigate(`/dashboard/users/edit/${item.id}`)
                      }
                    >
                      Edit
                    </button>

                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5}>Data tidak ditemukan</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            className="btn-page"
            disabled={currentpage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            Prev
          </button>

          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              className="btn-page"
              key={i}
              disabled={currentpage === i + 1}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}

          <button
            className="btn-page"
            disabled={currentpage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Users;
