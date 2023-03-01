import { Router } from "express";
import { 
    createUserController, 
    deleteUserController, 
    listUsersController, 
    updateUserController } from "../controllers/users.controller";
import { ensureAdmMiddleware } from "../middleware/ensureAdm.middleware";
import { ensureAuthMiddleware } from "../middleware/ensureAuth.middleware";
import { ensureDataIsValidMiddleware } from "../middleware/ensureDataIsValid.middleware";
import { verifyUsernotExistMiddleware } from "../middleware/users/verifyUserNotExist.middleware";
import { verifyUserEmailExistsMiddleware } from "../middleware/users/verifyUserEmailExists.middleware";
import { updateUserSerializer, userSerializer } from "../serializers/user.serializers";
import { verifyFieldsMiddleware } from "../middleware/verifyFields.middleware";


export const userRoutes = Router()

userRoutes.get('', ensureAuthMiddleware, ensureAdmMiddleware, listUsersController)
userRoutes.post('', ensureDataIsValidMiddleware(userSerializer), verifyUserEmailExistsMiddleware, createUserController)
userRoutes.patch('/:id', ensureAuthMiddleware, verifyFieldsMiddleware, verifyUsernotExistMiddleware, ensureDataIsValidMiddleware(updateUserSerializer), updateUserController)
userRoutes.delete('/:id', ensureAuthMiddleware, ensureAdmMiddleware, verifyUsernotExistMiddleware, deleteUserController)