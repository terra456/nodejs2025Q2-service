import { randomUUID, UUID } from 'node:crypto';
import { Album, Artist, Track, User } from 'src/types/types';

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

  delArtist = (id: UUID) => {
    this.array.forEach((el) => {
      if (el.artistId && el.artistId === id) {
        Object.defineProperty(el, 'artistId', { value: null });
      }
    });
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

const users = new Users();
const artists = new Artists();
const tracks = new Tracks();
const albums = new Albums();

export default class DBClass {
  users: Users;
  artists: Artists;
  tracks: Tracks;
  albums: Albums;
  favorites: { artists: UUID[]; albums: UUID[]; tracks: UUID[] };
  constructor() {
    this.users = users;
    this.artists = artists;
    this.tracks = tracks;
    this.albums = albums;
    this.favorites = {
      artists: [],
      albums: [],
      tracks: [],
    };
  }

  getAllFavorites = async () => {
    try {
      const artists = await Promise.all(
        this.favorites.artists.map((id) => this.artists.get(id)),
      );
      const albums = await Promise.all(
        this.favorites.albums.map((id) => this.albums.get(id)),
      );
      const tracks = await Promise.all(
        this.favorites.tracks.map((id) => this.tracks.get(id)),
      );
      const res = {
        artists: artists.filter((el) => el),
        albums: albums.filter((el) => el),
        tracks: tracks.filter((el) => el),
      };
      return res;
    } catch (error) {}
  };

  deleteArtist = async (id: UUID) => {
    this.favorites.artists.filter((el) => el !== id);
    this.tracks.delArtist(id);
    this.albums.delArtist(id);
    return this.artists.delete(id);
  };

  deleteAlbum = async (id: UUID) => {
    this.favorites.albums.filter((el) => el !== id);
    this.tracks.delAlbum(id);
    return this.albums.delete(id);
  };

  deleteTrack = async (id: UUID) => {
    this.favorites.tracks.filter((el) => el !== id);
    return this.tracks.delete(id);
  };
}
