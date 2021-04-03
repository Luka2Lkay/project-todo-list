
import create from "./app"

// Local storage

export const addToLocalStorage = (listOfProjects) =>{
    localStorage.setItem('listOfProjects', JSON.stringify(listOfProjects));
    create();
}

// Add the selected project to local storage
export const addSelectedProject = (selectedProjectId) =>{
    localStorage.setItem('selectedProjectId', JSON.stringify(selectedProjectId));
    create();
}
