import {
  Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import Repository from '../../components/Repository';
import { getRepos, GithubRepo } from '../../services/githubService';

type Props = {
  username: string,
};

const Repositories = ({ username }: Props) => {
  const [repos, setRepos] = useState<GithubRepo[]>([]);

  useEffect(() => {
    getRepos(username)
      .then((value: GithubRepo[]) => {
        setRepos(value);
      })
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.error(e);
      });
  }, [username]);

  return (
    <>
      <h1>Repositories</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small">
          <TableBody>
            {repos.map((repo: GithubRepo) => (
              <Repository repo={repo} key={repo.name} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Repositories;
