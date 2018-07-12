import React, { Component } from 'react';
import axios from 'axios';
import { View, Text, Button, TextInput} from 'react-native';

class App extends Component {
  state = {
    newTodoText: "",
    todos: []
  };

  async componentDidMount() {
    const response = await axios.get('http://192.168.0.103:3333/todos');

    this.setState({
      todos: response.data
    });
  }

  handleNewTodo = async (e) => {
    e.preventDefault();

    if(!this.state.newTodoText) return;

    const response = await axios.post("http://192.168.0.103:3333/todos", {
      "text": this.state.newTodoText
    });

    this.setState({todos: [... this.state.todos, response.data]});
  }

  render() {
    return (
      <View style={{padding: 40}}>
        <TextInput
        style={{height: 36, borderWidth: 1, borderColor: '#CCC'}}
        onChangeText={text => this.setState({ newTodoText: text})}
        value={this.state.newTodoText}/>
        <Button onPress={this.handleNewTodo} title="Adicionar" />
      
        <View style={{marginTop: 20}}>
          {
            this.state.todos.map(todo => (
              <Text key={todo._id}>{todo.text}</Text>
            ))
          }
        </View>
      </View>
    );
  }
}

export default App;