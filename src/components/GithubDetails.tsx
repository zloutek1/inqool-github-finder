import {
  Avatar,
  Box,
  Button, Card, CardActions, CardContent, Stack, Typography,
} from '@mui/material';
import React from 'react';
import { GithubOrg, GithubUser } from '../services/githubService';

type Props = {
  user: GithubUser
  org?: never,
} | {
  user?: never
  org: GithubOrg
};

const GithubDetails = ({ user, org }: Props) => {
  const login = user !== undefined ? user.login : org.login;
  const avatarUrl = user !== undefined ? user.avatar_url : org.avatar_url;
  const description = user !== undefined ? user.bio : org.description;
  const learnMoreUrl = user !== undefined ? user.html_url : `https://github.com/${org.login}`;

  return (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            GitHub user
          </Typography>
          <Typography variant="h5" component="div" display="flex">
            <Stack direction="row" spacing={2}>
              <Avatar alt={login} src={avatarUrl} />
              <span>{login}</span>
            </Stack>
          </Typography>
          <Typography variant="body2">
            {description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button href={learnMoreUrl} size="small">Learn More</Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default GithubDetails;
