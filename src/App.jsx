import "./App.css";
import Register from "./Component/Register/Register";
import Login from "./Component/Login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Todo from "./Component/Todo/Todo";
import ProtectedRoute from "./Component/ProtectedRoute";
import { useState, useEffect } from "react";
function App() {
  // this below code is for Register user
  function formValue(firstName, lastName, email, password) {
    const data = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
    };

    const url = "https://abhijithemram.pythonanywhere.com/api/register/";

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert("Email you entered is already exits");
        } else {
          alert("Register Successfully");
          window.location.href = "/login";
        }
      });
  }
  // this below code is for login
  function handleLogin(email, password) {
    const data = {
      email,
      password,
    };

    const url = "https://abhijithemram.pythonanywhere.com/api/login/";

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          alert("login successfull");
          localStorage.setItem("first_name", data.first_name);
          localStorage.setItem("last_name", data.last_name);

          window.location.href = "/addtodo";
        }
      });
  }
  // State variables
  const [todoList, setTodoList] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);

  // Fetch todos from the backend when the component mounts or after an update
  useEffect(() => {
    const url = "https://abhijithemram.pythonanywhere.com/api/todo/";

    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        setTodoList(data); // Ensure data is an array of todos
        setIsUpdated(false); // Reset the update flag after fetching todos
      })
      .catch((error) => {
        console.error("Error fetching todos:", error);
      });
  }, [isUpdated]); // Re-fetch todos after any update

  // Function to handle adding a new todo
  function handleTodo(todo) {
    const url = "https://abhijithemram.pythonanywhere.com/api/todo/";

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ todo }), // Send the todo text to the backend
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        setTodoList((prev) => [
          ...prev,
          {
            id: data.tasks.id, // Use data.tasks.id from the response
            name: data.tasks.todo, // Use data.tasks.todo from the response
            completed: data.tasks.completed, // Use data.tasks.completed from the response
          },
        ]);
        setIsUpdated(true); // Trigger refetch of the updated todo list
      })
      .catch((error) => {
        console.error("Error adding todo:", error);
      });
  }

  // this below code is for check checkbox
  function HandleCheckBox(index) {
    const updatedTodoList = todoList.map((item, i) => {
      if (index === i) {
        // Send the updated completed status to the backend
        const url = `https://abhijithemram.pythonanywhere.com/api/todo/${item.id}/`; // Assuming you have the task ID stored in item.id

        fetch(url, {
          method: "PATCH", // You can use PATCH or PUT depending on your backend
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ completed: !item.completed }), // Toggle the completed status
        })
          .then((res) => res.json())
          .then((data) => {
            // console.log("Updated task:", data);
          })
          .catch((error) => {
            console.error("Error updating task:", error);
          });

        return { ...item, completed: !item.completed }; // Toggle locally as well
      }
      return item;
    });

    setTodoList(updatedTodoList);
  }

  // below code is for delete todo
  function handleDelete(index) {
    const itemToDelete = todoList[index];
    const url = `https://abhijithemram.pythonanywhere.com/api/todo/delete/${itemToDelete.id}/`;

    fetch(url, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          const updatedTodoList = todoList.filter((item, i) => index !== i);
          setTodoList(updatedTodoList);
        } else {
          console.error("Error deleting task");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <div className="w-screen h-screen overflow-x-hidden">
      <BrowserRouter>
        <Routes>
          <Route
            path="/register"
            element={<Register handleForm={formValue} />}
          />
          <Route path="/login" element={<Login handleLogin={handleLogin} />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Todo
                  handleTodo={handleTodo}
                  todoList={todoList}
                  HandleCheckBox={HandleCheckBox}
                  handleDelete={handleDelete}
                />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
