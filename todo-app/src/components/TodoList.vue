<template>
    <div :class="['app', { 'dark': darkMode, 'fullscreen': fullscreen }]">
      <div class="container">
        <h1 class="heading">Todo List</h1>
        <div class="input-container">
          <input
            v-model="newTodo"
            type="text"
            class="input-field"
            placeholder="Add a new todo..."
            @keyup.enter="addTodo"
          />
          <button
            v-if="!editingTodo"
            @click="addTodo"
            class="add-button"
          >
            Add Todo
          </button>
        </div>
        <ul class="todo-list">
          <li
            v-for="todo in sortedTodos"
            :key="todo.id"
            class="todo-item"
          >
            <todo-item
              :todo="todo"
              :editing="editingTodo && editTodoId === todo.id"
              @edit="editTodo"
              @remove="removeTodo"
              @update="updateTodo"
            />
          </li>
        </ul>
      </div>
      <div class="fullscreen-toggle" @click="toggleFullscreen">
        <i :class="['fas', fullscreen ? 'fa-compress' : 'fa-expand']"></i>
      </div>
      <div class="theme-toggle" @click="toggleTheme">
        <i :class="['fas', darkMode ? 'fa-sun' : 'fa-moon']"></i>
      </div>
    </div>
  </template>
  
  <script>
  import TodoItem from './TodoItem.vue';
  
  export default {
    components: {
      TodoItem,
    },
    data() {
      return {
        todos: [],
        newTodo: '',
        todoIdCounter: 1,
        editingTodo: false,
        editTodoId: null,
        darkMode: false,
        fullscreen: false,
      };
    },
    computed: {
      sortedTodos() {
        return this.todos.slice().sort((a, b) => b.isEditing - a.isEditing);
      },
    },
    methods: {
      addTodo() {
        if (this.newTodo.trim() !== '') {
          if (this.editingTodo) {
            const editedTodo = this.todos.find(todo => todo.id === this.editTodoId);
            editedTodo.text = this.newTodo;
            editedTodo.isEditing = false;
            this.editingTodo = false;
            this.editTodoId = null;
          } else {
            const newTodo = {
              id: this.todoIdCounter++,
              text: this.newTodo,
              isEditing: false,
            };
            this.todos.unshift(newTodo);
          }
          this.newTodo = '';
        }
      },
      editTodo(todo) {
        this.editingTodo = true;
        this.editTodoId = todo.id;
        todo.isEditing = true;
        this.newTodo = todo.text;
      },
      removeTodo(todo) {
        this.todos = this.todos.filter(t => t.id !== todo.id);
      },
      updateTodo() {
        const editedTodo = this.todos.find(todo => todo.id === this.editTodoId);
        editedTodo.text = this.newTodo;
        editedTodo.isEditing = false;
        this.editingTodo = false;
        this.editTodoId = null;
        this.newTodo = '';
      },
      toggleTheme() {
        this.darkMode = !this.darkMode;
      },
      toggleFullscreen() {
        this.fullscreen = !this.fullscreen;
      },
    },
  };
  </script>
  
  <style>
  .app {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #f8f8f8;
    transition: background-color 0.3s;
  }
  
  .app.dark {
    background-color: #121212;
    color: #ffffff;
  }
  
  .container {
    width: 400px;
    max-width: 90%;
    margin: 0 auto;
    background-color: #ffffff;
    border-radius: 8px;
    padding: 2rem;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s;
  }
  
  .heading {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 1.5rem;
  }
  
  .input-container {
    display: flex;
    margin-bottom: 1rem;
  }
  
  .input-field {
    flex: 1;
    padding: 0.5rem;
    border-radius: 8px;
    border: 1px solid #dddddd;
    outline: none;
    font-size: 16px;
    background-color: #f2f2f2;
    color: #333333;
    margin-right: 0.5rem;
  }
  
  .add-button {
    padding: 0.5rem 1rem;
    border-radius: 8px;
    border: none;
    outline: none;
    font-size: 16px;
    background-color: #007AFF;
    color: #ffffff;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .add-button:hover {
    background-color: #0057d7;
  }
  
  .todo-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .todo-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem 0;
    border-bottom: 1px solid #dddddd;
    transition: transform 0.3s;
  }
  
  .todo-item:last-child {
    border-bottom: none;
  }
  
  .fullscreen-toggle,
  .theme-toggle {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #ffffff;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .theme-toggle i,
  .fullscreen-toggle i {
    font-size: 20px;
    color: #333333;
    transition: transform 0.3s;
  }
  
  .theme-toggle:hover,
  .fullscreen-toggle:hover {
    background-color: #f2f2f2;
  }
  
  .theme-toggle.dark i {
    color: #ffffff;
  }
  
  .fullscreen-toggle .fa-compress {
    transform: rotate(180deg);
  }
  
  .fullscreen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 9999;
  }
  
  .fullscreen .container {
    width: 100%;
    height: 100%;
    border-radius: 0;
    box-shadow: none;
  }
  
  @media (max-width: 600px) {
    .container {
      width: 90%;
    }
  }
  </style>
  