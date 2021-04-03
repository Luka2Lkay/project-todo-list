/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/addtostorage.js":
/*!*****************************!*\
  !*** ./src/addtostorage.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addToLocalStorage": () => (/* binding */ addToLocalStorage),
/* harmony export */   "addSelectedProject": () => (/* binding */ addSelectedProject)
/* harmony export */ });
/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app */ "./src/app.js");



// Local storage

const addToLocalStorage = (listOfProjects) =>{
    localStorage.setItem('listOfProjects', JSON.stringify(listOfProjects));
    (0,_app__WEBPACK_IMPORTED_MODULE_0__.default)();
}

// Add the selected project to local storage
const addSelectedProject = (selectedProjectId) =>{
    localStorage.setItem('selectedProjectId', JSON.stringify(selectedProjectId));
    (0,_app__WEBPACK_IMPORTED_MODULE_0__.default)();
}


/***/ }),

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "listOfProjects": () => (/* binding */ listOfProjects),
/* harmony export */   "selectedProjectId": () => (/* binding */ selectedProjectId),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _addtostorage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./addtostorage */ "./src/addtostorage.js");




const projectInput = document.querySelector('[data-new-project-input]')
const projectForm = document.querySelector('[data-new-project-form]');
const projectList = document.querySelector('[data-projects]');
const defaultProject = document.querySelector('[data-default-project]') 
const taskTitle = document.getElementById('task_title');
const taskCounter = document.getElementById('task_count');
const taskList = document.getElementById('task_list');
const taskDiv = document.getElementById('task_body');
const taskContainer = document.getElementById('tasks');
const taskForm = document.getElementById('task_form');
const addTaskBtn = document.getElementById('new_task_button');
const cancelTaskBtn = document.getElementById('cancel_task_button');
const submitTask = document.getElementById('submit_task_button');
const newTaskBtn = document.getElementById('new_task_button');
const taskInput = document.getElementById('new_task_input');
const dueDate = document.getElementById('date');
const priority = document.getElementById('priority_dropdown');
const description = document.getElementById('description');


let listOfProjects = [];

let selectedProjectId;

// The default project is active when clicked
defaultProject.addEventListener('click', (e) =>{
    e.target.classList.add('active');
    taskTitle.textContent = "Default Project";

    taskCounter.textContent = null;
})

// Project form
projectForm.addEventListener('submit', (e) =>{
    e.preventDefault();  
    
    if(projectInput.value === null || projectInput.value === '') return;
    
    const project = projectItem(projectInput.value);
    projectInput.value = null;
    
    listOfProjects.push(project);
    
    (0,_addtostorage__WEBPACK_IMPORTED_MODULE_0__.addToLocalStorage)(listOfProjects);
    (0,_addtostorage__WEBPACK_IMPORTED_MODULE_0__.addSelectedProject)(selectedProjectId);
    
    create();
    })

// Task form
taskForm.addEventListener('submit', (e) =>{
    e.preventDefault();
    e.target.style.display = 'none';
    addTaskBtn.style.display = 'block';

const taskName = taskInput.value;
if(taskName == null || taskName === '') return;

const task = taskItem(taskName);

taskInput.value = null;

const selectedProject = listOfProjects.find(project => project.id === selectedProjectId);
selectedProject.tasks.push(task);

(0,_addtostorage__WEBPACK_IMPORTED_MODULE_0__.addToLocalStorage)(listOfProjects);
(0,_addtostorage__WEBPACK_IMPORTED_MODULE_0__.addSelectedProject)(selectedProjectId);

e.target.reset();
})


const projectItem = (item) =>{
    return {id: Date.now().toString(), item: item, tasks: []};
}

const taskItem = (item) =>{
    return {id: Date.now().toString(), item: item, date: dueDate.value, priority: priority.value, complete: false};
}

// Create projects
const createProject = () =>{
    listOfProjects.forEach( project =>{
        const newProject = document.createElement('li');
        newProject.setAttribute('data-key', project.id);
        newProject.classList.add('new_project');
        newProject.innerHTML = ` ${project.item} <button class="delete_project">X</button>`;

        if(project.id === selectedProjectId){
            newProject.classList.add('active');
            defaultProject.classList.remove('active');
        }
        projectList.appendChild(newProject);
    })
}

// Create tasks
const createTasks = () =>{
const selectedProject = listOfProjects.find(project => project.id === selectedProjectId);

    if(selectedProjectId){
    taskTitle.textContent = selectedProject.item;
    createTaskCount(selectedProject);

    selectedProject.tasks.forEach(task =>{
        const taskCheckBox = document.createElement('input');
        taskCheckBox.setAttribute('type', 'checkbox');
        taskCheckBox.setAttribute('class', 'check_box');
        taskCheckBox.id = task.id;
        taskCheckBox.checked = task.complete;
        const taskLabel = document.createElement('label');
        taskLabel.htmlFor = task.id;
       
        taskLabel.textContent= `${task.item} ${task.date} ${task.priority}`
        
        taskLabel.appendChild(taskCheckBox);
        taskDiv.appendChild(taskLabel);
        taskList.appendChild(taskDiv);
     });
}
};

// Create a task count
const createTaskCount = (selectedProject) =>{
    const incompleteTasks = selectedProject.tasks.filter(task => { return !task.complete}).length;
    let taskMessage = '';
    if(incompleteTasks ===1){
         taskMessage = 'task';
    }else {
        taskMessage = 'tasks';
    }
    
    taskCounter.textContent = `${incompleteTasks} ${taskMessage} remaining`;
}

// Clear projects
const clearProject = (element) =>{
    while (element.childNodes[2]){
        element.removeChild(element.childNodes[2]);
    }
}

// Clear tasks
const clearTask = (element) =>{
    while(element.firstChild){
        element.removeChild(element.firstChild);
    }
}

// select project list
projectList.addEventListener('click', (e) =>{
    selectedProjectId = e.target.getAttribute('data-key');
    (0,_addtostorage__WEBPACK_IMPORTED_MODULE_0__.addSelectedProject)(selectedProjectId)

    if(e.target.classList.contains('delete_project')){
        deleteProject(e.target.parentElement.getAttribute('data-key'))
        defaultProject.classList.add('active');
    }
})

// Task list checkbox addEventListener
taskList.addEventListener('click', (e) =>{
    if (e.target.tagName.toLowerCase() === 'input'){
        const selectedProject = listOfProjects.find(project => project.id === selectedProjectId);
        const selectedTask = selectedProject.tasks.find(task => task.id === e.target.id);
        selectedTask.complete = e.target.checked;
        (0,_addtostorage__WEBPACK_IMPORTED_MODULE_0__.addToLocalStorage)(listOfProjects);
        (0,_addtostorage__WEBPACK_IMPORTED_MODULE_0__.addSelectedProject)(selectedProjectId);
        createTaskCount(selectedProject);
    }
})

// Delete project
const deleteProject = (id) =>{
    listOfProjects = listOfProjects.filter(project =>{
        return project.id !== id;
    })

    taskTitle.textContent = "Select or Create a new project";
    taskCounter.textContent = null;
    (0,_addtostorage__WEBPACK_IMPORTED_MODULE_0__.addToLocalStorage)(listOfProjects);
}

// Add new task button
addTaskBtn.addEventListener('click', (e) =>{
    e.target.style.display = 'none';
    taskForm.style.display = 'block';
    taskContainer.appendChild(taskList);
})

// Cancel task button
cancelTaskBtn.addEventListener('click', () =>{
    taskForm.style.display = 'none';
    addTaskBtn.style.display = 'block';
    taskForm.reset();
})

const create = () =>{
    clearProject(projectList);
    clearTask(taskDiv);
    createProject();
    createTasks();
}

const getFromLocalStorage = () =>{
    const reference = localStorage.getItem('listOfProjects');
    const selected = localStorage.getItem('selectedProjectId');
    
    if(reference){
        listOfProjects = JSON.parse(reference);
        create();
    }

    if(selected){
        selectedProjectId = JSON.parse(selected);
        create();
    }
}

getFromLocalStorage();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (create);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app */ "./src/app.js");


(0,_app__WEBPACK_IMPORTED_MODULE_0__.default)();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wcm9qZWN0LXRvZG8tbGlzdC8uL3NyYy9hZGR0b3N0b3JhZ2UuanMiLCJ3ZWJwYWNrOi8vcHJvamVjdC10b2RvLWxpc3QvLi9zcmMvYXBwLmpzIiwid2VicGFjazovL3Byb2plY3QtdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3Byb2plY3QtdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9wcm9qZWN0LXRvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3Byb2plY3QtdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vcHJvamVjdC10b2RvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDMEI7O0FBRTFCOztBQUVPO0FBQ1A7QUFDQSxJQUFJLDZDQUFNO0FBQ1Y7O0FBRUE7QUFDTztBQUNQO0FBQ0EsSUFBSSw2Q0FBTTtBQUNWOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDYmdEO0FBQ0M7O0FBRWpEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR087O0FBRUE7O0FBRVA7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQSx1Qjs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBLElBQUksZ0VBQWlCO0FBQ3JCLElBQUksaUVBQWtCOztBQUV0QjtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUEsZ0VBQWlCO0FBQ2pCLGlFQUFrQjs7QUFFbEI7QUFDQSxDQUFDOzs7QUFHRDtBQUNBLFlBQVk7QUFDWjs7QUFFQTtBQUNBLFlBQVk7QUFDWjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsYUFBYTs7QUFFaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsa0NBQWtDLFVBQVUsR0FBRyxVQUFVLEdBQUcsY0FBYzs7QUFFMUU7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGtFQUFrRSx1QkFBdUI7QUFDekY7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUEsaUNBQWlDLGdCQUFnQixHQUFHLFlBQVk7QUFDaEU7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLGlFQUFrQjs7QUFFdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsZ0VBQWlCO0FBQ3pCLFFBQVEsaUVBQWtCO0FBQzFCO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0EsSUFBSSxnRUFBaUI7QUFDckI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLGlFQUFlLE1BQU0sRUFBQzs7Ozs7OztVQ2pPdEI7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDckJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0Esd0NBQXdDLHlDQUF5QztXQUNqRjtXQUNBO1dBQ0EsRTs7Ozs7V0NQQSx3Rjs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSxzREFBc0Qsa0JBQWtCO1dBQ3hFO1dBQ0EsK0NBQStDLGNBQWM7V0FDN0QsRTs7Ozs7Ozs7Ozs7O0FDTjBCOztBQUUxQiw2Q0FBTSxHIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCBjcmVhdGUgZnJvbSBcIi4vYXBwXCJcblxuLy8gTG9jYWwgc3RvcmFnZVxuXG5leHBvcnQgY29uc3QgYWRkVG9Mb2NhbFN0b3JhZ2UgPSAobGlzdE9mUHJvamVjdHMpID0+e1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdsaXN0T2ZQcm9qZWN0cycsIEpTT04uc3RyaW5naWZ5KGxpc3RPZlByb2plY3RzKSk7XG4gICAgY3JlYXRlKCk7XG59XG5cbi8vIEFkZCB0aGUgc2VsZWN0ZWQgcHJvamVjdCB0byBsb2NhbCBzdG9yYWdlXG5leHBvcnQgY29uc3QgYWRkU2VsZWN0ZWRQcm9qZWN0ID0gKHNlbGVjdGVkUHJvamVjdElkKSA9PntcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnc2VsZWN0ZWRQcm9qZWN0SWQnLCBKU09OLnN0cmluZ2lmeShzZWxlY3RlZFByb2plY3RJZCkpO1xuICAgIGNyZWF0ZSgpO1xufVxuIiwiXG5pbXBvcnQge2FkZFRvTG9jYWxTdG9yYWdlfSBmcm9tIFwiLi9hZGR0b3N0b3JhZ2VcIlxuaW1wb3J0IHthZGRTZWxlY3RlZFByb2plY3R9IGZyb20gXCIuL2FkZHRvc3RvcmFnZVwiXG5cbmNvbnN0IHByb2plY3RJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLW5ldy1wcm9qZWN0LWlucHV0XScpXG5jb25zdCBwcm9qZWN0Rm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLW5ldy1wcm9qZWN0LWZvcm1dJyk7XG5jb25zdCBwcm9qZWN0TGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXByb2plY3RzXScpO1xuY29uc3QgZGVmYXVsdFByb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1kZWZhdWx0LXByb2plY3RdJykgXG5jb25zdCB0YXNrVGl0bGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFza190aXRsZScpO1xuY29uc3QgdGFza0NvdW50ZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFza19jb3VudCcpO1xuY29uc3QgdGFza0xpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFza19saXN0Jyk7XG5jb25zdCB0YXNrRGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Rhc2tfYm9keScpO1xuY29uc3QgdGFza0NvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YXNrcycpO1xuY29uc3QgdGFza0Zvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFza19mb3JtJyk7XG5jb25zdCBhZGRUYXNrQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25ld190YXNrX2J1dHRvbicpO1xuY29uc3QgY2FuY2VsVGFza0J0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYW5jZWxfdGFza19idXR0b24nKTtcbmNvbnN0IHN1Ym1pdFRhc2sgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3VibWl0X3Rhc2tfYnV0dG9uJyk7XG5jb25zdCBuZXdUYXNrQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25ld190YXNrX2J1dHRvbicpO1xuY29uc3QgdGFza0lucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25ld190YXNrX2lucHV0Jyk7XG5jb25zdCBkdWVEYXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RhdGUnKTtcbmNvbnN0IHByaW9yaXR5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ByaW9yaXR5X2Ryb3Bkb3duJyk7XG5jb25zdCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkZXNjcmlwdGlvbicpO1xuXG5cbmV4cG9ydCBsZXQgbGlzdE9mUHJvamVjdHMgPSBbXTtcblxuZXhwb3J0IGxldCBzZWxlY3RlZFByb2plY3RJZDtcblxuLy8gVGhlIGRlZmF1bHQgcHJvamVjdCBpcyBhY3RpdmUgd2hlbiBjbGlja2VkXG5kZWZhdWx0UHJvamVjdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PntcbiAgICBlLnRhcmdldC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICB0YXNrVGl0bGUudGV4dENvbnRlbnQgPSBcIkRlZmF1bHQgUHJvamVjdFwiO1xuXG4gICAgdGFza0NvdW50ZXIudGV4dENvbnRlbnQgPSBudWxsO1xufSlcblxuLy8gUHJvamVjdCBmb3JtXG5wcm9qZWN0Rm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZSkgPT57XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpOyAgXG4gICAgXG4gICAgaWYocHJvamVjdElucHV0LnZhbHVlID09PSBudWxsIHx8IHByb2plY3RJbnB1dC52YWx1ZSA9PT0gJycpIHJldHVybjtcbiAgICBcbiAgICBjb25zdCBwcm9qZWN0ID0gcHJvamVjdEl0ZW0ocHJvamVjdElucHV0LnZhbHVlKTtcbiAgICBwcm9qZWN0SW5wdXQudmFsdWUgPSBudWxsO1xuICAgIFxuICAgIGxpc3RPZlByb2plY3RzLnB1c2gocHJvamVjdCk7XG4gICAgXG4gICAgYWRkVG9Mb2NhbFN0b3JhZ2UobGlzdE9mUHJvamVjdHMpO1xuICAgIGFkZFNlbGVjdGVkUHJvamVjdChzZWxlY3RlZFByb2plY3RJZCk7XG4gICAgXG4gICAgY3JlYXRlKCk7XG4gICAgfSlcblxuLy8gVGFzayBmb3JtXG50YXNrRm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZSkgPT57XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGUudGFyZ2V0LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgYWRkVGFza0J0bi5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcblxuY29uc3QgdGFza05hbWUgPSB0YXNrSW5wdXQudmFsdWU7XG5pZih0YXNrTmFtZSA9PSBudWxsIHx8IHRhc2tOYW1lID09PSAnJykgcmV0dXJuO1xuXG5jb25zdCB0YXNrID0gdGFza0l0ZW0odGFza05hbWUpO1xuXG50YXNrSW5wdXQudmFsdWUgPSBudWxsO1xuXG5jb25zdCBzZWxlY3RlZFByb2plY3QgPSBsaXN0T2ZQcm9qZWN0cy5maW5kKHByb2plY3QgPT4gcHJvamVjdC5pZCA9PT0gc2VsZWN0ZWRQcm9qZWN0SWQpO1xuc2VsZWN0ZWRQcm9qZWN0LnRhc2tzLnB1c2godGFzayk7XG5cbmFkZFRvTG9jYWxTdG9yYWdlKGxpc3RPZlByb2plY3RzKTtcbmFkZFNlbGVjdGVkUHJvamVjdChzZWxlY3RlZFByb2plY3RJZCk7XG5cbmUudGFyZ2V0LnJlc2V0KCk7XG59KVxuXG5cbmNvbnN0IHByb2plY3RJdGVtID0gKGl0ZW0pID0+e1xuICAgIHJldHVybiB7aWQ6IERhdGUubm93KCkudG9TdHJpbmcoKSwgaXRlbTogaXRlbSwgdGFza3M6IFtdfTtcbn1cblxuY29uc3QgdGFza0l0ZW0gPSAoaXRlbSkgPT57XG4gICAgcmV0dXJuIHtpZDogRGF0ZS5ub3coKS50b1N0cmluZygpLCBpdGVtOiBpdGVtLCBkYXRlOiBkdWVEYXRlLnZhbHVlLCBwcmlvcml0eTogcHJpb3JpdHkudmFsdWUsIGNvbXBsZXRlOiBmYWxzZX07XG59XG5cbi8vIENyZWF0ZSBwcm9qZWN0c1xuY29uc3QgY3JlYXRlUHJvamVjdCA9ICgpID0+e1xuICAgIGxpc3RPZlByb2plY3RzLmZvckVhY2goIHByb2plY3QgPT57XG4gICAgICAgIGNvbnN0IG5ld1Byb2plY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgICAgICBuZXdQcm9qZWN0LnNldEF0dHJpYnV0ZSgnZGF0YS1rZXknLCBwcm9qZWN0LmlkKTtcbiAgICAgICAgbmV3UHJvamVjdC5jbGFzc0xpc3QuYWRkKCduZXdfcHJvamVjdCcpO1xuICAgICAgICBuZXdQcm9qZWN0LmlubmVySFRNTCA9IGAgJHtwcm9qZWN0Lml0ZW19IDxidXR0b24gY2xhc3M9XCJkZWxldGVfcHJvamVjdFwiPlg8L2J1dHRvbj5gO1xuXG4gICAgICAgIGlmKHByb2plY3QuaWQgPT09IHNlbGVjdGVkUHJvamVjdElkKXtcbiAgICAgICAgICAgIG5ld1Byb2plY3QuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICAgICAgICBkZWZhdWx0UHJvamVjdC5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcbiAgICAgICAgfVxuICAgICAgICBwcm9qZWN0TGlzdC5hcHBlbmRDaGlsZChuZXdQcm9qZWN0KTtcbiAgICB9KVxufVxuXG4vLyBDcmVhdGUgdGFza3NcbmNvbnN0IGNyZWF0ZVRhc2tzID0gKCkgPT57XG5jb25zdCBzZWxlY3RlZFByb2plY3QgPSBsaXN0T2ZQcm9qZWN0cy5maW5kKHByb2plY3QgPT4gcHJvamVjdC5pZCA9PT0gc2VsZWN0ZWRQcm9qZWN0SWQpO1xuXG4gICAgaWYoc2VsZWN0ZWRQcm9qZWN0SWQpe1xuICAgIHRhc2tUaXRsZS50ZXh0Q29udGVudCA9IHNlbGVjdGVkUHJvamVjdC5pdGVtO1xuICAgIGNyZWF0ZVRhc2tDb3VudChzZWxlY3RlZFByb2plY3QpO1xuXG4gICAgc2VsZWN0ZWRQcm9qZWN0LnRhc2tzLmZvckVhY2godGFzayA9PntcbiAgICAgICAgY29uc3QgdGFza0NoZWNrQm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgdGFza0NoZWNrQm94LnNldEF0dHJpYnV0ZSgndHlwZScsICdjaGVja2JveCcpO1xuICAgICAgICB0YXNrQ2hlY2tCb3guc2V0QXR0cmlidXRlKCdjbGFzcycsICdjaGVja19ib3gnKTtcbiAgICAgICAgdGFza0NoZWNrQm94LmlkID0gdGFzay5pZDtcbiAgICAgICAgdGFza0NoZWNrQm94LmNoZWNrZWQgPSB0YXNrLmNvbXBsZXRlO1xuICAgICAgICBjb25zdCB0YXNrTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuICAgICAgICB0YXNrTGFiZWwuaHRtbEZvciA9IHRhc2suaWQ7XG4gICAgICAgXG4gICAgICAgIHRhc2tMYWJlbC50ZXh0Q29udGVudD0gYCR7dGFzay5pdGVtfSAke3Rhc2suZGF0ZX0gJHt0YXNrLnByaW9yaXR5fWBcbiAgICAgICAgXG4gICAgICAgIHRhc2tMYWJlbC5hcHBlbmRDaGlsZCh0YXNrQ2hlY2tCb3gpO1xuICAgICAgICB0YXNrRGl2LmFwcGVuZENoaWxkKHRhc2tMYWJlbCk7XG4gICAgICAgIHRhc2tMaXN0LmFwcGVuZENoaWxkKHRhc2tEaXYpO1xuICAgICB9KTtcbn1cbn07XG5cbi8vIENyZWF0ZSBhIHRhc2sgY291bnRcbmNvbnN0IGNyZWF0ZVRhc2tDb3VudCA9IChzZWxlY3RlZFByb2plY3QpID0+e1xuICAgIGNvbnN0IGluY29tcGxldGVUYXNrcyA9IHNlbGVjdGVkUHJvamVjdC50YXNrcy5maWx0ZXIodGFzayA9PiB7IHJldHVybiAhdGFzay5jb21wbGV0ZX0pLmxlbmd0aDtcbiAgICBsZXQgdGFza01lc3NhZ2UgPSAnJztcbiAgICBpZihpbmNvbXBsZXRlVGFza3MgPT09MSl7XG4gICAgICAgICB0YXNrTWVzc2FnZSA9ICd0YXNrJztcbiAgICB9ZWxzZSB7XG4gICAgICAgIHRhc2tNZXNzYWdlID0gJ3Rhc2tzJztcbiAgICB9XG4gICAgXG4gICAgdGFza0NvdW50ZXIudGV4dENvbnRlbnQgPSBgJHtpbmNvbXBsZXRlVGFza3N9ICR7dGFza01lc3NhZ2V9IHJlbWFpbmluZ2A7XG59XG5cbi8vIENsZWFyIHByb2plY3RzXG5jb25zdCBjbGVhclByb2plY3QgPSAoZWxlbWVudCkgPT57XG4gICAgd2hpbGUgKGVsZW1lbnQuY2hpbGROb2Rlc1syXSl7XG4gICAgICAgIGVsZW1lbnQucmVtb3ZlQ2hpbGQoZWxlbWVudC5jaGlsZE5vZGVzWzJdKTtcbiAgICB9XG59XG5cbi8vIENsZWFyIHRhc2tzXG5jb25zdCBjbGVhclRhc2sgPSAoZWxlbWVudCkgPT57XG4gICAgd2hpbGUoZWxlbWVudC5maXJzdENoaWxkKXtcbiAgICAgICAgZWxlbWVudC5yZW1vdmVDaGlsZChlbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cbn1cblxuLy8gc2VsZWN0IHByb2plY3QgbGlzdFxucHJvamVjdExpc3QuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT57XG4gICAgc2VsZWN0ZWRQcm9qZWN0SWQgPSBlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEta2V5Jyk7XG4gICAgYWRkU2VsZWN0ZWRQcm9qZWN0KHNlbGVjdGVkUHJvamVjdElkKVxuXG4gICAgaWYoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdkZWxldGVfcHJvamVjdCcpKXtcbiAgICAgICAgZGVsZXRlUHJvamVjdChlLnRhcmdldC5wYXJlbnRFbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1rZXknKSlcbiAgICAgICAgZGVmYXVsdFByb2plY3QuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgfVxufSlcblxuLy8gVGFzayBsaXN0IGNoZWNrYm94IGFkZEV2ZW50TGlzdGVuZXJcbnRhc2tMaXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+e1xuICAgIGlmIChlLnRhcmdldC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdpbnB1dCcpe1xuICAgICAgICBjb25zdCBzZWxlY3RlZFByb2plY3QgPSBsaXN0T2ZQcm9qZWN0cy5maW5kKHByb2plY3QgPT4gcHJvamVjdC5pZCA9PT0gc2VsZWN0ZWRQcm9qZWN0SWQpO1xuICAgICAgICBjb25zdCBzZWxlY3RlZFRhc2sgPSBzZWxlY3RlZFByb2plY3QudGFza3MuZmluZCh0YXNrID0+IHRhc2suaWQgPT09IGUudGFyZ2V0LmlkKTtcbiAgICAgICAgc2VsZWN0ZWRUYXNrLmNvbXBsZXRlID0gZS50YXJnZXQuY2hlY2tlZDtcbiAgICAgICAgYWRkVG9Mb2NhbFN0b3JhZ2UobGlzdE9mUHJvamVjdHMpO1xuICAgICAgICBhZGRTZWxlY3RlZFByb2plY3Qoc2VsZWN0ZWRQcm9qZWN0SWQpO1xuICAgICAgICBjcmVhdGVUYXNrQ291bnQoc2VsZWN0ZWRQcm9qZWN0KTtcbiAgICB9XG59KVxuXG4vLyBEZWxldGUgcHJvamVjdFxuY29uc3QgZGVsZXRlUHJvamVjdCA9IChpZCkgPT57XG4gICAgbGlzdE9mUHJvamVjdHMgPSBsaXN0T2ZQcm9qZWN0cy5maWx0ZXIocHJvamVjdCA9PntcbiAgICAgICAgcmV0dXJuIHByb2plY3QuaWQgIT09IGlkO1xuICAgIH0pXG5cbiAgICB0YXNrVGl0bGUudGV4dENvbnRlbnQgPSBcIlNlbGVjdCBvciBDcmVhdGUgYSBuZXcgcHJvamVjdFwiO1xuICAgIHRhc2tDb3VudGVyLnRleHRDb250ZW50ID0gbnVsbDtcbiAgICBhZGRUb0xvY2FsU3RvcmFnZShsaXN0T2ZQcm9qZWN0cyk7XG59XG5cbi8vIEFkZCBuZXcgdGFzayBidXR0b25cbmFkZFRhc2tCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT57XG4gICAgZS50YXJnZXQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICB0YXNrRm9ybS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICB0YXNrQ29udGFpbmVyLmFwcGVuZENoaWxkKHRhc2tMaXN0KTtcbn0pXG5cbi8vIENhbmNlbCB0YXNrIGJ1dHRvblxuY2FuY2VsVGFza0J0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+e1xuICAgIHRhc2tGb3JtLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgYWRkVGFza0J0bi5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICB0YXNrRm9ybS5yZXNldCgpO1xufSlcblxuY29uc3QgY3JlYXRlID0gKCkgPT57XG4gICAgY2xlYXJQcm9qZWN0KHByb2plY3RMaXN0KTtcbiAgICBjbGVhclRhc2sodGFza0Rpdik7XG4gICAgY3JlYXRlUHJvamVjdCgpO1xuICAgIGNyZWF0ZVRhc2tzKCk7XG59XG5cbmNvbnN0IGdldEZyb21Mb2NhbFN0b3JhZ2UgPSAoKSA9PntcbiAgICBjb25zdCByZWZlcmVuY2UgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnbGlzdE9mUHJvamVjdHMnKTtcbiAgICBjb25zdCBzZWxlY3RlZCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzZWxlY3RlZFByb2plY3RJZCcpO1xuICAgIFxuICAgIGlmKHJlZmVyZW5jZSl7XG4gICAgICAgIGxpc3RPZlByb2plY3RzID0gSlNPTi5wYXJzZShyZWZlcmVuY2UpO1xuICAgICAgICBjcmVhdGUoKTtcbiAgICB9XG5cbiAgICBpZihzZWxlY3RlZCl7XG4gICAgICAgIHNlbGVjdGVkUHJvamVjdElkID0gSlNPTi5wYXJzZShzZWxlY3RlZCk7XG4gICAgICAgIGNyZWF0ZSgpO1xuICAgIH1cbn1cblxuZ2V0RnJvbUxvY2FsU3RvcmFnZSgpO1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGU7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHRpZihfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdKSB7XG5cdFx0cmV0dXJuIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0uZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgY3JlYXRlIGZyb20gXCIuL2FwcFwiXG5cbmNyZWF0ZSgpOyJdLCJzb3VyY2VSb290IjoiIn0=