chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'REQUEST_SIGNING_KEY') {
    chrome.storage.local.get(['privateKey', 'certificate'], (result) => {
      sendResponse({
        privateKey: result.privateKey,
        certificate: result.certificate,
      });
    });
  }
  return true;
});
