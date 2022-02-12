// import React, { useState, useEffect } from 'react';
// import { Container, Grow, Grid,Paper,AppBar,TextField,Button } from '@material-ui/core';
// import { useDispatch } from 'react-redux';
// import {useLocation,useNavigate } from 'react-router-dom';
// import ChipInput from 'material-ui-chip-input';

// import { getPosts ,getPostsBySearch,getPostsByType} from '../../actions/posts';
// import Pagination from '../Pagination';
// import Posts from '../Posts/Posts';
// import Form from '../Form/Form';
// import useStyles from './styles';

// function useQuery(){
//   return new URLSearchParams(useLocation().search);

// }


// const Seminar = () => {
//   const [currentId, setCurrentId] = useState(null);
//   //const [postType, setpostType] = useState("none");
//   const postType= "seminar";
//   const dispatch = useDispatch();
//   const classes =useStyles();
//   const query=useQuery();
//   const navigate=useNavigate();
//   const page=query.get('page') ||1;
//   const searchQuery=query.get('searchQuery');
//   const [search,setSearch]=useState('');
//   const [tags,setTags]=useState([]);



//   // useEffect(() => {
//   //   dispatch(getPostsByType());
//   // }, [currentId, dispatch]);

//   const searchPost = () => {
//     if (search.trim() || tags) {
//       dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
//       navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
//     } else {
//       navigate('/');
//     }
//   };

//   const handleKeyPress =(e)=>{
//     if(e.keyCode === 13){
//         searchPost();
//     }
//   }

//   // const handleAdd =(tag)=>setTags([...tags,tag]); 
//   const handleAddChip = (tag) => setTags([...tags, tag]);

//   const handleDelete =(tagToDelete) => setTags(tags.filter((tag) =>tag!==tagToDelete));



//   return (
//     <Grow in>
//       <Container maxWidth="xl">
//         <Grid className={classes.form} container justify="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>       
//           <Grid item xs={12} sm={6} md={9}>
//             <Posts setCurrentId={setCurrentId} postType={postType}/>
//           </Grid>
//           <Grid item xs={12} sm={6} md={3}>
//           <AppBar className={classes.appBarSearch} position="static" color="inherit" >
//             <TextField 
//                 name="search"
//                 variant="outlined"
//                 label="Search Posts"
//                 onKeyDown={handleKeyPress}
//                 fullWidth
//                 value={search}
//                 onChange={(e) =>setSearch(e.target.value)}

//             />

//               <ChipInput
//                 style={{margin:'10px 0'}}
//                 value={tags}
//                 onAdd={(chip) => handleAddChip(chip)}
//                 onDelete={handleDelete}
//                 label="Search Tags"
//                 variant="outlined"
//               />
//               <Button onClick={searchPost} className={classes.searchButton} variant="contained" color="primary">Search</Button>
//           </AppBar>
//             <Form currentId={currentId} setCurrentId={setCurrentId} />
//             {(!searchQuery && !tags.length) && 
//               (
//                 <Paper elevation={6} className={classes.pagination}>
//                     <Pagination page={page} />

//                 </Paper>

//               )
            
//             }
            
//           </Grid>
//         </Grid>
//       </Container>
//     </Grow>
//   );
// };

// export default Seminar;

import React, { useState, useEffect } from 'react';
import { Container, Grow, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import { getPostsByType } from '../../actions/posts';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';

const Seminar = () => {
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();
  const postType= "seminar";


  useEffect(() => {
    dispatch(getPostsByType());
  }, [currentId, dispatch]);

  return (
    <Grow in>
      <Container>
        <Grid container justify="space-between" alignItems="stretch" spacing={3}>
          <Grid item xs={12} sm={7}>
            <Posts setCurrentId={setCurrentId} postType={postType}/>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Seminar;






