/*
let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
const contactList = document.getElementById('contact-list');
function renderContacts() {
    contactList.innerHTML = '';
    contacts.forEach((contact, index) => {
        const contactDiv = document.createElement('div');
        contactDiv.innerHTML = `
            <p id="contact-name"><strong>${contact.lastname} ${contact.firstname}</strong>   <span onclick="toggleDetails(this)">▶</span></p>
            <div class="contact-details" style="display: none;">
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
                <p> Csoport neve: ${group} <span onclick="toggleDetails(this)">▼</span></p>
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
            
            contactList.appendChild(contactDiv);
            const groupDetails = contactDiv.querySelectorAll('.group-details');
            const contactDetails = contactDiv.querySelectorAll('.contact-details');
        });
    }

function toggleDetails(element) {
    console.log(element);
    const foldMenu = element.parentElement.nextElementSibling;
    console.log(foldMenu);
    if (foldMenu.style.display === 'none') {
        foldMenu.style.display = 'block';
        element.textContent = '▼';
    }
    else {
        foldMenu.style.display = 'none';
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
}*/


let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
let groups = JSON.parse(localStorage.getItem('groups')) || [];

const contactList = document.getElementById('contactlist');
const groupList = document.getElementById('grouplist');

function save() {
  localStorage.setItem('contacts', JSON.stringify(contacts));
  localStorage.setItem('groups', JSON.stringify(groups));
}

function showView(view) {
  contactList.style.display = view === 'contacts' ? 'block' : 'none';
  groupList.style.display = view === 'groups' ? 'block' : 'none';
}

function toggleDetails(el) {
  const target = el.parentElement.nextElementSibling;
  if (!target) return;
  target.style.display = target.style.display === 'none' ? 'block' : 'none';
  el.textContent = target.style.display === 'none' ? '▶' : '▼';
}

// ---------- CONTACTS ----------

document.getElementById('add-contact-form').onsubmit = e => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target));
  data.groups = [];
  contacts.push(data);
  save();
  renderContacts();
  e.target.reset();
};

function renderContacts() {
  contactList.innerHTML = '';
  contacts.forEach((c, i) => {
    const div = document.createElement('div');
    div.innerHTML = `
      <p><strong>${c.lastname} ${c.firstname}</strong> <span onclick="toggleDetails(this)">▶</span></p>
      <div class="contact-details" style="display:none">
      <p>Otthoni telefon: ${c.homephone}</p>
            <p>Mobiltelefon: ${c.mobilephone}</p>
            <p>E-mail: ${c.email}</p>
            <p>Cím: ${c.address}</p>
            <p>Születési dátum: ${c.birthday}</p>
            <p>Megjegyzés: ${c.notes}</p>
      <p>Csoportok: ${c.groups.map(g=>g.name).join(', ')}</p>
      <button onclick="editContact(${i})">Szerkesztés</button>
      <button onclick="deleteContact(${i})">Törlés</button>
      <button onclick="assignGroup(${i})">Csoporthoz adás</button>
      </div>
    `;
    contactList.appendChild(div);
  });
}

function deleteContact(i) {
  contacts.splice(i,1);
  save();
  renderContacts();
}

function editContact(i) {
  const c = contacts[i];
  const fn = prompt('Keresztnév', c.firstname);
  if (fn !== null) c.firstname = fn;
  save();
  renderContacts();
}

function assignGroup(i) {
  const name = prompt('Csoport neve');
  const g = groups.find(x=>x.name===name);
  if (!g) return alert('Nincs ilyen csoport');
  contacts[i].groups.push(g);
  save();
  renderContacts();
}

// ---------- GROUPS ----------

document.getElementById('add-group-form').onsubmit = e => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target));
  groups.push(data);
  save();
  renderGroups();
  e.target.reset();
};

function renderGroups() {
  groupList.innerHTML = '';
  groups.forEach((g,i)=>{
    const div = document.createElement('div');
    div.innerHTML = `
      <p><strong>${g.name}</strong> – ${g.description || ''}</p>
      <button onclick="editGroup(${i})">Szerkesztés</button>
      <button onclick="deleteGroup(${i})">Törlés</button>
    `;
    groupList.appendChild(div);
  });
}

function editGroup(i) {
  const g = groups[i];
  const n = prompt('Új név', g.name);
  if (n !== null) g.name = n;
  save();
  renderGroups();
  renderContacts();
}

function deleteGroup(i) {
  const name = groups[i].name;
  groups.splice(i,1);
  contacts.forEach(c=>c.groups=c.groups.filter(g=>g.name!==name));
  save();
  renderGroups();
  renderContacts();
}

renderContacts();
renderGroups();