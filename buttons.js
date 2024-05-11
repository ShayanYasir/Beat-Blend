document.addEventListener('DOMContentLoaded', function() {
    const token = sessionStorage.getItem('spotifyAccessToken'); 

    async function fetchWebApi(endpoint, method, body = null) {
        const res = await fetch(`https://api.spotify.com/${endpoint}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            method,
            body: body ? JSON.stringify(body) : null
        });
        return await res.json();
    }

    // TRACKS
    async function getTopTracks() {
        return (await fetchWebApi(
            'v1/me/top/tracks?time_range=long_term&limit=20', 'GET'
        )).items;
    }

    async function displayTopTracks() {
        const tracks = await getTopTracks();
        const playlistContainer = document.getElementById('playlist-container');
        playlistContainer.innerHTML = ''; 

        tracks.forEach(track => {
            const trackDiv = document.createElement('div');
            trackDiv.className = 'song-item';

            const coverImg = document.createElement('img');
            coverImg.src = track.album.images[0].url; 
            coverImg.alt = `Cover art for ${track.name}`;
            coverImg.className = 'album-cover';
            coverImg.style.width = '20%'; 
            coverImg.style.height = '20%'; 
            coverImg.style.marginRight = '10px'; 
            coverImg.style.marginBottom = '10px';

            const titleSpan = document.createElement('span');
            titleSpan.textContent = track.name;
            titleSpan.className = 'track-title';

            const artistSpan = document.createElement('span');
            artistSpan.textContent = `By: ${track.artists.map(artist => artist.name).join(', ')}`;
            artistSpan.className = 'track-artists';

            trackDiv.appendChild(coverImg);
            trackDiv.appendChild(titleSpan);            
            trackDiv.appendChild(artistSpan);

            playlistContainer.appendChild(trackDiv);
        });
    }

    document.getElementById('topTracks').addEventListener('click', displayTopTracks);

    async function getTopArtists() {
        return (await fetchWebApi(
            'v1/me/top/artists?time_range=long_term&limit=20', 'GET'
        )).items;
    }

    // ARTISTS

    async function getTopArtists() {
        return (await fetchWebApi(
            'v1/me/top/artists?time_range=long_term&limit=20', 'GET'
        )).items;
    }

    async function displayTopArtists() {
        const artists = await getTopArtists();
        const playlistContainer = document.getElementById('playlist-container');
        playlistContainer.innerHTML = '';

        artists.forEach(artist => {
            const artistDiv = document.createElement('div');
            artistDiv.className = 'song-item'; 

            const coverImg = document.createElement('img');
            coverImg.src = artist.images[0].url; 
            coverImg.alt = `Profile picture of ${artist.name}`;
            coverImg.className = 'artist-photo'; 
            coverImg.style.width = '20%'; 
            coverImg.style.height = '20%'; 
            coverImg.style.marginRight = '10px'; 
            coverImg.style.marginBottom = '10px';

            

            const nameSpan = document.createElement('span');
            nameSpan.textContent = artist.name;
            nameSpan.className = 'artist-name'; 

            artistDiv.appendChild(coverImg);
            artistDiv.appendChild(nameSpan);

            playlistContainer.appendChild(artistDiv);
        });
    }

    document.getElementById('topArtists').addEventListener('click', displayTopArtists);
    document.getElementById('topTracks').addEventListener('click', displayTopTracks);
});
