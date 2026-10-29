/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import fs from 'fs';
import path from 'path';

let dbInstance: any = null;

function getFirestoreInstance() {
  if (dbInstance) return dbInstance;
  try {
    const configPath = path.join(process.cwd(), 'firebase-applet-config.json');
    if (!fs.existsSync(configPath)) return null;
    const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    const app = getApps().length === 0 ? initializeApp(config) : getApps()[0];
    dbInstance = getFirestore(app, config.firestoreDatabaseId || undefined);
    return dbInstance;
  } catch (err) {
    console.warn('[Firestore] Failed to initialize Firestore client:', err);
    return null;
  }
}

export async function syncTreasuryToFirestore(state: {
  clearedBalance: number;
  pendingTriageEscrow: number;
  totalSweptUSD: number;
  lastUpdated: string;
}) {
  try {
    const firestore = getFirestoreInstance();
    if (!firestore) return;
    const ref = doc(firestore, 'treasury', 'state');
    await setDoc(ref, {
      ...state,
      syncedAt: new Date().toISOString()
    }, { merge: true });
    console.log(`[Firestore] Synchronized treasury state: Cleared Cash = $${state.clearedBalance.toLocaleString()}`);
  } catch (err) {
    console.warn('[Firestore] Sync warning (non-blocking):', err);
  }
}

export async function syncJournalEntryToFirestore(entry: any) {
  try {
    const firestore = getFirestoreInstance();
    if (!firestore) return;
    const ref = doc(firestore, 'journal', entry.id);
    await setDoc(ref, entry, { merge: true });
  } catch (err) {
    console.warn('[Firestore] Journal sync warning (non-blocking):', err);
  }
}
