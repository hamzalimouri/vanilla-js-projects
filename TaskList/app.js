const taskInput = document.getElementById('input-task');
const form = document.querySelector('form');
const filter_input = document.getElementById('filter');
const clear_task = document.querySelector('.clear-task');
const tasks = document.querySelector('.collection');


loadEvent();

// load all event 

function loadEvent()
{
    // Load all event 
    document.addEventListener('DOMContentLoaded', getStorageInLocal);

    // add task 
    form.addEventListener('submit', addTask);

    // delete task 
    tasks.addEventListener('click', removeTask);

    // clear 
    clear_task.addEventListener('click', clearTask);

    // filter task 
    filter_input.addEventListener('keyup', filterTask);

}

// fucntion 
function addTask(evt)
{
    if(taskInput.value == '')
        alert("ADD Task");
    else
    {
        const li = document.createElement('li');
    li.classList.add('collection-item');
    li.appendChild(document.createTextNode(taskInput.value));
    const link = document.createElement('a');
    link.classList.add('delete-item');
    link.innerHTML = '<i class="far fa-trash-alt"></i>';
    li.appendChild(link);
    tasks.appendChild(li);

    storageInLocal(taskInput.value);
    }

    taskInput.value = '';
    evt.preventDefault();
}

function removeTask(evt)
{
    if(evt.target.parentElement.classList.includes = 'delete-item')
        if(confirm('Are you sure?'))
        {
            evt.target.parentElement.parentElement.remove();
            removeFromStorage(evt.target.parentElement.parentElement)
        }   
}

function clearTask()
{
    while(tasks.firstElementChild)
    {
        tasks.firstElementChild.remove();
    }
    clearFromStorage();
}

function filterTask(evt)
{
    const input = evt.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(item => {
        const element = item.firstChild.textContent;
        if(element.toLowerCase().includes(input))
        {
            item.style.display = 'flex';
        }
        else
        {
            item.style.display = 'none';
        } 
    });
}

// localstorage 

function storageInLocal(element)
{
    let items;
    if(localStorage.getItem('tasks') === null)
    {
        items = [];
    }
    else
    {
        items = JSON.parse(localStorage.getItem('tasks'));
    }
    items.push(element);
    localStorage.setItem('tasks', JSON.stringify(items));
}

function getStorageInLocal()
{
    let items;
    if(localStorage.getItem('tasks') === null)
    {
        items = [];
    }
    else
    {
        items = JSON.parse(localStorage.getItem('tasks'));
    }
    items.forEach(e=>{
        const li = document.createElement('li');
        li.classList.add('collection-item');
        li.appendChild(document.createTextNode(e));
        const link = document.createElement('a');
        link.classList.add('delete-item');
        link.innerHTML = '<i class="far fa-trash-alt"></i>';
        li.appendChild(link);
        tasks.appendChild(li);
    })
}

function removeFromStorage(item)
{
    let items = JSON.parse(localStorage.getItem('tasks'));
    const index = items.indexOf(item.firstChild.textContent);
    console.log(index);
    items.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(items));
}

function clearFromStorage()
{
    localStorage.clear();
}