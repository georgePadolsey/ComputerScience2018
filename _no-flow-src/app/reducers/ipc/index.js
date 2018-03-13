import createIpc from 'redux-electron-ipc';

const map = {};

export const ipc = createIpc(map);
