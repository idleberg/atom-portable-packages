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
const util_1 = require("./util");
const path_2 = require("path");
const util_2 = require("util");
const readFileAsync = util_2.promisify(fs_1.readFile);
const installPackage = (uri) => {
    const fileBasename = path_1.basename(uri, '.atom-package');
    const notification = atom.notifications.addInfo(`Do you really want to install \`${fileBasename}\`?`, {
        dismissable: true,
        buttons: [
            {
                text: 'Install',
                onDidClick: () => __awaiter(this, void 0, void 0, function* () {
                    const packagesDir = util_1.getPackagesDir();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5zdGFsbC1wYWNrYWdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2luc3RhbGwtcGFja2FnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUEsa0RBQTBCO0FBQzFCLCtCQUFnQztBQUNoQywyQkFBb0U7QUFDcEUsaUNBQXdDO0FBQ3hDLCtCQUE0QjtBQUM1QiwrQkFBaUM7QUFFakMsTUFBTSxhQUFhLEdBQUcsZ0JBQVMsQ0FBQyxhQUFRLENBQUMsQ0FBQztBQUUxQyxNQUFNLGNBQWMsR0FBRyxDQUFDLEdBQVcsRUFBRSxFQUFFO0lBQ3JDLE1BQU0sWUFBWSxHQUFHLGVBQVEsQ0FBQyxHQUFHLEVBQUUsZUFBZSxDQUFDLENBQUM7SUFFcEQsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsbUNBQW1DLFlBQVksS0FBSyxFQUFFO1FBQ3BHLFdBQVcsRUFBRSxJQUFJO1FBQ2pCLE9BQU8sRUFBRTtZQUNQO2dCQUNFLElBQUksRUFBRSxTQUFTO2dCQUNmLFVBQVUsRUFBRSxHQUFTLEVBQUU7b0JBQ3JCLE1BQU0sV0FBVyxHQUFHLHFCQUFjLEVBQUUsQ0FBQztvQkFFckMsSUFBSSxZQUFZLENBQUM7b0JBRWpCLElBQUk7d0JBQ0YsWUFBWSxHQUFHLE1BQU0sYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO3FCQUN6QztvQkFBQyxPQUFPLEdBQUcsRUFBRTt3QkFDWixNQUFNLEdBQUcsQ0FBQztxQkFDWDtvQkFFRCxNQUFNLEdBQUcsR0FBRyxNQUFNLGVBQUssQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLENBQUM7b0JBQ2hELE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO29CQUN0RSxNQUFNLFVBQVUsR0FBRyxXQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDaEQsTUFBTSxhQUFhLEdBQUcsZUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDO29CQUU3QyxJQUFJLENBQUMsYUFBYSxFQUFFO3dCQUNsQixjQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7cUJBQ3ZCO29CQUVELE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBRSxZQUFZLENBQUMsRUFBRTt3QkFDN0MsTUFBTSxLQUFLLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQyxHQUFHLENBQUM7d0JBQzFDLE1BQU0sTUFBTSxHQUFHLFdBQUksQ0FBQyxVQUFVLEVBQUUsWUFBWSxDQUFDLENBQUM7d0JBRTlDLElBQUksS0FBSyxFQUFFOzRCQUNULE1BQU0sWUFBWSxHQUFHLGVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQzs0QkFFeEMsSUFBSSxDQUFDLFlBQVksRUFBRTtnQ0FDakIsY0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDOzZCQUNuQjt5QkFDRjs2QkFBTTs0QkFDTCxHQUFHLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUM7aUNBQ3pDLElBQUksQ0FBRSxRQUFRLENBQUMsRUFBRTtnQ0FDaEIsa0JBQWEsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7NEJBQ2xDLENBQUMsQ0FBQyxDQUFDO3lCQUNKO29CQUNILENBQUMsQ0FBQyxDQUFDO29CQUVILElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDdkMsWUFBWSxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUN6QixDQUFDLENBQUE7YUFDRjtZQUNEO2dCQUNFLElBQUksRUFBRSxRQUFRO2dCQUNkLFVBQVUsRUFBRSxHQUFHLEVBQUU7b0JBQ2YsWUFBWSxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUN6QixDQUFDO2FBQ0Y7U0FDRjtLQUNGLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQztBQUdBLHdDQUFjIn0=