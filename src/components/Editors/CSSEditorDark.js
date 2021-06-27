import React,{Component} from 'react';
import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/html';


import 'brace/theme/monokai';
const CSSEditor=({setCSSContent})=>{

    

    const onChange=(newValue) =>{
        console.log('change', newValue);
        setCSSContent(newValue)
    }

    
        return (
            <div>
                <AceEditor
                    mode='css'
                    theme="monokai"
                    onChange={onChange}
                    name="UNIQUE_ID_OF_DIV"
                    editorProps={{
                        $blockScrolling: true
                    }}
                />
            </div>
        );
    
}

export default CSSEditor;
