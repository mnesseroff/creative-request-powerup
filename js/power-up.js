window.TrelloPowerUp.initialize({
  'card-buttons': function(t, options) {
    return [{
      icon: {
        dark: './images/icon-light.png',
        light: './images/icon-dark.png'
      },
      text: 'Create Request',
      callback: function(t) {
        return t.modal({
          url: './form.html',
          height: 700,
          title: 'Creative Request Form'
        });
      }
    }];
  },
  'board-buttons': function(t, options) {
    return [{
      icon: {
        dark: './images/icon-light.png',
        light: './images/icon-dark.png'
      },
      text: 'New Creative Request',
      callback: function(t) {
        return t.modal({
          url: './form.html',
          height: 700,
          title: 'Creative Request Form'
        });
      }
    }];
  }
});
