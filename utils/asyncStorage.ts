import AsyncStorage from '@react-native-async-storage/async-storage';
import { Game } from './types';

export const setHistory = async (history: Game[]) => {
  try {
    const jsonValue = JSON.stringify(history);
    await AsyncStorage.setItem('gameHistory', jsonValue).catch((e) =>
      console.error(e)
    );
    console.log('Values saved in history is', jsonValue);
  } catch (e) {
    // save error
  }

  console.log('Done.');
};

export const getHistory = async (): Promise<Game[]> => {
  try {
    const jsonValue = await AsyncStorage.getItem('gameHistory');
    const historyRetrieved = jsonValue != null ? JSON.parse(jsonValue) : [];

    console.log('History retrieved.', historyRetrieved);
    return historyRetrieved;
  } catch (e) {
    // read error
  }

  console.log('Done getting history.');
  return [];
};
