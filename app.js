const itemCollection = document.getElementById('item-registrations');

function fetchItems() {
    fetch('http://localhost:3000/registrations')
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
      </tr>
    `;
    });
}
