import { Router, Request, Response } from "express";
import { getOwnersController , getOwnerByIdController, createOwnerController, updateOwnerController, deleteOwnerController } from "../controllers/owner.controller";
const router = Router();

router.get("/", getOwnersController);

router.get("/:id", getOwnerByIdController);

router.post(
  "/",
  /* #swagger.requestBody = {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["first_name", "last_name", "phone", "email", "adress"],
              properties: {
                first_name: { type: "string" },
                last_name: { type: "string" },
                phone: { type: "string" },
                email: { type: "string" },
                adress: { type: "string" }
              }
            }
          }
        }
  } */
  createOwnerController
);

router.put("/:id", updateOwnerController );

router.delete("/:id", deleteOwnerController);

//  Test MIDDLEWARE ERROR
// router.get("/_test/error", (req, res, next) => {
//   return next({ status: 418, message: "Test middleware" });
// });

// router.get("/_test/crash", (req, res) => {
// });

export default router;