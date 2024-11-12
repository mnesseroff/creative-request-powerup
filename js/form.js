var t = window.TrelloPowerUp.iframe();

document.getElementById('requestForm').addEventListener('submit', function(event) {
  event.preventDefault();
  
  var formData = {
    requester: document.getElementById('requester').value,
    description: document.getElementById('description').value,
    dueDate: document.getElementById('dueDate').value,
    videoLength: document.getElementById('videoLength').value,
    formats: {
      landscape: document.getElementById('landscape').checked,
      stories: document.getElementById('stories').checked,
      square: document.getElementById('square').checked,
      portrait: document.getElementById('portrait').checked
    },
    assets: document.getElementById('assets').value,
    message: document.getElementById('message').value,
    references: document.getElementById('references').value
  };

  var description = `
Requester: ${formData.requester}

Description:
${formData.description}

Due Date: ${formData.dueDate}

Video Specs:
- Length: ${formData.videoLength}
- Formats: ${Object.entries(formData.formats)
    .filter(([_, checked]) => checked)
    .map(([format]) => format)
    .join(', ')}

Assets:
${formData.assets}

Message/Copy:
${formData.message}

References:
${formData.references}
  `;

  t.board('id', 'name')
    .then(function(board) {
      return t.list('id', 'name')
        .then(function(list) {
          return t.set('board', 'shared', 'requestList', list.id)
            .then(function() {
              return t.card('new', {
                name: `${formData.requester} - ${formData.description.substring(0, 50)}...`,
                desc: description,
                due: new Date(formData.dueDate).toISOString(),
                idList: list.id,
                pos: 'top'
              });
            });
        });
    })
    .then(function() {
      t.closeModal();
      t.alert({
        message: 'Creative request submitted successfully!',
        duration: 5
      });
    })
    .catch(function(error) {
      console.error('Error creating card:', error);
      t.alert({
        message: 'There was an error submitting your request. Please try again.',
        duration: 5,
        display: 'error'
      });
    });
});

// Add form validation
document.getElementById('requestForm').addEventListener('input', function(event) {
  var submitButton = document.querySelector('button[type="submit"]');
  submitButton.disabled = !this.checkValidity();
});
