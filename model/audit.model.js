import mongoose from "mongoose";

const auditLogSchema = new mongoose.Schema({

    action: {
        type: String,
        required: true
    },
    performedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    module: {
        type: String,
        required: true,
        enum: [
            "User",
            "Order",
            "Provider",
            "Restaurant",
            "Food",
            "Category"
        ]
    },
    targetId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true 
    },
    ip:{
        type:String,
        required:true
    },
    userAgent:{
        type:String,
        required:true
    },

},
{
    timestamps:true,
}
);

const AuditLog = mongoose.model("AuditLog", auditLogSchema);

export default AuditLog;