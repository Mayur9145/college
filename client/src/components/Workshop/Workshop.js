import React, { useState, useEffect } from 'react';
import { Container, Grow, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import { getPostsByType } from '../../actions/posts';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';

const Workshop = () => {
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();
  const postType= "workshop";


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

export default Workshop;








