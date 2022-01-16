# portable-packages

[![apm](https://flat.badgen.net/apm/license/portable-packages)](https://atom.io/packages/portable-packages)
[![apm](https://flat.badgen.net/apm/v/portable-packages)](https://atom.io/packages/portable-packages)
[![apm](https://flat.badgen.net/apm/dl/portable-packages)](https://atom.io/packages/portable-packages)
[![CI](https://img.shields.io/github/workflow/status/idleberg/atom-portable-packages/CI?style=flat-square)](https://github.com/idleberg/atom-portable-packages/actions)
[![David](https://flat.badgen.net/david/dep/idleberg/atom-portable-packages)](https://david-dm.org/idleberg/atom-portable-packages)

# Description

Installs and creates portable Atom packages

## Installation

### apm

Install `portable-packages` from Atom's [Package Manager](http://flight-manual.atom.io/using-atom/sections/atom-packages/) or the command-line equivalent:

`$ apm install portable-packages`

### Using Git

Change to your Atom packages directory:

**Windows**

```cmd
$ cd %USERPROFILE%\.atom\packages
```

**Linux & macOS**

```bash
$ cd ~/.atom/packages/
```

Clone the repository as `portable-packages`:

```bash
$ git clone https://github.com/idleberg/atom-portable-packages portable-packages
```

Install dependencies:

```bash
cd portable-packages && npm install
```

## Usage

### Install Portable Package

To install packages, simply drag them onto the Atom window. Alternatively, you can configure Atom as the default application for `.atom-package` files or open them from the command-line (e.g. `atom teletype.atom-package`).

### Create Portable Package

Run the _Portable Packages: Create_ from the [Command Palette](https://atom.io/docs/latest/getting-started-atom-basics#command-palette) and select which installed package you would like to compress. Upon creation, the portable package will be revealed in your file browser.

## FAQ

#### What are portable packages?

A portable package is a simple Zip-file with the file-extension `.atom-package`. By default, these include Node dependencies and can be installed without the need of an internet connection.

#### How can I exclude files from my package?

You can place an `.atomignore` file inside your package that works like a standard `.gitignore` file. In the settings, you can change the ignore file to a standard `.gitignore`or `.npmignore`. Take note, that [global .gitignore](https://help.github.com/en/articles/ignoring-files#create-a-global-gitignore) files are not considered.

#### Why does my portable package not work?

Some Node dependencies are compiled into native code, thus they might not be portable across platforms. In all other cases, feel free to post an [issue](https://github.com/idleberg/atom-portable-packages/issues).

## License

This work is licensed under the [MIT License](LICENSE)
