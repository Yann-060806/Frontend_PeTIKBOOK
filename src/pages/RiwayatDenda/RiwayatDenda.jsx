import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import "./RiwayatDenda.css";

const RiwayatDenda = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const res = await axiosInstance.get("/denda");
      const riwayat = res.data.data.filter((d) => d.status === "dibayar");
      setData(riwayat);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="riwayat-container">
      <div className="riwayat-header">
        <h3>Riwayat Denda</h3>
      </div>

      <div className="riwayat-wrapper">
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Total</th>
              <th>Status</th>
              <th>Transaksi</th>
            </tr>
          </thead>

          <tbody>
            {data.map((d, i) => (
              <tr key={d.id}>
                <td>{i + 1}</td>
                <td>{d.total_denda}</td>
                <td>
                  <span className={`status ${d.status}`}>{d.status}</span>
                </td>
                <td>{d.transaksi_id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RiwayatDenda;
