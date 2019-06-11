"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jszip_1 = __importDefault(require("jszip"));
const globby_1 = __importDefault(require("globby"));
const ignore_1 = __importDefault(require("ignore"));
const util_1 = require("./util");
const path_1 = require("path");
const util_2 = require("util");
const atom_read_manifest_1 = require("atom-read-manifest");
const fs_1 = require("fs");
const electron_1 = require("electron");
const readFileAsync = util_2.promisify(fs_1.readFile);
const writeFileAsync = util_2.promisify(fs_1.writeFile);
const createPackage = (selectedPackage) => __awaiter(this, void 0, void 0, function* () {
    atom.notifications.addInfo('Create Package');
    const packagesDir = util_1.getPackagesDir();
    const packageDir = path_1.resolve(packagesDir, selectedPackage);
    const ignoreFile = util_1.getConfig('ignoreFile');
    let ignoreFileContents = '';
    try {
        ignoreFileContents = (yield readFileAsync(`${packageDir}/${ignoreFile}`)).toString();
    }
    catch (error) {
        console.warn(`No ${ignoreFile} found`);
    }
    ignoreFileContents.concat('\n.git/');
    const ig = ignore_1.default().add(ignoreFileContents);
    const absolutePaths = yield globby_1.default(packageDir);
    const relativePaths = absolutePaths.map(absolutePath => {
        return path_1.relative(packageDir, absolutePath);
    });
    const includedPaths = ig.filter(relativePaths);
    const zip = new jszip_1.default();
    includedPaths.forEach((includedPath) => __awaiter(this, void 0, void 0, function* () {
        const contents = fs_1.readFileSync(path_1.join(packageDir, includedPath));
        zip.file(includedPath, contents);
    }));
    const pkgConfig = util_1.getConfig('compressionType');
    const meta = yield atom_read_manifest_1.readManifest();
    const options = {
        type: 'nodebuffer',
        comment: `${meta.name} v${meta.version} | ${meta.homepage}`,
        compression: pkgConfig.compressionType,
        compressionOptions: {
            level: pkgConfig.compressionLevel
        }
    };
    const manifest = yield atom_read_manifest_1.readManifest(selectedPackage);
    const outName = `${manifest.name}-v${manifest.version}`;
    try {
        let blob = yield zip.generateAsync(options);
        yield writeFileAsync(`${packagesDir}/${outName}.atom-package`, blob);
    }
    catch (err) {
        console.error(err);
    }
    if (util_1.getConfig('ignoreFile')) {
        electron_1.shell.showItemInFolder(`${packagesDir}/${outName}.atom-package`);
    }
});
exports.createPackage = createPackage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLXBhY2thZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvY3JlYXRlLXBhY2thZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUNBLGtEQUEwQjtBQUMxQixvREFBNEI7QUFDNUIsb0RBQTRCO0FBQzVCLGlDQUFtRDtBQUNuRCwrQkFBK0M7QUFDL0MsK0JBQWlDO0FBRWpDLDJEQUFrRDtBQUNsRCwyQkFBdUQ7QUFFdkQsdUNBQWlDO0FBRWpDLE1BQU0sYUFBYSxHQUFHLGdCQUFTLENBQUMsYUFBUSxDQUFDLENBQUM7QUFDMUMsTUFBTSxjQUFjLEdBQUcsZ0JBQVMsQ0FBQyxjQUFTLENBQUMsQ0FBQztBQUU1QyxNQUFNLGFBQWEsR0FBRyxDQUFPLGVBQXVCLEVBQUUsRUFBRTtJQUN0RCxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBRTdDLE1BQU0sV0FBVyxHQUFHLHFCQUFjLEVBQUUsQ0FBQztJQUNyQyxNQUFNLFVBQVUsR0FBRyxjQUFPLENBQUMsV0FBVyxFQUFFLGVBQWUsQ0FBQyxDQUFDO0lBQ3pELE1BQU0sVUFBVSxHQUFHLGdCQUFTLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDM0MsSUFBSSxrQkFBa0IsR0FBVyxFQUFFLENBQUM7SUFFcEMsSUFBSTtRQUNGLGtCQUFrQixHQUFHLENBQUMsTUFBTSxhQUFhLENBQUMsR0FBRyxVQUFVLElBQUksVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO0tBQ3RGO0lBQUMsT0FBTyxLQUFLLEVBQUU7UUFDZCxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sVUFBVSxRQUFRLENBQUMsQ0FBQztLQUN4QztJQUdELGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUVyQyxNQUFNLEVBQUUsR0FBRyxnQkFBTSxFQUFFLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDNUMsTUFBTSxhQUFhLEdBQWEsTUFBTSxnQkFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBRXpELE1BQU0sYUFBYSxHQUFhLGFBQWEsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLEVBQUU7UUFDL0QsT0FBTyxlQUFRLENBQUMsVUFBVSxFQUFFLFlBQVksQ0FBQyxDQUFDO0lBQzVDLENBQUMsQ0FBQyxDQUFDO0lBRUgsTUFBTSxhQUFhLEdBQWEsRUFBRSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUV6RCxNQUFNLEdBQUcsR0FBRyxJQUFJLGVBQUssRUFBRSxDQUFDO0lBRXhCLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBTSxZQUFZLEVBQUMsRUFBRTtRQUN6QyxNQUFNLFFBQVEsR0FBRyxpQkFBWSxDQUFDLFdBQUksQ0FBQyxVQUFVLEVBQUUsWUFBWSxDQUFDLENBQUMsQ0FBQztRQUM5RCxHQUFHLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxRQUFRLENBQUMsQ0FBQztJQUNuQyxDQUFDLENBQUEsQ0FBQyxDQUFDO0lBRUgsTUFBTSxTQUFTLEdBQUcsZ0JBQVMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBQy9DLE1BQU0sSUFBSSxHQUFHLE1BQU0saUNBQVksRUFBRSxDQUFDO0lBRWxDLE1BQU0sT0FBTyxHQUFRO1FBQ25CLElBQUksRUFBRSxZQUFZO1FBQ2xCLE9BQU8sRUFBRSxHQUFHLElBQUksQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLE9BQU8sTUFBTSxJQUFJLENBQUMsUUFBUSxFQUFFO1FBQzNELFdBQVcsRUFBRSxTQUFTLENBQUMsZUFBZTtRQUN0QyxrQkFBa0IsRUFBRTtZQUNsQixLQUFLLEVBQUUsU0FBUyxDQUFDLGdCQUFnQjtTQUNsQztLQUNGLENBQUM7SUFFRixNQUFNLFFBQVEsR0FBRyxNQUFNLGlDQUFZLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDckQsTUFBTSxPQUFPLEdBQUcsR0FBRyxRQUFRLENBQUMsSUFBSSxLQUFLLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUV4RCxJQUFJO1FBQ0YsSUFBSSxJQUFJLEdBQUcsTUFBTSxHQUFHLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzVDLE1BQU0sY0FBYyxDQUFDLEdBQUcsV0FBVyxJQUFJLE9BQU8sZUFBZSxFQUFFLElBQUksQ0FBQyxDQUFDO0tBQ3RFO0lBQUMsT0FBTyxHQUFHLEVBQUU7UUFDWixPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ3BCO0lBRUQsSUFBSSxnQkFBUyxDQUFDLFlBQVksQ0FBQyxFQUFFO1FBQzNCLGdCQUFLLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxXQUFXLElBQUksT0FBTyxlQUFlLENBQUMsQ0FBQztLQUNsRTtBQUNILENBQUMsQ0FBQSxDQUFDO0FBR0Esc0NBQWEifQ==