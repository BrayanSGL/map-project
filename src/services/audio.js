export class AudioServices {
  constructor() {
    this.audio = new Audio();
  }

  async playAudio() {
    this.audio.src = "../../public/sound_terminal.wav";
    this.audio.play();
  }

}