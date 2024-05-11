let currentAudio = null; 

document.addEventListener('DOMContentLoaded', function() {
    const token = sessionStorage.getItem('spotifyAccessToken'); 

    async function fetchWebApi(endpoint, method, body = null) {
        const res = await fetch(`https://api.spotify.com/${endpoint}`, {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('spotifyAccessToken')}`,
            },
            method: method,
            body: body ? JSON.stringify(body) : null
        });
        if (!res.ok) {
            console.error('API request failed:', res.status, await res.text());
            return {}; 
        }
        return await res.json();
    }

    // TRACKS
    async function getTopTracks(time_range = 'long_term') {
        return (await fetchWebApi(
            `v1/me/top/tracks?time_range=${time_range}&limit=50`, 'GET'
        )).items;
    }

    async function displayTopTracks(time_range) {
        const tracks = await getTopTracks(time_range);
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

            const playButton = document.createElement('button');
            playButton.textContent = 'Play Track';
            playButton.className = 'play-button';  
            playButton.onclick = () => {
                if (currentAudio && !currentAudio.paused) {
                    currentAudio.pause();
                    currentAudio.currentTime = 0; 
                }
                currentAudio = new Audio(track.preview_url);
                currentAudio.play();
            };
    
            trackDiv.appendChild(coverImg);
            trackDiv.appendChild(titleSpan);
            trackDiv.appendChild(artistSpan);
            trackDiv.appendChild(playButton);
    
            playlistContainer.appendChild(trackDiv);
        });
    }

    document.getElementById('topTracks').addEventListener('click', displayTopTracks);

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

    // LAST 50 TRACKS
    async function getRecentlyPlayedTracks() {
        const response = await fetchWebApi('v1/me/player/recently-played?limit=50', 'GET');
        return response.items || []; 
    }
    
    async function displayRecentlyPlayedTracks() {
        const tracks = await getRecentlyPlayedTracks();
        const playlistContainer = document.getElementById('playlist-container');
        playlistContainer.innerHTML = '';
    
        if (!tracks.length) {
            console.log('No recently played tracks available.');
            playlistContainer.innerHTML = '<p>No recently played tracks available.</p>';
            return;
        }
    
        tracks.forEach(item => {
            const track = item.track;
            const trackDiv = document.createElement('div');
            trackDiv.className = 'song-item';
            
            const coverImg = document.createElement('img');
            coverImg.src = track.album.images.length ? track.album.images[0].url : 'placeholder.jpg';
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

            const playButton = document.createElement('button');
            playButton.textContent = 'Play Track';
            playButton.className = 'play-button';  
            playButton.onclick = () => {
                if (currentAudio && !currentAudio.paused) {
                    currentAudio.pause();
                    currentAudio.currentTime = 0; 
                }
                currentAudio = new Audio(track.preview_url);
                currentAudio.play();
            };
            
            trackDiv.appendChild(coverImg);
            trackDiv.appendChild(titleSpan);
            trackDiv.appendChild(artistSpan);
            trackDiv.appendChild(playButton);
    
            playlistContainer.appendChild(trackDiv);
        });
    }        

    document.getElementById('topArtists').addEventListener('click', displayTopArtists);
    document.getElementById('recentTracks').addEventListener('click', displayRecentlyPlayedTracks);
    document.getElementById('topTracks').addEventListener('click', () => displayTopTracks('long_term'));
    document.getElementById('topTracksShort').addEventListener('click', () => displayTopTracks('short_term'));
    document.getElementById('topTracksMedium').addEventListener('click', () => displayTopTracks('medium_term'));
});