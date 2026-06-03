import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // Estado do texto digitado no campo de nova tarefa
  const [taskText, setTaskText] = useState("");

  // Estado da prioridade selecionada ao criar uma tarefa
  const [priority, setPriority] = useState("Baixa");

  // Lista completa de tarefas
  const [taskList, setTaskList] = useState([]);

  // Filtro ativo: "Todas", "Pendentes" ou "Concluídas"
  const [filter, setFilter] = useState("Todas");

  // Texto digitado na barra de busca
  const [search, setSearch] = useState("");

  // Texto temporário usado ao editar uma tarefa existente
  const [newTaskText, setNewTaskText] = useState("");

  // ID da tarefa que está sendo editada no momento (null = nenhuma)
  const [editingId, setEditingId] = useState(null);

  // Carrega as tarefas salvas no localStorage ao montar o componente
  useEffect(() => {
    const saved = localStorage.getItem("@taskflow_data");
    if (saved) setTaskList(JSON.parse(saved));
  }, []);

  // Salva as tarefas no localStorage sempre que a lista for alterada
  useEffect(() => {
    localStorage.setItem("@taskflow_data", JSON.stringify(taskList));
  }, [taskList]);

  // Cria uma nova tarefa e adiciona no início da lista
  const addTask = (e) => {
    e.preventDefault();
    if (!taskText.trim()) return; // Ignora se o campo estiver vazio

    const newTask = {
      id: crypto.randomUUID(),           // ID único gerado automaticamente
      text: taskText,
      priority: priority,
      completed: false,
      createdAt: new Date().toLocaleDateString()
    };

    setTaskList([newTask, ...taskList]); // Adiciona no topo da lista
    setTaskText("");                     // Limpa o campo de texto
  };

  // Alterna o status de concluída/pendente de uma tarefa pelo ID
  const toggleTask = (id) => {
    setTaskList(taskList.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  };

  // Salva o novo texto de uma tarefa que está sendo editada
  const updateTask = (id) => {
    setTaskList(taskList.map(t =>
      t.id === id ? { ...t, text: newTaskText } : t
    ));
  };

  // Remove uma tarefa da lista, com confirmação do usuário
  const deleteTask = (id) => {
    const confirmado = window.confirm("Deseja remover esta tarefa?");
    if (confirmado) {
      setTaskList(taskList.filter(t => t.id !== id));
    }
  };

  // Filtra as tarefas pelo texto digitado na busca (case-insensitive)
  const filtered = taskList.filter(task =>
    task.text.toLowerCase().includes(search.toLowerCase())
  );

  // Mapeamento de prioridade para ordenação numérica
  const priorityOrder = { "Alta": 0, "Média": 1, "Baixa": 2 };

  // Aplica o filtro de status e ordena por prioridade (Alta > Média > Baixa)
  const filteredTasks = filtered.filter(t => {
    if (filter === "Pendentes") return !t.completed;
    if (filter === "Concluídas") return t.completed;
    return true; // "Todas": retorna tudo
  }).sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

  return (
    <div className="app-container">

      {/* Cabeçalho da aplicação */}
      <header>
        <h1>TaskFlow</h1>
        <p>Gestão de Produtividade</p>
      </header>

      {/* Formulário para criar nova tarefa */}
      <section className="form-section">
        <form onSubmit={addTask}>
          <input
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
            placeholder="Descrição da tarefa..."
          />
          {/* Seletor de prioridade */}
          <select value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="Baixa">Baixa</option>
            <option value="Média">Média</option>
            <option value="Alta">Alta</option>
          </select>
          <button type="submit">Criar</button>
        </form>
      </section>

      {/* Campo de busca por texto */}
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Buscar tarefa..."
      />

      {/* Botões de filtro por status */}
      <section className="filter-section">
        {["Todas", "Pendentes", "Concluídas"].map(f => (
          <button
            key={f}
            className={filter === f ? "active" : ""} // Destaca o filtro ativo
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </section>

      {/* Grade de cards com as tarefas filtradas */}
      <main className="task-grid">
        {filteredTasks.map(item => (
          <div
            key={item.id}
            className={`task-card ${item.priority.toLowerCase()} ${item.completed ? 'done' : ''}`}
          >
            <div className="task-content">

              {/* Exibe input de edição ou texto normal conforme o estado */}
              {editingId === item.id
                ? <input value={newTaskText} onChange={(e) => setNewTaskText(e.target.value)} />
                : <h3>{item.text}</h3>
              }

              {/* Botão salvar (modo edição) ou editar (modo visualização) */}
              {editingId === item.id
                ? <button onClick={() => { updateTask(item.id); setEditingId(null); }}>Salvar</button>
                : <button onClick={() => { setEditingId(item.id); setNewTaskText(item.text); }}>Editar</button>
              }

              {/* Exibe a prioridade e a data de criação da tarefa */}
              <span>Prioridade: {item.priority}</span>
              <small>Criada em: {item.createdAt}</small>
            </div>

            {/* Ações da tarefa: concluir/reabrir e remover */}
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