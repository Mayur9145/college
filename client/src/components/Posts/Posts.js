import React from 'react';
import { Grid , CircularProgress} from '@material-ui/core';
import Post from './Post/Post';
import { useSelector } from 'react-redux';
import useStyles from './styles';

const Posts = ({setCurrentId,postType}) => {
    const{ posts, isLoading} = useSelector((state)=> state.posts ); 
    const classes = useStyles();
    const requiredPosts = posts.filter( (post) => post.type === postType);

    if(!posts.length && !isLoading) return 'No posts';

    
    return ( 
     isLoading ? <CircularProgress/> : 
      postType === "none" ? (
     <Grid className={ classes.container } container alignItems= "stretch" spacing={3} >
  
        {posts.map((post) => (
            <Grid key={ post._id} item xs={12} sm={12} md={6} lg={3}>
              <Post post={post} setCurrentId= {setCurrentId}/>
            </Grid>
           ))} 
       </Grid>) : 
      (
        <Grid className={ classes.container } container alignItems= "stretch" spacing={3} >
           {requiredPosts.map( (requiredPost)=> (
            <Grid key={ requiredPost._id} item xs={12} sm={12} md={6} lg={3}>
              <Post post={requiredPost} setCurrentId= {setCurrentId} postType={postType}/>
            </Grid>
           ))}

        </Grid>
     ));
    }

export default Posts;