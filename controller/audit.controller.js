import AuditLog from "../model/audit.model.js";
import HttpError from "../middleware/HttpError.js";

const getAll = async (req, res, next) => {
    try {

        const auditLogs = await AuditLog.find()
            .populate("performedBy", "name email")
            .sort({ createdAt: -1 });

        if (auditLogs.length === 0) {
            return next(new HttpError("Audit logs not found", 404));
        }

        res.status(200).json({
            success: true,
            message: "Audit logs fetched successfully",
            totalLogs: auditLogs.length,
            auditLogs
        });

    } catch (error) {
        return next(new HttpError(error.message, 500));
    }
};

export default { getAll };