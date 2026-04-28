import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import Swal from "sweetalert2";
import "./Denda.css";

const Denda = () => {
  const [denda, setDenda] = useState([]);
  const [currentpage, setCurrentPage] = useState(1);
  const { search } = useOutletContext();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getDenda();
  }, []);

  const getDenda = async () => {
    setLoading(true);
    try {
      const result = await axiosInstance.get("/denda");
      const data = result.data.data;

      const belumDibayar = data.filter((d) => d.status !== "dibayar");

      setDenda(belumDibayar);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelesai = async (id) => {
    const confirm = await Swal.fire({
      title: "Yakin mau menyelesaikan denda?",
      text: "Status akan berubah menjadi dibayar",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#185fa5",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Selesaikan",
      cancelButtonText: "Batal",
    });

    if (!confirm.isConfirmed) return;

    try {
      await axiosInstance.patch(`/denda/edit/${id}`, {
        status: "dibayar",
      });

      await Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Denda sudah diselesaikan",
        timer: 1500,
        showConfirmButton: false,
      });

      getDenda();
    } catch (error) {
      console.log(error);

      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Gagal mengupdate denda",
      });
    }
  };

  const filterData = denda.filter((d) =>
    d.status?.toLowerCase().includes(search.toLowerCase()),
  );

  const ITEMS_PER_PAGE = 10;

  const paginatedData = filterData.slice(
    (currentpage - 1) * ITEMS_PER_PAGE,
    currentpage * ITEMS_PER_PAGE,
  );

  return (
    <div>
      <div className="denda-header">
        <h3>Daftar Denda</h3>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Total</th>
              <th>Status</th>
              <th>Transaksi</th>
              <th>Aksi</th>
            </tr>
          </thead>

          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((d, i) => (
                <tr key={d.id}>
                  <td>{(currentpage - 1) * ITEMS_PER_PAGE + i + 1}</td>
                  <td>{d.total_denda}</td>
                  <td>{d.status}</td>
                  <td>{d.transaksi_id}</td>
                  <td>
                    <button onClick={() => handleSelesai(d.id)}>Selesai</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">Tidak ada data denda</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Denda;
