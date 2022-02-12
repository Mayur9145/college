import React , { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import {useNavigate} from 'react-router-dom';
import  {useDispatch, useSelector } from 'react-redux';

import useStyles from './styles';
import {createPost, updatePost} from '../../actions/posts';



const Form = ({ currentId, setCurrentId}) => {
    const classes = useStyles();
    
    const post = useSelector((state)=> currentId ? state.posts.posts.find((p) =>  p._id === currentId ): null ); 
    const dispatch = useDispatch();
    const user=JSON.parse(localStorage.getItem('profile'));
    const navigate= useNavigate();
    let creator='';

    if(user){
      creator = user.result.googleId ? user.result.googleId : user.result._id;
    }
 

    const  [ postData, setPostData]=useState({
        type:'workshop',creator: {creator} ,title:'',message:'', tags:'', selectedFile:''

    });

    useEffect(() => {
        if(post) setPostData(post);
        }, [post]);

    
    const clear = ()=>{
        setCurrentId(null);
        setPostData({type:'workshop',creator: '', title:'',message:'', tags:'', selectedFile:''});
    };
  
    
    const handleSubmit = async (e)=> {
        e.preventDefault();     
        if(currentId === null){
            dispatch(createPost({...postData, name: user.result.name},navigate));
            window.location.reload();
            // navigate.push();
            // dispatch(createPost({post}));
            clear();           
        }else{            
            dispatch(updatePost(currentId,{...postData, name: user.result.name}));
            clear();          

        }
        //console.log(postData);
   }

    if (user===null) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please Sign In to create your own post and like other's posts.
        </Typography>
      </Paper>
    );
  }


    return ( 
       
        <Paper className= {classes.paper} elevation={6}>
            <form autoComplete = "off" noValidate className= {`${classes.root} ${classes.form}` } onSubmit={handleSubmit}> 
            <Typography varient ="h6" >{ currentId ? 'Editing' : 'Creating' } a Memory</Typography>   
            
            <label>Type of post:</label>
            <br/>
            <select name="type" onClick={(e) =>  setPostData({ ...postData, type : e.target.value })}>
              <option value="workshop">Workshop</option>
              <option value="women">Woman Empowerment</option>
              <option value="seminar">Seminar</option>
              <option value="inter">Inter College Achievement</option>
              <option value="intra">Intra College Achievement</option>
            </select>
              
            <TextField placeholder="Title" name="title" variant="outlined" lable="Title" fullWidth value={postData.title} onChange={(e) =>  setPostData({ ...postData, title : e.target.value })} />
            <TextField placeholder="Message" name="message" variant="outlined" lable="Message" fullWidth multiline rows={4} value={postData.message} onChange={(e) =>  setPostData({ ...postData, message : e.target.value })} />
            <TextField placeholder="Tags" name="tags" variant="outlined" lable="Tags" fullWidth value={postData.tags} onChange={(e) =>  setPostData({ ...postData, tags : e.target.value.split(',') })} />
            <div className= {classes.fileInput}><FileBase type ="file" multiple={false} onDone={({base64})=> setPostData({ ...postData, selectedFile:base64 })} /></div> 
            <Button type="submit" fullWidth variarnt ="contained" size="large" className={classes.buttonSubmit}>Submit</Button>
            <Button variarnt ="contained" size="small" className={classes.buttonClear} onClick={clear} fullWidth>Clear</Button>
            </form>            
        </Paper>
    );
}
export default Form;