import React, {Component} from 'react';
import marked from 'marked';
import axios from 'axios';
import {message} from 'antd';

import './index.styl';

import Markdown from '../../component/markdown/markdown';

marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    paperId: ''
});


class CreatePaper extends Component{
    constructor(props) {
        super(props);
        this.clickFlag = false;
        this.state = {
            htmlData: '',
            paperInfo: '',
            spinLoading: true
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
                'paperInfo': {
                    'title': val.data[0].title,
                    'content': val.data[0].content
                },
                'spinLoading': false,
                'paperId': val.data[0]._id
            });
        })
    };

    //将文章的内容保存到数据库的方法
    handleSave = (title = '', content = '') => {
        console.log({
            title,
            content
        });
        const id = this.state.paperId;
        let flag = true;
        if(!id) {
            message.info('参数不正确，请刷新页面或者获取正确的id');
            flag = false;
        } else if(!title){
            message.info('文章标题不能为空');
            flag = false;
        }
        if(!flag) {
            return;
        }
        let saveData = {
            title: title,
            content: content,
            id: id
        };
        axios({
            'url': `/authen/papers/${id}`,
            'method': 'PUT',
            'data': saveData
        });
    };

    render() {
        const {paperInfo, spinLoading} = this.state;
        console.log('title', this.state.title);
        console.log(spinLoading);
        return (
            <div className={"create-paper-area"}>
                <Markdown
                    handleSave={this.handleSave}
                    paperInfo={paperInfo}
                />
                <div className={'loading'} style={{'display': spinLoading ? '' : 'none'}}>
                    <span className={'text'}>加载中...</span>
                </div>
            </div>
        )
    }
}

export default CreatePaper