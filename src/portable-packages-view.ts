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
        elementForItem: (item) => {
          const li: HTMLElement = document.createElement('li') as HTMLElement;
          li.innerText = String(item);

          return li;
        },
        didCancelSelection: () => {
          resolve('');
        },
        didConfirmSelection: (item) => {
          resolve(String(item));
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
