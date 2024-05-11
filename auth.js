
window.addEventListener('load', function() {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const accessToken = params.get('access_token');

    if (accessToken) {
        sessionStorage.setItem('spotifyAccessToken', accessToken); 
        
        displayControls();
        document.getElementById('authenticate').style.display = 'none'; 
        window.history.pushState("", document.title, window.location.pathname); 
    }
});

function displayAuthenticatedStatus(token) {
    const statusDiv = document.getElementById('status');
    statusDiv.textContent = 'Authenticated successfully! Token: ' + token;
    statusDiv.style.display = 'block';
}

function displayControls() {
    const controlsDiv = document.getElementById('controls'); 
    controlsDiv.style.display = 'block';
}

  
document.getElementById('authenticate').addEventListener('click', function() {
    const clientId = '9244f45c1b6342cf8c1e57dd56184b47'; 

    // Determine the correct redirect URI based on the environment
    const redirectUri = window.location.hostname === 'localhost' 
                        ? encodeURIComponent('http://localhost:8000/')
                        : encodeURIComponent('https://beat-blend-alpha.vercel.app/');

    const scopes = encodeURIComponent([
        'user-read-recently-played',
        'user-read-playback-state',
        'user-modify-playback-state',
        'user-read-currently-playing',
        'app-remote-control',
        'streaming',
        'playlist-modify-public',
        'playlist-modify-private',
        'playlist-read-private',
        'playlist-read-collaborative',
        'user-follow-read',
        'user-top-read',
        'user-library-read',
        'user-library-modify',
    ].join(' '));

    const authUrl = `https://accounts.spotify.com/authorize?response_type=token&client_id=${clientId}&scope=${scopes}&redirect_uri=${redirectUri}&show_dialog=true`;

    window.location.href = authUrl;
});
