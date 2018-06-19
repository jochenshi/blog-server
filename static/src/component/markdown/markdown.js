import React, {Component} from 'react'

import marked from 'marked'
import highjs from 'highlight.js'

import 'highlight.js/styles/atom-one-dark.css'

import './markdown.styl'

marked.setOptions({
    highlight: code => highjs.highlightAuto(code).value,
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false
});


/*
* 对于按钮的事件，通过props的方式传入
* uploadPicture: function 上传图片
* handleSave: function  保存文章
* releasePaper: function  发布文章
* */

class Markdown extends Component{
    constructor(props) {
        super(props);
        this.state = {
            titleData: "ad",
            htmlData: "asd"
        };
        this.icons = [
            {class: "icon-picture", title: "图片", key: "picture", click: this.uploadPicture},
            {class: "icon-save", title: "保存", key: "save", click: this.handleSave},
            {class: "icon-paper", title: "发布文章", key: "release-paper", click: this.releasePaper}
        ];
    }

    //处理标题输入框的事件
    handleInput = (e) => {
        e.persist();
        this.inputFlag && clearTimeout(this.inputFlag);
        this.inputFlag = setTimeout(() => {
            this.setState({
                titleData: e.target.value
            })
        }, 2000)
    };

    //处理正文输入框的事件
    handleMark = (e) => {
        e.persist();
        this.timeFlag && clearTimeout(this.timeFlag);
        this.timeFlag = setTimeout(() => {
            console.log(marked.lexer(e.target.value));
            this.setState({
                htmlData: marked(e.target.value)
            })
        }, 2000)
    };

    //处理点击保存按钮以及触发保存操作时的事件
    handleSave() {
        this.handleClick("handleSave", this, this.state.titleData, this.state.htmlData);
    }

    //处理添加图片的事件
    uploadPicture() {
        if (typeof this.props.uploadPicture === "function") {
            console.log("this can trigger save function");
            this.props.uploadPicture.call(this);
        } else {
            console.error("uploadPicture is not a function or does not exist")
        }
    }

    //处理发布文章的事件
    releasePaper() {
        this.handleClick("releasePaper", this, this.state.titleData, this.state.htmlData);
    }

    //用于绑定事件的相关操作
    handleClick(fun, thisArg, ...args) {
        if (typeof thisArg.props[fun] === "function") {
            console.log("this can trigger click function");
            thisArg.props[fun].call(thisArg, ...args)
        } else {
            console.error(fun + " is not a function or does not exist");
            console.log(...args)
        }
    }

    //处理按键按下的事件，在此处是为了实现Tab缩进的效果
    handleKeyDown = (e) => {
        e.persist();
        if (e.keyCode === 9) {
            let target = e.target;
            let nowPosition = target.selectionStart + 4;
            target.value = target.value.substr(0, target.selectionStart) + "    " + target.value.substr(target.selectionStart);
            target.selectionStart = nowPosition;
            target.selectionEnd = nowPosition;
            target.focus();
            e.preventDefault();
        } else if (e.keyCode === 83) {
            //this represent press "ctrl/command" + "S", and "ctrl/command" is pressed before "S"
            if (e.metaKey || e.ctrlKey) {
                console.log("execute save operation");
                e.preventDefault()
            }
        }
    };

    //处理保存操作的事件
    handleSave() {

    }

    render() {
        return (
            <div className={"markdown-wrapper"}>
                <div className={"markdown-area"}>
                    <input className={"markdown-title"} onChange={this.handleInput} placeholder={"请输入标题"}/>
                    <ul className={"markdown-operation"}>
                        {
                            this.icons.length ?
                                this.icons.map((val, index) => {
                                    return <li key={val.key}
                                               onClick={val.click ? val.click.bind(this) : () => {console.log("no function called in " + val.key)}}
                                               className={"iconfont " + val.class}
                                               title={val.title}>
                                    </li>
                                }) :
                                ""
                        }
                    </ul>
                    <textarea
                        className={"markdown-input"}
                        onKeyDown={this.handleKeyDown}
                        onChange={this.handleMark}/>
                </div>
                <div className={"display-area"}>
                    <h1 className={"display-title"}>{this.state.titleData}</h1>
                    <div className={"display-body"} dangerouslySetInnerHTML={{__html: this.state.htmlData}}>
                    </div>
                </div>
            </div>
        )
    }
}

export default Markdown