import {
  Autocomplete, Box, CircularProgress, TextField,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { GithubUser, searchUsers } from '../services/githubService';

const useGithubSearch = () => {
  const isLoading = false;

  const [inputValue, setInputValue] = useState<string>('');
  const [options, setOptions] = useState<GithubUser[]>([]);
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
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      getOptionLabel={(option) => option.login}
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
      renderInput={(params) => (
        <TextField
          {...params}
          label="Github username"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
      isOptionEqualToValue={(option, value) => option.login === value.login}
      options={options}
    />
  );

  const elem = (
    <>
      {autocomplete}
      {error !== null && <span>{error}</span>}
    </>
  );

  return { autocomplete: elem, data: options };
};

export default useGithubSearch;
