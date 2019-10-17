import React, {Component} from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';

import './app.css';

export default class App extends Component {

    maxId = 100;

    state = {
        todoData: [
            this.createTodoItem({label: 'Drink coffee', done: true}),
            this.createTodoItem({label: 'Make Awesome App', important: true}),
            this.createTodoItem({label: 'Have a lunch'})
        ],
        term: '',
        filter: 'all' // all, active, done
    };

    createTodoItem({ label, important=false, done=false}) {
        return {
            label,
            important,
            done,
            id: this.maxId++,
        }
    }

    deleteItem = (id) => {
        
        this.setState(({todoData}) => {
            const idx = todoData.findIndex((el) => el.id === id);

            const newArray = [
                ...todoData.slice(0, idx),
                ...todoData.slice(idx + 1)
            ];

            return {
                todoData: newArray
            };
        });
    };

    addItem = (label) => {

        const newItem = this.createTodoItem({label});

        this.setState(({todoData}) => {
            const newArray = [...todoData, newItem];

            return {
                todoData: newArray
            };
        });
    };

    onSearchInput = (term) => {
        this.setState({term});
    };

    onFilterSwitch = (filter) => {
        this.setState({filter});
    }

    toggleProperty(arr, id, propName) {

            const idx = arr.findIndex((el) => el.id === id);
            const oldItem = arr[idx];
            const newItem = {
                ...oldItem,
                [propName]: !oldItem[propName]
            };
            return [
                ...arr.slice(0, idx),
                newItem,
                ...arr.slice(idx + 1)
            ];
    }

    onToggleImportant = (id) => {

        this.setState(({todoData}) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'important')
            };
        });
    };

    onToggleDone = (id) => {

        this.setState(({todoData}) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'done')
            };
        });
    };

    search(items, term) {
        if (term.length === 0) {
            return items;
        }
        return items.filter((item) => {
            return item.label
                .toLowerCase()
                .indexOf(term.toLowerCase()) > -1;  
        });
    };

    filter(items, filter) {
        switch (filter) {
            case 'all':
                return items;
            case 'active':
                return items.filter((item) => !item.done);
            case 'done':
                return items.filter((item) => item.done);
            default:
                return items;
        }
    };

    render() {

        const { todoData, term, filter } = this.state;
        const filteredItems = this.filter(
            this.search(todoData, term), filter);

        const doneCount = todoData
                            .filter((el) => el.done).length;
        const todoCount = todoData.length - doneCount;

        return (
            <div className="todo-app">
                <AppHeader toDo = {todoCount} done = {doneCount}/>
                <div className="top-panel d-flex">
                    <SearchPanel onSearchInput = { this.onSearchInput }/>
                    <ItemStatusFilter
                        filter = { filter }
                        onFilterSwitch = { this.onFilterSwitch }/>
                </div>
                <TodoList
                    todos = { filteredItems }
                    onDeleted = { this.deleteItem }
                    onToggleDone = {this.onToggleDone}
                    onToggleImportant = {this.onToggleImportant}/>
                <ItemAddForm onItemAdded = { this.addItem }/>
            </div>
        );
    }
};