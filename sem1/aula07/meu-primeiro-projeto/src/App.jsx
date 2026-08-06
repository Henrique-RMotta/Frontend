import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function Saudacao({nome}) {
  return (
    <div style={{ backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '8px', marginBottom: '10px' }}>
      <h2 style={{ color: '#007bff' }}>Olá,{nome}</h2>
      <p>Este componente foi criado separadamente</p>

    </div>
  )
}



function Input() {
  return (
    <>
      <p>Login</p>
      <form action="" method="post" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '10px', gap: '10px' }}>
        <label htmlFor="username">Input:</label>
        <input type='text' id='username' name='username' placeholder='username' style={{ width: '500px', height: '10px' }} required />
        <label htmlFor="senha">Senha:</label>
        <input type="password" id='senha' name='senha' placeholder='senha' style={{ width: '500px', height: '10px' }} required />
        <button type='submit' >Fazer Login</button>
      </form>
    </>
  )
}

function Banco() {
  const games = [
    { 'nome': 'Death Stranding 2 On The Beach', 'categoria': 'aventura', 'valor': 400 },
    { 'nome': 'Dark Souls', 'categoria': 'Souls like', 'valor': 200 },
    { 'nome': 'Undertale', 'categoria': 'Indie', 'valor': 50 },
  ]

  const linhas = [];

  games.forEach((game, index) => {
    linhas.push(
      <tr key={index}>
        <td>{game.nome}</td>
        <td>{game.categoria}</td>
        <td>{game.valor}</td>
      </tr>
      
    )
  });

  return (
    <>
      {linhas}
    </>
  )

}

function Perfil({ nome, turma }) {
  const alunos = [
    {'nome': 'heniq', 'turma' : 'dev'},
    {'nome' : 'isa' , 'turma' : 'enf'},
    {'nome' : 'redondo' , 'turma' : 'Mec'},
    { 'nome' : 'calvo' , 'turma' : 'Eng ele'},
  
  ]
  let listaalunos = [];
  alunos.forEach((aluno) => {
    listaalunos.push (
      <div>
        <hr />
        <h2>Nome: {aluno.nome}</h2>
        <p>Turma: {aluno.turma}</p>
        <hr />
      </div>
    )
  })
  return (
    <>
    {listaalunos}
    <div>
      <hr />
      <h2>Nome: {nome}</h2>
      <p>Turma: {turma}</p>
      <hr />
    </div>
    </>
  )
}

function App() {
  return (
    <>
      <div>
        <h1>Olá, React!</h1>
        <p>Estou alterando meu primeiro componente.</p>
      </div>

      {/*comentario*/}

      <Saudacao nome= "eu" />
      <Saudacao nome="so eu nao"/>
      <Saudacao nome="cipa so eu" />



      <Input />


      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Categoria</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          <Banco />
        </tbody>
      </table>

      <Perfil nome="Motta" turma="3DEVT"/>
    </>
  )
}


export default App

