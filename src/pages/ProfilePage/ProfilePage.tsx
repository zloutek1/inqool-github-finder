import { Container, Grid } from '@mui/material';
import React from 'react';
import useGithubSearch from '../../hooks/useGithubSearch';
import Repositories from './Repositories';
import UserDetails from './UserDetails';

const ProfilePage = () => {
  const { autocomplete: GithubSearch, data } = useGithubSearch();

  return (
    <Container sx={{ marginTop: '1em' }}>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
      >
        <Grid item xs={6}>{GithubSearch}</Grid>
        {data.length === 1 && (
          <>
            <Grid item xs={6}><UserDetails user={data[0]} /></Grid>
            <Repositories username={data[0].login} />
          </>
        )}
      </Grid>
    </Container>
  );
};

export default ProfilePage;
