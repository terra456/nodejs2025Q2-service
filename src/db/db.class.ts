import { randomUUID, UUID } from 'node:crypto';
import { Album, Artist, Favorites, Track, User } from 'src/types/types';

type MyType = {
  id: UUID;
  artistId?: UUID | null;
  albumId?: UUID | null;
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
    console.log(data.name, this.array[newInd - 1]);
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
    console.log(this.array);
    const ind = this.array.findIndex((el) => el.id === id);
    if (ind > 0) {
      this.array.splice(ind, 1);
      return true;
    }
  };

  delArtist = (id: UUID) => {
    this.array.forEach((el) => {
      if (el.artistId && el.artistId === id) {
        Object.defineProperty(el, 'artistId', { value: null });
      }
    });
    console.log(id, this.array);
  };

  delAlbum = (id: UUID) => {
    this.array.forEach((el) => {
      if (el.albumId && el.albumId === id) {
        Object.defineProperty(el, 'albumId', { value: null });
      }
    });
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
    console.log('user', this.array);
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
}
class Artists extends DBTable<Artist> {}

class Tracks extends DBTable<Track> {}

class Albums extends DBTable<Album> {}

class Favorites {
  artists: UUID[] = []; // favorite artists ids
  albums: UUID[] = []; // favorite albums ids
  tracks: UUID[] = [];
}

const users = new Users();
const artists = new Artists();
const tracks = new Tracks();
const albums = new Albums();

export default class DBClass {
  users: Users;
  artists: Artists;
  tracks: Tracks;
  albums: Albums;
  // favorites: any;
  constructor() {
    this.users = users;
    this.artists = artists;
    this.tracks = tracks;
    this.albums = albums;
    // this.favorites: Favorites = {
    //   artists: [], // favorite artists ids
    //   albums: [], // favorite albums ids
    //   tracks: [],
    // };
  }

  deleteArtist = async (id: UUID) => {
    this.tracks.delArtist(id);
    this.albums.delArtist(id);
    return this.artists.delete(id);
  };

  deleteAlbum = async (id: UUID) => {
    this.tracks.delAlbum(id);
    return this.albums.delete(id);
  };
}
