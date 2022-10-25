import { CircularProgress, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import GithubDetails from '../../components/GithubDetails';
import { getOrgs, GithubOrg } from '../../services/githubService';

type Props = {
  username: string,
};

const Organisations = ({ username }: Props) => {
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
      });

    setLoading(false);
  }, [username]);

  return (
    <>
      <h1>Organisations</h1>
      <Grid container spacing={1}>
        {loading && <div style={{ textAlign: 'center', width: '100%' }}><CircularProgress color="inherit" size={20} /></div>}
        {!loading && orgs.length === 0 && <div style={{ textAlign: 'center', width: '100%' }}>No organisations</div>}

        {orgs.map((org) => (
          <Grid item key={org.login}>
            <GithubDetails org={org} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Organisations;
