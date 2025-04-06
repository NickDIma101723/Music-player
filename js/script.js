document.addEventListener('DOMContentLoaded', () => {
    // Song Array (Playlist)
    const playlist = [
        { 
            title: "Tyler, The Creator - SEE YOU AGAIN (ft. Kali Uchis)", 
            url: "songs/riptide.m4a",
            cover: "images/Riptide.jpg" 
        },
        { 
            title: "Civ - 1 AM", 
            url: "Civ - 1 AM (Lyrics) pop out at 1 in the mornin' [Hl_OrpdBWLw].mp3",
            cover: "images/1am.jpg" 
        },
        { 
            title: "Post Malone, Swae Lee - Sunflower", 
            url: "Post Malone, Swae Lee - Sunflower (Spider-Man_ Into the Spider-Verse) (Official Video).mp3",
            cover: "images/sunflower.jpg" 
        }
    ];
    let currentSongIndex = 0;

    // DOM Elements
    const audio = document.getElementById('audioPlayer');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const forwardBtn = document.getElementById('forwardBtn');
    const rewindBtn = document.getElementById('rewindBtn');
    const prevBtn = document.getElementById('prevBtn');
    const progressBar = document.getElementById('progressBar');
    const currentTimeDisplay = document.getElementById('currentTime');
    const durationDisplay = document.getElementById('duration');
    const albumCover = document.getElementById('albumCover');

    // Debugging
    if (!audio) console.error("Audio element not found!");
    if (!albumCover) console.error("Album cover element not found!");
    if (!playPauseBtn) console.error("Play/Pause button not found!");
    if (!forwardBtn) console.error("Forward button not found!");
    if (!rewindBtn) console.error("Rewind button not found!");
    if (!prevBtn) console.error("Previous button not found!");
    if (!progressBar) console.error("Progress bar not found!");
    if (!currentTimeDisplay) console.error("Current time display not found!");
    if (!durationDisplay) console.error("Duration display not found!");

    // Load Song Function
    function loadSong(index) {
        if (audio && albumCover) {
            audio.src = playlist[index].url;
            albumCover.src = playlist[index].cover;
            audio.load();
            progressBar.value = 0;
            currentTimeDisplay.textContent = "0:00";
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        } else {
            console.error("Cannot load song: audio or albumCover is null");
        }
    }

    // Format Time Function
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' + secs : secs}`;
    }

    // Initial Song Load
    loadSong(currentSongIndex);

    // Event Listeners (only if elements exist)
    if (audio) {
        audio.addEventListener('loadedmetadata', () => {
            durationDisplay.textContent = formatTime(audio.duration);
            progressBar.max = audio.duration;
        });

        audio.addEventListener('ended', () => {
            currentSongIndex = (currentSongIndex + 1) % playlist.length;
            loadSong(currentSongIndex);
            audio.play();
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        });

        audio.addEventListener('timeupdate', () => {
            progressBar.value = audio.currentTime;
            currentTimeDisplay.textContent = formatTime(audio.currentTime);
        });
    }

    if (playPauseBtn) {
        playPauseBtn.addEventListener('click', () => {
            if (audio.paused) {
                audio.play();
                playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            } else {
                audio.pause();
                playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
            }
        });
    }

    if (forwardBtn) {
        forwardBtn.addEventListener('click', () => {
            audio.currentTime = Math.min(audio.currentTime + 10, audio.duration);
        });
    }

    if (rewindBtn) {
        rewindBtn.addEventListener('click', () => {
            audio.currentTime = Math.max(audio.currentTime - 10, 0);
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
            loadSong(currentSongIndex);
            audio.play();
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        });
    }

    if (progressBar) {
        progressBar.addEventListener('input', () => {
            audio.currentTime = progressBar.value;
            currentTimeDisplay.textContent = formatTime(audio.currentTime);
        });
    }
});