interface Repo {
  name: string;
  description: string;
  url: string;
}

export default class DeveloperType {
  username: string;
  avatar: string;
  repo: Repo;

  constructor(developer: any) {
    this.username = developer.username
    this.avatar = developer.avatar
    this.repo.name = developer.repo.name
    this.repo.description = developer.repo.description
    this.repo.url = developer.repo.url
  }
}
