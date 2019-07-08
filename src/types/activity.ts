class Actor {
  login: string;
  name: string;
  avatarUrl: string;

  constructor(actor: any) {
    this.login = actor.login;
    this.name = actor.display_login;
    this.avatarUrl = actor.avatar_url;
  }
}

class Repo {
  name: string;

  constructor(repo: any) {
    this.name = repo.name;
  }
}

export default class Activity {
  id: string
  createdAt: string;
  type: string;
  actor: Actor;
  repo: Repo;

  constructor(activity: any) {
    this.id = activity.id;
    this.createdAt = activity.created_at;
    this.type = activity.type;
    this.actor = new Actor(activity.actor);
    this.repo = new Repo(activity.repo)
  }
}
