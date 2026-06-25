import { contextBridge, ipcRenderer } from 'electron';
import { IPC_CHANNELS } from '../shared/types';

/**
 * CleverBiz — Preload Script
 *
 * Exposes a secure `electronAPI` bridge to the renderer process.
 * Only specific IPC channels are exposed; the full ipcRenderer is
 * never available to renderer code.
 */

const electronAPI = {
  // --- App ---
  getAppVersion: (): Promise<string> =>
    ipcRenderer.invoke(IPC_CHANNELS.APP_GET_VERSION),

  // --- Auth ---
  login: (credentials: { email: string; password: string }) =>
    ipcRenderer.invoke(IPC_CHANNELS.AUTH_LOGIN, credentials),
  logout: () =>
    ipcRenderer.invoke(IPC_CHANNELS.AUTH_LOGOUT),

  // --- Products ---
  getProducts: (storeId: string) =>
    ipcRenderer.invoke(IPC_CHANNELS.PRODUCTS_LIST, storeId),
  createProduct: (product: any) =>
    ipcRenderer.invoke(IPC_CHANNELS.PRODUCTS_CREATE, product),
  updateProduct: (product: any) =>
    ipcRenderer.invoke(IPC_CHANNELS.PRODUCTS_UPDATE, product),
  deleteProduct: (productId: string) =>
    ipcRenderer.invoke(IPC_CHANNELS.PRODUCTS_DELETE, productId),

  // --- Transactions ---
  createTransaction: (transaction: any) =>
    ipcRenderer.invoke(IPC_CHANNELS.TRANSACTIONS_CREATE, transaction),
  getTransactions: (params: { storeId: string; offset?: number; limit?: number }) =>
    ipcRenderer.invoke(IPC_CHANNELS.TRANSACTIONS_LIST, params),

  // --- QRIS ---
  generateQRIS: (payload: { amount: number; transactionId: string }) =>
    ipcRenderer.invoke(IPC_CHANNELS.QRIS_GENERATE, payload),

  // --- Employees ---
  getEmployees: (storeId: string) =>
    ipcRenderer.invoke(IPC_CHANNELS.EMPLOYEES_LIST, storeId),
  createEmployee: (employee: any) =>
    ipcRenderer.invoke(IPC_CHANNELS.EMPLOYEES_CREATE, employee),

  // --- Dashboard ---
  getDashboardSummary: (storeId: string) =>
    ipcRenderer.invoke(IPC_CHANNELS.DASHBOARD_SUMMARY, storeId),

  // --- Printer ---
  printReceipt: (receiptData: any) =>
    ipcRenderer.invoke(IPC_CHANNELS.PRINTER_PRINT_RECEIPT, receiptData),

  // --- Logging ---
  log: (level: string, message: string) =>
    ipcRenderer.send(IPC_CHANNELS.LOG_MESSAGE, level, message),
  logError: (error: { message: string; stack?: string }) =>
    ipcRenderer.send(IPC_CHANNELS.LOG_ERROR, error),

  // --- Event listeners (from main → renderer) ---
  onUpdateAvailable: (callback: (info: any) => void) => {
    ipcRenderer.on('update:available', (_event, info) => callback(info));
  },
  removeUpdateListener: () => {
    ipcRenderer.removeAllListeners('update:available');
  },
};

contextBridge.exposeInMainWorld('electronAPI', electronAPI);

// Type declaration for renderer
export type ElectronAPI = typeof electronAPI;
