import React, { Component } from 'react';
import Item from '../Components/Item';
import Button from '../Components/Button';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { todo_items: [], mode: 0 };
        this.index = 0;
    }

    addItem = (e) => {
        let todo = e.target.value.trim();
        if (e.code === "Enter" && todo !== "") {
            let idx = this.index;
            this.setState((s) => ({ todo_items: [...s.todo_items, { item: todo, done: false, idx: idx }] }));
            this.index++;
            e.target.value = "";
        }
    }

    deleteItem = (idx) => {
        this.setState((s) => ({ todo_items: s.todo_items.filter((i) => i.idx !== idx) }));
    }

    checkBtn = (idx, state) => {
        this.setState((s) => {
            s.todo_items.find((e) => e.idx === idx).done = state;
            return ({ todo_items: [...s.todo_items] });
        })
    }

    displayIetm = (todo_items, mode) => {
        switch (mode) {
            case 0:
                return todo_items.map((i) => (<Item key={i.idx} idx={i.idx} item={i.item} done={i.done} checkBtn={this.checkBtn} deleteItem={this.deleteItem}/>));
            case 1:
                return todo_items.filter((i) => i.done === false).map(i => (<Item key={i.idx} idx={i.idx} item={i.item} done={i.done} checkBtn={this.checkBtn} deleteItem={this.deleteItem}/>));
            default:  // case 2
                return todo_items.filter((i)=> i.done === true).map(i => (<Item key={i.idx} idx={i.idx} item={i.item} done={i.done} checkBtn={this.checkBtn} deleteItem={this.deleteItem}/>));
        }
    }
    
    countItem = (todo_items) => {
        let left = 0;
        let completed = 0;
        todo_items.forEach((i) => {
            if (i.done === false) {
                left++;
            } else {
                completed++;
            }
        });
        return { left, completed };
    }

    setMode = (mode) => {
        this.setState({ mode: mode });
    }

    clearCompleted = () => {
        this.setState((s) => ({ todo_items: s.todo_items.filter((i) => i.done === false) }));
    }

    render() {
        const todo_items = this.state.todo_items;
        const mode = this.state.mode;
        const { left, completed } = this.countItem(todo_items);
        return (
            <>
                <header className="todo-app__header">
                    <h1 className="todo-app__title">todos</h1>
                </header>

                <section className="todo-app__main">
                    <input className="todo-app__input" placeholder="What needs to be done?" onKeyDown={this.addItem}></input>
                    <ul className="todo-app__list" id="todo-list">
                        {this.displayIetm(todo_items, mode)}
                    </ul>
                </section>

                {todo_items.length === 0 ? <></> :
                <footer className="todo-app__footer" id="todo-footer">
                    <div className="todo-app__total">{left} left</div>
                    <ul className="todo-app__view-buttons">
                        <Button name="All" mode={0} setMode={this.setMode}/>
                        <Button name="Active" mode={1} setMode={this.setMode}/>
                        <Button name="Completed" mode={2} setMode={this.setMode}/>
                    </ul>
                    <div className="todo-app__clean">
                        {completed > 0 ? <button onClick={this.clearCompleted}>Clear Completed</button> : <button style={{ visibility: "hidden" }}>Clear Completed</button>}
                    </div>
                </footer>}
            </>
        );
    }
}

export default App;
