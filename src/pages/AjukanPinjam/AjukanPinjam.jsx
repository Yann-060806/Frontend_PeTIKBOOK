import { useState, useEffect } from "react";

const AjukanPinjam = () => {
  return (
    <div>
      <div className="pinjaman-header-tambah">
        <h3>Ajukan Peminjaman</h3>
      </div>

      <div className="add-pinjaman-layout">
        <div className="image-side">
          <img src={editPelanggan} alt="preview" />
        </div>

        <div className="form-side">
          <form onSubmit={handleSubmit} className="from-wrapper">
            <div className="from-grid">
              <label htmlFor="nama_pelanggan">Nama Pelanggan</label>
              <input
                type="text"
                id="nama_pelanggan"
                value={namaPelanggan}
                placeholder="Contoh: Ari Faqod"
                onChange={(e) => setNamaPelanggan(e.target.value)}
                required
              />
            </div>

            <div className="from-grid">
              <label>Jenis Kelamin</label>
              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="L"
                    onChange={(e) => setGender(e.target.value)}
                    required
                  />
                  L
                </label>

                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="P"
                    onChange={(e) => setGender(e.target.value)}
                  />
                  P
                </label>
              </div>
            </div>

            <div className="from-grid">
              <label>Nomor HP</label>
              <input
                type="tel"
                value={noHp}
                onChange={(e) => setNoHp(e.target.value)}
                required
              />
            </div>

            <div className="from-grid">
              <label>Alamat</label>
              <input
                type="text"
                value={alamat}
                onChange={(e) => setAlamat(e.target.value)}
                required
              />
            </div>

            <div className="from-grid">
              <label>Tanggal Lahir</label>
              <input
                type="date"
                value={tanggalLahir}
                onChange={(e) => setTanggalLahir(e.target.value)}
                required
              />
            </div>

            <div className="from-grid">
              <label>Kartu</label>
              <select
                id="kartu"
                value={kartu}
                onChange={(e) => setKartu(e.target.value)}
                required
              >
                <option value="" hidden>
                  Pilih Kartu
                </option>
                {kartuList.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.nama}
                  </option>
                ))}
              </select>
            </div>

            <div className="btn-group">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="btn-delete"
              >
                Batal
              </button>

              <button type="submit" className="btn-tambah" disabled={loading}>
                {loading ? "Menyimpan..." : "Simpan"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AjukanPinjam;
