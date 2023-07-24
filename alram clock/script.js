
let hours= document.getElementById('hour');
let minutes = document.getElementById("minutes");
var audioPlayer = document.getElementById('audioPlayer');
let alarms = document.getElementById("alarms");
let id=0;
(function() {
    for (let i = 1; i <= 12; i++) {
        hours.innerHTML += `<option value="${i}">${i}</option>`;
    }
  })();
  ( function() {
    for (let i = 0; i <= 60; i++) {
      if(i<10){
        i=String(i).padStart(2, '0');
      }
      minutes.innerHTML += `<option value="${i}">${i}</option>`;
    }
  })();
  function showAlert(message) {return new Promise((resolve) => {
    const customAlert = document.getElementById('customAlert');
    const customAlertMessage = document.getElementById('customAlertMessage');
    const customAlertButton = document.getElementById('customAlertButton');

    customAlertMessage.innerText = message;
    customAlertButton.onclick = function () {
      customAlert.style.display = 'none';
      resolve(); };

    customAlert.style.display = 'flex';
  });
  }
  



  async function alarm(hour, minutes, id) {
    let intervalid = setInterval(async function () {
      let alarmEle = document.getElementById(id);
      let date = new Date();
  
      if (alarmEle == null) {
        console.log('clear', alarmEle);
        clearInterval(intervalid);
      }
  
      if (date.getHours() == hour && date.getMinutes() == minutes) {
        audioPlayer.play();
        await showAlert('The time set for the alarm is up'); // Wait until the custom alert is resolved
        clearInterval(intervalid);
        alarmEle.remove();
        audioPlayer.pause();
        audioPlayer.currentTime = 0;
      }
    }, 10000);
  }
  

  document.addEventListener('submit', function(event) {
    // Your click event handler code can go here.
    event.preventDefault();
    let hours= document.getElementById('hour');
let minutes = document.getElementById("minutes");
let gmt =document.getElementById("gmt");

let hour = hours.value;

hour=parseInt(hour)
if(gmt.value=="PM"&& hour!=12){
  hour=hour+12;
}

console.log(parseInt(minutes.value),hour)
  


    let listItem = document.createElement('li');
    listItem.innerHTML = ` <p>${hours.value} : ${minutes.value} ${gmt.value} </p> `;
    listItem.id  =id;
    
    // Create the "Delete" button and give it the ID value
    let deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
    deleteButton.value = id; // Assign the ID value to the button
    deleteButton.addEventListener('click', function() {
      
      
      console.log(document.getElementById(deleteButton.value).remove());

       
    });
    
    listItem.appendChild(deleteButton);

    alarms.appendChild(listItem);


   alarm(hour,parseInt(minutes.value),id++);

  });

  