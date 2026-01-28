let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
const contactList = document.getElementById('contact-list');
function renderContacts() {
    contactList.innerHTML = '';
    contacts.forEach((contact, index) => {
        const contactDiv = document.createElement('div');
        contactDiv.innerHTML = `
            <p id="contact-name"><strong>${contact.lastname} ${contact.firstname}</strong>   <span onclick="toggleGroupDetails(this)">▶</span></p>
            <div id="contact-details" style="display: none;">
            <p>Otthoni telefon: ${contact.homephone}</p>
            <p>Mobiltelefon: ${contact.mobilephone}</p>
            <p>E-mail: ${contact.email}</p>
            <p>Cím: ${contact.address}</p>
            <p>Születési dátum: ${contact.birthday}</p>
            <p>Megjegyzés: ${contact.notes}</p>
            <h3>Csoportok:</h3>
            `
            contact.groups.forEach(group => {
                contactDiv.innerHTML += `
                <p> Csoport neve: ${group} <span onclick="toggleGroupDetails(this)">▼</span></p>
                <div class="group-details" style="display: none;">
                <p> Csoport leírása: ${group} </p>
                </div>
                `;
            });
            contactDiv.innerHTML += `
            <button onclick="editContact(${index})">Szerkesztés</button>
            <button onclick="deleteContact(${index})">Törlés</button>
            </div>
            `;
            const contactName = contactDiv.querySelector('#contact-name');
            const contactDetails = contactDiv.querySelector('#contact-details');
            const showSwitch = contactDiv.querySelector('#showswitch');
            contactList.appendChild(contactDiv);
        });
}

function toggleGroupDetails(element) {
    const groupDetails = element.nextElementSibling;
    if (groupDetails.style.display === 'none') {
        groupDetails.style.display = 'block';
        element.textContent = '▼';
    }
    else {
        groupDetails.style.display = 'none';
        element.textContent = '▶';
    }
}

function editContact(index) {
    // Implement edit functionality here
    alert(`Edit contact at index: ${index}`);
}

function deleteContact(index) {
    contacts.splice(index, 1);
    localStorage.setItem('contacts', JSON.stringify(contacts));
    renderContacts();
}