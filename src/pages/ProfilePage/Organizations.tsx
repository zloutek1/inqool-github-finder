import { CircularProgress, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import GithubDetails from '../../components/GithubDetails';
import { getOrgs, GithubOrg } from '../../services/githubService';

type Props = {
  username: string,
};

const Organizations = ({ username }: Props) => {
  const [orgs, setOrgs] = useState<GithubOrg[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getOrgs(username)
      .then((value: GithubOrg[]) => {
        setOrgs(value);
        setError(null);
      })
      .catch((e) => {
        setError((e as { message: string }).message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [username]);

  return (
    <>
      <h1>Organizations</h1>
      <Grid container spacing={1}>
        {error !== null && <span style={{ color: 'red' }}>{error}</span>}
        {loading && <div style={{ textAlign: 'center', width: '100%' }}><CircularProgress color="inherit" size={20} /></div>}
        {!loading && orgs.length === 0 && <div style={{ textAlign: 'center', width: '100%' }}>No organizations</div>}

        {orgs.map((org) => (
          <Grid item key={org.id}>
            <GithubDetails org={org} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Organizations;
