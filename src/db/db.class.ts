import { randomUUID, UUID } from 'node:crypto';
import { Album, Artist, Favorites, Track, User } from 'src/types/types';

export default class DBClass {
  users = new Users();
  artists = new Artists();
  tracks = new Tracks();
  albums = new Albums();
  favorites: Favorites = {
    artists: [], // favorite artists ids
    albums: [], // favorite albums ids
    tracks: [],
  };
}

type MyType = {
  id: UUID;
};

class DBTable<T extends MyType> {
  array: Array<T>;
  constructor() {
    this.array = [];
  }

  get = async (id: UUID): Promise<T | undefined> => {
    const ind = this.array.findIndex((el) => el.id === id);
    if (ind > 0) {
      return this.array[ind];
    }
  };

  getAll = async () => {
    return this.array;
  };

  add = async (data) => {
    const id = randomUUID();
    const newInd = this.array.push({ id, ...data });
    return this.array[newInd - 1];
  };

  change = async (id: UUID, data) => {
    const ind = this.array.findIndex((el) => el.id === id);
    if (ind > 0) {
      this.array.splice(ind, 1, { id, ...data });
      return this.array[ind];
    }
  };

  delete = async (id: UUID) => {
    const ind = this.array.findIndex((el) => el.id === id);
    if (ind > 0) {
      this.array.splice(ind, 1);
      return true;
    }
  };
}

class Users extends DBTable<User> {
  add = async (data) => {
    const id = randomUUID();
    const date = Date.now();
    const version = 1;
    const newInd = this.array.push({
      id,
      version, // integer number, increments on update
      createdAt: date, // timestamp of creation
      updatedAt: date,
      ...data,
    });
    return this.array[newInd - 1];
  };

  change = async (id: UUID, data) => {
    const ind = this.array.findIndex((el) => el.id === id);
    if (ind > 0) {
      const date = Date.now();
      const user = this.array[ind];
      const newUser = {
        id: user.id,
        version: user.version + 1, // integer number, increments on update
        createdAt: user.createdAt, // timestamp of creation
        updatedAt: date,
        login: data.login ? data.login : user.login,
        password: data.password ? data.password : user.password,
      };
      this.array.splice(ind, 1, newUser);
      return this.array[ind];
    }
  };

  // changePassword = async (id: UUID, data: UpdatePasswordDto) => {
  //   const ind = this.array.findIndex((el) => el.id === id);
  //   if (ind > 0 && this.array[ind].password === data.oldPassword) {
  //     const date = Date.now();
  //     const user = this.array[ind];
  //     // const newUser = {
  //     //   id,
  //     //   version: user.version + 1, // integer number, increments on update
  //     //   createdAt: user.createdAt, // timestamp of creation
  //     //   updatedAt: date,
  //     //   login: data.login ? data.login : user.login,
  //     //   password: data.password ? data.password : user.password,
  //     // };
  //     user.password = data.newPassword;
  //     user.version += 1;
  //     user.updatedAt = date;
  //     // this.array.splice(ind, 1, newUser);
  //     return this.array[ind];
  //   }
  // };
}
class Artists extends DBTable<Artist> {}
class Tracks extends DBTable<Track> {}
class Albums extends DBTable<Album> {}
