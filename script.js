 const tracks = [
        { title: "Track 1",  src: "music/no-copyright-music-lofi-330213.mp3" },
        { title: "Track 2", src: "music/no-copyright-music-soft-background-380073.mp3" },
        { title: "Track 3", src: "music/no-copyright-music-soft-background-382054.mp3" },
        { title: "Track 4", src: "music/no-copyright-music-331167.mp3" },
        { title: "Track 5", src: "music/no-copyright-music-371133.mp3" },
        { title: "Track 6", src: "music/no-copyright-music-382074.mp3" },
        { title: "Track 7", src: "music/background-corporate-music-short-version-65sec-no-copyright-music-378978.mp3" },
        { title: "Track 8", src: "music/background-technology-music-no-copyright-369855.mp3" }
    ];

    const playlistElement = document.getElementById('playlist');
    const playResumeBtn = document.getElementById('play-resume-btn');

    let audioElements = [];
    let currentIndex = 0;
    let currentPlayingAudio = null;
    let hasStarted = false;

    // audio elements for each track
    function createTrackElements(trackList) {
        playlistElement.innerHTML = '';
        audioElements = [];

        trackList.forEach((track, index) => {
            const trackElement = document.createElement('div');
            trackElement.className = 'track';

            const audio = document.createElement('audio');
            audio.src = track.src;
            audio.preload = "metadata";
            audio.controls = true;

                    audio.addEventListener('play', () => {
                if (currentPlayingAudio && currentPlayingAudio !== audio) {
                    currentPlayingAudio.pause();
                }
                currentPlayingAudio = audio;
                currentIndex = index;
                hasStarted = true;
                playResumeBtn.innerHTML = '<i class="fas fa-pause"></i> Pause';
            });

            audio.addEventListener('pause', () => {
                if (currentPlayingAudio === audio) {
                    playResumeBtn.innerHTML = '<i class="fas fa-play"></i> Resume';
                }
            });

            audio.addEventListener('ended', () => {
                currentIndex++;
                if (currentIndex < audioElements.length) {
                    audioElements[currentIndex].play();
                } else {
                    hasStarted = false;
                    playResumeBtn.innerHTML = '<i class="fas fa-play"></i> Play';
                }
            });

           trackElement.innerHTML = `<div class="track-info"></i> ${track.title}</div>`;

            trackElement.appendChild(audio);
            playlistElement.appendChild(trackElement);

            audioElements.push(audio);
        });
    }

    // Handle play/resume button toggle
    function togglePlayResume() {
        if (!hasStarted) {
            currentIndex = 0;
            hasStarted = true;
            audioElements[currentIndex].play();
        } else if (currentPlayingAudio) {
            if (currentPlayingAudio.paused) {
                currentPlayingAudio.play();
            } else {
                currentPlayingAudio.pause();
            }
        }
    }

    // Initialize
    createTrackElements(tracks);
    playResumeBtn.addEventListener('click', togglePlayResume);