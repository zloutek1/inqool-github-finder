import { Container, Grid } from '@mui/material';
import React from 'react';
import useGithubSearch from '../../hooks/useGithubSearch';
import Organisations from './Organisations';
import Repositories from './Repositories';
import UserDetails from './UserDetails';

const ProfilePage = () => {
  const { autocomplete: GithubSearch, user } = useGithubSearch();

  return (
    <Container sx={{ marginTop: '1em' }}>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
      >
        <Grid item xs={6}>{GithubSearch}</Grid>
        {user !== null && (
          <>
            <Grid item xs={6}><UserDetails user={user} /></Grid>
            <Repositories username={user.login} />
          </>
        )}
      </Grid>
    </Container>
  );
};

export default ProfilePage;
