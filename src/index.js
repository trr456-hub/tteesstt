import { createStore } from "redux";

const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";

const reducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      return [...state, { text: action.text, id: Date.now() }];
    case DELETE_TODO:
      return;
    default:
      return state;
  }
};

const store = createStore(reducer);

const paintToDos = () => {
  const todos = store.getState();
  ul.innerHTML = "";
  todos.forEach((item) => {
    const li = document.createElement("li");
    li.id = item.id;
    li.innerText = item.text;
    ul.appendChild(li);
  });
};

store.subscribe(paintToDos);

// const createTodo = (toDo) => {
//   const li = document.createElement("li");
//   li.innerText = toDo;
//   ul.appendChild(li);
// };

const addTodo = (text) => {
  store.dispatch({ type: ADD_TODO, text });
};

const onSubmit = (e) => {
  e.preventDefault();
  const toDo = input.value;
  input.value = "";
  addTodo(toDo);
};

form.addEventListener("submit", onSubmit);
