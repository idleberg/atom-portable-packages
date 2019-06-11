"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getConfig = (key) => {
    if (key) {
        return atom.config.get(`portable-packages.${key}`);
    }
    return atom.config.get('portable-packages');
};
exports.getConfig = getConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy91dGlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsTUFBTSxTQUFTLEdBQUcsQ0FBQyxHQUFZLEVBQUUsRUFBRTtJQUNqQyxJQUFJLEdBQUcsRUFBRTtRQUNQLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMscUJBQXFCLEdBQUcsRUFBRSxDQUFDLENBQUM7S0FDcEQ7SUFFRCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUM7QUFDOUMsQ0FBQyxDQUFDO0FBR0EsOEJBQVMifQ==