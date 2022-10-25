import { CircularProgress, Paper, Stack } from '@mui/material';
import React, { ReactNode, useEffect, useState } from 'react';
import Repository from '../../components/Repository';
import { getRepos, GithubRepo } from '../../services/githubService';

type Props = {
  username: string,
};

const Repositories = ({ username }: Props) => {
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getRepos(username)
      .then((value: GithubRepo[]) => {
        setRepos(value);
        setError(null);
      })
      .catch((e) => {
        setError((e as { message: string }).message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [username]);

  const wrap = (children: ReactNode) => children;

  return (
    <>
      <h1>Repositories</h1>
      <Paper>
        <Stack direction="column" spacing={1}>
          {error !== null && wrap(<span style={{ color: 'red' }}>{error}</span>)}
          {loading && wrap(<div style={{ textAlign: 'center', width: '100%' }}><CircularProgress color="inherit" size={20} /></div>)}
          {!loading && repos.length === 0 && wrap(<div style={{ textAlign: 'center', width: '100%' }}>No repositories</div>)}

          {repos.map((repo: GithubRepo) => (
            <Paper key={repo.id} sx={{ padding: '0.5em 1em' }}>
              <Repository repo={repo} />
            </Paper>
          ))}
        </Stack>
      </Paper>
    </>
  );
};

export default Repositories;
