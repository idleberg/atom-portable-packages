"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getConfig = (key) => {
    if (key) {
        return atom.config.get(`portable-packages.${key}`);
    }
    return atom.config.get('portable-packages');
};
exports.getConfig = getConfig;
const getPackagesDir = () => {
    const packageDirs = atom.packages.getPackageDirPaths();
    return packageDirs.filter((val) => val.includes('.atom/packages'))[0];
};
exports.getPackagesDir = getPackagesDir;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy91dGlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsTUFBTSxTQUFTLEdBQUcsQ0FBQyxHQUFZLEVBQUUsRUFBRTtJQUNqQyxJQUFJLEdBQUcsRUFBRTtRQUNQLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMscUJBQXFCLEdBQUcsRUFBRSxDQUFDLENBQUM7S0FDcEQ7SUFFRCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUM7QUFDOUMsQ0FBQyxDQUFDO0FBU0EsOEJBQVM7QUFQWCxNQUFNLGNBQWMsR0FBRyxHQUFXLEVBQUU7SUFDbEMsTUFBTSxXQUFXLEdBQWEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0lBRWpFLE9BQU8sV0FBVyxDQUFDLE1BQU0sQ0FBRSxDQUFDLEdBQVcsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDakYsQ0FBQyxDQUFDO0FBSUEsd0NBQWMifQ==