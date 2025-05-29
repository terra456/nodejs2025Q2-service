import { UUID } from 'node:crypto';

export interface User {
  id: UUID; // uuid v4
  login: string;
  password: string;
  version: number; // integer number, increments on update
  createdAt: number; // timestamp of creation
  updatedAt: number; // timestamp of last update
}

export interface UpdatePassword {
  oldPassword: string; // previous password
  newPassword: string; // new password
}

export interface Artist {
  id: UUID; // uuid v4
  name: string;
  grammy: boolean;
}

export interface Track {
  id: UUID; // uuid v4
  name: string;
  artistId: UUID | null; // refers to Artist
  albumId: UUID | null; // refers to Album
  duration: number; // integer number
}

export interface Album {
  id: UUID; // uuid v4
  name: string;
  year: number;
  artistId: UUID | null; // refers to Artist
}

export interface Favorites {
  artists: UUID[]; // favorite artists ids
  albums: UUID[]; // favorite albums ids
  tracks: UUID[]; // favorite tracks ids
}
