import React, { Component } from 'react'
import axios from 'axios';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"

export default class CreateNote extends Component {

    state = {
        users: [],
        userSelected: '',
        title: '',
        content: '',
        date: new Date()
    }
    async componentDidMount() {
        const resp = await axios.get('http://localhost:4000/api/users');
        this.setState({
            users: resp.data.map(user => user.username),
            userSelected: resp.data[0].username
        });
    }
    onSubmit = async (e) => {
        e.preventDefault();
        const newNote = {
            title: this.state.title,
            content: this.state.content,
            date: this.state.date,
            author: this.state.userSelected
        };
        console.log(newNote);
        await axios.post('http://localhost:4000/api/notes', newNote);   
        
    }
    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value // dependiendo del nombre del input cambia el estado
        })
    }
    onChangeDate = (date) => {
        this.setState({ date })
    }

    render() {
        return (
            <div className="col-md-6 offset-md-3">
                <div className="card card-body">
                    <h4>Create a Note</h4>
                    {/** Select User*/}
                    <div className="form-group">
                        <select
                            className="form-control"
                            name="userSelected"
                            onChange={this.onInputChange}
                        >
                            {
                                this.state.users.map(user =>
                                    <option key={user}>
                                        {user}
                                    </option>
                                )
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Title"
                            name="title"
                            required
                            onChange={this.onInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <textarea
                            name="content"
                            className="form-control"
                            placeholder="content"
                            required
                            onChange={this.onInputChange}
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <DatePicker
                            className="form-control"
                            selected={this.state.date}
                            onChange={this.onChangeDate}

                        />
                    </div>
                    <form onSubmit={this.onSubmit}>
                        <button type="submit" className="btn btn-primary">Save
                </button>
                    </form>
                </div>
            </div>
        )
    }
}
