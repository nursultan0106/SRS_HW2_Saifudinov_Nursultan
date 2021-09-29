import React from "react";
import Task from "./components/Task";
import TaskAdd from "./components/TaskAdd";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: [
        {id: 0, name: 'Make an app', description: 'Make a ToDo List App', complete: false},
        {id: 1, name: 'Create a Git repository', description: 'Create a HW Git repository', complete: false},
        {id: 2, name: 'Add a publisher', description: 'Add teacher as a publisher in Git repository', complete: true},
        {id: 3, name: 'Add a pull request', description: 'Make a pull request while adding files in the repository', complete: false},
        {id: 4, name: 'Link a Git repository in HW forms', description: 'Add a link of Git repository while submitting HW', complete: false}
      ]
    }
  }

  addTask = task => {
    this.setState(state => {
      let { tasks } = state;
      tasks.push({
        id: tasks.length !== 0 ? task.length : 0,
        name: task,
        description: '',
        done: false
      });
      return tasks;
    });
  }

  completeTask = id => {
    const index = this.state.tasks.map(task => task.id).indexOf(id);
    this.setState(state => {
      let { tasks } = state;
      tasks[index].complete = true;
      return tasks;
    });
  };

  deleteTask = id => {
    const index = this.state.tasks.map(task => task.id).indexOf(id);
    this.setState(state => {
      let { tasks } = state;
      delete tasks[index];
      return tasks;
    });
  };

  render() {
    const {tasks} = this.state;
    const activeTasks = tasks.filter(task => !task.complete)
    const completeTasks = tasks.filter(task => task.complete)

    return (
        <div>
          <h1 className="top">Active Tasks: {activeTasks.length}</h1>
          {[...activeTasks, ...completeTasks].map(task => (
              <Task
                  completeTask={() => this.completeTask(task.id)}
                  deleteTask={() => this.deleteTask(task.id)}
                  task={task}
                  key={task.id}
              />
          ))}
          <TaskAdd addTask={this.addTask}/>
        </div>
    );
  }
}

export default App;
