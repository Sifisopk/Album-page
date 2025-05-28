 const tracks = [
        { title: "Anatii wena",  src: "music/anatii_wena_mp3_56406.mp3" },
        { title: "Asibe Happy", src: "music/asibe_happy_radio_mp3_56107.mp3" },
        { title: "Black Coffee: you need me", src: "music/black_coffee_you_need_me_feat._sun-el_musician_maxine_ashley_mp3_55801.mp3" },
        { title: "Jeremy Loops: waves", src: "music/jeremy_loops_waves_4k_mp3_58287.mp3" },
        { title: "Love Everlasting", src: "music/love_everlasting_mp3_56744.mp3" },
        { title: "Mike Posner: i took a pill in ibiza", src: "music/mike_posner_i_took_a_pill_in_ibiza_lyrics_mp3_58773.mp3" },
        { title: "Shekhinah: please mr", src: "music/shekhinah_please_mr_official_audio_mp3_58566.mp3" },
        { title: "Shekhinah: suited", src: "music/shekhinah_suited_official_audio_mp3_58414.mp3" }
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