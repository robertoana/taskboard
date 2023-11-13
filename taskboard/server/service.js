const {existsSync, readFileSync, writeFileSync} = require('fs');
module.exports = function (path) {
    const tasksByStatus = existsSync(path) ? JSON.parse(readFileSync(path)) : {};
    return {
        getTasksByStatus() {
            return tasksByStatus;
        },
        changeTaskStatus(task, oldStatus, newStatus) {
            if (Array.isArray(tasksByStatus[oldStatus])
                && Array.isArray(tasksByStatus[newStatus])) {            
                let index = tasksByStatus[oldStatus].findIndex(t => t === task);
                if (index!=-1) {
                    tasksByStatus[oldStatus].splice(index, 1);
                    tasksByStatus[newStatus].push(task);
                    writeFileSync(path, JSON.stringify(tasksByStatus));
                    return true;
                }
            }
            return false;
        }
    };
};