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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const atom_1 = require("atom");
const config_1 = __importDefault(require("./config"));
const create_package_1 = require("./create-package");
const install_package_1 = require("./install-package");
module.exports = {
    config: config_1.default,
    subscriptions: null,
    activate() {
        this.subscriptions = new atom_1.CompositeDisposable;
        this.subscriptions.add(atom.workspace.addOpener((uri) => {
            if (uri.endsWith('.atom-package')) {
                install_package_1.installPackage(uri);
                return false;
            }
            return;
        }));
        this.subscriptions.add(atom.commands.add('atom-workspace', {
            'portable-packages:create-package': () => __awaiter(this, void 0, void 0, function* () {
                const { selectListView } = yield Promise.resolve().then(() => __importStar(require('./portable-packages-view')));
                const packageNames = atom.packages.getAvailablePackageNames();
                const packages = packageNames.filter(packageName => !atom.packages.isBundledPackage(packageName));
                if (packages === undefined)
                    return;
                const theme = yield selectListView(packages);
                if (theme === undefined)
                    return;
                create_package_1.createPackage(theme);
            })
        }));
    },
    deactivate() {
        this.subscriptions.dispose();
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9ydGFibGUtcGFja2FnZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvcG9ydGFibGUtcGFja2FnZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwrQkFBNEM7QUFHNUMsc0RBQThCO0FBQzlCLHFEQUFpRDtBQUNqRCx1REFBbUQ7QUFHbkQsTUFBTSxDQUFDLE9BQU8sR0FBRztJQUNmLE1BQU0sRUFBRSxnQkFBTTtJQUNkLGFBQWEsRUFBRSxJQUFJO0lBRW5CLFFBQVE7UUFDTixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksMEJBQW1CLENBQUM7UUFFN0MsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUUsQ0FBQyxHQUFXLEVBQU8sRUFBRTtZQUNwRSxJQUFJLEdBQUcsQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLEVBQUU7Z0JBQ2pDLGdDQUFjLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBRXBCLE9BQU8sS0FBSyxDQUFDO2FBQ2Q7WUFFRCxPQUFPO1FBQ1QsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVKLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFO1lBQ3pELGtDQUFrQyxFQUFFLEdBQVMsRUFBRTtnQkFDN0MsTUFBTSxFQUFFLGNBQWMsRUFBRSxHQUFHLHdEQUFhLDBCQUEwQixHQUFDLENBQUM7Z0JBRXBFLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsd0JBQXdCLEVBQUUsQ0FBQztnQkFDOUQsTUFBTSxRQUFRLEdBQUcsWUFBWSxDQUFDLE1BQU0sQ0FBRSxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO2dCQUVuRyxJQUFJLFFBQVEsS0FBSyxTQUFTO29CQUFFLE9BQU87Z0JBRW5DLE1BQU0sS0FBSyxHQUFHLE1BQU0sY0FBYyxDQUNoQyxRQUFRLENBQ1QsQ0FBQztnQkFFRixJQUFJLEtBQUssS0FBSyxTQUFTO29CQUFFLE9BQU87Z0JBRWhDLDhCQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDdkIsQ0FBQyxDQUFBO1NBQ0YsQ0FBQyxDQUFDLENBQUM7SUFDTixDQUFDO0lBRUQsVUFBVTtRQUNSLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDL0IsQ0FBQztDQUNGLENBQUMifQ==