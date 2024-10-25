const express = require("express");
const router = express.Router();
const checkReadOnlyAccess = require("../middlewares/readOnly.middleware");
const { createNewOrg, getOrg, getAllOrgs, updateOrg, deleteOrg, inviteUser } = require("../controllers/organization.Controller");


//create a new organization
router.post("/",checkReadOnlyAccess,createNewOrg)

//get specific organization by its id
router.get("/:organization_id",getOrg)


//get all the organizations
router.get("/",getAllOrgs)

//update a specific organization information
router.put("/:organization_id",checkReadOnlyAccess,updateOrg);


//delete a specific organization
router.delete("/:organization_id",checkReadOnlyAccess,deleteOrg);


//invite user to organization
router.post("/:organization_id/invite",inviteUser)



module.exports = router;