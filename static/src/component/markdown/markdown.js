import React, {Component} from 'react'

import marked from 'marked'

import './markdown.styl'

class Markdown extends Component{
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className={"markdown-wrapper"}>
                <div className={"markdown-area"}>
                    <textarea className={"markdown-input"}></textarea>
                </div>
                <div className={"display-area"}></div>
            </div>
        )
    }
}

export default Markdown