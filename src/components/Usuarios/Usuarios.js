import React, { useState, useEffect } from 'react'
//useEffect quando atualiza os componentes mudando o valor, substitui o componentDidMount quando utlizar hooks
import AdicionarUsuario from '../AdicionarUsuario/AdicionarUsuario'
import Usuario from '../Usuario/Usuario'

//UTILIZANDO HOOKS

function Usuarios(){
  const [usuarios, setUsuarios] = useState([])

  useEffect(() =>{
    console.log("useEffect")
    fetch('https://reqres.in/api/users')
    .then(resposta => resposta.json())
    .then(dados => {
      const usuarios = dados.data.map(usuario => ({
        id: usuario.id,
        nome: usuario.first_name,
        sobrenome: usuario.last_name,
        email: usuario.email
      }))

      setUsuarios(usuarios)
    })
  }, []) //array vazio informando que nao tem nenhuma dependencia externa para o useEffect

  const adicionarUsuario = (usuario) => {
    //const usuarios = [...this.state.usuarios, usuario]
    //this.setState({ usuarios: usuarios })
    setUsuarios(usuariosAtuais => [...usuariosAtuais, usuario])
  }

  const removerUsuario = (usuario) => {
    if (window.confirm(`Tem certeza que deseja remover "${usuario.nome} ${usuario.sobrenome}"?`)) {
      fetch(`https://reqres.in/api/users/${usuario.id}`, {
        method: 'DELETE'
      })
        .then(resposta => {
          if (resposta.ok) {
            setUsuarios(usuarios.filter(x => x.id !== usuario.id))
          }
        })
    }
  }
  console.log( 'render')
  return (
    <>
      <AdicionarUsuario adicionarUsuario={adicionarUsuario} />

      {usuarios.map(usuario => (
        <Usuario key={usuario.id}
          usuario={usuario}
          removerUsuario={() => removerUsuario(usuario)}
        />
      ))}
    </>
  )
}
//Sem HOOKS
/*class Usuarios extends Component {

  constructor(props) {
    super(props)
    this.state = { usuarios: [] }

    this.adicionarUsuario = this.adicionarUsuario.bind(this)
  }

  adicionarUsuario(usuario) {
    const usuarios = [...this.state.usuarios, usuario]
    this.setState({ usuarios: usuarios })
  }

  removerUsuario(usuario) {
    if (window.confirm(`Tem certeza que deseja remover "${usuario.nome} ${usuario.sobrenome}"?`)) {
      fetch(`https://reqres.in/api/users/${usuario.id}`, {
        method: 'DELETE'
      })
        .then(resposta => {
          if (resposta.ok) {
            let usuarios = this.state.usuarios
            usuarios = usuarios.filter(x => x.id !== usuario.id)
            this.setState({ usuarios: usuarios })
          }
        })
    }
  }

  componentDidMount() {
    fetch('https://reqres.in/api/users')
      .then(resposta => resposta.json())
      .then(dados => {
        const usuarios = dados.data.map(usuario => ({
          id: usuario.id,
          nome: usuario.first_name,
          sobrenome: usuario.last_name,
          email: usuario.email
        }))

        this.setState({ usuarios })
      })
  }

  render() {
    return (
      <>
        <AdicionarUsuario adicionarUsuario={this.adicionarUsuario} />

        {this.state.usuarios.map(usuario => (
          <Usuario key={usuario.id}
            usuario={usuario}
            removerUsuario={this.removerUsuario.bind(this, usuario)}
          />
        ))}
      </>
    )
  }
}*/

export default Usuarios