//* todo:
//* - TaskPad Template in eigene Datei auslagern
//* - TaskPad um Funktionen erweitern
//* - TaskPad ggf. ausgestalten
//* - TaskPad um weitere Eingaben erweitern
//* - Nice-to-have: Dark-Mode, Multi-User, Mehrsprachig etc.
//* ----------------------------------------------- Datum: 12.03.2023 

// Leeres Array für Tasks
let tasks = [];

// Template für Task
//? HTML-Template-Strings ggf. schlanker aufbauen?!
const taskTemplate = (task) => {
  return `
    <li class="tasklist__item task">
      <span class="task__label">${task}</span>
      <button 
        class="btn btn--del" 
        onclick="delTask()">
      </button>
    </li>
  `;
}


const addTask = () => {
  const task = document.querySelector('#task').value;
  const taskList = document.querySelector('#taskList');
  // Taskliste leeren
  taskList.innerHTML = '';
  // Task in Array speichern
  tasks.push(task);
  // im localStorage speichern
  localStorage.setItem('tasks', JSON.stringify(tasks));
  // Taskliste neu laden
  tasks.forEach((task) => {
    taskList.innerHTML += taskTemplate(task);
  });
}

/* Task hinzufügen, wenn Enter gedrückt wird
  * Quellen:
  * https://stackoverflow.com/questions/7060750/detect-the-enter-key-in-a-text-input-field
  * https://developer.mozilla.org/en-US/docs/Web/API/Element/keyup_event
  * Notiz für mich: weiter vertiefen
*/
document.querySelector('#task').addEventListener("keyup", ({key}) => {
  //? Verlinkte Quellen weiter lernen und einsetzen
  if (key === 'Enter') {
    addTask();
  }
});

const delTask = () => {
  const taskList = document.querySelector('#taskList');
  // Taskliste leeren
  taskList.innerHTML = '';
  // Task aus Array entfernen
  //? push() und splice() weiter lernen und einsetzen
  tasks.splice(0, 1);
  // Task aus localStorage entfernen
  localStorage.removeItem('tasks');
  // Taskliste neu laden
  tasks.forEach((task) => {
    taskList.innerHTML += taskTemplate(task);
    // im localStorage speichern
    localStorage.setItem('tasks', JSON.stringify(tasks));
  });
}

// Tasks aus localStorage laden
const loadTasks = () => {
  const taskList = document.querySelector('#taskList');
  // Taskliste leeren
  taskList.innerHTML = '';
  // Tasks aus localStorage laden
  //? Kapitel dazu nochmal anschauen, weiter vertiefen
  const tasks = JSON.parse(localStorage.getItem('tasks'));
  // Taskliste neu laden
  //? Unterschiedliche Schreibweisen weiter lernen und einsetzen
  tasks.forEach((task) => {
    taskList.innerHTML += taskTemplate(task);
  });
};

// Tasks laden, wenn Seite geladen wird
//? Equivalent zu onload im HTML!?
window.onload = loadTasks;

