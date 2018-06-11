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

    handleInput = (e) => {
        e.persist();
        this.inputFlag && clearTimeout(this.inputFlag);
        this.inputFlag = setTimeout(() => {
            this.setState({
                titleData: e.target.value
            })
        }, 2000)
    };

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

    handleKeyDown = (e) => {
        e.persist();
        console.log(e);
        if (e.keyCode === 9) {
            e.preventDefault();
            console.log(e.keyCode)
        }
    };

    render() {
        return (
            <div className={"markdown-wrapper"}>
                <div className={"markdown-area"}>
                    <input className={"markdown-title"} onChange={this.handleInput}/>
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
                        onChange={this.handleMark}></textarea>
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