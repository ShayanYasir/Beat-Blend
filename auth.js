// When the page loads, check for access token in the URL hash
window.addEventListener('load', function() {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const accessToken = params.get('access_token');
    const expiresIn = params.get('expires_in');

    if (accessToken) {
        console.log("Access Token:", accessToken);
        displayAuthenticatedStatus(accessToken);
        window.history.pushState("", document.title, window.location.pathname);
    }
});

function displayAuthenticatedStatus(token) {
    const statusDiv = document.getElementById('status');
    statusDiv.innerHTML = `Authenticated successfully! Token: ${token}`;
    statusDiv.style.display = 'block';
}

document.getElementById('authenticate').addEventListener('click', function() {
    const clientId = '9244f45c1b6342cf8c1e57dd56184b47'; 
    const redirectUri = encodeURIComponent('http://localhost:8000/');
    const scopes = encodeURIComponent([
        'user-read-private',
        'user-read-email',
        'user-library-read',
        'user-library-modify',
        'playlist-read-private',
        'playlist-modify-public',
        'playlist-modify-private',
        'user-follow-read',
        'user-follow-modify',
        'user-top-read',
        'user-read-recently-played',
        'user-read-playback-state',
        'user-modify-playback-state',
        'user-read-currently-playing',
        'user-read-playback-position',
        'user-read-birthdate',
    ].join(' '));

    const authUrl = `https://accounts.spotify.com/authorize?response_type=token&client_id=${clientId}&scope=${scopes}&redirect_uri=${redirectUri}&show_dialog=true`;

    window.location.href = authUrl;
});
