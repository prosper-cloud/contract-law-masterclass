export type DocRecord = {
  id: string;
  name: string;
  mime: string;
  size: number;
  topic: string;
  addedAt: number;
  text: string;
  notes: string;
  blob: Blob;
};

const DB = "clm-docs";
const STORE = "docs";

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB, 1);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE, { keyPath: "id" });
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error ?? new Error("Could not open document storage"));
  });
}

export async function listDocs(): Promise<DocRecord[]> {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, "readonly");
    const req = tx.objectStore(STORE).getAll();
    req.onsuccess = () => resolve((req.result as DocRecord[]).sort((a, b) => b.addedAt - a.addedAt));
    req.onerror = () => reject(req.error ?? new Error("Could not list documents"));
  });
}

export async function getDoc(id: string): Promise<DocRecord | undefined> {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const req = db.transaction(STORE, "readonly").objectStore(STORE).get(id);
    req.onsuccess = () => resolve(req.result as DocRecord | undefined);
    req.onerror = () => reject(req.error ?? new Error("Could not read the document"));
  });
}

export async function saveDoc(doc: DocRecord): Promise<void> {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const req = db.transaction(STORE, "readwrite").objectStore(STORE).put(doc);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error ?? new Error("Could not save the document"));
  });
}

export async function deleteDoc(id: string): Promise<void> {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const req = db.transaction(STORE, "readwrite").objectStore(STORE).delete(id);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error ?? new Error("Could not delete the document"));
  });
}
