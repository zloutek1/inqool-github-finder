import {
  Autocomplete, Box, CircularProgress, TextField,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { GithubUser, searchUsers } from '../services/githubService';

const useGithubSearch = () => {
  const isLoading = false;

  const [user, setUser] = React.useState<GithubUser | null>(null);
  const [inputValue, setInputValue] = useState<string>('');
  const [options, setOptions] = useState<readonly GithubUser[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (inputValue === '') return;

    searchUsers(inputValue)
      .then((value) => {
        setOptions(value.items);
      })
      .catch((e: string) => {
        setError(e);
      });
  }, [inputValue]);

  const autocomplete = (
    <Autocomplete
      autoComplete
      sx={{ width: 300 }}
      options={options}
      getOptionLabel={(option) => option.login}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      onChange={(event: any, newValue: GithubUser | null) => {
        setOptions(newValue ? [newValue, ...options] : options);
        setUser(newValue);
      }}
      renderInput={(params) => (
        <TextField {...params} label="Github username" fullWidth />
      )}
      renderOption={(props, option) => (
        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
          <img
            loading="lazy"
            width="20"
            src={option.avatar_url}
            srcSet={option.avatar_url}
            alt=""
          />
          {option.login}
        </Box>
      )}
    />
  );

  const elem = (
    <>
      {autocomplete}
      {error !== null && <span>{error}</span>}
    </>
  );

  return { autocomplete: elem, user };
};

export default useGithubSearch;
