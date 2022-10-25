import {
  Chip, Stack, Typography,
} from '@mui/material';
import React from 'react';
import StarIcon from '@mui/icons-material/Star';
import ForkRightIcon from '@mui/icons-material/ForkRight';
import { GithubRepo } from '../services/githubService';

type Props = {
  repo: GithubRepo
};

const Repository = ({ repo }: Props) => (
  <>
    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
      {repo.name}
    </Typography>
    <Typography variant="body2">
      {repo.description}
    </Typography>
    <Stack direction="row" spacing={2}>
      {repo.topics.map((topic) => <Chip key={topic} label={topic} />)}
      <Chip icon={<StarIcon fontSize="small" />} label={repo.stargazers_count} variant="outlined" />
      <Chip icon={<ForkRightIcon fontSize="small" />} label={repo.forks_count} variant="outlined" />
    </Stack>
  </>
);

export default Repository;
