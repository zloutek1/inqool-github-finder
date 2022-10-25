import axios from "axios";

const api = axios.create({
  baseURL: "https://api.github.com/" 
});

export type GithubUser = {
  login: string
  id: number
  node_id: string
  avatar_url: string
  gravatar_id: string,
  url: string
  html_url: string
  followers_url: string
  following_url: string
  gists_url: string
  starred_url: string
  subscriptions_url: string
  organizations_url: string
  repos_url: string
  events_url: string
  received_events_url: string
  type: string
  site_admin: false,
  name: string
  company: string
  blog: string
  location: string
  email: string
  hireable: false,
  bio: string
  twitter_username: string
  public_repos: number
  public_gists: number
  followers: number
  following: number
  created_at: string
  updated_at: string
}

type SearchUsersResponse = {
  total_count: number,
  inclomplete_results: boolean,
  items: GithubUser[]
}

const searchUsers = async (query: string) => {
  const resp = await api.get<SearchUsersResponse>(`/search/users?q=${query}`);
  if (resp.status !== 200) {
    return Promise.reject(resp.statusText);
  }
  return resp.data;
}

const getUser = async (username: string) => {
  const resp = await api.get(`/users/${username}`);
  if (resp.status !== 200) {
    return Promise.reject(resp.statusText);
  }
  return resp.data;
}

const getRepos = async (username: string) => {
  const resp = await api.get(`/users/${username}/repos`);
  if (resp.status !== 200) {
    return Promise.reject(resp.statusText);
  }
  return resp.data;
}

const getCorps = async (username: string) => {
  const resp = await api.get(`/users/${username}/corps`);
  if (resp.status !== 200) {
    return Promise.reject(resp.statusText);
  }
  return resp.data;
}

export { searchUsers, getUser, getRepos, getCorps };