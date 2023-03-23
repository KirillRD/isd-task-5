import axios from 'axios';
import { Region, UserDataType } from '../constants';

const PATH_TO_FILES = '/files/';
const FILENAME_EXTENSION = '.txt';

const getPath = (folder: string, fileName: string): string => {
  return window.location.origin + PATH_TO_FILES + folder + '/' + folder + '_' + fileName + FILENAME_EXTENSION;
}

const getFile = async (path: string): Promise<string> => {
  const res = await axios(path);
  return await res.data;
}

const readFile = (file: string): string[] => {
  return file.split(/\n/).map(s => s.trim());
}

export const getUserData = async (region: Region, userDataType: UserDataType): Promise<string[]> => {
  const path = getPath(region, userDataType);
  const file = await getFile(path);
  return readFile(file);
}
