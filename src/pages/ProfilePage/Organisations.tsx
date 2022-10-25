import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import GithubDetails from '../../components/GithubDetails';
import { getOrgs, GithubOrg } from '../../services/githubService';

type Props = {
  username: string,
};

const Organisations = ({ username }: Props) => {
  const [orgs, setOrgs] = useState<GithubOrg[]>([]);

  useEffect(() => {
    getOrgs(username)
      .then((value: GithubOrg[]) => {
        setOrgs(value);
      })
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.error(e);
      });
  }, [username]);

  // eslint-disable-next-line no-console
  console.log(orgs);

  return (
    <>
      <h1>Organisations</h1>
      <Grid container spacing={1}>
        {orgs.length === 0 && <div style={{ textAlign: 'center', width: '100%' }}>No organisations</div>}

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
