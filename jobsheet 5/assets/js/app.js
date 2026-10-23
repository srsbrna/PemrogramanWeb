
document.addEventListener("DOMContentLoaded", function () {

    // =========================
    // 1. Hamburger Navbar
    // =========================
    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", function () {
            navMenu.classList.toggle("active");

            const isOpen = navMenu.classList.contains("active");

            menuToggle.setAttribute("aria-expanded", isOpen);
            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Tutup menu navigasi" : "Buka menu navigasi"
            );
        });
    }

    // =========================
    // 2. Validasi Form Tambah Film
    // =========================
    const addFilmForm = document.getElementById("addFilmForm");

    if (addFilmForm) {
        const judul = document.getElementById("judul");
        const sutradara = document.getElementById("sutradara");
        const tahun = document.getElementById("tahun");
        const genre = document.getElementById("genre");
        const stok = document.getElementById("stok");

        const currentYear = new Date().getFullYear();

        addFilmForm.addEventListener("submit", function (event) {
            event.preventDefault();

            // Kosongkan pesan error sebelumnya
            document.querySelectorAll(".error-message").forEach(function (error) {
                error.textContent = "";
            });

            let isValid = true;

            function showError(id, message) {
                document.getElementById(id + "Error").textContent = message;
                isValid = false;
            }

            // Validasi judul film
            if (judul.value.trim() === "") {
                showError("judul", "Judul film wajib diisi.");
            }

            // Validasi sutradara
            if (sutradara.value.trim() === "") {
                showError("sutradara", "Nama sutradara wajib diisi.");
            }

            // Validasi tahun rilis
            const year = Number(tahun.value);

            if (tahun.value.trim() === "") {
                showError("tahun", "Tahun rilis wajib diisi.");
            } else if (
                !Number.isInteger(year) ||
                year < 1888 ||
                year > currentYear
            ) {
                showError(
                    "tahun",
                    `Tahun harus antara 1888 dan ${currentYear}.`
                );
            }

            // Validasi genre
            if (genre.value === "") {
                showError("genre", "Silakan pilih genre film.");
            }

            // Validasi jumlah salinan
            const jumlah = Number(stok.value);

            if (stok.value.trim() === "") {
                showError("stok", "Jumlah salinan wajib diisi.");
            } else if (!Number.isInteger(jumlah) || jumlah < 0) {
                showError(
                    "stok",
                    "Jumlah salinan harus berupa bilangan bulat minimal 0."
                );
            }

            // Jika semua validasi berhasil
            if (isValid) {
                alert("Validasi berhasil! Data film siap diproses.");
            }
        });

        // Hapus pesan error ketika form di-reset
        addFilmForm.addEventListener("reset", function () {
            document.querySelectorAll(".error-message").forEach(function (error) {
                error.textContent = "";
            });
        });
    }

    const addPenontonForm = document.getElementById("addPenontonForm");

    if (addPenontonForm) {
        const idPenonton = document.getElementById("id_penonton");
        const namaPenonton = document.getElementById("nama");
        const alamatPenonton = document.getElementById("alamat");
        const teleponPenonton = document.getElementById("telepon");

        addPenontonForm.addEventListener("submit", function (event) {
            event.preventDefault();

            // Kosongkan pesan error sebelumnya
            addPenontonForm.querySelectorAll(".error-message").forEach(function (error) {
                error.textContent = "";
            });

            let isValid = true;

            function showPenontonError(id, message) {
                document.getElementById(id + "Error").textContent = message;
                isValid = false;
            }

            // Validasi ID penonton
            if (idPenonton.value.trim() === "") {
                showPenontonError("id_penonton", "ID penonton wajib diisi.");
            }

            // Validasi nama
            if (namaPenonton.value.trim() === "") {
                showPenontonError("nama", "Nama penonton wajib diisi.");
            }

            // Validasi alamat
            if (alamatPenonton.value.trim() === "") {
                showPenontonError("alamat", "Alamat wajib diisi.");
            }

            // Validasi nomor telepon
            const nomorTelepon = teleponPenonton.value.trim();

            if (nomorTelepon === "") {
                showPenontonError("telepon", "Nomor telepon wajib diisi.");
            } else if (!/^[0-9+\-\s()]{8,20}$/.test(nomorTelepon)) {
                showPenontonError(
                    "telepon",
                    "Masukkan nomor telepon yang valid (8–20 karakter angka atau simbol telepon)."
                );
            }

            // Jika semua validasi berhasil
            if (isValid) {
                alert("Validasi berhasil! Data penonton siap diproses.");
            }
        });

        // Hapus pesan error ketika form di-reset
        addPenontonForm.addEventListener("reset", function () {
            addPenontonForm.querySelectorAll(".error-message").forEach(function (error) {
                error.textContent = "";
            });
        });
    }

    const searchFilm = document.getElementById("searchFilm");

    if (searchFilm) {
        const filmRows = document.querySelectorAll(
            ".table-responsive tbody tr"
        );
        const noFilmResult = document.getElementById("noFilmResult");

        searchFilm.addEventListener("keyup", function () {
            const keyword = searchFilm.value.toLowerCase().trim();
            let visibleCount = 0;

            filmRows.forEach(function (row) {
                const judulFilm = row.cells[0].textContent.toLowerCase();

                if (judulFilm.includes(keyword)) {
                    row.style.display = "";
                    visibleCount++;
                } else {
                    row.style.display = "none";
                }
            });

            if (noFilmResult) {
                noFilmResult.style.display =
                    visibleCount === 0 ? "block" : "none";
            }
        });
    }
    
    // Konfirmasi hapus film
    const filmTableBody = document.querySelector(".table-responsive tbody");

    if (filmTableBody && window.location.pathname.includes("/film/")) {
        filmTableBody.addEventListener("click", function (event) {
        const tombol = event.target.closest("button");

        if (!tombol || tombol.textContent.trim().toLowerCase() !== "hapus") {
            return;
        }

        const barisFilm = tombol.closest("tr");

        if (!barisFilm) {
            return;
        }

        const judulFilm = barisFilm.cells[0].textContent.trim();

        const yakinHapus = confirm(
            `Apakah kamu yakin ingin menghapus film "${judulFilm}"?`
        );

        if (yakinHapus) {
            barisFilm.remove();
            alert("Film berhasil dihapus dari tampilan.");
        }
        });
    }
    
  // Pencarian penonton berdasarkan ID atau nama
  const searchPenonton = document.getElementById("searchPenonton");

  if (searchPenonton) {
    const penontonRows = document.querySelectorAll(
      ".table-responsive tbody tr"
    );
    const noPenontonResult = document.getElementById("noPenontonResult");

    searchPenonton.addEventListener("input", function () {
      const keyword = searchPenonton.value.toLowerCase().trim();
      let visibleCount = 0;

      penontonRows.forEach(function (row) {
        const dataPenonton = row.textContent.toLowerCase();

        if (dataPenonton.includes(keyword)) {
          row.style.display = "";
          visibleCount++;
        } else {
          row.style.display = "none";
        }
      });

      if (noPenontonResult) {
        noPenontonResult.style.display =
          visibleCount === 0 ? "block" : "none";
      }
    });
  }

});