import React,{Component} from 'react';
import brace from 'brace';
import AceEditor from 'react-ace';
// import './Editor.css';
import 'brace/mode/html';

 
import 'brace/theme/monokai';

// import 'brace/theme/github';
import App from '../../App';
const HTMLEditor=({setHtmlContent,showResult})=>{

    

    const onChange=(newValue) =>{
        //console.log('change', newValue);
        setHtmlContent(newValue);
    }

    
        return (
            <div>
                <AceEditor
                    mode='html'
                    theme="monokai"
                    onChange={onChange}
                    name="editor"
                    editorProps={{
                        $blockScrolling: false
                    }}
                />
            </div>
        );
    
}

export default HTMLEditor;
