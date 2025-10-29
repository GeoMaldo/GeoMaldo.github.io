const video = document.getElementById('camera');
const canvas = document.getElementById('canvas');
const output = document.getElementById('output');

navigator.mediaDevices.getUserMedia({ video: true })
.then(stream => video.srcObject = stream);

document.getElementById('capture').onclick = async () => {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext('2d').drawImage(video, 0, 0);

  const imgData = canvas.toDataURL('image/png');
  output.textContent = "Procesando...";

  const result = await Tesseract.recognize(imgData, 'spa');
  const text = result.data.text;

  const fecha = text.match(/\b\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}\b/);
  const total = text.match(/(?i)total[^\d]*([\d\.,]+)/i);
  const nit = text.match(/(?i)nit[:\s]*([\d\-]+)/i);

  output.textContent = JSON.stringify({
    fecha: fecha?.[0],
    total: total?.[1],
    nit: nit?.[1],
    raw: text
  }, null, 2);
};
