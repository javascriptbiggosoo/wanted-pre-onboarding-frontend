import { useCallback, useEffect, useState } from "react";

export default function Todo({ token }) {
  const [toDos, setToDos] = useState([]);
  const [modifyingTodo, setModifyingTodo] = useState({});
  const [AddToDoInputValue, setAddToDoInputValue] = useState("");

  const getTodos = useCallback(async () => {
    const data = await fetch(
      "https://pre-onboarding-selection-task.shop/todos",
      { headers: { Authorization: `Bearer ${token}` } }
    ).then((res) => res.json());
    // console.log(data);

    setToDos(data);
  }, [token]);

  useEffect(() => {
    getTodos();
  }, [getTodos]);

  const handleAddInputChange = (ev) => {
    setAddToDoInputValue(ev.target.value);
  };
  const fetchCreateToDo = async (todo) => {
    await fetch("https://pre-onboarding-selection-task.shop/todos", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        todo: todo,
      }),
    });
    // console.log(data);
    getTodos();
  };
  const addToDo = (ev) => {
    ev.preventDefault();
    fetchCreateToDo(AddToDoInputValue);
    setAddToDoInputValue("");
  };
  const updateTodo = async ({ id, todo, isCompleted }) => {
    await fetch(`https://pre-onboarding-selection-task.shop/todos/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ todo, isCompleted }),
    });
    getTodos();
  };
  const handleTodoClick = (ev) => {
    ev.preventDefault();
    const isCompleted =
      ev.target.closest("li").dataset.iscompleted === "true" ? true : false;
    const { id } = ev.target.closest("li").dataset;
    // console.log(id, ev.target.closest("li").dataset.todo, isCompleted);
    updateTodo({
      id,
      todo: ev.target.closest("li").dataset.todo,
      isCompleted: !isCompleted,
    });
  };
  const handleModifyBtnClick = (ev) => {
    ev.preventDefault();
    const toDoId = Number.parseInt(ev.target.closest("li").dataset.id);
    setModifyingTodo((todo) => {
      return { ...todo, [toDoId]: ev.target.closest("li").dataset.todo };
    });
    // TODO: input에 todo 밸류 넣어야해
  };
  const handleModifyInputChange = (ev) => {
    ev.preventDefault();
    const toDoId = Number.parseInt(ev.target.closest("li").dataset.id);
    setModifyingTodo((todo) => {
      return { ...todo, [toDoId]: ev.target.value };
    });
  };
  const modifySubmit = (ev) => {
    ev.preventDefault();
    const toDoId = Number.parseInt(ev.target.closest("li").dataset.id);
    const isCompleted =
      ev.target.closest("li").dataset.iscompleted === "true" ? true : false;
    const todo = modifyingTodo[toDoId];
    // console.log(toDoId, todo, isCompleted);
    updateTodo({
      id: toDoId,
      todo,
      isCompleted,
    });
    setModifyingTodo((todo) => {
      delete todo[toDoId];
      return { ...todo };
    });
  };
  const removeTodo = async (id) => {
    await fetch(`https://pre-onboarding-selection-task.shop/todos/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    getTodos();
  };
  const todoRemove = (ev) => {
    ev.preventDefault();
    const toDoId = Number.parseInt(ev.target.closest("li").dataset.id);
    removeTodo(toDoId);
  };
  const cancleModify = (ev) => {
    ev.preventDefault();
    const toDoId = Number.parseInt(ev.target.closest("li").dataset.id);
    setModifyingTodo((todo) => {
      delete todo[toDoId];
      return { ...todo };
    });
  };

  return (
    <div className="Todo">
      <h1>Todo</h1>
      <form onSubmit={addToDo}>
        <input
          data-testid="new-todo-input"
          type="text"
          placeholder="새 할일"
          value={AddToDoInputValue}
          onChange={handleAddInputChange}
        />
        <button data-testid="new-todo-add-button">추가</button>
      </form>
      <ul>
        {toDos.map(({ todo, id, isCompleted }) => (
          <li
            key={id}
            data-id={id}
            data-todo={todo}
            data-iscompleted={isCompleted}
          >
            {modifyingTodo[id] ? (
              <form>
                <input
                  data-testid="modify-input"
                  onChange={handleModifyInputChange}
                  value={modifyingTodo[id]}
                />

                <button onClick={modifySubmit} data-testid="submit-button">
                  제출
                </button>
                <button onClick={cancleModify} data-testid="cancel-button">
                  취소
                </button>
              </form>
            ) : (
              <>
                <label onClick={handleTodoClick}>
                  <input
                    type="checkbox"
                    onChange={() => {}}
                    checked={isCompleted}
                  />
                  <span style={isCompleted ? { opacity: 0.3 } : null}>
                    {todo}
                  </span>
                </label>
                <button
                  onClick={handleModifyBtnClick}
                  data-testid="modify-button"
                >
                  수정
                </button>
                <button onClick={todoRemove} data-testid="delete-button">
                  삭제
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
