import { CompositeDisposable, } from 'atom';

// @ts-ignore
import config from './config';
import { createPackage } from './create-package';
import { installPackage } from './install-package';


module.exports = {
  config: config,
  subscriptions: null,

  activate(): void {
    this.subscriptions = new CompositeDisposable;

    this.subscriptions.add(atom.workspace.addOpener( (uri: string): any => {
      if (uri.endsWith('.atom-package')) {
        installPackage(uri);

        return false;
      }

      return;
    }));

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'portable-packages:create-package': async () => {
        const { selectListView } = await import('./portable-packages-view');

        const packageNames = atom.packages.getAvailablePackageNames();

        if (packageNames === undefined) return;

        const theme = await selectListView(
          packageNames
        );

        if (theme === undefined) return;

        createPackage(theme);
      }
    }));
  },

  deactivate(): void {
    this.subscriptions.dispose();
  }
};
