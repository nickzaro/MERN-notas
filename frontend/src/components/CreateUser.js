import React, { Component } from 'react'
import axios from 'axios'
export default class CreateUser extends Component {



    state = {
        users: [],
        username: ''
    }
    // ejecutar funciones luego de ser montado
    componentDidMount() {
        this.getUsers();
    }

    getUsers = async () => {
        const res = await axios.get('http://localhost:4000/api/users');
        this.setState({ users: res.data });
    }
    onChangeUsername = (e) => {
        this.setState({
            username: e.target.value
        })

    }
    onSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:4000/api/users', {
            username: this.state.username
        })
        this.getUsers(); //actualizar lista usuarios
        this.state.username=""; //limpiar el input
    }
    deleteUser= async (id)=>{
        await axios.delete('http://localhost:4000/api/users/'+id);
        this.getUsers();
    }
    render() {
        return (
            <div className="row">
                <div className="col-md-4">
                    <div className="card card-body">
                        <h3>Create New User</h3>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <input type="text"
                                    className="form-control"
                                    value={this.state.username} //vincular el state con el input
                                    onChange={this.onChangeUsername}  />
                            </div>
                            <button type="submit" className="btn btn-primary">
                                Save
                            </button>
                        </form>
                    </div>
                </div>
                <div className="col-md-8">
                    <ul className="list-group">
                        {
                            this.state.users.map(user => 
                                <li className="list-group-item list-group-item-action" 
                                key={user._id}
                                onDoubleClick ={()=>this.deleteUser(user._id)}> 
                                {user.username}
                            </li>)// el dolble click para eliminar y creando funcion anonima para cada objeto de la lista ()
                        }
                    </ul>
                </div>
            </div>
        )
    }
}
