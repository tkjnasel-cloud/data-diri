const docRef = db.collection("biodata").doc("NdbFgg1A8YDO3Z010L5l");

// Menampilkan jumlah like
docRef.onSnapshot((doc) => {
    if (doc.exists) {
        document.getElementById("jumlahLike").innerText = doc.data().like || 0;
    }
});

// Menambah like
function tambahLike() {
    docRef.update({
        like: firebase.firestore.FieldValue.increment(1)
    });
}

// menambah komentar
function kirimkomentar() {
    const nama = document.getElementById("nama").value;
    const komentar = document.getElementById("komentar").value;

    if (nama === "" || komentar === "") {
        alert("isi nama dan komentar terlebih dahulu!");
        return;
    }

    db.collection ("komentar").add ({
        nama: nama,
        komentar: komentar,
        waktu: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
        document.getElementById("nama").value = "";
        document.getElementById("komentar").value = "";
        alert("komentar berhasil di kirim!");
    })
    .catch((error) => {
        console.error(error);
        alert("gagal mengirim komentar!")
    });
}

db.collection("komentar")
.order.By("waktu", "desc")
.onSnapshot((snapshot) => {
    let html = "";

    snapshot.forEach((doc) => {

        const data = doc.data();

        html +=
            <div style="border:1px solid #ddd:padding:10px;margin:10px;border-radius:10px;">
                <b>${data.nama}</b><br>
                ${data.komentar}
            </div>
        ;
    });

    document.getElementById("daftarkomentar").innerHTML = html;

});
