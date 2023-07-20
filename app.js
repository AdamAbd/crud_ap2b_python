const itemCollection = document.getElementById('item-registrations');

function getQueryParam(param) {
    var urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Get the ID from the URL
var id = getQueryParam("id");

function fetchItems() {
    fetch('http://127.0.0.1:5000/registrations')
        .then(resp => resp.json())
        .then(renderItems);
}

function renderItems(items) {
    console.log(items);
    itemCollection.innerHTML = "";
    items.forEach(function (item) {
        itemCollection.innerHTML += `
        <tr data-id=${item.No}>
            <td class="border-b p-4 pl-8 text-gray-600">${item.No}</td>
            <td class="border-b p-4 pl-8 text-gray-600">${item.Nama}</td>
            <td class="border-b p-4 pl-8 text-gray-600">${item.Alamat}</td>
            <td class="border-b p-4 pl-8 text-gray-600">${item.Telp}</td>
            <td class="border-b p-4 pl-8 text-gray-600">${item.Jenis_Kelamin}</td>
            <td class="border-b p-4 pl-8 text-gray-600">${item.Jenis_Kursus}</td>
            <td class="border-b p-4 text-gray-600">${item.Tgl_Pendaftaran}</td>    
            <td class="border-b p-4 text-gray-600 flex gap-1">
                <button onclick="redirectToRegistration(${item.No})"
                class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded" > Update </button>
                <button class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded" onclick="deleteItem(${item.No})">Delete</button>
            </td>
        </tr>
      `;
    });
}

// ! Create data
const createForm = document.getElementById('createForm');

createForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const kursus = {
        No: document.getElementById('no').value,
        Tgl_Pendaftaran: document.getElementById('tgl_pendaftaran').value,
        Nama: document.getElementById('nama').value,
        Alamat: document.getElementById('alamat').value,
        Telp: document.getElementById('telepon').value,
        Jenis_Kelamin: document.getElementById('jenis_kelamin').value,
        Jenis_Kursus: document.getElementById('jenis_kursus').value
    };
    console.log(kursus);
    if (id) {
        fetch(`http://127.0.0.1:5000/registrations/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(kursus)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Kursus created:', data);
                // Perform any further actions after kursus creation, such as showing a success message or redirecting to another page.
            })
            .catch(error => {
                console.error('Error creating kursus:', error);
                // Handle error case, such as showing an error message to the user.
            });

    } else {
        fetch('http://127.0.0.1:5000/registrations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(kursus)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Kursus created:', data);
                // Perform any further actions after kursus creation, such as showing a success message or redirecting to another page.
            })
            .catch(error => {
                console.error('Error creating kursus:', error);
                // Handle error case, such as showing an error message to the user.
            });

    }
});



// ! Delete
function deleteItem(itemId) {
    fetch(`http://localhost:5000/registrations/${itemId}`, {
        method: 'DELETE'
    })
        .then(response => response.json())
        .then(data => {
            console.log('Item deleted:', data);
            // Perform any further actions after item deletion, such as updating the UI or showing a success message.
            fetchItems(); // Refresh the item list after deletion.
        })
        .catch(error => {
            console.error('Error deleting item:', error);
            // Handle error case, such as showing an error message to the user.
        });
}


// ! Update
function redirectToRegistration(id) {
    var url = "http://localhost:5500/input.html?id=" + id;
    window.location.href = url;
}



// Use the ID as needed
if (id) {
    // Display the ID on the page
    fetchItemById(id);
    // Perform any other actions with the ID...
}



function fetchItemById(id) {
    fetch(`http://127.0.0.1:5000/registrations/${id}`)
        .then(resp => resp.json())
        .then(renderItemById);
}

function renderItemById(items) {
    console.log(items);

    var input = document.getElementById("no");
    input.value = id;
    var inputDaftar = document.getElementById("tgl_pendaftaran");
    inputDaftar.value = items.Tgl_Pendaftaran;
    var inputNama = document.getElementById("nama");
    inputNama.value = items.Nama;
    var inputAlamat = document.getElementById("alamat");
    inputAlamat.value = items.Alamat;
    var inputTelp = document.getElementById("telepon");
    inputTelp.value = items.Telp;
    var inputJk = document.getElementById("jenis_kelamin");
    inputJk.value = items.Jenis_Kelamin;
    var inputKursus = document.getElementById("jenis_kursus");
    inputKursus.value = items.Jenis_Kursus;

}