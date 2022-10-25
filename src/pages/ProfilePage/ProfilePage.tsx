import { Container, Grid } from '@mui/material';
import React from 'react';
import useGithubSearch from '../../hooks/useGithubSearch';
import Organisations from './Organisations';
import Repositories from './Repositories';
import GithubDetails from '../../components/GithubDetails';

const ProfilePage = () => {
  const { autocomplete: GithubSearch, user } = useGithubSearch();

  return (
    <Container sx={{ margin: '2em auto' }}>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
      >
        <Grid item xs={6}>{GithubSearch}</Grid>
        {user !== null && (
          <>
            <Grid item xs={6}><GithubDetails user={user} /></Grid>
            <Repositories username={user.login} />
          </>
        )}
      </Grid>
    </Container>
  );
};

export default ProfilePage;
