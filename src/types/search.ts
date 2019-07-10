class Owner {
  name: string;

  constructor(owner: any) {
    this.name = owner.login;
  }
}

export default class Search {
  id: string;
  owner: Owner;
  name: string;
  description: string;
  stars: string;
  language: string;
  updatedAt: string;

  constructor(search: any) {
    this.id = search.id;
    this.owner = new Owner(search.owner);
    this.name = search.name;
    this.language = search.language;
    this.stars = search.stargazers_count;
    this.description = search.description;
    this.updatedAt = search.updated_at;

  }
}
