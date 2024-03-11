
var cardArea = document.querySelector('#card_area'); // card area

function clearCards() {
  if (cardArea != null){
    while(cardArea.hasChildNodes()) {
      cardArea.removeChild(cardArea.lastChild);
    }
  }
}

function createCard(data) {
  if (cardArea != null) {
    var container = document.createElement('div');
    container.className = 'container_card';

    var cardWrapper = document.createElement('div');
    cardWrapper.className = 'custom-card';
    cardWrapper.style.backgroundImage = 'url(' + data.image + ')';
    cardWrapper.style.height = '180px';

    var customContent = document.createElement('div');
    customContent.className = 'custom-content';
    cardWrapper.appendChild(customContent);

    var titleCard = document.createElement('div');
    titleCard.className = 'ellipsis';
    titleCard.style.fontSize = '14px';
    titleCard.textContent = data.title;
    customContent.appendChild(titleCard);

    var customIcons = document.createElement('div');
    customIcons.className = 'custom-icons';
    customContent.appendChild(customIcons);

    var iconLink = document.createElement('a');
    iconLink.href = '#';
    customIcons.appendChild(iconLink);

    var icon = document.createElement('i');
    icon.className = 'fa-regular fa-bookmark';
    iconLink.appendChild(icon);

    var iconLink = document.createElement('a');
    iconLink.href = '#';
    customIcons.appendChild(iconLink);

    var icon = document.createElement('i');
    icon.className = 'fa-regular fa-heart';
    iconLink.appendChild(icon);

    cardWrapper.addEventListener('click', function() {
        window.location.href = '/../../detail.html' + '?id=' + encodeURIComponent(data.id) + '&title=' + encodeURIComponent(data.title) + '&creator=' + encodeURIComponent(data.creator) + '&image=' + encodeURIComponent(data.image)
    });
    container.appendChild(cardWrapper);

    var profileImage = document.createElement('div');
    profileImage.className = 'profile-image';
    profileImage.style.backgroundImage = 'url(' + data.image + ')';
    container.appendChild(profileImage);

    var ellipsisText = document.createElement('div');
    ellipsisText.className = 'ellipsis';
    ellipsisText.textContent = data.creator;
    container.appendChild(ellipsisText);

    cardArea.appendChild(container);
}
}

function updateUI(data) {
  clearCards();
  for (var i = 0; i < data.length; i++) {
    createCard(data[i]);
  }
}

var url = 'https://tes1-c14210211-default-rtdb.firebaseio.com/posts.json';
var networkDataReceived = false;

// setiap pindah page akan di sync data yg di firebase
fetch(url)
  .then(function(res) {
    return res.json();
  })
  .then(function(data) {
    networkDataReceived = true;
    console.log('From web', data);
    var dataArray = [];
    for (var key in data) {
      dataArray.push(data[key]);
    }
    updateUI(dataArray);
  })
  // .catch(function(error) {
  //   console.log("Network is offline")
  // })
  ;

if ('indexedDB' in window) {
  readAllData('posts')
    .then(function(data) {
      if (!networkDataReceived) {
        console.log('From cache', data);
        updateUI(data);
      }
    });
}
