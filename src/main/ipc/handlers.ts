import { ipcMain, app } from 'electron';
import { IPC_CHANNELS } from '../../shared/types';

/**
 * Register all IPC handlers for the CleverBiz application.
 *
 * Security: Every handler validates its inputs before acting.
 * In production, these will call the backend API and/or local DB.
 * Currently returns mock/placeholder data for frontend development.
 */

export function registerIpcHandlers(): void {
  // --- App ---
  ipcMain.handle(IPC_CHANNELS.APP_GET_VERSION, async () => {
    return app.getVersion();
  });

  // --- Auth ---
  ipcMain.handle(IPC_CHANNELS.AUTH_LOGIN, async (_event, credentials: { email: string; password: string }) => {
    // TODO: Call backend auth API
    if (!credentials.email || !credentials.password) {
      throw new Error('Email and password are required');
    }
    return {
      user: {
        id: 'mock-user-id',
        store_id: 'mock-store-id',
        role: 'owner',
        email: credentials.email,
        name: 'Demo Owner',
      },
      tokens: {
        accessToken: 'mock-access-token',
        refreshToken: 'mock-refresh-token',
      },
    };
  });

  ipcMain.handle(IPC_CHANNELS.AUTH_LOGOUT, async () => {
    // TODO: Invalidate tokens
    return { success: true };
  });

  // --- Products ---
  ipcMain.handle(IPC_CHANNELS.PRODUCTS_LIST, async (_event, storeId: string) => {
    if (!storeId) throw new Error('Store ID is required');
    // TODO: Query local DB first (offline-first), then sync
    return [];
  });

  ipcMain.handle(IPC_CHANNELS.PRODUCTS_CREATE, async (_event, product: any) => {
    if (!product.name || !product.price) {
      throw new Error('Product name and price are required');
    }
    // TODO: Insert into SQLite + queue for sync
    return { ...product, id: `prod-${Date.now()}` };
  });

  ipcMain.handle(IPC_CHANNELS.PRODUCTS_UPDATE, async (_event, product: any) => {
    if (!product.id) throw new Error('Product ID is required');
    // TODO: Update SQLite + sync queue
    return product;
  });

  ipcMain.handle(IPC_CHANNELS.PRODUCTS_DELETE, async (_event, productId: string) => {
    if (!productId) throw new Error('Product ID is required');
    // TODO: Soft-delete in SQLite + sync queue
    return { success: true };
  });

  // --- Transactions ---
  ipcMain.handle(IPC_CHANNELS.TRANSACTIONS_CREATE, async (_event, transaction: any) => {
    if (!transaction.items?.length) {
      throw new Error('Transaction must have at least one item');
    }
    // TODO: Save to SQLite + print receipt + sync
    return { ...transaction, id: `trx-${Date.now()}`, transaction_date: new Date().toISOString() };
  });

  ipcMain.handle(IPC_CHANNELS.TRANSACTIONS_LIST, async (_event, params: { storeId: string; offset?: number; limit?: number }) => {
    if (!params.storeId) throw new Error('Store ID is required');
    // TODO: Query SQLite
    return [];
  });

  // --- QRIS ---
  ipcMain.handle(IPC_CHANNELS.QRIS_GENERATE, async (_event, payload: { amount: number; transactionId: string }) => {
    if (!payload.amount || payload.amount <= 0) throw new Error('Invalid amount');
    // TODO: Call QRIS generation service
    return {
      transaction_id: payload.transactionId,
      amount: payload.amount,
      store_name: 'CleverBiz Store',
      qr_string: `QRIS:${payload.amount}:${payload.transactionId}`,
      expires_at: new Date(Date.now() + 5 * 60 * 1000).toISOString(),
    };
  });

  // --- Employees ---
  ipcMain.handle(IPC_CHANNELS.EMPLOYEES_LIST, async (_event, storeId: string) => {
    if (!storeId) throw new Error('Store ID is required');
    return [];
  });

  ipcMain.handle(IPC_CHANNELS.EMPLOYEES_CREATE, async (_event, employee: any) => {
    if (!employee.name) throw new Error('Employee name is required');
    return { ...employee, id: `emp-${Date.now()}` };
  });

  // --- Dashboard ---
  ipcMain.handle(IPC_CHANNELS.DASHBOARD_SUMMARY, async (_event, storeId: string) => {
    if (!storeId) throw new Error('Store ID is required');
    // TODO: Aggregate from SQLite
    return {
      daily_revenue: 0,
      monthly_revenue: 0,
      gross_profit: 0,
      estimated_tax: 0,
      total_transactions_today: 0,
      low_stock_items: [],
    };
  });

  // --- Printer (thermal) ---
  ipcMain.handle(IPC_CHANNELS.PRINTER_PRINT_RECEIPT, async (_event, receiptData: any) => {
    if (!receiptData) throw new Error('Receipt data is required');
    // TODO: Send to thermal printer via node-thermal-printer
    console.log('[Printer] Receipt:', receiptData);
    return { success: true };
  });

  // --- Logging ---
  ipcMain.on(IPC_CHANNELS.LOG_MESSAGE, (_event, level: string, message: string) => {
    console.log(`[Renderer:${level}]`, message);
  });

  ipcMain.on(IPC_CHANNELS.LOG_ERROR, (_event, error: { message: string; stack?: string }) => {
    console.error('[Renderer Error]', error.message, error.stack);
  });

  console.log('[CleverBiz] IPC handlers registered');
}
