interface Repo {
  name: string;
  description: string;
  url: string;
}

export interface IDeveloper {
  username: string;
  avatar: string;
  repo: Repo;
}
