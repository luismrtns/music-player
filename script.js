let tocando_agora = document.querySelector('.tocando')
let track_arte = document.getElementById('track-arte')
let track_name = document.querySelector('.track-name')
let track_artista = document.querySelector('.track-artista')

let playpause_btn = document.querySelector('.playpause')
let prev_btn = document.querySelector('.prev')
let next_btn = document.querySelector('.next')

let seek_slider = document.querySelector('.seek-slider')
let volume = document.querySelector('.volume-changer')
let cur_time = document.querySelector('.current-time')
let dur = document.querySelector('.duracao')
let wave = document.getElementById('wave')
let random = document.querySelector('.aleatorio')
let cur_track = document.createElement('audio')

let track_index = 0
let isPlaying = false
let isRandom = false
let updateTimer

const music_list = [
  {
    img: "imgs/foto6.jpg",
    nome: "DayLight",
    artista: "Taylor Swift",
    musica: "musicas/daylight.mp3",
  },

  {
    img: "imgs/foto8.jpg",
    nome: '1 Metro e 65',
    artista: "Sorriso Maroto",
    musica: "musicas/ummetro.mp3",
  },

  {
    img: "imgs/foto2.jpg",
    nome: 'Falta Você',
    artista: "Thiaguinho",
    musica: "musicas/faltaVoce.mp3",
  },

  {
    img: "imgs/foto7.jpg",
    nome: 'Pretexto',
    artista: "ImaginaSamba",
    musica: "musicas/pretexto.m4a",
  },

  {
    img: "imgs/foto9.jpg",
    nome: 'Anos Luz',
    artista: "Matuê",
    musica: "musicas/anosLuz.mp3",
  },

  {
    img: "imgs/foto10.jpg",
    nome: 'Energia Surreal',
    artista: "Thiaguinho",
    musica: "musicas/energiaSurreal.mp3",
  },

  {
    img: 'imgs/foto11.jpg',
    nome: 'Sou O Cara Pra Você',
    artista: 'Thiaguinho',
    musica: "musicas/souocara.m4a"
  },

  {
    img: "imgs/foto12.jpg",
    nome: 'Brigas Por Nada',
    artista: 'Sorriso Maroto',
    musica: 'musicas/brigas.mp3'
  }
]

loadTrack(track_index)

function loadTrack(track_index){
  clearInterval(updateTimer)
  reset()

  cur_track.src = music_list[track_index].musica
  cur_track.load()

  track_arte.style.backgroundImage = "url(" + music_list[track_index].img + ")"
  track_name.textContent = music_list[track_index].nome
  track_artista.textContent = music_list[track_index].artista
  tocando_agora.textContent = "Tocando música " + (track_index + 1) + " de " + music_list.length
  
  updateTimer = setInterval(setUpdate, 1000)

  cur_track.addEventListener('acabou', nextTrack)
  random_bg_color()
}

function random_bg_color(){
  let hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e']
  let a

  function populate(a){
    for(let i=0; i<6; i++){
      let x = Math.round(Math.random() * 14)
      let y = hex[x]
      a += y
    }
    return a
  }
  let cor1 = populate('#')
  let cor2 = populate('#')
  var angle = 'to right'

  let gradiente = 'linear-gradient(' + angle + ',' + cor1 + ',' + cor2 + ")"
  document.body.style.background = gradiente
}

function reset(){
  cur_time.textContent = '00:00'
  dur.textContent = '00:00'
  seek_slider.value = 0
}

function randomTrack() {
  isRandom ? pauseRandom() : playRandom()
}

function playRandom(){
  isRandom = true
  random.classList.add('randomActive')
}

function pauseRandom(){
  isRandom = false
  random.classList.remove('randomActive')
}

function repeatTrack(){
  let current_index = track_index
  loadTrack(current_index)
  playTrack()
}

function playpauseTrack(){
  isPlaying ? pauseTrack() : playTrack()
}

function playTrack(){
  cur_track.play()
  isPlaying = true
  track_arte.classList.add('rotate')
  wave.classList.add('loader')
  playpause_btn.innerHTML = "<i class='bx bx-pause-circle'></i>"
}

function pauseTrack(){
  cur_track.pause()
  isPlaying = false
  track_arte.classList.remove('rotate')
  wave.classList.remove('loader')
  playpause_btn.innerHTML = "<i class='bx bx-play-circle'></i>"
}

function nextTrack(){
  if(track_index < music_list.length - 1 && isRandom === false){
    track_index += 1
  }else if(track_index < music_list.length - 1 && isRandom === true){
    let random_index = Number.parseInt(Math.random() * music_list.length)
    track_index = random_index
  }else{
    track_index = 0
  }
  loadTrack(track_index)
  playTrack()
}

function prevTrack(){
  if(track_index > 0){
    track_index -= 1
  }else{
    track_index = music_list.length - 1
  }
  loadTrack(track_index)
  playTrack()
}

function seekTo(){
  let seekto = cur_track.duration * (seek_slider.value / 100)
  cur_track.currentTime = seekto
}

function setVolume(){
  cur_track.volume = volume.value / 100
}

function setUpdate(){
  let seekPosition = 0
  if(!isNaN(cur_track.duration)){
    seekPosition = cur_track.currentTime * (100 / cur_track.duration)
    seek_slider.value = seekPosition

    let cur_minutes = Math.floor(cur_track.currentTime / 60)
    let cur_seconds = Math.floor(cur_track.currentTime - cur_minutes * 60)
    let durationMin = Math.floor(cur_track.duration / 60)
    let durationSec = Math.floor(cur_track.duration - durationMin * 60)

    if (cur_seconds < 10) {
      cur_seconds = "0" + cur_seconds
    }
    if (durationSec < 10) {
      durationSec = "0" + durationSec
    }
    if (cur_minutes < 10) {
      cur_minutes = "0" + cur_minutes
    }
    if (durationMin < 10) {
      durationMin = "0" + durationMin
    }

    cur_time.textContent = cur_minutes + ":" + cur_seconds
    dur.textContent = durationMin + ":" + durationSec
  }
}