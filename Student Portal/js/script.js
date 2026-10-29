const root = document.documentElement;
const themeSelect = document.getElementById('themeSelect');
const toast = document.getElementById('toast');
const dialog = document.getElementById('appDialog');
const dialogContent = document.getElementById('dialogContent');
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3000);
}

const authNavButton = document.getElementById('authNavButton');
function updateAuthButton() {
  if (!authNavButton) return;
  authNavButton.textContent = 'Logout';
  authNavButton.href = '#logout';
  authNavButton.onclick = event => {
    event.preventDefault();
    localStorage.removeItem('campusConnectDemoUser');
    window.location.replace('login.html');
  };
  const heading = document.querySelector('.welcome-row h1');
  if (heading) heading.innerHTML = 'Good evening, <span>Noor Ul Subha.</span> <span class="wave">✦</span>';
}
updateAuthButton();

const savedTheme = localStorage.getItem('campusConnectTheme');
if (savedTheme && ['ice', 'graphite', 'burgundy'].includes(savedTheme)) {
  root.dataset.theme = savedTheme;
  themeSelect.value = savedTheme;
}
themeSelect.addEventListener('change', () => {
  root.dataset.theme = themeSelect.value;
  localStorage.setItem('campusConnectTheme', themeSelect.value);
  showToast(`${themeSelect.options[themeSelect.selectedIndex].text} theme applied.`);
});

document.getElementById('menuToggle').addEventListener('click', () => {
  document.getElementById('sidebar').classList.toggle('open');
});
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelectorAll('.nav-link').forEach(item => item.classList.remove('active'));
    link.classList.add('active');
    document.getElementById('sidebar').classList.remove('open');
  });
});
document.getElementById('notificationButton').addEventListener('click', () => {
  openDialog('<p class="eyebrow">NOTIFICATIONS</p><h2>You are all caught up</h2><p>Important updates will appear here when they are added to the portal.</p><button class="primary-button" onclick="closeDialog()">Got it <span>✓</span></button>');
});

function openDialog(content) {
  dialogContent.innerHTML = content;
  dialog.showModal();
}
function closeDialog() {
  if (dialog.open) dialog.close();
}
window.closeDialog = closeDialog;

document.querySelectorAll('.event-remind').forEach(button => {
  button.addEventListener('click', () => {
    const eventName = button.dataset.event;
    button.textContent = 'Reminder set ✓';
    button.disabled = true;
    showToast(`Reminder set for ${eventName}. This is a browser demo.`);
  });
});

document.querySelectorAll('.resource-open').forEach(button => {
  button.addEventListener('click', () => {
    const title = button.dataset.resource;
    openDialog(`<p class="eyebrow">STUDY RESOURCES</p><h2>${title}</h2><p>This is a sample resource card. Add a verified PDF, document or trusted learning URL here when your university materials are ready.</p><button class="primary-button" onclick="closeDialog()">Close <span>×</span></button>`);
  });
});

document.getElementById('addResourceButton').addEventListener('click', () => {
  openDialog(`<p class="eyebrow">STUDY RESOURCES</p><h2>Add a resource</h2><p>Create a temporary resource card for this browser session.</p><form class="dialog-form" id="resourceForm"><label for="resourceTitle">Resource title</label><input id="resourceTitle" required placeholder="e.g. Computer Networks notes"><label for="resourceType">Resource type</label><select id="resourceType"><option>PDF</option><option>Notes</option><option>Learning link</option></select><label for="resourceDescription">Short description</label><input id="resourceDescription" placeholder="What is this resource about?"><button class="primary-button" type="submit">Add resource <span>+</span></button></form>`);
  document.getElementById('resourceForm').addEventListener('submit', event => {
    event.preventDefault();
    const title = document.getElementById('resourceTitle').value.trim();
    const type = document.getElementById('resourceType').value;
    const description = document.getElementById('resourceDescription').value.trim() || 'Added during this demo session.';
    const card = document.createElement('article');
    card.className = 'resource-card';
    const iconClass = type === 'PDF' ? 'pdf-icon' : type === 'Notes' ? 'notes-icon' : 'link-icon';
    const iconText = type === 'PDF' ? 'PDF' : type === 'Notes' ? 'DOC' : 'LINK';
    card.innerHTML = `<div class="file-icon ${iconClass}">${iconText}</div><div><span class="resource-category">${type.toUpperCase()}</span><h3></h3><p></p></div><button class="resource-open">Open ↗</button>`;
    card.querySelector('h3').textContent = title;
    card.querySelector('p').textContent = description;
    card.querySelector('.resource-open').addEventListener('click', () => showToast(`${title}: demo resource only.`));
    document.getElementById('resourceGrid').prepend(card);
    closeDialog();
    showToast('Resource added for this session.');
  });
});

document.getElementById('postItemButton').addEventListener('click', () => {
  openDialog(`<p class="eyebrow">CAMPUS COMMUNITY</p><h2>Post a lost or found item</h2><form class="dialog-form" id="itemForm"><label for="itemName">Item name</label><input id="itemName" required placeholder="e.g. Water bottle"><label for="itemStatus">Listing type</label><select id="itemStatus"><option>Lost item</option><option>Found item</option></select><label for="itemLocation">Last seen / found location</label><input id="itemLocation" required placeholder="e.g. Library"><button class="primary-button" type="submit">Publish demo listing <span>→</span></button></form><p>Do not include phone numbers, student IDs or other private information in this demo.</p>`);
  document.getElementById('itemForm').addEventListener('submit', event => {
    event.preventDefault();
    const name = document.getElementById('itemName').value.trim();
    const status = document.getElementById('itemStatus').value;
    const location = document.getElementById('itemLocation').value.trim();
    const card = document.createElement('article');
    card.className = 'lost-card';
    card.innerHTML = `<span class="lost-symbol">${status === 'Found item' ? '✓' : '⌕'}</span><div><span class="tag ${status === 'Found item' ? 'tag-event' : 'tag-important'}"></span><h3></h3><p></p></div><button class="small-button contact-owner">View details</button>`;
    card.querySelector('.tag').textContent = status;
    card.querySelector('h3').textContent = name;
    card.querySelector('p').textContent = `${location} · Demo listing`;
    card.querySelector('button').addEventListener('click', () => showToast(`${name} · ${status} · ${location}`));
    document.getElementById('lostGrid').prepend(card);
    closeDialog();
    showToast('Demo listing added to the board.');
  });
});

document.querySelectorAll('.contact-owner').forEach(button => {
  button.addEventListener('click', () => showToast('Sample listing only. Contact details are not available in this demo.'));
});

document.getElementById('editProfileButton').addEventListener('click', () => {
  openDialog(`<p class="eyebrow">PROFILE PREVIEW</p><h2>Edit demo profile</h2><form class="dialog-form" id="profileForm"><label for="profileName">Display name</label><input id="profileName" value="Noor Ul Subha" required><label for="profileProgram">Program</label><input id="profileProgram" value="BS Software Engineering" required><label for="profileSemester">Semester</label><select id="profileSemester"><option>4th Semester</option><option>1st Semester</option><option>2nd Semester</option><option>3rd Semester</option><option>5th Semester</option><option>6th Semester</option><option>7th Semester</option><option>8th Semester</option></select><button class="primary-button" type="submit">Save preview <span>✓</span></button></form>`);
  document.getElementById('profileForm').addEventListener('submit', event => {
    event.preventDefault();
    document.querySelector('.profile-summary h3').textContent = document.getElementById('profileName').value;
    document.querySelector('.profile-summary p').textContent = document.getElementById('profileProgram').value;
    document.querySelector('.profile-details div:last-child strong').textContent = document.getElementById('profileSemester').value;
    closeDialog();
    showToast('Profile preview updated in this page.');
  });
});

document.getElementById('supportForm').addEventListener('submit', event => {
  event.preventDefault();
  const topic = document.getElementById('supportTopic').value;
  document.getElementById('supportForm').reset();
  showToast(`Your ${topic.toLowerCase()} message was received by the demo form. Backend submission is not connected.`);
});

dialog.addEventListener('click', event => {
  if (event.target === dialog) dialog.close();
});
