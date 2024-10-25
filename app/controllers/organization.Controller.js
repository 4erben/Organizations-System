const Organization = require("../models/organisation.model");
const User = require("../models/users.model");


const createNewOrg = async(req,res)=>{
    const {name,description} = req.body;
    const user = req.user;
    try{
        const org = await Organization.create({
            name,
            description
        });
        //add the user who created the organization to its members
        org.organization_members.push(user._id);
        await org.save();
        res.status(201).json({organization_id:org._id});
    }catch(error){
        res.status(500).json({error:error.message});
    }
};

const getOrg = async(req,res)=>{
    const {organization_id} = req.params;
    try{
        const org = await Organization.findById(organization_id).populate({
            path: "organization_members",
            select: "-password -__v"
        });
        if (!org) {
            return res.status(404).json({ message: 'Organization not found' });
          }
        res.status(201).json(org)
    }catch(err){
        res.status(403).json({error:err.message});
    }
};

const getAllOrgs = async(req,res)=>{
    try{
        const orgs = await Organization.find().populate({
            path:"organization_members",
            select:"-password -__v"
        });
        res.status(201).json(orgs);
    }catch(err){
        res.status(403).json({error:err.message});
    }
};

const updateOrg = async(req,res)=>{
    const updates = req.body;
    const {organization_id} = req.params;
    try{
        const org = await Organization.findByIdAndUpdate(organization_id,updates,{
            new: true,
            runValidators: true
        });
        if (!org) {
            return res.status(404).json({ message: 'Organization not found' });
          }
        res.status(201).json(org);
    }catch(err){
        res.status(403).json({error:err.message});
    }
};

const deleteOrg = async(req,res)=>{
    const {organization_id} = req.params;
    try{
        const org = await Organization.findByIdAndDelete(organization_id);
        if (!org) {
            return res.status(404).json({ message: 'Organization not found' });
          }
        return res.status(204).json({message:"Organization deleted successfully"});
    }catch(err){
        res.status(403).json({error:err.message});
    }
};

const inviteUser = async(req,res)=>{
    const {organization_id} = req.params;
    const {user_email} = req.body;
    try{
        //finding the invited user
        const invitedUser = await User.findOneAndUpdate(
            {email:user_email},
            {access_level:"read-only"},
            {new:true,runValidators:true}
        );
        //finding the organization where we will add the new member
        const org = await Organization.findById(organization_id);
        org.organization_members.push(invitedUser);
        await org.save();

        res.status(201).json({message:"New member Added Successfully!"});
    }catch(error){  
        res.status(403).json({error:error.message});
    } 
};

module.exports = {
    createNewOrg,
    getOrg,
    getAllOrgs,
    updateOrg,
    deleteOrg,
    inviteUser
}