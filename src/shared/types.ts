// ============================================================
// CleverBiz — Shared Types
// Used across main, preload, and renderer processes
// ============================================================

// --- User & Auth ---
export interface User {
  id: string;
  store_id: string;
  role: UserRole;
  email: string;
  name: string;
}

export type UserRole = 'owner' | 'cashier';

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

// --- Store ---
export interface Store {
  id: string;
  name: string;
  address: string;
  created_at: string;
}

// --- Products & Inventory ---
export interface Product {
  id: string;
  store_id: string;
  name: string;
  sku: string;
  price: number;
  stock_qty: number;
  category: string;
}

export interface InventoryLog {
  id: string;
  product_id: string;
  change_qty: number;
  type: 'in' | 'out';
  logged_at: string;
}

// --- Employees ---
export interface Employee {
  id: string;
  store_id: string;
  name: string;
  base_salary: number;
  commissions: number;
  attendance_count: number;
}

// --- Transactions ---
export interface Transaction {
  id: string;
  store_id: string;
  total_amount: number;
  payment_method: PaymentMethod;
  transaction_date: string;
  items: TransactionItem[];
}

export interface TransactionItem {
  id: string;
  transaction_id: string;
  product_id: string;
  qty: number;
  unit_price: number;
}

export type PaymentMethod = 'cash' | 'qris' | 'debit' | 'credit';

// --- QRIS ---
export interface QRISPayload {
  transaction_id: string;
  amount: number;
  store_name: string;
  qr_string: string;
  expires_at: string;
}

// --- Dashboard ---
export interface DashboardSummary {
  daily_revenue: number;
  monthly_revenue: number;
  gross_profit: number;
  estimated_tax: number;
  total_transactions_today: number;
  low_stock_items: Product[];
}

// --- Business Health ---
export type HealthGrade = 'A' | 'B' | 'C';

export interface BusinessHealth {
  score: number;
  grade: HealthGrade;
  revenue_growth: number;
  inventory_turnover: number;
  cash_flow_stability: number;
}

// --- IPC Channel Names ---
export const IPC_CHANNELS = {
  // App
  APP_GET_VERSION: 'app:get-version',

  // Auth
  AUTH_LOGIN: 'auth:login',
  AUTH_LOGOUT: 'auth:logout',
  AUTH_REFRESH: 'auth:refresh',

  // Products
  PRODUCTS_LIST: 'products:list',
  PRODUCTS_CREATE: 'products:create',
  PRODUCTS_UPDATE: 'products:update',
  PRODUCTS_DELETE: 'products:delete',

  // Transactions
  TRANSACTIONS_CREATE: 'transactions:create',
  TRANSACTIONS_LIST: 'transactions:list',

  // QRIS
  QRIS_GENERATE: 'qris:generate',

  // Employees
  EMPLOYEES_LIST: 'employees:list',
  EMPLOYEES_CREATE: 'employees:create',

  // Dashboard
  DASHBOARD_SUMMARY: 'dashboard:summary',

  // Printer
  PRINTER_PRINT_RECEIPT: 'printer:print-receipt',

  // Logging
  LOG_MESSAGE: 'log:message',
  LOG_ERROR: 'log:error',
} as const;
