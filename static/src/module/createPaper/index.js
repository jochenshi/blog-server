import React, {Component} from 'react';
import marked from 'marked';
import axios from 'axios';

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
            htmlData: '',
            title: ''
        }
    }

    componentDidMount(){
        const {id} = this.props.match.params;
        console.log(id);
        this.handleGetPaper(id);
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

    /*
    *  获取文章内容的方法
    * */
    handleGetPaper = (id) => {
        axios({
            'url': `/authen/papers/${id}`,
            'method': 'GET'
        }).then(val => {
            console.log('val', val);
            this.setState({
                'title': val.data[0].title
            });
        })
    };

    //将文章的内容保存到数据库的方法
    handleSave = (title, content) => {
        console.log({
            title,
            content
        });
        let saveData = {
            title: title,
            content: content
        };
        axios.post('/papers', saveData);
    };

    render() {
        console.log('title', this.state.title);
        return (
            <div className={"create-paper-area"}>
                <Markdown
                    handleSave={this.handleSave}
                    title={this.state.title}
                />
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