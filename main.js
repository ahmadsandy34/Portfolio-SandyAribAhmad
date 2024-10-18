// Javascript untuk mengubah tampilan halaman ketika ikon matahari/bulan diklik
function changeMode(event) {
  event.preventDefault(); // Mencegah aksi default dari anchor tag
  const mode = document.querySelector(".mode"); // Mengambil elemen mode dengan class "mode"
  if (mode.id === "dark") { // Jika id mode saat ini adalah "dark", ubah properti dari setiap variabel menjadi warna:
    document.documentElement.style.setProperty("--text", "#212121"); // Warna arang
    document.documentElement.style.setProperty("--card", "#90CAF9"); // Biru muda
    document.documentElement.style.setProperty("--bg-primary", "#E3F2FD"); // Biru muda terang
    document.documentElement.style.setProperty("--bg-secondary", "#BBDEFB"); //  Biru muda terang sedikit gelap
    // Mengubah ikon matahari menjadi bulan dan mengubah id mode menjadi "light"
    const icon = document.querySelector("#dark i");
    icon.classList.remove("bi-brightness-high");
    icon.classList.add("bi-moon");
    mode.id = "light";
  } else if (mode.id === "light") { // Jika id mode saat ini adalah "light", ubah properti dari setiap variabel menjadi warna:
    document.documentElement.style.setProperty("--text", "#ffffff"); // Warma putih
    document.documentElement.style.setProperty("--card", "#89cff0"); // Biru muda
    document.documentElement.style.setProperty("--bg-primary", "#0c2340"); // Biru tua
    document.documentElement.style.setProperty("--bg-secondary", "#081828"); // Biru gelap
    // Mengubah ikon bulan menjadi matahari dan mengubah id mode menjadi "dark"
    const icon = document.querySelector("#light i");
    icon.classList.remove("bi-moon");
    icon.classList.add("bi-brightness-high");
    mode.id = "dark";
  }
}

// Javascript untuk mengirimkan input dari form menuju email pribadi
document 
  .getElementById("postForm") // Mengambil elemen dengan id "postForm"
  .addEventListener("submit", function (event) { // Menambahkan respon ketika form dikirim
    event.preventDefault(); // Mencegah aksi default dari form
    const formData = { //  Mengambil isian dari form
      to: "ahmadsandyarib@gmail.com", // Email penerima 
      name: document.querySelector('input[name="name"]').value, // Nama pengirim
      subject: document.querySelector('input[name="subject"]').value, // Subjek email
      text: document.querySelector('textarea[name="message"]').value, // Pesan email
    };
    fetch("https://lumoshive-academy-email-api.vercel.app/send-email", { // Menggunakan api lumoshive untuk mengirim isian form ke email
      method: "POST",
      headers: {
        "x-api-key": "RJS1-202417", // API key untuk mengirim email
        "Content-Type": "application/json", // Jenis konten yang dikirim (JSON)
        "Access-Control-Allow-Origin": "*", // Mengizinkan akses dari semua domain
      },
      body: JSON.stringify(formData), // Mengirim data form dalam format JSON
    })
      .then((response) => response.json()) 
      .then((data) => { // Menampilkan pesan sukses jika email berhasil dikirim dan mereset form
        document.getElementById("postForm").reset();
        Swal.fire("Your message has been sent successfully!");
      })
      .catch((error) => {
        Swal.fire({ // Menampilkan pesan error jika email gagal dikirim
          icon: "error",
          title: "Error",
          text: error.message,
        });
      });
  });
