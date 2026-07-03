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