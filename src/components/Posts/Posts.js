import { useSelector } from 'react-redux';
import { CircularProgress, Grid, Typography } from '@material-ui/core';
import Post from './Post/Post';
import useStyles from './styles';

const Posts = ({ setCurrentId, isLoading }) => {
  const posts = useSelector((state) => state.posts);
  const classes = useStyles();

  return isLoading ? (
    <CircularProgress />
  ) : posts.length ? (
    <Grid
      className={classes.container}
      container
      alignItems="stretch"
      spacing={3}
    >
      {posts.map((post) => (
        <Grid key={post.id} item xs={12} sm={6}>
          <Post key={post.id} post={post} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  ) : (
    <Typography>Post your first memories here!</Typography>
  );
};

export default Posts;
