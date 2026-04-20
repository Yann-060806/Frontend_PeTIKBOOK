import { useEffect, useState } from "react";
import { NavLink, useOutletContext } from "react-router-dom";
import { FaPlusCircle } from "react-icons/fa";
import axiosInstance from "../../utils/axiosInstance";
import "./Users.css";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [currentpage, setCurrentPage] = useState(1);
  const { search } = useOutletContext();

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const result = await axiosInstance.get("/user");
      setUsers(result.data.data);
    } catch (error) {
      console.log(error);
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

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const handleDelete = async (id) => {
    const msg = window.confirm("Apakah yakin ingin menghapus user ini?");
    if (!msg) return;

    try {
      await axiosInstance.delete(`/user/hapus/${id}`);
      getUsers();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="users-header">
        <h3>Daftar User</h3>
        <NavLink to={"/dashboard/users/add"}>
          <FaPlusCircle /> Tambah User
        </NavLink>
      </div>

      <div className="table-wrapper">
        <table border={1}>
          <thead>
            <tr>
              <th>No</th>
              <th>Username</th>
              <th>Role</th>
              <th>Gambar</th>
              <th>Aksi</th>
            </tr>
          </thead>

          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((item, index) => (
                <tr key={item.id}>
                  <td>{(currentpage - 1) * ITEMS_PER_PAGE + index + 1}</td>
                  <td>{item.username}</td>
                  <td>{item.role}</td>
                  <td>
                    <img src={item.profil} alt="gambar" width={100} />
                  </td>

                  <td>
                    <button className="btn-edit">Edit</button>
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
                <td colSpan={7}> Maaf, data users tidak ditemukan</td>
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
            &laquo; Prev
          </button>

          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              className="btn-page"
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
            Next &raquo;
          </button>
        </div>
      )}
    </div>
  );
};

export default Users;
