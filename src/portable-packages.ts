import { CompositeDisposable } from 'atom';

import config from './config';
import Logger from "./log";
import { createPackage } from './create-package';
import { installPackage } from './install-package';

export default {
  config: config,
  subscriptions: null,

  activate(): void {
    Logger.log('Activating package');

    this.subscriptions = new CompositeDisposable();

    this.subscriptions.add(
      atom.workspace.addOpener((uri) => {
        if (uri.endsWith('.atom-package')) {
          installPackage(String(uri));
        }
      })
    );

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'portable-packages:create-package': async () => {
        const { selectListView } = await import('./portable-packages-view');

        const packageNames = atom.packages.getAvailablePackageNames();
        const packages = packageNames.filter( packageName => !atom.packages.isBundledPackage(packageName));

        if (packages === undefined) return;

        const theme: string | void = await selectListView(
          packages
        );

        if (theme) createPackage(theme);
      }
    }));
  },

  deactivate(): void {
    Logger.log('Deactivating package');
    this.subscriptions.dispose();
  }
};
