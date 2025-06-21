document.addEventListener("DOMContentLoaded", function () {
  const imgBox = document.getElementById("imgBox");
  const qrImg = document.getElementById("qrImg");
  const qrText = document.getElementById("qrText");
  const generateBtn = document.getElementById("generateBtn");
  const downloadBtn = document.getElementById("downloadBtn");

  generateBtn.addEventListener("click", function () {
    const inputValue = qrText.value.trim();

    if (inputValue.length > 0) {
      const qrUrl =
        "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" +
        encodeURIComponent(inputValue);
      qrImg.src = qrUrl;
      imgBox.classList.add("show-img");
      downloadBtn.style.display = "inline-block"; // Show download button
    } else {
      qrText.classList.add("error");
      setTimeout(() => {
        qrText.classList.remove("error");
      }, 1000);
    }
  });

  downloadBtn.addEventListener("click", function () {
    const imageUrl = qrImg.src;

    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = "qr-code.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
});
