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
const path_1 = require("path");
const fs_1 = require("fs");
const path_2 = require("path");
const util_1 = require("util");
const readFileAsync = util_1.promisify(fs_1.readFile);
const installPackage = (uri) => {
    const fileBasename = path_1.basename(uri, '.atom-package');
    const notification = atom.notifications.addInfo(`Do you really want to install \`${fileBasename}\`?`, {
        dismissable: true,
        buttons: [
            {
                text: 'Install',
                onDidClick: () => __awaiter(this, void 0, void 0, function* () {
                    const packagesDir = atom.packages.getPackageDirPaths()[0];
                    let fileContents;
                    try {
                        fileContents = yield readFileAsync(uri);
                    }
                    catch (err) {
                        throw err;
                    }
                    const zip = yield jszip_1.default.loadAsync(fileContents);
                    const meta = JSON.parse(yield zip.file('package.json').async('text'));
                    const packageDir = path_2.join(packagesDir, meta.name);
                    const packageExists = fs_1.existsSync(packageDir);
                    if (!packageExists) {
                        fs_1.mkdirSync(packageDir);
                    }
                    Object.keys(zip.files).forEach(relativePath => {
                        const isDir = zip.files[relativePath].dir;
                        const subDir = path_2.join(packageDir, relativePath);
                        if (isDir) {
                            const subDirExists = fs_1.existsSync(subDir);
                            if (!subDirExists) {
                                fs_1.mkdirSync(subDir);
                            }
                        }
                        else {
                            zip.file(relativePath).async('nodebuffer')
                                .then(contents => {
                                fs_1.writeFileSync(subDir, contents);
                            });
                        }
                    });
                    atom.packages.enablePackage(meta.name);
                    notification.dismiss();
                })
            },
            {
                text: 'Cancel',
                onDidClick: () => {
                    notification.dismiss();
                }
            }
        ]
    });
};
exports.installPackage = installPackage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5zdGFsbC1wYWNrYWdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2luc3RhbGwtcGFja2FnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUEsa0RBQTBCO0FBQzFCLCtCQUFnQztBQUNoQywyQkFBb0U7QUFDcEUsK0JBQTRCO0FBQzVCLCtCQUFpQztBQUVqQyxNQUFNLGFBQWEsR0FBRyxnQkFBUyxDQUFDLGFBQVEsQ0FBQyxDQUFDO0FBRTFDLE1BQU0sY0FBYyxHQUFHLENBQUMsR0FBVyxFQUFFLEVBQUU7SUFDckMsTUFBTSxZQUFZLEdBQUcsZUFBUSxDQUFDLEdBQUcsRUFBRSxlQUFlLENBQUMsQ0FBQztJQUVwRCxNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxtQ0FBbUMsWUFBWSxLQUFLLEVBQUU7UUFDcEcsV0FBVyxFQUFFLElBQUk7UUFDakIsT0FBTyxFQUFFO1lBQ1A7Z0JBQ0UsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsVUFBVSxFQUFFLEdBQVMsRUFBRTtvQkFDckIsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUUxRCxJQUFJLFlBQVksQ0FBQztvQkFFakIsSUFBSTt3QkFDRixZQUFZLEdBQUcsTUFBTSxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7cUJBQ3pDO29CQUFDLE9BQU8sR0FBRyxFQUFFO3dCQUNaLE1BQU0sR0FBRyxDQUFDO3FCQUNYO29CQUVELE1BQU0sR0FBRyxHQUFHLE1BQU0sZUFBSyxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQztvQkFDaEQsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7b0JBQ3RFLE1BQU0sVUFBVSxHQUFHLFdBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUNoRCxNQUFNLGFBQWEsR0FBRyxlQUFVLENBQUMsVUFBVSxDQUFDLENBQUM7b0JBRTdDLElBQUksQ0FBQyxhQUFhLEVBQUU7d0JBQ2xCLGNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQztxQkFDdkI7b0JBRUQsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFFLFlBQVksQ0FBQyxFQUFFO3dCQUM3QyxNQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDLEdBQUcsQ0FBQzt3QkFDMUMsTUFBTSxNQUFNLEdBQUcsV0FBSSxDQUFDLFVBQVUsRUFBRSxZQUFZLENBQUMsQ0FBQzt3QkFFOUMsSUFBSSxLQUFLLEVBQUU7NEJBQ1QsTUFBTSxZQUFZLEdBQUcsZUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDOzRCQUV4QyxJQUFJLENBQUMsWUFBWSxFQUFFO2dDQUNqQixjQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7NkJBQ25CO3lCQUNGOzZCQUFNOzRCQUNMLEdBQUcsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQztpQ0FDekMsSUFBSSxDQUFFLFFBQVEsQ0FBQyxFQUFFO2dDQUNoQixrQkFBYSxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQzs0QkFDbEMsQ0FBQyxDQUFDLENBQUM7eUJBQ0o7b0JBQ0gsQ0FBQyxDQUFDLENBQUM7b0JBRUgsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUN2QyxZQUFZLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQ3pCLENBQUMsQ0FBQTthQUNGO1lBQ0Q7Z0JBQ0UsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsVUFBVSxFQUFFLEdBQUcsRUFBRTtvQkFDZixZQUFZLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQ3pCLENBQUM7YUFDRjtTQUNGO0tBQ0YsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDO0FBR0Esd0NBQWMifQ==