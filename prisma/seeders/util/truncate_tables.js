"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.truncateTable = void 0;
var client_1 = require("@prisma/client");
var prisma = new client_1.PrismaClient();
/**
 * Disables foreign key constraints based on the database type.
 *
 * @since 1.0.1
 * @async
 * @function
 */
var disableForeignKeys = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!(databaseType === 'postgresql')) return [3 /*break*/, 2];
                return [4 /*yield*/, prisma.$executeRawUnsafe('SET CONSTRAINTS ALL DEFERRED;')];
            case 1:
                _a.sent();
                return [3 /*break*/, 6];
            case 2:
                if (!(databaseType === 'mysql')) return [3 /*break*/, 4];
                return [4 /*yield*/, prisma.$executeRawUnsafe('SET FOREIGN_KEY_CHECKS = 0;')];
            case 3:
                _a.sent();
                return [3 /*break*/, 6];
            case 4:
                if (!(databaseType === 'sqlite')) return [3 /*break*/, 6];
                return [4 /*yield*/, prisma.$executeRawUnsafe('PRAGMA foreign_keys = OFF;')];
            case 5:
                _a.sent();
                _a.label = 6;
            case 6: return [2 /*return*/];
        }
    });
}); };
/**
 * Enables foreign key constraints based on the database type.
 *
 * @since 1.0.1
 * @async
 * @function
 */
var enableForeignKeys = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!(databaseType === 'postgresql')) return [3 /*break*/, 2];
                return [4 /*yield*/, prisma.$executeRawUnsafe('SET CONSTRAINTS ALL IMMEDIATE;')];
            case 1:
                _a.sent();
                return [3 /*break*/, 6];
            case 2:
                if (!(databaseType === 'mysql')) return [3 /*break*/, 4];
                return [4 /*yield*/, prisma.$executeRawUnsafe('SET FOREIGN_KEY_CHECKS = 1;')];
            case 3:
                _a.sent();
                return [3 /*break*/, 6];
            case 4:
                if (!(databaseType === 'sqlite')) return [3 /*break*/, 6];
                return [4 /*yield*/, prisma.$executeRawUnsafe('PRAGMA foreign_keys = ON;')];
            case 5:
                _a.sent();
                _a.label = 6;
            case 6: return [2 /*return*/];
        }
    });
}); };
/**
 * Truncates the specified table and removes all its data.
 *
 * @since 1.0.1
 * @async
 * @function
 * @param {TableName} tableName - The name of the table to truncate.
 * @throws Will throw an error if the table does not exist or cannot be truncated.
 */
var truncateTable = function (tableName) { return __awaiter(void 0, void 0, void 0, function () {
    var models;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                models = Object.keys(prisma);
                if (!models.includes(tableName)) {
                    throw new Error("Table ".concat(tableName, " does not exist or cannot be truncated."));
                }
                return [4 /*yield*/, disableForeignKeys()];
            case 1:
                _a.sent();
                return [4 /*yield*/, prisma[tableName].deleteMany({})];
            case 2:
                _a.sent();
                return [4 /*yield*/, enableForeignKeys()];
            case 3:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.truncateTable = truncateTable;
