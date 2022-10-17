import {Router} from "express";
import { methods as customersController } from "../controllers/customers.controller";
const router = Router();

router.get("/", customersController.getCustomers);
router.get("/:id", customersController.getCustomer);
router.post("/", customersController.addCustomers);
router.delete("/:id", customersController.deleteCustomer);


export default router;