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
     console.info("testing");
     event.preventDefault();
    
    const kursus = {
        no: document.getElementById('no').value,
        tgl_pendaftaran: document.getElementById('tgl_pendaftaran').value,
        nama: document.getElementById('nama').value,
        alamat: document.getElementById('alamat').value,
        telepon: document.getElementById('telepon').value,
        jenis_kelamin: document.getElementById('jenis_kelamin').value,
        jenis_kursus: document.getElementById('jenis_kursus').value
    };
    // fetch('http://127.0.0.1:5000/registrations', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(kursus)
    //     })
    //     .then(response => response.json())
    //     .then(data => {
    //         console.log('Kursus created:', data);
    //         // Perform any further actions after kursus creation, such as showing a success message or redirecting to another page.
    //     })
    //     .catch(error => {
    //         console.error('Error creating kursus:', error);
    //         // Handle error case, such as showing an error message to the user.
    //     });
});


// ** Update Delete
// Get form and user list elements
// const form = document.getElementById('crudForm');
// const userList = document.getElementById('userList');

// // Event listener for form submission
// form.addEventListener('submit', function (event) {
//     event.preventDefault(); // Prevent form submission

//     // Get form values
//     const no = document.getElementById('no').value;
//     const tgl_Pendaftaran = document.getElementById('tgl_Pendaftaran').value;
//     const nama = document.getElementById('nama').value;
//     const alamat = document.getElementById('alamat').value;
//     const telepon = document.getElementById('telepon').value;
//     const jenis_kelamin = document.getElementById('jenis_kelamin').value;
//     const jenis_kursus = document.getElementById('jenis_kursus').value;

//     // Create user object
//     const user = {
//         no,
//         tgl_Pendaftaran,
//         nama,
//         alamat,
//         telepon,
//         jenis_kelamin,
//         jenis_kursus

//     };

//     // Save user to localStorage
//     saveUser(user);

//     // Clear form inputs
//     form.reset();

//     // Update user list
//     updateUserList();
// });

// // Function to save user to localStorage
// function saveUser(user) {
//     let users = [];

//     // Get existing users from localStorage
//     if (localStorage.getItem('users')) {
//         users = JSON.parse(localStorage.getItem('users'));
//     }

//     // Add new user to the array
//     users.push(user);

//     // Save updated users array to localStorage
//     localStorage.setItem('users', JSON.stringify(users));
// }

// // Function to update user list
// function updateUserList() {
//     // Clear existing list items
//     userList.innerHTML = '';

//     // Get users from localStorage
//     const users = JSON.parse(localStorage.getItem('users'));

//     if (users) {
//         // Loop through users and create list items
//         users.forEach(function (user, index) {
//             const li = document.createElement('li');
//             li.textContent = `Name: ${user.name}, Email: ${user.email}`;
//             userList.appendChild(li);
//         });
//     }
// }