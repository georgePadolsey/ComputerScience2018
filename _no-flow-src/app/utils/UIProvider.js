//      
import Store from "electron-store";
import { CONFIG_KEY } from "../enc_keys";

const profilesStore = new Store({
  name: "ui",
  defaults: {},
  /**
   * Only encrypt the ui store when in production
   * This is to prevent users manually editing the file
   * @see https://github.com/sindresorhus/electron-store
   */
  encryptionKey: process.env.NODE_ENV === "production" ? CONFIG_KEY : undefined
});

export default async function uiProvider()      {
  console.log("loading-ui");
  return profilesStore.store;
}

export function setUIData(data)      {
  profilesStore.store = data;
}
