// Task elements
const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('list-container');

// Sounds
const completeSound = new Audio('sounds/completed.mp3');
const deleteSound = new Audio('sounds/deleted.wav');
const errorSound = new Audio('sounds/errorsound.wav');
const partySound = new Audio('sounds/party.wav');

// Add new task
function addTask() {
  if(inputBox.value.trim() === '') {
    errorSound.play();
    alert("Please enter a task!");
    return;
  }
  
  // Create task element
  const li = document.createElement("li");
  li.innerHTML = inputBox.value;
  
  // Add delete button
  const span = document.createElement("span");
  span.innerHTML = "\u00d7";
  li.appendChild(span);
  
  // Add to list
  listContainer.appendChild(li);
  inputBox.value = "";
  
  saveData();
}

// Check if all tasks are completed
function allTasksCompleted() {
  const tasks = document.querySelectorAll('#list-container li');
  if(tasks.length === 0) return false;
  
  for(let task of tasks) {
    if(!task.classList.contains('checked')) return false;
  }
  return true;
}

// Create celebration effect
function celebrate() {
  // Create confetti
  const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
  const container = document.querySelector('.container');
  
  for(let i = 0; i < 100; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
    container.appendChild(confetti);
    
    // Remove after animation
    setTimeout(() => {
      confetti.remove();
    }, 5000);
  }
  
  // Show message
  const message = document.createElement('div');
  message.className = 'celebration-message';
  message.textContent = '🎉 All Tasks Completed! 🎉';
  document.body.appendChild(message);
  
  // Play sound
  partySound.play();
  
  // Remove message after 3 seconds
  setTimeout(() => {
    message.remove();
  }, 3000);
}

// Handle task clicks
listContainer.addEventListener('click', function(e) {
  if(e.target.tagName === 'LI') {
    // Toggle completion
    e.target.classList.toggle('checked');
    completeSound.play();
    saveData();
    
    // Check if all tasks are done
    if(allTasksCompleted()) {
      celebrate();
    }
  } 
  else if(e.target.tagName === 'SPAN') {
    // Delete task
    deleteSound.play();
    e.target.parentElement.remove();
    saveData();
  }
});

// Save tasks to local storage
function saveData() {
  localStorage.setItem('todo-data', listContainer.innerHTML);
}

// Load tasks from local storage
function loadData() {
  const data = localStorage.getItem('todo-data');
  if(data) {
    listContainer.innerHTML = data;
    
    // Check if all loaded tasks are completed
    if(allTasksCompleted()) {
      setTimeout(celebrate, 500);
    }
  }
}

// Initialize
loadData();

// Add task on Enter key
inputBox.addEventListener('keypress', function(e) {
  if(e.key === 'Enter') {
    addTask();
  }
});