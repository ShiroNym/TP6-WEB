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
    resultDiv.innerHTML = `<br><span class="title is-6">Lien généré : </span><a href="${shortUrl}" target="_blank">${shortUrl}</a><br>
      <span class="has-text-weight-bold">Code secret : </span><span style="font-family:monospace">${link.secret ? link.secret : '(non disponible)'}</span><br><br>
      <button class="button is-success is-dark" id="copy-btn">Copier l'URL</button>`;
    document.getElementById('copy-btn').onclick = () => {
      navigator.clipboard.writeText(shortUrl);
    };
  } catch (err) {
    resultDiv.textContent = 'Erreur réseau ou serveur.';
  }
  urlInput.value = '';
});

const deleteForm = document.getElementById('delete-link-form');
const shortInput = document.getElementById('short-input');
const secretInput = document.getElementById('secret-input');
const deleteResult = document.getElementById('delete-result');

if (deleteForm) {
  deleteForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    deleteResult.textContent = '';
    const short = shortInput.value.trim();
    const secret = secretInput.value.trim();
    if (!short || !secret) {
      deleteResult.textContent = 'Veuillez renseigner le code raccourci et le code secret.';
      return;
    }
    try {
      const res = await fetch(originURL + `/api-v2/${short}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'X-API-KEY': secret
        }
      });
      if (res.status === 200) {
        deleteResult.textContent = 'Lien supprimé avec succès.';
      } else {
        const data = await res.json();
        deleteResult.textContent = data.error ? `Erreur : ${data.error}` : 'Erreur lors de la suppression.';
      }
    } catch {
      deleteResult.textContent = 'Erreur réseau ou serveur.';
    }
    shortInput.value = '';
    secretInput.value = '';
  });
}