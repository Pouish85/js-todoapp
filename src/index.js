import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const ulContainer = document.querySelector('ul');
const form = document.querySelector("form");
const input = document.querySelector("form > input");

const todos = [
    {text: "Aller faire les courses", done: false},
    {text: "Sortir le chien", done: true},
]

form.addEventListener('submit', (event) => {
    event.preventDefault(); // on arrete le rechargement de la page
    const todoText = input.value;
    input.value = ''; // on réinitialise la zone de saisie

    const newTodo = {text: todoText, done: false}; // on créé un tache
    todos.push(newTodo); // on ajoute la tache à la liste des taches todos
    displayTodos();
})

//fonction fléchée qui va creer et remplir une balise <li>
const createTodoElement = (todo, index) => {
    const li = document.createElement('li');
    const deleteBtn = document.createElement('button');
    li.classList.add("d-flex", "align-items-start");
    deleteBtn.classList.add("btn",  "btn-danger", "mx-2");
    deleteBtn.innerText = "Supprimer";
    deleteBtn.addEventListener('click', (Event) => {
        event.stopPropagation();
        todos.splice(index, 1);
        displayTodos();
    })

    li.innerHTML = `
        <span class="todo ${todo.done ? 'done' : ''}"></span>
        <p class="w-100">${todo.text}</p>
        <button class="btn btn-primary mx-2">Editer</button>
    `
    li.addEventListener('click', (event) => {
        todos[index].done = !todos[index].done;
        displayTodos();
    })

    li.appendChild(deleteBtn);

    return li;
}

// fonction qui va afficher la liste des taches
const displayTodos = () => {
    const todosNode = todos.map((todo, index) => {
        return createTodoElement(todo, index);
    })

    ulContainer.innerHTML = '';
    ulContainer.append(...todosNode)

}

displayTodos();