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
    var serviceGlobal;
  log('Requesting Bluetooth Device...');
  navigator.bluetooth.requestDevice({filters: [{services: ["6ae936ae-f33b-4836-8a2b-4d38db8bcaf0"]}]})
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
    serviceGlobal=service;
    return service.getCharacteristic("6ae936ae-f33b-4836-8a2b-4d38db8bcaf1");
  })
  .then(characteristic => {
        log('Getting Chafsafasfracteristic...');
    let encoder = new TextEncoder('utf-8');
    let userDescription = encoder.encode(document.querySelector('#characteristic').value);
    return characteristic.writeValue(userDescription);
  })
 .then(_ => {
        log('ssid has been sent.');
    return serviceGlobal.getCharacteristic("6ae936ae-f33b-4836-8a2b-4d38db8bcaf2");
    })
.then(characteristic => {
        log('Getting Chafsafasfracteristic...');
    let encoder = new TextEncoder('utf-8');
    let userDescription = encoder.encode('Sm9Rg2olh6HB5V9YY6NabAAUhpdgWAbS+robqdGZXW246vKfgwbBwUbg16oE1kmKJKEbvYmMSki35L0aI+YW6tSMjgJzuc+/XK8HmylZlDG2LXx+E4/QEPNaMogvFSbB');
    return characteristic.writeValue(userDescription);
})
.then(_ => {
        log('pass has been sent.');
    return serviceGlobal.getCharacteristic("6ae936ae-f33b-4836-8a2b-4d38db8bcaf3");
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
