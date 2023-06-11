<template>
    <div
      :class="['todo-item', { 'editing': editing, 'slide-enter': entering, 'slide-leave-to': leaving }]">
      <div class="todo-text">
        {{ todo.text }}
      </div>
      <div class="todo-buttons">
        <button
          v-show="!editing"
          @click="$emit('edit', todo)"
          class="edit-button"
        >
          Edit
        </button>
        <button
          v-show="!editing"
          @click="$emit('remove', todo)"
          class="delete-button"
        >
          Delete
        </button>
        <button
          v-show="editing"
          @click="$emit('update')"
          class="update-button"
        >
          Update
        </button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      todo: {
        type: Object,
        required: true,
      },
      editing: {
        type: Boolean,
        required: true,
        default: false,
      },
    },
    data() {
      return {
        entering: false,
        leaving: false,
      };
    },
  };
  </script>
  
  <style>
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
  
  .todo-text {
    flex: 1;
    font-size: 16px;
    margin-right: 1rem;
  }
  
  .todo-buttons {
    display: flex;
    align-items: center;
  }
  
  .edit-button,
  .update-button,
  .delete-button {
    padding: 0.5rem 1rem;
    border-radius: 8px;
    border: none;
    outline: none;
    font-size: 16px;
    color: #ffffff;
    cursor: pointer;
    transition: background-color 0.3s;
    margin-left: 0.5rem;
  }
  
  .edit-button {
    background-color: #FF9500;
  }
  
  .update-button {
    background-color: #4CD964;
  }
  
  .delete-button {
    background-color: #FF3B30;
  }
  
  .edit-button:hover,
  .update-button:hover,
  .delete-button:hover {
    opacity: 0.8;
  }
  
  .slide-enter-active,
  .slide-leave-active {
    transition: transform 0.3s;
  }
  
  .slide-enter,
  .slide-leave-to {
    transform: translateX(100%);
  }
  </style>
  