import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

const STORAGE_KEY = "accessToken";

@Injectable()
export class StorageProvider {

  constructor(public storage: Storage) {}

  getToken() : Promise<string> {
      return this.storage.get(STORAGE_KEY);
  }

  setToken(token: string): Promise<any> {
      return this.storage.set(STORAGE_KEY, token);
  }

}
