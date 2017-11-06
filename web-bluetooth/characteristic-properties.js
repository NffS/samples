 document.querySelector('#service').value = "caecface-e1d9-11e6-bf01-fe55135034f0";
  document.querySelector('#characteristic').value = "caec2ebc-e1d9-11e6-bf01-fe55135034f1";

function onButtonClick() {
  let serviceUuid = document.querySelector('#service').value;
  if (serviceUuid.startsWith('0x')) {
    serviceUuid = parseInt(serviceUuid);
  }

  let characteristicUuid = document.querySelector('#characteristic').value;
  if (characteristicUuid.startsWith('0x')) {
    characteristicUuid = parseInt(characteristicUuid);
  }

  log('Requesting Bluetooth Device...');
  navigator.bluetooth.requestDevice({filters: [{services: [serviceUuid]}]})
  .then(device => {
    log('Connecting to GATT Server...');
    return device.gatt.connect();
  })
  .then(server => {
    log('Getting Service...');
    return server.getPrimaryService(serviceUuid);
  })
  .then(service => {
        log('Getting getCharacteristic...');
    return service.getCharacteristic(characteristicUuid);
  })
  .then(characteristic => {
        log('Getting Chafsafasfracteristic...');
    let encoder = new TextEncoder('utf-8');
    let userDescription = encoder.encode('ssid');
    return characteristic.writeValue(userDescription);
  })
 .then(_ => {
        log('ssid has been sent.');
    return service.getCharacteristic("6ae936ae-f33b-4836-8a2b-4d38db8bcaf2");
    })
.then(characteristic => {
        log('Getting Chafsafasfracteristic...');
    let encoder = new TextEncoder('utf-8');
    let userDescription = encoder.encode('YyAXCAMhxb3Wajm+ayov8l9xc9asuKCkZKXtX79V20qXxECRhAb72+kyE+Ng1nhoUvBB1zxgtk9Q0UlCj8RQ/9zJ68uN7b+mGfFkmO8P0jRLdvlpHY5Eb0JsZojT3yan');
    return characteristic.writeValue(userDescription);
})
.then(_ => {
        log('pass has been sent.');
    return service.getCharacteristic("6ae936ae-f33b-4836-8a2b-4d38db8bcaf3");
})
.then(characteristic => {
        log('Getting Chafsafasfracteristic...');
    let encoder = new TextEncoder('utf-8');
    let userDescription = encoder.encode('afsafasf@gasga.com');
    return characteristic.writeValue(userDescription);
})
.then(_ => {
        log('owner has been sent.');
})
  .catch(error => {
    log('Argh! ' + error);
  });
}
