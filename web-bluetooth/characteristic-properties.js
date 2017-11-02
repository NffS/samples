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
    log('Getting Chafsafasfracteristic...');
    return service.getCharacteristic(characteristicUuid);
  })
  .then(characteristic => {
    return characteristic.readValue();
  })
 .then(value => {
  console.log('value ' + value.getUint8(0));
})
  .catch(error => {
    log('Argh! ' + error);
  });
}
