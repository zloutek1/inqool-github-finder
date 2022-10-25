import {
  CircularProgress,
  Paper, Table, TableBody, TableCell, TableContainer, TableRow,
} from '@mui/material';
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
      });

    setLoading(false);
  }, [username]);

  const wrap = (children: ReactNode) => <TableRow><TableCell>{children}</TableCell></TableRow>;

  return (
    <>
      <h1>Repositories</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small">
          <TableBody>
            {error !== null && wrap(<span style={{ color: 'red' }}>{error}</span>)}
            {loading && wrap(<div style={{ textAlign: 'center', width: '100%' }}><CircularProgress color="inherit" size={20} /></div>)}
            {!loading && repos.length === 0 && wrap(<div style={{ textAlign: 'center', width: '100%' }}>No repositories</div>)}

            {repos.map((repo: GithubRepo) => (
              <TableRow key={repo.name}>
                <TableCell>
                  <Repository repo={repo} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Repositories;
