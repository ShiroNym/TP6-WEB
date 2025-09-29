const deleteBtn = document.getElementById('delete-all-btn');

deleteBtn.addEventListener('click', async () => {
  if (!confirm('Effacer tous les liens ?')) return;
  try {
    const res = await fetch(originURL + '/api-v2/', {
      method: 'DELETE',
      headers: { 'Accept': 'application/json' }
    });
    if (!res.ok) {
      resultDiv.textContent = 'Erreur lors de la suppression.';
      return;
    }
    resultDiv.textContent = 'Tous les liens ont été supprimés.';
  } catch {
    resultDiv.textContent = 'Erreur réseau ou serveur.';
  }
});
const originURL = "";

const form = document.getElementById('add-link-form');
const urlInput = document.getElementById('url-input');
const resultDiv = document.getElementById('result');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  resultDiv.textContent = '';
  const url = urlInput.value;
  try {
    const res = await fetch(originURL + '/api-v2/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ url })
    });
    if (!res.ok) {
      const err = await res.text();
      resultDiv.textContent = 'Erreur : ' + err;
      return;
    }
    const link = await res.json();
    const shortUrl = link.shortUrl;
    resultDiv.innerHTML = `Lien généré : <a href="${shortUrl}" target="_blank">${shortUrl}</a> <button id="copy-btn">Copier l'URL</button>`;
    document.getElementById('copy-btn').onclick = () => {
      navigator.clipboard.writeText(shortUrl);
    };
  } catch (err) {
    resultDiv.textContent = 'Erreur réseau ou serveur.';
  }
  urlInput.value = '';
});
