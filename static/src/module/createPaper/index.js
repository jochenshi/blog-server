import React, {Component} from 'react'
import marked from 'marked'

import './index.styl'

import Markdown from '../../component/markdown/markdown'

marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false
});


class CreatePaper extends Component{
    constructor(props) {
        super(props);
        this.clickFlag = false;
        this.state = {
            htmlData: ""
        }
    }

    handleInput = (e) => {
        e.persist();
        this.timeFlag && clearTimeout(this.timeFlag);
        this.timeFlag = setTimeout(() => {
            console.log(marked.lexer(e.target.value));
            this.setState({
                htmlData: marked(e.target.value)
            })
        }, 2000)

    };

    //将文章的内容保存到数据库的方法
    handleSave = (title, data) => {
        console.log(title, data);
        let saveData = {
            title: title,
            content: data
        };
    };

    render() {
        return (
            <div className={"create-paper-area"}>
                <Markdown handleSave={this.handleSave}/>
                {/*<div className={"markdown-area"}>
                    <textarea onChange={this.handleInput}></textarea>
                </div>
                <div className={"display-area"} dangerouslySetInnerHTML={{__html: this.state.htmlData}}>
                </div>*/}
            </div>
        )
    }
}

export default CreatePaper