export class WebcamService {
  constructor(videoElement, canvasElement) {
    this.videoElement = videoElement;
    this.canvasElement = canvasElement;
    this.stream = null;
  }

  // Método para iniciar la webcam
  async startWebcam() {
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({ video: true });
      this.videoElement.srcObject = this.stream;
      this.videoElement.play();
    } catch (error) {
      console.error("Error al acceder a la webcam:", error);
    }
  }

  // Método para capturar la imagen
  captureImage() {
    const context = this.canvasElement.getContext('2d');
    context.drawImage(this.videoElement, 0, 0, this.canvasElement.width, this.canvasElement.height);
    return this.canvasElement.toDataURL('image/png'); // Devuelve la imagen como data URL
  }

  // Método para detener la webcam
  stopWebcam() {
    if (this.stream) {
      const tracks = this.stream.getTracks();
      tracks.forEach(track => track.stop());
    }
    this.videoElement.srcObject = null;
  }
}

// Uso de la clase
// const simpleWebcamService = new SimpleWebcamService('video', 'canvas');
// simpleWebcamService.init();
// document.getElementById('snap').addEventListener('click', () => simpleWebcamService.takePhoto());