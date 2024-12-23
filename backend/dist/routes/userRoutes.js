"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const auth_1 = require("../middlewares/auth");
const router = express_1.default.Router();
router.post("/signup", userController_1.signup);
router.post("/login", userController_1.login);
router.get("/logout", userController_1.logout);
router.get("/current-user", auth_1.isAuthenticated, userController_1.getCurrentUser);
exports.default = router;
