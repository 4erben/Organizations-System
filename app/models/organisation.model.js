    const mongoose = require("mongoose");

    const orgSchema = new mongoose.Schema({
        name:{
            type: String,
            required:true
        },
        description:{
            type:String,
            required:false
        },
        organization_members:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"User"
            },
        ]
    });

    module.exports = mongoose.model("Organization",orgSchema);
