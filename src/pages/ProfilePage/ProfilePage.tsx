import { Container, Grid } from '@mui/material';
import React from 'react';
import useGithubSearch from '../../hooks/useGithubSearch';
import UserDetails from './UserDetails';

const ProfilePage = () => {
  const { autocomplete: GithubSearch, data } = useGithubSearch();

  return (
    <Container>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
      >
        <Grid xs={6}>{GithubSearch}</Grid>
        {data.length === 1 && (
          <Grid xs={6}><UserDetails user={data[0]} /></Grid>
        )}
      </Grid>
    </Container>
  );
};

export default ProfilePage;
