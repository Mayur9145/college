import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography,ButtonBase } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import {useNavigate} from  'react-router-dom' ;
import useStyles from './styles';
import {useDispatch } from 'react-redux';

import {deletePost, likePost } from '../../../actions/posts'; 


const Post = ({post, setCurrentId}) => {

    const classes =useStyles();
    const navigate =useNavigate();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));

    const Likes = () => {
    if (user && post.likes.length > 0) {
      return post.likes.find((like) => like === (user.result.googleId || user.result._id))
    ? ( 
          <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}` }</>
        ) : (
          <><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
        );
    }

    return <><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
  };


//   const openPost=()=> navigate(`/post/${post._id}`);
  const openPost = (e) => {
    navigate(`/posts/${post._id}`);
  };

    return ( 
       <Card className={classes.card} raised elevation={6}>
       <ButtonBase 
       component="span"
        name="test" 
        className={classes.cardAction} 
        onClick={openPost} 
        >
        <CardMedia className={classes.media } image={post.selectedFile} title={post.title}/>
            <div className={classes.overlay}  >
                <Typography variant="h6">{post.name}</Typography>
                <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
            </div>

            { user && (user.result.googleId===post.creator || user.result._id===post.creator) &&(
                <div className={classes.overlay2} name='edit'> 
                <Button 
                style={{color:'white'}} 
                size="small"  
                onClick={(e)=> {
                  e.stopPropagation();
                  setCurrentId(post._id);
                  }} >
                <MoreHorizIcon fontSize="default"/> 
                </Button>
                </div>
            )}

            <div className={classes.details}>
            <Typography variant="body2" color="textSecondary">{post.tags.map((tag)=> `#${tag} `)}</Typography>  
            </div>

           
            <Typography className={classes.title} variant="h5" gutterBottom>{post.title}</Typography>  

            <CardContent>
                <Typography  variant="body2" color="textSecondary" component="p">{post.message}</Typography>  
            </CardContent>
            </ButtonBase>

            <CardActions className={classes.cardActions}>
            
                <Button size="small" color="primary" disabled={!user} onClick={() => dispatch(likePost(post._id))}>
                    <Likes />
                </Button>
                
                { user && (user.result.googleId===post.creator || user.result._id===post.creator) &&(

                <Button size="small" color="primary" onClick={() => dispatch(deletePost(post._id)) }>
                    <DeleteIcon fontSize="small"/>
                    Delete
                </Button>
                )}
            </CardActions>
       </Card> 
    );
}


export default Post;