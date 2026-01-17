import {createMMKV} from 'react-native-mmkv';
import { Content } from '../types/content';

const storage = createMMKV();
const contentKey = 'storedContent';

export function saveContentItem(item: Content) {
  const storedContent = storage.getString(contentKey) || "[]";
  const updatedContent = [...JSON.parse(storedContent), item];
  storage.set(contentKey, JSON.stringify(updatedContent));
}

export function updateContentList(items: Content[]) {
  storage.set(contentKey, JSON.stringify(items));
}
export function getContentItems(): Content[] {
  const storedContent = storage.getString(contentKey);
  return storedContent ? JSON.parse(storedContent) : [];
}