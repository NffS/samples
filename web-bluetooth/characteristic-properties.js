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
    log('Getting Characteristic...');
    return service.getCharacteristic(characteristicUuid);
  })
  .then(characteristic => {
   
    log('> Characteristic UUID:  ' + characteristic.uuid);
    log('> Broadcast:            ' + characteristic.properties.broadcast);
    log('> Read:                 ' + characteristic.properties.read);
    log('> Write w/o response:   ' +
      characteristic.properties.writeWithoutResponse);
    log('> Write:                ' + characteristic.properties.write);
    log('> Notify:               ' + characteristic.properties.notify);
    log('> Indicate:             ' + characteristic.properties.indicate);
    log('> Signed Write:         ' +
      characteristic.properties.authenticatedSignedWrites);
    log('> Queued Write:         ' + characteristic.properties.reliableWrite);
    log('> Writable Auxiliaries: ' +
      characteristic.properties.writableAuxiliaries);
  characteristic.readValue();
  })
 .then(value => {
  console.log('value ' + value.getUint8(0));
})
  .catch(error => {
    log('Argh! ' + error);
  });
}
