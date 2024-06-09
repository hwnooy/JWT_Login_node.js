import express from "express";
import authRoutes from "./auth.js";
import protectedRoutes from "./protected.js";

const router = express.Router();

// 여기엔 use만, 라우터 연결은 여기서
// ~/api/register, ~/api/login 으로 api 테스트
router.use('/api', authRoutes);
router.use('/api', protectedRoutes);

export default router;
