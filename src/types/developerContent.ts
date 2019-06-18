export default class IDeveloperContent {
  avatar: string;
  name: string;
  nickname: string;
  bio: string;
  repos: number;
  followers: number;
  following: number;
  email: string;
  blog: string;
  company: string;
  location: string;

  constructor(developer: any) {
    this.avatar = developer.avatar_url;
    this.name = developer.name;
    this.nickname = developer.login;
    this.bio = developer.bio;
    this.repos = developer.public_repos;
    this.followers = developer.followers;
    this.following = developer.following;
    this.email = developer.email;
    this.blog = developer.blog;
    this.company = developer.company;
    this.location = developer.location;
  }
}
