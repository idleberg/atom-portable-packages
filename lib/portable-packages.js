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
            console.log('uri', typeof uri, uri);
            if (uri.endsWith('.atom-package')) {
                install_package_1.installPackage(uri);
                return false;
            }
            return;
        }));
        this.subscriptions.add(atom.commands.add('atom-workspace', {
            'portable-packages:create-package': () => __awaiter(this, void 0, void 0, function* () {
                const { selectListView } = yield Promise.resolve().then(() => __importStar(require('./portable-packages-view')));
                const themeNames = atom.packages.getAvailablePackageNames();
                if (themeNames === undefined)
                    return;
                const theme = yield selectListView(themeNames);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9ydGFibGUtcGFja2FnZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvcG9ydGFibGUtcGFja2FnZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwrQkFBNEM7QUFHNUMsc0RBQThCO0FBQzlCLHFEQUFpRDtBQUNqRCx1REFBbUQ7QUFHbkQsTUFBTSxDQUFDLE9BQU8sR0FBRztJQUNmLE1BQU0sRUFBRSxnQkFBTTtJQUNkLGFBQWEsRUFBRSxJQUFJO0lBRW5CLFFBQVE7UUFFTixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksMEJBQW1CLENBQUM7UUFFN0MsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUUsQ0FBQyxHQUFXLEVBQU8sRUFBRTtZQUNwRSxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxPQUFPLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUVwQyxJQUFJLEdBQUcsQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLEVBQUU7Z0JBQ2pDLGdDQUFjLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBRXBCLE9BQU8sS0FBSyxDQUFDO2FBQ2Q7WUFFRCxPQUFPO1FBQ1QsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQU9KLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFO1lBQ3pELGtDQUFrQyxFQUFFLEdBQVMsRUFBRTtnQkFDN0MsTUFBTSxFQUFFLGNBQWMsRUFBRSxHQUFHLHdEQUFhLDBCQUEwQixHQUFDLENBQUM7Z0JBRXBFLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsd0JBQXdCLEVBQUUsQ0FBQztnQkFFNUQsSUFBSSxVQUFVLEtBQUssU0FBUztvQkFBRSxPQUFPO2dCQUVyQyxNQUFNLEtBQUssR0FBRyxNQUFNLGNBQWMsQ0FDaEMsVUFBVSxDQUNYLENBQUM7Z0JBRUYsSUFBSSxLQUFLLEtBQUssU0FBUztvQkFBRSxPQUFPO2dCQUUvQiw4QkFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3hCLENBQUMsQ0FBQTtTQUNKLENBQUMsQ0FBQyxDQUFDO0lBR0osQ0FBQztJQUVELFVBQVU7UUFDUixJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQy9CLENBQUM7Q0FDRixDQUFDIn0=