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
const atom_select_list_1 = __importDefault(require("atom-select-list"));
function selectListView(items) {
    return __awaiter(this, void 0, void 0, function* () {
        let panel;
        const currentFocus = document.activeElement;
        try {
            return yield new Promise((resolve) => {
                const select = new atom_select_list_1.default({
                    items,
                    elementForItem: (item) => {
                        const li = document.createElement('li');
                        li.innerText = item;
                        return li;
                    },
                    didCancelSelection: () => {
                        resolve();
                    },
                    didConfirmSelection: (item) => {
                        resolve(item);
                    },
                    itemsClassList: ['atom-typescript'],
                });
                panel = atom.workspace.addModalPanel({
                    item: select,
                    visible: true,
                });
                select.focus();
            });
        }
        finally {
            if (panel)
                panel.destroy();
            if (currentFocus)
                currentFocus.focus();
        }
    });
}
exports.selectListView = selectListView;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9ydGFibGUtcGFja2FnZXMtdmlldy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9wb3J0YWJsZS1wYWNrYWdlcy12aWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFDQSx3RUFBOEM7QUFHOUMsU0FBc0IsY0FBYyxDQUNsQyxLQUFlOztRQUVmLElBQUksS0FBZ0QsQ0FBQztRQUNyRCxNQUFNLFlBQVksR0FBRyxRQUFRLENBQUMsYUFBbUMsQ0FBQztRQUVsRSxJQUFJO1lBQ0YsT0FBTyxNQUFNLElBQUksT0FBTyxDQUFxQixDQUFDLE9BQU8sRUFBRSxFQUFFO2dCQUN2RCxNQUFNLE1BQU0sR0FBMkIsSUFBSSwwQkFBYyxDQUFDO29CQUN4RCxLQUFLO29CQUNMLGNBQWMsRUFBRSxDQUFDLElBQVksRUFBRSxFQUFFO3dCQUMvQixNQUFNLEVBQUUsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUN4QyxFQUFFLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQzt3QkFFcEIsT0FBTyxFQUFFLENBQUM7b0JBQ1osQ0FBQztvQkFDRCxrQkFBa0IsRUFBRSxHQUFHLEVBQUU7d0JBQ3ZCLE9BQU8sRUFBRSxDQUFDO29CQUNaLENBQUM7b0JBQ0QsbUJBQW1CLEVBQUUsQ0FBQyxJQUFZLEVBQUUsRUFBRTt3QkFDcEMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUNoQixDQUFDO29CQUNELGNBQWMsRUFBRSxDQUFDLGlCQUFpQixDQUFDO2lCQUNwQyxDQUFDLENBQUM7Z0JBRUgsS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDO29CQUNuQyxJQUFJLEVBQUUsTUFBTTtvQkFDWixPQUFPLEVBQUUsSUFBSTtpQkFDZCxDQUFDLENBQUM7Z0JBRUgsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ2pCLENBQUMsQ0FBQyxDQUFDO1NBQ0o7Z0JBQVM7WUFDUixJQUFJLEtBQUs7Z0JBQUUsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQzNCLElBQUksWUFBWTtnQkFBRSxZQUFZLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDeEM7SUFDSCxDQUFDO0NBQUE7QUFwQ0Qsd0NBb0NDIn0=