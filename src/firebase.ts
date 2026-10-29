/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore using the provisioned database ID
export const firestore = getFirestore(app, firebaseConfig.firestoreDatabaseId || undefined);

// Validate Firestore connection on boot as mandated by the Firebase skill
export async function testFirestoreConnection(): Promise<boolean> {
  try {
    await getDocFromServer(doc(firestore, 'treasury', 'state'));
    return true;
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('[Firebase] Connection warning: Client appears offline or initial document not yet created.');
    }
    return false;
  }
}

testFirestoreConnection().catch(() => {});
