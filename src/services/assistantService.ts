import { getFunctions, httpsCallable, connectFunctionsEmulator } from 'firebase/functions';
import app from './firebase';

const functions = getFunctions(app);

const isLocalhost =
  typeof window !== 'undefined' &&
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

if (isLocalhost) {
  connectFunctionsEmulator(functions, 'localhost', 5001);
}

const assistantProxy = httpsCallable(functions, 'assistantProxy');

export interface AssistantResponse {
  type: 'text' | 'image' | 'audio';
  result: any;
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.split(',')[1] || '';
      resolve(base64);
    };
    reader.onerror = () => reject(new Error('Failed to read file.'));
    reader.readAsDataURL(file);
  });
}

export async function queryText(prompt: string, model?: string): Promise<AssistantResponse> {
  const res = await assistantProxy({ type: 'text', inputs: prompt, model });
  return res.data as AssistantResponse;
}

export async function queryImage(file: File, model?: string): Promise<AssistantResponse> {
  const data = await fileToBase64(file);
  const res = await assistantProxy({ type: 'image', data, mimeType: file.type, model });
  return res.data as AssistantResponse;
}

export async function queryAudio(file: File, model?: string): Promise<AssistantResponse> {
  const data = await fileToBase64(file);
  const res = await assistantProxy({ type: 'audio', data, mimeType: file.type, model });
  return res.data as AssistantResponse;
}

export async function router(input: string | File, model?: string): Promise<AssistantResponse> {
  if (typeof input === 'string') {
    return queryText(input, model);
  }
  if (input.type.startsWith('image/')) {
    return queryImage(input, model);
  }
  if (input.type.startsWith('audio/')) {
    return queryAudio(input, model);
  }
  throw new Error('Unsupported input type. Please provide text, an image, or an audio file.');
}
