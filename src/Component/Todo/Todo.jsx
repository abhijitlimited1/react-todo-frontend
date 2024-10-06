import { FaRegSquare } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { BsCheckSquare } from "react-icons/bs";
import { useState, useRef } from "react";
import "../../App.css";

function Todo({ handleTodo, todoList, HandleCheckBox, handleDelete }) {
  const firstName = localStorage.getItem("first_name");
  const lastName = localStorage.getItem("last_name");

  const todo = useRef("");

  function addText() {
    handleTodo(todo.current.value);

    todo.current.value = "";
  }

  return (
    <>
      <div className="text-center pt-10 text-2xl">
        Hello {firstName} {lastName} Welcome Add Your Task Here !
      </div>
      <div className="sm:w-2/4 shadow-2xl px-10 py-5 mx-auto sm:mt-20 rounded-lg sm:min-h-fit min-h-full">
        <h1 className="mb-5 font-bold italic">Awesome Todo List:</h1>
        <div className="w-full">
          <input
            ref={todo}
            className="sm:w-5/6 w-1/2 border-2 py-2 px-5 rounded-lg text-xl"
            type="text"
            name="todo"
            placeholder="What do you need to do today?"
          />
          <button
            onClick={addText}
            className="border-2 py-2 px-5 ml-3 rounded-lg bg-blue-600 text-white text-xl"
          >
            Add
          </button>
        </div>
        {!todoList.length > 0 ? (
          <p className="mt-4 text-xl">No todo yet</p>
        ) : (
          todoList.map((item, index) => {
            return (
              <ul
                key={index}
                className="flex justify-between align-center mt-10 border-b-2 text-xl"
              >
                <span onClick={() => HandleCheckBox(index)}>
                  {!item.completed ? <FaRegSquare /> : <BsCheckSquare />}
                </span>

                <li className={item.completed ? "done" : ""}>{item.todo}</li>
                <span
                  onClick={() => handleDelete(index)}
                  className="cursor-pointer"
                >
                  <RxCross2 />
                </span>
              </ul>
            );
          })
        )}
      </div>
    </>
  );
}

export default Todo;
