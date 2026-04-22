import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [taskText, setTaskText] = useState("");
  const [priority, setPriority] = useState("Baixa");
  const [taskList, setTaskList] = useState([]);
  const [filter, setFilter] = useState("Todas");
  const [search, setSearch] = useState("");
  const [newTaskText, setNewTaskText] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("@taskflow_data");
    if (saved) setTaskList(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("@taskflow_data", JSON.stringify(taskList));

  }, [taskList]);

  const addTask = (e) => {
    e.preventDefault();
    if (!taskText.trim()) return;

    const newTask = {
      id: crypto.randomUUID(),
      text: taskText,
      priority: priority,
      completed: false,
      createdAt: new Date().toLocaleDateString()
    };

    setTaskList([newTask, ...taskList]);
    setTaskText("");
  };

  const toggleTask = (id) => {
    setTaskList(taskList.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  };

  const updateTask = (id) => {
    setTaskList(taskList.map(t =>
      t.id === id ? { ...t, text: newTaskText } : t
    ));
  };

  const deleteTask = (id) => {
    const confirmado = window.confirm("Deseja remover esta tarefa?");
    if (confirmado) {
      setTaskList(taskList.filter(t => t.id !== id));
    }
  };


  const filtered = taskList.filter(task =>
    task.text.toLowerCase().includes(search.toLowerCase())
  );

  const priorityOrder = { "Alta": 0, "Média": 1, "Baixa": 2 };
  const filteredTasks = filtered.filter(t => {

    if (filter === "Pendentes") return !t.completed;

    if (filter === "Concluídas") return t.completed;
    return true;

  }).sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority])


  return (
    <div className="app-container">
      <header>
        <h1>TaskFlow</h1>
        <p>Gestão de Produtividade</p>
      </header>

      <section className="form-section">
        <form onSubmit={addTask}>
          <input
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
            placeholder="Descrição da tarefa..."
          />
          <select value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="Baixa">Baixa</option>
            <option value="Média">Média</option>
            <option value="Alta">Alta</option>
          </select>
          <button type="submit">Criar</button>
        </form>
      </section>

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Buscar tarefa..."
      />
      <section className="filter-section">
        {["Todas", "Pendentes", "Concluídas"].map(f => (
          <button

            key={f}
            className={filter === f ? "active" : ""}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </section>

      <main className="task-grid">
        {filteredTasks.map(item => (
          <div key={item.id} className={`task-card ${item.priority.toLowerCase()} ${item.completed
            ? 'done' : ''}`}>
            <div className="task-content">
              {editingId === item.id
                ? <input value={newTaskText} onChange={(e) => setNewTaskText(e.target.value)} />
                : <h3>{item.text}</h3>
              }

              {editingId === item.id
                ? <button onClick={() => { updateTask(item.id); setEditingId(null); }}>Salvar</button>
                : <button onClick={() => { setEditingId(item.id); setNewTaskText(item.text); }}>Editar</button>

              }
              <span>Prioridade: {item.priority}</span>
              <small>Criada em: {item.createdAt}</small>
            </div>
            <div className="task-actions">
              <button onClick={() => toggleTask(item.id)}>
                {item.completed ? "Reabrir" : "Concluir"}
              </button>
              <button onClick={() => deleteTask(item.id)} className="delete">
                Remover
              </button>
            </div>
          </div>
        ))}
      </main>
    </div>

  );
}

export default App;