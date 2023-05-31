const itemCollection = document.getElementById('item-registrations');

function fetchItems() {
    fetch('http://localhost:5000/registrations')
        .then(resp => resp.json())
        .then(renderItems);
}

function renderItems(items) {
    console.log(items)
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
          <td class="border-b p-4 text-gray-600 flex gap-1" > <button class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">Update</button><button class=" bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">Delete</button > </td>
      </tr>
    `;
    });
}

// ** Create data
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
});


// ** Delete
