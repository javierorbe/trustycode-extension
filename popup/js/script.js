document.getElementById('save-btn').addEventListener('click', function(e) {
  const privateKeyFiles = document.getElementById('private-key-file').files;
  const certificateFiles = document.getElementById('certificate-file').files;

  if (privateKeyFiles.length === 0 || certificateFiles.length === 0) {
    alert('Please select a private key and certificate.');
    return;
  }

  const privateKeyFile = privateKeyFiles[0];
  const certificateFile = certificateFiles[0];

  const privateKeyFileReader = new FileReader();

  privateKeyFileReader.onload = (event) => {
    const privateKey = event.target.result;
    chrome.storage.local.set({ privateKey });
  };

  const certificateFileReader = new FileReader();
  certificateFileReader.onload = (event) => {
    const certificate = event.target.result;
    chrome.storage.local.set({ certificate });
  };

  privateKeyFileReader.readAsText(privateKeyFile);
  certificateFileReader.readAsText(certificateFile);

  alert('Saved!');
});
