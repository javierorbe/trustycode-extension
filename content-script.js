const extId = 'edcbaigfpaelnllkmdgiipgfgeekamfb';

window.addEventListener('message', (event) => {
  if (event.source !== window) {
    return;
  }

  if (event.data?.type !== 'CERTIFY_COMMIT') {
    // event.source.postMessage(response, event.origin);
    return;
  }

  const message = {type: 'REQUEST_SIGNING_KEY'};

  chrome.runtime.sendMessage(extId, message, (response) => {
    const { privateKey, certificate } = response;
    const sig = new KJUR.crypto.Signature({'alg': 'SHA256withRSA'});

    const { hash } = event.data;

    sig.init(privateKey);
    sig.updateString(hash);
    const sigValueHex = sig.sign();
    console.log(sigValueHex);

    window.postMessage({
      type: 'CERTIFIED_COMMIT',
      hash,
      signature: sigValueHex,
      certificate,
    }, '*');
  });
});
