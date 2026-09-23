/**
 * ┌──────────────────────────────────────────────────────────┐
 * │  THE SINGLE ENTRY POINT FOR ALL DATA ACCESS              │
 * │                                                          │
 * │  Pages, components, and server actions import ONLY       │
 * │  from this file. To switch from mock to a real DB,       │
 * │  change DATA_SOURCE in .env from "mock" to "db".         │
 * └──────────────────────────────────────────────────────────┘
 */

import type { ProductRepository } from "./repositories/ProductRepository";
import type { OrderRepository } from "./repositories/OrderRepository";
import type { UserRepository } from "./repositories/UserRepository";
import type { StorageRepository } from "./repositories/StorageRepository";
import type { AuthService } from "./repositories/AuthService";

// Re-export types for convenience
export type { ProductRepository } from "./repositories/ProductRepository";
export type { OrderRepository, CreateOrderInput } from "./repositories/OrderRepository";
export type { UserRepository } from "./repositories/UserRepository";
export type { StorageRepository } from "./repositories/StorageRepository";
export type { AuthService } from "./repositories/AuthService";
export * from "./types";

type DataSource = "mock" | "db";

const DATA_SOURCE: DataSource =
  (process.env.DATA_SOURCE as DataSource) || "mock";

function createProductRepo(): ProductRepository {
  if (DATA_SOURCE === "db") {
    const { DbProductRepository } = require("./db/dbProductRepo");
    return new DbProductRepository();
  }
  const { MockProductRepository } = require("./mock/mockProductRepo");
  return new MockProductRepository();
}

function createOrderRepo(): OrderRepository {
  if (DATA_SOURCE === "db") {
    const { DbOrderRepository } = require("./db/dbOrderRepo");
    return new DbOrderRepository();
  }
  const { MockOrderRepository } = require("./mock/mockOrderRepo");
  return new MockOrderRepository();
}

function createUserRepo(): UserRepository {
  if (DATA_SOURCE === "db") {
    const { DbUserRepository } = require("./db/dbUserRepo");
    return new DbUserRepository();
  }
  const { MockUserRepository } = require("./mock/mockUserRepo");
  return new MockUserRepository();
}

function createStorageRepo(): StorageRepository {
  if (DATA_SOURCE === "db") {
    const { DbStorageRepository } = require("./db/dbStorageRepo");
    return new DbStorageRepository();
  }
  const { MockStorageRepository } = require("./mock/mockStorageRepo");
  return new MockStorageRepository();
}

function createAuthService(): AuthService {
  if (DATA_SOURCE === "db") {
    const { DbAuthService } = require("./db/dbAuthService");
    return new DbAuthService();
  }
  const { MockAuthService } = require("./mock/mockAuthService");
  return new MockAuthService();
}

// Lazy singletons
let _productRepo: ProductRepository | null = null;
let _orderRepo: OrderRepository | null = null;
let _userRepo: UserRepository | null = null;
let _storageRepo: StorageRepository | null = null;
let _authService: AuthService | null = null;

export function getProductRepo(): ProductRepository {
  if (!_productRepo) _productRepo = createProductRepo();
  return _productRepo;
}

export function getOrderRepo(): OrderRepository {
  if (!_orderRepo) _orderRepo = createOrderRepo();
  return _orderRepo;
}

export function getUserRepo(): UserRepository {
  if (!_userRepo) _userRepo = createUserRepo();
  return _userRepo;
}

export function getStorageRepo(): StorageRepository {
  if (!_storageRepo) _storageRepo = createStorageRepo();
  return _storageRepo;
}

export function getAuthService(): AuthService {
  if (!_authService) _authService = createAuthService();
  return _authService;
}
