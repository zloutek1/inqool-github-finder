import {
  Autocomplete, Box, CircularProgress, TextField,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { GithubUser, searchUsers } from '../services/githubService';

const useGithubSearch = () => {
  const isLoading = false;

  const [inputValue, setInputValue] = useState<string>('');
  const [options, setOptions] = useState<GithubUser[]>([]);

  useEffect(() => {
    if (inputValue === '') return;

    searchUsers(inputValue)
      .then((value) => {
        setOptions(value.items);
      })
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.error(e);
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
          label="Asynchronous"
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

  return { autocomplete, data: options };
};

export default useGithubSearch;
