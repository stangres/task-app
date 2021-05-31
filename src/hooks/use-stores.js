import {useContext} from 'react';
import { storesContext } from '../stores-context';

export default function useStores() {
  return useContext(storesContext);
}