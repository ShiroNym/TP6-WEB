async function fetchLinks() {
  const res = await fetch('/api-v1/');
  const links = await res.json();
  const list = document.getElementById('links-list');
  list.innerHTML = '';
  links.forEach(link => {
    const li = document.createElement('li');
    li.innerHTML = `<a href="/${encodeURIComponent(link.url)}" target="_blank">${link.url}</a>`;
    list.appendChild(li);
  });
}
document.getElementById('add-link-form').addEventListener('submit', async e => {
  e.preventDefault();
  const url = document.getElementById('url-input').value;
  await fetch('/api-v1/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url })
  });
  document.getElementById('url-input').value = '';
  fetchLinks();
});
fetchLinks();
