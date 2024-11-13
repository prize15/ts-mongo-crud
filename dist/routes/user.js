"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../controllers/user");
const router = express_1.default.Router();
router.get('/users', user_1.getUsers);
router.post('/users', user_1.createUser);
router.get('/users/:id', user_1.getUser);
router.put('/users/:id', user_1.updateUser);
router.delete('/users/:id', user_1.deleteUser);
exports.default = router;
