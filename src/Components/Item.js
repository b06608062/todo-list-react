import React from "react";
import X from "../x.png";

class Item extends React.Component {
    render() {
        const doneStyle = { textDecorationLine: "line-through", opacity: "0.5" };
        return (
            <li className="todo-app__item">
                <div className="todo-app__checkbox">
                    <input type="checkbox" id={this.props.idx} defaultChecked={this.props.done} onClick={() => this.props.checkBtn(this.props.idx, !this.props.done)}></input>
                    <label htmlFor={this.props.idx}></label>
                </div>
                <h1 className="todo-app__item-detail" style={this.props.done ? doneStyle: {}}>{this.props.item}</h1>
                <img className="todo-app__item-x" src={X} alt="X" onClick={() => this.props.deleteItem(this.props.idx)}/>
            </li>
        );
    }
};

export default Item;
