import React,{useEffect,useState} from 'react';
import logo from './logo.svg';
import HTMLEditor from './components/Editors/HTMLEditor';
import CSSEditor from './components/Editors/CSSEditor';
import JSEditor from './components/Editors/JSEditor';
import HTMLEditorDark from './components/Editors/HTMLEditorDark';
import CSSEditorDark from './components/Editors/CSSEditorDark';
import JSEditorDark from './components/Editors/JSEditorDark';
import { HtmlCompletions } from 'brace/mode/html';
import './App.css';
import light_icon from './assets/icons/light.png';
const App=()=> {
  const [showResult,setShowResult]=useState(false);
  const [htmlContent,setHtmlContent]=useState("");
  const [cssContent,setCSSContent]=useState("");
  const [jsContent,setJSContent]=useState("");
  const [editorChoice,setEditorChoice]=useState(1);
  const [theme,setTheme]=useState(0);
  
 
  

  useEffect(()=>{
    setEditorChoice(1);
    setShowResult(false);
    setHtmlContent("");
    setJSContent("");
    setCSSContent("");
    var k=localStorage.getItem('theme')
    const body = document.body
    if(k){
      if(k=='light')
        setTheme(0);
      
      else{
        setTheme(1);
        body.classList.add('dark-mode')
      }
    }
    else{

      localStorage.setItem('theme','light');
      setTheme(0);
    }

    
    
   
    
  },[])
  useEffect(()=>{

  },[showResult]);
  useEffect(()=>{

  },[editorChoice])
  useEffect(()=>{
    if(theme==1){
      const body = document.body;
      body.classList.add('dark-mode')
      localStorage.setItem('theme','dark')
    }
    else{
      const body = document.body;
      body.classList.remove('dark-mode');
      localStorage.setItem('theme','light');
    }
  },[theme])

  

  const embed_CSS_JS=()=>{
    let isHtml=htmlContent.search('<html>');
    let isHead=htmlContent.search('<head>');
    let isStyle=htmlContent.search('<style>');
    let isBody=htmlContent.search('<body>');


    let html_css_js=htmlContent;
    
    if(isHtml===-1){
      html_css_js='<html> \n'+ html_css_js+'\n </html>';
    }
    if(isHead===-1){
      html_css_js=html_css_js.replace('<html>','<html>\n <head> \n </head>');
    }    
    
    if(isStyle===-1){
      html_css_js=html_css_js.replace('<head>','<head> \n <style> \n </style>');
    }

    
    html_css_js=html_css_js.replace('<style>','<style> \n '+cssContent);
    
    if(isBody===-1){
      let findex=html_css_js.search('</head>')+7;
      let lindex=html_css_js.search('</html>');
      let insidebody=html_css_js.slice(findex,lindex);
      html_css_js=html_css_js.slice(0,findex)+html_css_js.slice(lindex,html_css_js.length);
      html_css_js=html_css_js.replace('</head>','</head> \n  <body> \n'+insidebody+ '\n </body>');

    }
    
      let isScript=html_css_js.search('<script>');
      if(isScript===-1){
        html_css_js=html_css_js.replace('</body>','<script> \n'+ jsContent+'\n </script> \n </body>')
      }
      else{
        html_css_js=html_css_js.replace('</script>', jsContent+' \n </script>');
      }
    
    console.log(html_css_js);
    return html_css_js;
  }
  const downloadCode=()=> {
                
    
    
    var element = document.createElement('a');
    element.setAttribute('href', 
    'data:text/plain;charset=utf-8, '
    + encodeURIComponent(embed_CSS_JS()));
    element.setAttribute('download', "download.txt");
  
    
  
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
  }

  return (
    <div className="App">
      <nav class="navbar navbar-expand-lg navbar-light bg-light" >
        <a class="navbar-brand" href="#">ReactoEditor</a>
        <ul class="navbar-nav ml-auto">
            
            <li class="nav-item">
            <div style={{}}>
        { theme==0 && <div
        className='fa fa-moon-o'
        onClick={() => {setTheme(!theme)}}
      ></div>}
        {theme==1 && <img src={light_icon} height="22px" onClick={() => {setTheme(!theme)}} />}
        
        </div>
            </li>
        </ul>
        
    </nav>
      <div class="row mr-0">
        
     
    <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6">
      <div className="mx-2 my-2">
      <button className={`btn ${editorChoice==1?'btn-primary':'btn-light'} ml-2`} onClick={()=>{setEditorChoice(1)}}>Html</button>
      <button className={`btn ${editorChoice==2?'btn-primary':'btn-light'} ml-2`} onClick={()=>{setEditorChoice(2)}}> Css </button>
      <button className={`btn ${editorChoice==3?'btn-primary':'btn-light'} ml-2`} onClick={()=>{setEditorChoice(3)}}>Javascript</button>
      <i className="fa fa-save btn btn-light ml-2" onClick={()=>{downloadCode()}}></i>
      <button className={`btn btn-success my-2`} style={{float:"right"}} onClick={()=>{setShowResult(true)}}>Run</button>
      {/* <img src={run_icon}/> */}
      </div>

      {
        theme==0 &&
      <div><div style={{display:editorChoice==1?'block':'none'}}> <HTMLEditor setHtmlContent={setHtmlContent} showResult={showResult}/></div>
      <div style={{display:editorChoice==2?'block':'none'}}> <CSSEditor setCSSContent={setCSSContent} showResult={showResult}/></div>
      <div style={{display:editorChoice==3?'block':'none'}}><JSEditor setJSContent={setJSContent} showResult={showResult}/></div>
      </div>
      }
      {
        theme==1 &&
        <div><div style={{display:editorChoice==1?'block':'none'}}> <HTMLEditorDark setHtmlContent={setHtmlContent} showResult={showResult}/></div>
        <div style={{display:editorChoice==2?'block':'none'}}> <CSSEditorDark setCSSContent={setCSSContent} showResult={showResult}/></div>
        <div style={{display:editorChoice==3?'block':'none'}}><JSEditorDark setJSContent={setJSContent} showResult={showResult}/></div>
        </div>
      }

      
    </div>
    <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
    {  showResult && <div style={{width:"100%",height:"100%", }}>
      <div className="pt-2 pb-2" style={{textAlign:"center"}}> <button className="btn btn-secondary" disabled>Output</button> </div>
      
      <iframe srcdoc={embed_CSS_JS()} name="OutPut" title="Iframe output" id="iframebody" style={{background:"white",width:"100%",height:"100%",border:"4px solid #e8e8e8",marginLeft:"4px" }}></iframe>
      </div>
      }    
      </div>
    
  </div>
      
    
      
      
    </div>
  );
}

export default App;
