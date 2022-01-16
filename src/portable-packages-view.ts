import SelectListView from 'atom-select-list';
import { Panel } from 'atom';

async function selectListView(
  items: string[],
): Promise<string | undefined | void> {
  let panel: Panel<SelectListView> | undefined;
  const currentFocus = document.activeElement as HTMLElement | void;

  try {
    return await new Promise<string | undefined>((resolve) => {
      const select = new SelectListView({
        items,
        elementForItem: (item: string) => {
          const li = document.createElement('li');
          li.innerText = item;

          return li;
        },
        didCancelSelection: () => {
          resolve('');
        },
        didConfirmSelection: (item: string) => {
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
  } finally {
    if (panel) panel.destroy();
    if (currentFocus) currentFocus.focus();
  }
}

export {
  selectListView
};
