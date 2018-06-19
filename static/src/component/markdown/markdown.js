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

class Markdown extends Component{
    constructor(props) {
        super(props);
        this.state = {
            titleData: "",
            htmlData: ""
        };
        this.icons = [
            {class: "icon-picture", title: "图片"},
            {class: "icon-save", title: "保存"},
            {class: "icon-paper", title: "发布文章"}
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
                                    return <li key={index} className={"iconfont " + val.class} title={val.title}></li>
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
                    <div  className={"display-body"} dangerouslySetInnerHTML={{__html: this.state.htmlData}}></div>
                </div>
            </div>
        )
    }
}

export default Markdown