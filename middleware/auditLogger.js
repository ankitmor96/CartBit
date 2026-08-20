import AuditLog from "../model/audit.model.js";



const auditLogger = async ({action,performedBy,module,targetId,ip,userAgent}) => {

    const auditLog = await AuditLog.create({
        action,
        performedBy,
        module,
        targetId,
        ip,
        userAgent
    });

    return auditLog;

};

export default auditLogger;