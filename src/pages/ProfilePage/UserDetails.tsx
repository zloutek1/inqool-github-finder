import {
  Avatar,
  Box,
  Button, Card, CardActions, CardContent, Stack, Typography,
} from '@mui/material';
import React from 'react';
import { GithubUser } from '../../services/githubService';

type Props = {
  user: GithubUser
};

const UserDetails = ({ user }: Props) => (
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
            <Avatar alt={user.login} src={user.avatar_url} />
            <span>{user.login}</span>
          </Stack>
        </Typography>
        <Typography variant="body2">
          {user.bio}
        </Typography>
      </CardContent>
      <CardActions>
        <Button href={user.html_url} size="small">Learn More</Button>
      </CardActions>
    </Card>
  </Box>
);

export default UserDetails;
