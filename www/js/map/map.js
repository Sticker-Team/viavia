var app = {
    initialize: function() {
    this.bindEvents();
},         
bindEvents: function() {
    document.addEventListener('deviceready', this.onDeviceReady, false);
},         
onDeviceReady: function() {
    app.receivedEvent('deviceready');
},
openNativeAppWindow: function(data) {
    window.open(data, '_system');
}