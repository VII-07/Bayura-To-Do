// Import our custom CSS
import '../styles/main.scss';

// Import all of Bootstrap's JS
import 'bootstrap';

const input = document.querySelector('.task__input');
const addTaskBtn = document.querySelector('.todo__add');
const toDoItems = document.querySelector('.todo__items');
const doneItem = document.querySelector('.todo__items__done');
const dateInput = document.querySelector('.task__dedline');
const overdueItem = document.querySelector('.todo__items__overdue');
const selectElement = document.querySelector('.todo__options');
let tasks = [];

//зчитує з локал стореч якщо 'task' існує
if(localStorage.getItem('tasks')){
    tasks = JSON.parse(localStorage.getItem('tasks')).reverse();
}
tasks.forEach((task) => renderTask(task));

//додає завдання при нажиманні Enter
input.addEventListener('keydown', (e) => {
    if(e.code == 'Enter'){
        e.preventDefault();
        addTask();
    }
});
//додає завдання при кліку на кнопку
addTaskBtn.addEventListener('click', () => {
addTask();
});
//додає завдання при кліку enter в inputDate
dateInput.addEventListener('keydown', (e) => {
    if(e.code == 'Enter'){
        e.preventDefault();
        addTask();
    }
});
//удаляє завдання з toDoItems
toDoItems.addEventListener('click', (e) => {
removeNote(e);
});
//відмічає завдання як виконане в ToDoItems
toDoItems.addEventListener('click', (e) => {
addDone(e);
});
//видаляє завдання з domeItems
doneItem.addEventListener('click', (e) => {
removeNote(e);
})
//видаляє завдання х overdueItems
overdueItem.addEventListener('click', (e) => {
    removeNote(e);
})
// відмічає просрочене завдання як виконане
overdueItem.addEventListener('click', (e) => {
    addDone(e);
})
// вибір фільтра
selectElement.addEventListener('change', (event) => {
    selectFilter(event.target.value);
});

//додає завдання
function addTask() {
    let inputValue = input.value;
    let dateVelue = dateInput.value;


    //перевірка на те чи інпат пустий або в ньому пробіли
    if(inputValue.trim().replace(/\s/g, "") == 0) {
        alert('Поле пусте або ви ввели тільки пробіли.')
        input.value = '';
    } else {
           //створюємо обєкт і додаємо до масиву
        const newTask = {
            id: Date.now(),
            text: inputValue,
            done: false,
            deadline: dateVelue,
            subsequently: false,
            overdue: false,
            }
        tasks.unshift(newTask);
        console.log(dateVelue);

        saveToLocalStorage();
        renderTask(newTask);
        toDoItemIsEmpty();

        input.value = '';
        dateInput.value = '';
        input.focus();
    }
};
//перевіряє чи список пустий
function toDoItemIsEmpty() {
    if(tasks.length === 0) {
        const emptyListHtml = `<li class="empty__list">
        <span class="empty__list__text">Ваш список справ пустий</span>
        <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciICB2aWV3Qm94PSIwIDAgNjQgNjQiIHdpZHRoPSI1MTJweCIgaGVpZ2h0PSI1MTJweCI+PGxpbmVhckdyYWRpZW50IGlkPSJqNjBWQ3RLQjlaVDl0MnN2clpUVGZhIiB4MT0iMTkiIHgyPSIxOSIgeTE9IjE1IiB5Mj0iMjMiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiM4YWI0ZmYiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNlNDkyZmYiLz48L2xpbmVhckdyYWRpZW50PjxjaXJjbGUgY3g9IjE5IiBjeT0iMTkiIHI9IjQiIGZpbGw9InVybCgjajYwVkN0S0I5WlQ5dDJzdnJaVFRmYSkiLz48bGluZWFyR3JhZGllbnQgaWQ9Imo2MFZDdEtCOVpUOXQyc3ZyWlRUZmIiIHgxPSIxOSIgeDI9IjE5IiB5MT0iMjgiIHkyPSIzNiIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iIzhhYjRmZiIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2U0OTJmZiIvPjwvbGluZWFyR3JhZGllbnQ+PGNpcmNsZSBjeD0iMTkiIGN5PSIzMiIgcj0iNCIgZmlsbD0idXJsKCNqNjBWQ3RLQjlaVDl0MnN2clpUVGZiKSIvPjxsaW5lYXJHcmFkaWVudCBpZD0iajYwVkN0S0I5WlQ5dDJzdnJaVFRmYyIgeDE9IjE5IiB4Mj0iMTkiIHkxPSI0MSIgeTI9IjQ5IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjOGFiNGZmIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZTQ5MmZmIi8+PC9saW5lYXJHcmFkaWVudD48Y2lyY2xlIGN4PSIxOSIgY3k9IjQ1IiByPSI0IiBmaWxsPSJ1cmwoI2o2MFZDdEtCOVpUOXQyc3ZyWlRUZmMpIi8+PGxpbmVhckdyYWRpZW50IGlkPSJqNjBWQ3RLQjlaVDl0MnN2clpUVGZkIiB4MT0iMzIiIHgyPSIzMiIgeTE9IjkiIHkyPSI1NSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iIzFBNkRGRiIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI0M4MjJGRiIvPjwvbGluZWFyR3JhZGllbnQ+PHBhdGggZmlsbD0idXJsKCNqNjBWQ3RLQjlaVDl0MnN2clpUVGZkKSIgZD0iTTE5LDI3Yy0yLjc1NywwLTUsMi4yNDMtNSw1czIuMjQzLDUsNSw1czUtMi4yNDMsNS01UzIxLjc1NywyNywxOSwyN3ogTTE5LDM1CWMtMS42NTQsMC0zLTEuMzQ2LTMtM3MxLjM0Ni0zLDMtM3MzLDEuMzQ2LDMsM1MyMC42NTQsMzUsMTksMzV6IE0xOSwxNGMtMi43NTcsMC01LDIuMjQzLTUsNXMyLjI0Myw1LDUsNXM1LTIuMjQzLDUtNQlTMjEuNzU3LDE0LDE5LDE0eiBNMTksMjJjLTEuNjU0LDAtMy0xLjM0Ni0zLTNzMS4zNDYtMywzLTNzMywxLjM0NiwzLDNTMjAuNjU0LDIyLDE5LDIyeiBNNTAsOUgxNGMtMi43NTcsMC01LDIuMjQzLTUsNXYzNgljMCwyLjc1NywyLjI0Myw1LDUsNWgzNmMyLjc1NywwLDUtMi4yNDMsNS01VjE0QzU1LDExLjI0Myw1Mi43NTcsOSw1MCw5eiBNNTMsNTBjMCwxLjY1NC0xLjM0NiwzLTMsM0gxNGMtMS42NTQsMC0zLTEuMzQ2LTMtM1YxNAljMC0xLjY1NCwxLjM0Ni0zLDMtM2gzNmMxLjY1NCwwLDMsMS4zNDYsMywzVjUweiBNMTksNDBjLTIuNzU3LDAtNSwyLjI0My01LDVzMi4yNDMsNSw1LDVzNS0yLjI0Myw1LTVTMjEuNzU3LDQwLDE5LDQweiBNMTksNDgJYy0xLjY1NCwwLTMtMS4zNDYtMy0zczEuMzQ2LTMsMy0zczMsMS4zNDYsMywzUzIwLjY1NCw0OCwxOSw0OHogTTQ5LDE5YzAsMC41NTItMC40NDcsMS0xLDFIMjljLTAuNTUzLDAtMS0wLjQ0OC0xLTFzMC40NDctMSwxLTEJaDE5QzQ4LjU1MywxOCw0OSwxOC40NDgsNDksMTl6IE00OSw0NWMwLDAuNTUzLTAuNDQ3LDEtMSwxSDI5Yy0wLjU1MywwLTEtMC40NDctMS0xczAuNDQ3LTEsMS0xaDE5QzQ4LjU1Myw0NCw0OSw0NC40NDcsNDksNDV6IE00OSwzMmMwLDAuNTUyLTAuNDQ3LDEtMSwxSDI5Yy0wLjU1MywwLTEtMC40NDgtMS0xczAuNDQ3LTEsMS0xaDE5QzQ4LjU1MywzMSw0OSwzMS40NDgsNDksMzJ6Ii8+PC9zdmc+" alt="empty" class="empty__list__img">
         </li>`;

        toDoItems.insertAdjacentHTML('afterbegin', emptyListHtml);
    }
    if(tasks.length > 0) {
        const emptyLisyEl = document.querySelector('.empty__list');
        emptyLisyEl ? emptyLisyEl.remove() : null;
    }
}
toDoItemIsEmpty()
//видаляє завдання
function removeNote(e) {
    if(e.target.dataset.action == 'delete') {
        const parentNode = e.target.closest('.todo__item');
        parentNode.remove();

        const id = Number(parentNode.id);
        const index = tasks.findIndex((task) => task.id == id);
        tasks.splice(index, 1);

        saveToLocalStorage();
        toDoItemIsEmpty();
    }
}
//при натисканні на галочку переносить в дон ліст
function addDone(e) {
    if(e.target.dataset.action == 'done') {
        const parentNode = e.target.closest('.todo__item');
        const chieldNode = parentNode.querySelector('.todo__container');

        if(chieldNode.classList.contains('outer')) {
            chieldNode.classList.remove('outer');
        } 
        if(chieldNode.classList.contains('subsequently')) {
            chieldNode.classList.remove('subsequently');
        }

        chieldNode.classList.toggle('done');

        const id = Number(parentNode.id);
        const task = tasks.find((task) => {
            if(task.id === id) {
                return true;
            }
        });
        task.done = !task.done;

        saveToLocalStorage();

        doneItem.insertAdjacentHTML('afterbegin', parentNode.outerHTML);
        parentNode.remove();
        toDoItemIsEmpty();
    }
} 
//сохраняю в localStorage
function saveToLocalStorage(){
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
//створює завдання
function renderTask(task) {
    let state = null;

    if(task.done === true){
        state = 'done';
    } else if(task.subsequently === true && task.overdue === false) {
        state = 'subsequently'
    } else if(task.overdue === true && task.done === false){
        state = 'outer';
    }

    const taskHtml = `<li id="${task.id}" class="todo__item" data-todo-state="active">
    <div class="${state} todo__container d-flex justify-content-between align-items-center">
        <div class="todo__text d-flex flex-column">
            <h3 class="todo__title">${task.text}</h3>
            <p class="todo__dedline">${task.deadline}</p>
        </div>
        <div class="todo__buttons__collection d-flex align-items-center">
            <span class="todo__delete" data-action="delete" title="Видалити завдання"><img class="todo__img" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwLDAsMjU2LDI1NiIgd2lkdGg9IjI1NnB4IiBoZWlnaHQ9IjI1NnB4IiBmaWxsLXJ1bGU9Im5vbnplcm8iPjxkZWZzPjxsaW5lYXJHcmFkaWVudCB4MT0iMzIiIHkxPSI3LjAwMSIgeDI9IjMyIiB5Mj0iNTYuOTk4IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgaWQ9ImNvbG9yLTEiPjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iIzFhNmRmZiI+PC9zdG9wPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2M4MjJmZiI+PC9zdG9wPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IHgxPSIzMiIgeTE9IjExLjk0IiB4Mj0iMzIiIHkyPSI1Mi4wNiIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIGlkPSJjb2xvci0yIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiM4YWI0ZmYiPjwvc3RvcD48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNlNDkyZmYiPjwvc3RvcD48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48ZyBmaWxsLW9wYWNpdHk9IjAiIGZpbGw9IiNkZGRkZGQiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIGZvbnQtZmFtaWx5PSJub25lIiBmb250LXdlaWdodD0ibm9uZSIgZm9udC1zaXplPSJub25lIiB0ZXh0LWFuY2hvcj0ibm9uZSIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0wLDI1NnYtMjU2aDI1NnYyNTZ6IiBpZD0iYmdSZWN0YW5nbGUiPjwvcGF0aD48L2c+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJub256ZXJvIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWRhc2hhcnJheT0iIiBzdHJva2UtZGFzaG9mZnNldD0iMCIgZm9udC1mYW1pbHk9Im5vbmUiIGZvbnQtd2VpZ2h0PSJub25lIiBmb250LXNpemU9Im5vbmUiIHRleHQtYW5jaG9yPSJub25lIiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCI+PGcgdHJhbnNmb3JtPSJzY2FsZSg0LDQpIj48cGF0aCBkPSJNNDkuNzU3LDU2Ljk5OWMtMC43NjgsMCAtMS41MzYsLTAuMjkyIC0yLjEyMSwtMC44NzdsLTE1LjYzNiwtMTUuNjM3bC0xNS42MzYsMTUuNjM2Yy0xLjE3LDEuMTY5IC0zLjA3MywxLjE2OSAtNC4yNDMsMGwtNC4yNDMsLTQuMjQzYy0xLjE3LC0xLjE3IC0xLjE3LC0zLjA3MyAwLC00LjI0M2wxNS42MzcsLTE1LjYzNWwtMTUuNjM2LC0xNS42MzZjLTEuMTcsLTEuMTcgLTEuMTcsLTMuMDczIDAsLTQuMjQzbDQuMjQzLC00LjI0M2MxLjE2OSwtMS4xNyAzLjA3MiwtMS4xNzEgNC4yNDMsMGwxNS42MzUsMTUuNjM3bDE1LjYzNiwtMTUuNjM2YzEuMTcsLTEuMTcxIDMuMDczLC0xLjE3IDQuMjQzLDBsNC4yNDMsNC4yNDNjMS4xNywxLjE3IDEuMTcsMy4wNzMgMCw0LjI0M2wtMTUuNjM3LDE1LjYzNWwxNS42MzYsMTUuNjM2YzEuMTcsMS4xNyAxLjE3LDMuMDczIDAsNC4yNDNsLTQuMjQzLDQuMjQzYy0wLjU4NSwwLjU4NCAtMS4zNTMsMC44NzcgLTIuMTIxLDAuODc3ek0zMiwzNy42NTdsMTcuMDUsMTcuMDVjMC4zOSwwLjM5IDEuMDI1LDAuMzg5IDEuNDE1LDBsNC4yNDMsLTQuMjQzYzAuMzksLTAuMzkgMC4zOSwtMS4wMjQgMCwtMS40MTVsLTE3LjA1MSwtMTcuMDQ5bDE3LjA1LC0xNy4wNWMwLjM5LC0wLjM5IDAuMzksLTEuMDI0IDAsLTEuNDE1bC00LjI0MywtNC4yNDNjLTAuMzksLTAuMzkgLTEuMDI1LC0wLjM5MSAtMS40MTUsMGwtMTcuMDQ5LDE3LjA1MWwtMTcuMDUsLTE3LjA1Yy0wLjM5LC0wLjM5IC0xLjAyNSwtMC4zODkgLTEuNDE1LDBsLTQuMjQzLDQuMjQzYy0wLjM5LDAuMzkgLTAuMzksMS4wMjQgMCwxLjQxNWwxNy4wNTEsMTcuMDQ5bC0xNy4wNSwxNy4wNWMtMC4zOSwwLjM5IC0wLjM5LDEuMDI0IDAsMS40MTVsNC4yNDMsNC4yNDNjMC4zODksMC4zODkgMS4wMjQsMC4zOSAxLjQxNSwweiIgZmlsbD0idXJsKCNjb2xvci0xKSI+PC9wYXRoPjxwYXRoIGQ9Ik01Mi4wNjEsMTQuMDYxbC0yLjEyMiwtMi4xMjJsLTE3LjkzOSwxNy45NGwtMTcuOTM5LC0xNy45NGwtMi4xMjIsMi4xMjJsMTcuOTQsMTcuOTM5bC0xNy45NCwxNy45MzlsMi4xMjIsMi4xMjJsMTcuOTM5LC0xNy45NGwxNy45MzksMTcuOTRsMi4xMjIsLTIuMTIybC0xNy45NCwtMTcuOTM5eiIgZmlsbD0idXJsKCNjb2xvci0yKSI+PC9wYXRoPjwvZz48L2c+PC9zdmc+" alt=""></span>
            <span class="todo__done" data-action="done" title="Відмітити як виконаний"><img class="todo__img" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwLDAsMjU2LDI1NiIgd2lkdGg9IjEyOHB4IiBoZWlnaHQ9IjEyOHB4IiBmaWxsLXJ1bGU9Im5vbnplcm8iPjxkZWZzPjxsaW5lYXJHcmFkaWVudCB4MT0iMzIiIHkxPSIxMi42NjQiIHgyPSIzMiIgeTI9IjUyLjQyMiIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIGlkPSJjb2xvci0xIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiMxYTZkZmYiPjwvc3RvcD48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNjODIyZmYiPjwvc3RvcD48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCB4MT0iMzIuMDEzIiB5MT0iMTYuODMiIHgyPSIzMi4wMTMiIHkyPSI0Ny41MjYiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiBpZD0iY29sb3ItMiI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjOGFiNGZmIj48L3N0b3A+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZTQ5MmZmIj48L3N0b3A+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PGcgZmlsbC1vcGFjaXR5PSIwIiBmaWxsPSIjZGRkZGRkIiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBmb250LWZhbWlseT0ibm9uZSIgZm9udC13ZWlnaHQ9Im5vbmUiIGZvbnQtc2l6ZT0ibm9uZSIgdGV4dC1hbmNob3I9Im5vbmUiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48cGF0aCBkPSJNMCwyNTZ2LTI1NmgyNTZ2MjU2eiIgaWQ9ImJnUmVjdGFuZ2xlIj48L3BhdGg+PC9nPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIGZvbnQtZmFtaWx5PSJub25lIiBmb250LXdlaWdodD0ibm9uZSIgZm9udC1zaXplPSJub25lIiB0ZXh0LWFuY2hvcj0ibm9uZSIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxnIHRyYW5zZm9ybT0ic2NhbGUoNCw0KSI+PHBhdGggZD0iTTI0Ljk4Miw1MWMtMS4yNzMsMCAtMi41NDcsLTAuNDc1IC0zLjUyNCwtMS40MjlsLTE0LjU3LC0xNC4yMDdjLTAuNTczLC0wLjU1OCAtMC44ODgsLTEuMzAzIC0wLjg4OCwtMi4wOTZjMCwtMC43OTMgMC4zMTUsLTEuNTM4IDAuODg5LC0yLjA5N2wyLjgyLC0yLjc1YzEuMTY2LC0xLjEzNyAzLjA2MywtMS4xMzcgNC4yMjgsMC4wMDFsMTAuMjU5LDEwLjAwM2MwLjM5NSwwLjM4NSAxLjA1OCwwLjM4IDEuNDQ2LC0wLjAxMmwyNC4zNDEsLTI0LjUyNmMxLjE0NywtMS4xNTYgMy4wNDQsLTEuMTg2IDQuMjI4LC0wLjA2OGwyLjg2NywyLjcwNWMwLjU4MiwwLjU1IDAuOTEsMS4yOSAwLjkyMywyLjA4M2MwLjAxMywwLjc5MyAtMC4yOTEsMS41NDIgLTAuODU0LDIuMTA5bC0yOC41ODIsMjguNzk4Yy0wLjk4MSwwLjk5IC0yLjI4MiwxLjQ4NiAtMy41ODMsMS40ODZ6TTExLjgyMiwyOS41NjRjLTAuMjYsMCAtMC41MiwwLjA5NyAtMC43MTcsMC4yOWwtMi44MiwyLjc1Yy0wLjE4NCwwLjE3OSAtMC4yODUsMC40MTQgLTAuMjg1LDAuNjY0YzAsMC4yNSAwLjEwMiwwLjQ4NSAwLjI4NSwwLjY2NGwxNC41NjksMTQuMjA4YzEuMTksMS4xNjMgMy4xMTYsMS4xNDggNC4yOTEsLTAuMDM0bDI4LjU4MSwtMjguNzk4YzAuMTgxLC0wLjE4MiAwLjI3NywtMC40MTggMC4yNzMsLTAuNjY4Yy0wLjAwNCwtMC4yNSAtMC4xMDksLTAuNDg1IC0wLjI5NiwtMC42NjFsLTIuODY3LC0yLjcwNWMtMC40MDEsLTAuMzgxIC0xLjA0NywtMC4zNjkgLTEuNDM1LDAuMDIybC0yNC4zNCwyNC41MjdjLTEuMTY2LDEuMTczIC0zLjA3OSwxLjE4OSAtNC4yNjMsMC4wMzRsLTEwLjI1OCwtMTAuMDA0Yy0wLjE5NywtMC4xOTMgLTAuNDU3LC0wLjI4OSAtMC43MTgsLTAuMjg5eiIgZmlsbD0idXJsKCNjb2xvci0xKSI+PC9wYXRoPjxwYXRoIGQ9Ik0yNC45NzcsNDYuNjA5Yy0wLjQ4OSwwIC0wLjk4LC0wLjE4MSAtMS4zNjgsLTAuNTQ0bC0xMy4yOTEsLTEyLjQ2MmwxLjM2NywtMS40NTlsMTMuMjkyLDEyLjQ2MWwyNy4zMTYsLTI3LjMxNWwxLjQxNCwxLjQxNGwtMjcuMzE2LDI3LjMxNWMtMC4zOTEsMC4zOTIgLTAuOTAyLDAuNTkgLTEuNDE0LDAuNTl6IiBmaWxsPSJ1cmwoI2NvbG9yLTIpIj48L3BhdGg+PC9nPjwvZz48L3N2Zz4=" alt=""></span>    
        </div>
    </div>
</li>`;

    if(task.done === true) {
        doneItem.insertAdjacentHTML("afterbegin", taskHtml);
    } else if(task.overdue === true) {
        overdueItem.insertAdjacentHTML('afterbegin', taskHtml);
    } else if (task.subsequently === true) {
        toDoItems.insertAdjacentHTML('afterbegin', taskHtml);
    }  else {
        toDoItems.insertAdjacentHTML("beforeend", taskHtml);
    }
}
//перевіряє чи не вийшов дедлайн
function dedlineCheck() {
    tasks.forEach((task) => {
        const now = new Date();
        const deadlineDate = new Date(task.deadline);

        if(deadlineDate <= now && deadlineDate !== '') {
            task.overdue = true;
            taskIsOverdue(task);
            saveToLocalStorage();
        } else if ((deadlineDate - now) <= 60 * 60 * 1000) {
            task.subsequently = true;
            taskIsSubsequently(task);
            saveToLocalStorage();
        }
    })
}
//виконується якщо дедлайн просрочився
function taskIsOverdue(task) {
    if(task.overdue == true ) {
        const overdueElem = document.getElementById(`${task.id}`);
        overdueElem.remove();
        renderTask(task)
    } else if(task.overdue === true && task.done === true){}
}
//виконується якщо залишилось 15 або менше 15 хвилин до дедлайну
function taskIsSubsequently(task) {
    if(task.subsequently == true) {
        const overdueElem = document.getElementById(`${task.id}`);
        overdueElem.remove();
        renderTask(task,'subsequently')
    } else if (task.subsequently === true && task.done === true){}  
}
//видаляє клас hide
function removeClassHide() {
    toDoItems.classList.remove('hide');
    doneItem.classList.remove('hide');
    overdueItem.classList.remove('hide');
}
//фільтр завдань
function selectFilter(selectedValue) {
    switch(selectedValue) {
        case 'all':
            removeClassHide();
            break;
        case 'active':
            removeClassHide();
            doneItem.classList.add('hide');
            overdueItem.classList.add('hide');
            break;
        case 'completed':
            removeClassHide();
            toDoItems.classList.add('hide');
            overdueItem.classList.add('hide');
            break;
        case 'deleted':
            removeClassHide();
            toDoItems.classList.add('hide');
            doneItem.classList.add('hide');
            break;
    }
}

//перевіряє кожної секунди стан завдання
setInterval(dedlineCheck, 1000);