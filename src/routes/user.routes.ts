import { Router, Request, Response, NextFunction } from "express";
import {
  createUserController,
  getUserByIdController,
  deleteUserController,
  getUsersController,
  updateUserController,
} from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { roleMiddleware } from "../middlewares/role.middleware";

const router = Router();

// GET all users
router.get(
  "/",
  authMiddleware,
  roleMiddleware(["admin"]),
  (req: Request, res: Response, next: NextFunction) => {
    /*  #swagger.tags = ['Users']
        #swagger.summary = 'Récupérer tous les utilisateurs'
        #swagger.security = [{ BearerAuth: [] }]
        #swagger.parameters['page'] = { in: 'query', required: false, type: 'integer' }
        #swagger.parameters['limit'] = { in: 'query', required: false, type: 'integer' }
        #swagger.responses[200] = {
          description: 'Liste des utilisateurs',
          schema: [{ $ref: '#/definitions/User' }]
        }
    */
    return getUsersController(req, res, next);
  },
);

// CREATE user
router.post("/", (req: Request, res: Response, next: NextFunction) => {
  /*  #swagger.tags = ['Users']
        #swagger.summary = 'Créer un utilisateur'
        #swagger.parameters['body'] = {
          in: 'body',
          required: true,
          schema: { $ref: '#/definitions/User' }
        }
        #swagger.responses[201] = { description: 'Créé', schema: { $ref: '#/definitions/User' } }
        #swagger.responses[400] = { description: 'Données invalides' }
    */
  return createUserController(req, res, next);
});

// GET user by id
router.get(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin", "veterinarian"]),
  (req: Request, res: Response, next: NextFunction) => {
    return getUserByIdController(req, res, next);
  },
);

// DELETE user
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  (req: Request, res: Response, next: NextFunction) => {
    return deleteUserController(req, res, next);
  },
);

// UPDATE user
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  (req: Request, res: Response, next: NextFunction) => {
    return updateUserController(req, res, next);
  },
);

export default router;
