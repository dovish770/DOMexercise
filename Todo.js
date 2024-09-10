const table = document.getElementById('table');
const create = document.getElementById(`create`);
const headTable = document.getElementById(`header-table`)
let input = document.getElementById(`new-to-do`);
let todos = JSON.parse(localStorage.getItem(`todos`)) || [];
create.addEventListener(`click`, ()=> createToDo());
document.getElementById('btn-sort').addEventListener('click', ()=>sort())
renderPage(todos);


function createId(){
    return Math.random().toString(16) + Date.now().toString()
}

function createToDo(){
    if (input.value == '') {
        alert('Please enter a to-do item'); 
        return;
    };
    const newtodo = {
        id: createId(),
        content: input.value,
        status: "TO DO!"
    };
    todos.push(newtodo);
    localStorage.setItem(`todos`, JSON.stringify(todos));
    renderPage(todos);
    input.value="";
}

function addRow(task, idx){
    
    const tr = document.createElement('tr');
    
    const tdId = document.createElement('td');
    tdId.innerText = task.id.substring(2, 5) + "...";

    const tdTodo = document.createElement('td');
    tdTodo.innerText = task.content;
    
    const tdStatus = document.createElement('td');
    if(task.status == "TO DO!"){
        tdStatus.innerText = task.status;
    }
    else{
        tdStatus.innerText = "DONE";
        tdStatus.style.background = `red`;
        tdStatus.style.textDecoration = `line-through`
    }

    const tdActions = document.createElement('td');
    const divActions = createActions(task)
    tdActions.appendChild(divActions)
    tr.append(tdId, tdTodo, tdStatus, tdActions);
    table.appendChild(tr);

    input.value = '';
};

function renderPage(arrToShow){
    table.innerHTML = "";
    table.appendChild(headTable)
    arrToShow.forEach((task, idx) => {
        addRow(task, idx)
    });
    isTable();
};

function createActions(task){
    const btnDone = createBTNDone(task.id);

    const btnUpdate = createBTNUpdate(task.id);

    const btnDelete = createBTNDelete(task.id);

    const div = document.createElement(`div`);

    div.append(btnDone, btnUpdate, btnDelete);
    div.style.backgroundColor = `rgb(231, 238, 244)`;
    return div;
}

function createBTNDone(id){
    const btnDone = document.createElement('button');
    btnDone.innerText = "Done";
    btnDone.style.backgroundColor = `rgb(106, 112, 21)`;
    btnDone.classList.add(`btns`);
    btnDone.addEventListener('click', () => Done(id));
    return btnDone;
}
function createBTNUpdate(id){
    btnUpdate = document.createElement(`button`);
    btnUpdate.innerText = "Update";
    btnUpdate.style.backgroundColor = `rgb(140, 54, 0)`;
    btnUpdate.classList.add(`btns`);
    btnUpdate.addEventListener(`click`, () => Update(id))
    return btnUpdate;
}
function  createBTNDelete(id){
    const btnDelete = document.createElement(`button`);
    btnDelete.innerText = "Delete";
    btnDelete.style.backgroundColor = `rgb(116, 64, 226)`;
    btnDelete.classList.add(`btns`);
    btnDelete.addEventListener(`click`, () => Delete(id))
    return btnDelete;
}

function Done(id){
    let task = todos.find(x => x.id === id);
    if (task) {
        task.status = `DONE`;
        localStorage.setItem(`todos`, JSON.stringify(todos));
        renderPage(todos);
    }
}
function Update(id){
    let task = todos.find(x => x.id === id);
    if (task&&input.value!="") {
        task.content = input.value;
        localStorage.setItem(`todos`, JSON.stringify(todos));
        renderPage(todos);
    }
}
function Delete(id){
    todos = todos.filter(x => x.id != id);   
    localStorage.setItem(`todos`, JSON.stringify(todos));
    renderPage(todos);
}

function isTable(){
    if (todos.length>0){
        headTable.style.display = `table-header-group`;
    }
    else{
        headTable.style.display = `none`;
    }
}

function sort(){
    const sortMethod = document.getElementById('sort');
    if(sortMethod.value==`ascending`){
        showSortedAscending();
    }
    if(sortMethod.value==`descending`){
        showSortedDescending()
    }
}

function showSortedDescending(){
    const sortedArr = sortDescending();
    renderPage(sortedArr);
}
function showSortedAscending(){
    const sortedArr = sortAscending();
    renderPage(sortedArr);
}

function sortDescending(){
    const tasksSorted = todos.sort((a, b) => a.content.localeCompare(b.content));
    return tasksSorted
}
function sortAscending(){
    const tasksSorted = todos.sort((a, b) => a.content.localeCompare(b.content)).reverse();
    return tasksSorted
}


