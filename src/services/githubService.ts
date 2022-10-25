import axios from 'axios';

const api = axios.create({
  baseURL: 'http://api.github.com/'
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
  site_admin: boolean,
  name: string
  company: string
  blog: string
  location: string
  email: string
  hireable: boolean,
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
    return Promise.reject(resp.data);
  }
  return resp.data as SearchUsersResponse;
}

export type GithubRepo = {
  id: number
  node_id: string,
  name: string,
  full_name: string,
  owner: GithubUser,
  private: boolean,
  html_url: string,
  description: string,
  fork: boolean,
  url: string,
  archive_url: string,
  assignees_url: string,
  blobs_url: string,
  branches_url: string,
  collaborators_url: string,
  comments_url: string,
  commits_url: string,
  compare_url: string,
  contents_url: string,
  contributors_url: string,
  deployments_url: string,
  downloads_url: string,
  events_url: string,
  forks_url: string,
  git_commits_url: string,
  git_refs_url: string,
  git_tags_url: string,
  git_url: string,
  issue_comment_url: string,
  issue_events_url: string,
  issues_url: string,
  keys_url: string,
  labels_url: string,
  languages_url: string,
  merges_url: string,
  milestones_url: string,
  notifications_url: string,
  pulls_url: string,
  releases_url: string,
  ssh_url: string,
  stargazers_url: string,
  statuses_url: string,
  subscribers_url: string,
  subscription_url: string,
  tags_url: string,
  teams_url: string,
  trees_url: string,
  clone_url: string,
  mirror_url: string,
  hooks_url: string,
  svn_url: string,
  homepage: string,
  language: null,
  forks_count: number
  stargazers_count: number
  watchers_count: number
  size: number
  default_branch: string,
  open_issues_count: number
  is_template: boolean,
  topics: string[],
  has_issues: boolean,
  has_projects: boolean,
  has_wiki: boolean,
  has_pages: boolean,
  has_downloads: boolean,
  archived: boolean,
  disabled: boolean,
  visibility: string,
  pushed_at: string,
  created_at: string,
  updated_at: string,
  permissions: {
    admin: boolean,
    push: boolean,
    pull: boolean
  }
}

type UserReposReponse = GithubRepo[];

const getRepos = async (username: string) => {
  const resp = await api.get<UserReposReponse>(`/users/${username}/repos`);
  if (resp.status !== 200) {
    return Promise.reject(resp.data);
  }
  return resp.data as UserReposReponse;
}

export type GithubOrg = {
  login: string,
  id: number,
  node_id: string,
  url: string,
  repos_url: string,
  events_url: string,
  hooks_url: string,
  issues_url: string,
  members_url: string,
  public_members_url: string,
  avatar_url: string,
  description: string
};

type UserOrgsReponse = GithubOrg[];

const getOrgs = async (username: string) => {
  const resp = await api.get<UserOrgsReponse>(`/users/${username}/orgs`);
  if (resp.status !== 200) {
    return Promise.reject(resp.data);
  }
  return resp.data as UserOrgsReponse;
}

export { searchUsers, getRepos, getOrgs };