import React from "react";
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

class Alunos extends React.Component {

  constructor(props) {
    super(props);

    // Definindo o estado inicial
    this.state = {
      id: 0,
      name: '',
      email: '',
      alunos: [],
      modalAberta: false // Estado que controla a abertura e fechamento do modal
    }
  }

  // Método executado após o componente ser montado
  componentDidMount() {
    this.buscarAluno();
  }

  // Método para buscar todos os alunos do backend
  buscarAluno = () => {
    fetch("http://localhost:3041/alunos")
      .then(res => res.json())
      .then(dados => {
        this.setState({ alunos: dados })
      })
  }

  // Método para deletar um aluno do backend
  deletarAluno = (id) => {
    fetch(`http://localhost:3041/alunos/${id}`, { method: 'DELETE' })
      .then(res => {
        if (res.ok) {
          this.buscarAluno();
        }
      })
  }

  // Método para carregar os dados de um aluno específico no formulário
  carregarDados = (id) => {
    fetch('http://localhost:3041/alunos/' + id, { method: 'GET' })
      .then(res => res.json())
      .then(aluno => {
        this.setState({
          id: aluno.id,
          name: aluno.name,
          email: aluno.email
        })
        this.abrirModal();
      })
  }

  // Método para cadastrar um novo aluno no backend
  cadastraAluno = (aluno) => {
    fetch(`http://localhost:3041/alunos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(aluno)
    })
      .then(res => {
        if (res.ok) {
          this.buscarAluno();
        } else {
          console.log("Erro ao adicionar aluno")
        }
      })
  }

  // Método para atualizar os dados de um aluno existente no backend
  atualizarAluno = (aluno) => {
    fetch(`http://localhost:3041/alunos/${aluno.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(aluno)
    })
      .then(res => {
        if (res.ok) {
          this.buscarAluno();
        } else {
          alert("Erro ao editar aluno")
        }
      })
  }

  // Método para renderizar a tabela de alunos
  renderTabela() {
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Nome</th>
            <th scope="col">Email</th>
            <th scope="col">Opções</th>
          </tr>
        </thead>
        <tbody>
          {this.state.alunos.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>
                <button type="button" className="btn btn-secondary" onClick={() => this.carregarDados(item.id)}>Editar</button>
                <button type="button" className="btn btn-danger" onClick={() => this.deletarAluno(item.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }

  // Método para atualizar o estado do nome
  atualizaNome = (e) => {
    this.setState({
      name: e.target.value
    })
  }

  // Método para atualizar o estado do email
  atualizaEmail = (e) => {
    this.setState({
      email: e.target.value
    })
  }

  // Método para submeter o formulário (cadastrar ou atualizar um aluno)
  submit = (e) => {
    e.preventDefault();

    const aluno = {
      id: this.state.id,
      name: this.state.name,
      email: this.state.email
    }

    if (this.state.id === 0) {
      this.cadastraAluno(aluno);
    } else {
      this.atualizarAluno(aluno);
    }

    this.setState({ id: 0, name: '', email: '' });
    this.fecharModal();
  }

  // Método para resetar o formulário
  reset = () => {
    this.setState({
      id: 0,
      name: '',
      email: ''
    })
  }

  // Método para abrir o modal
  abrirModal = () => {
    this.setState({
      modalAberta: true
    })
  }

  // Método para fechar o modal
  fecharModal = () => {
    this.setState({
      modalAberta: false
    })
  }

  render() {
    return (
      <div className="container mt-5">
        <h2>Adicionar Novo Aluno</h2>
        <Button color="primary" onClick={this.abrirModal}>Adicionar Novo Aluno</Button>

        {/* Modal para adicionar/editar aluno */}
        <Modal isOpen={this.state.modalAberta} toggle={this.fecharModal}>
          <ModalHeader toggle={this.fecharModal}>Adicionar/Editar Aluno</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.submit}>
              <FormGroup>
                <Label for="id">Id</Label>
                <Input
                  type="text"
                  value={this.state.id}
                  readOnly={true}
                />
              </FormGroup>
              <FormGroup>
                <Label for="name">Nome</Label>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  value={this.state.name}
                  onChange={this.atualizaNome}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  value={this.state.email}
                  onChange={this.atualizaEmail}
                  required
                />
              </FormGroup>
              <Button type="submit" color="primary">Salvar</Button>
              <Button color="secondary" onClick={this.reset}>Limpar</Button>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.fecharModal}>Fechar</Button>
          </ModalFooter>
        </Modal>

        {/* Renderizando a tabela de alunos */}
        {this.renderTabela()}
      </div>
    )
  }
}

export default Alunos;
