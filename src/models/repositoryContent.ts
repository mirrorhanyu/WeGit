interface IOwner {
  login: string;
}

interface ILicense{
  name: string;
}

export interface IRepositoryContent {
  name: string;
  description: string;
  subscribers_count: number;
  stargazers_count: number;
  forks: number;
  owner: IOwner;
  license: ILicense;
  open_issues: string;
  readme: string;
}
