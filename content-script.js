window.addEventListener('message', (event) => {
  if (event.source !== window) {
    return;
  }

  if (event.data?.type !== 'CERTIFY_COMMIT') {
    return;
  }

  const message = {type: 'REQUEST_SIGNING_KEY'};

  chrome.runtime.sendMessage(chrome.runtime.id, message, (response) => {
    const { privateKey, certificate } = response;
    const sig = new KJUR.crypto.Signature({'alg': 'SHA256withRSA'});

    const { commitHash } = event.data;

    sig.init(privateKey);
    sig.updateString(commitHash);
    const sigValueHex = sig.sign();

    window.postMessage({
      type: 'CERTIFIED_COMMIT',
      commitHash,
      signature: sigValueHex,
      certificate,
    }, '*');
  });
});
