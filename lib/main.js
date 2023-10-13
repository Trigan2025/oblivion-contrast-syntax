'use babel'

import { CompositeDisposable } from 'atom';

export default {
	disposables: null,
	softWrapWatcher: null,

	setShowWrapGuide(show) {
		if (!atom.packages.isPackageActive("wrap-guide")) return;
		// console.log(`Oblivion-Contrast: changing config to ${show?'enable':'disable'} wrap-guide`);
		atom.config.set('wrap-guide.enabled', show);
	},
	changeWhenShowingWrapGuide(when) {
		if (this.softWrapWatcher) this.softWrapWatcher.dispose();
		// console.log("Oblivion-Contrast: when showing wrap-guide is", when);
		switch (when) {
			case "atPrefLen":
				this.setShowWrapGuide(atom.config.get("editor.softWrap") && atom.config.get("editor.softWrapAtPreferredLineLength"));
				this.softWrapWatcher = new CompositeDisposable();
				this.softWrapWatcher.add(atom.config.onDidChange('editor.softWrapAtPreferredLineLength',
					({oldValue, newValue}) => {
					this.setShowWrapGuide(newValue && atom.config.get("editor.softWrap"));
				}));
				this.softWrapWatcher.add(atom.config.onDidChange('editor.softWrap',
					({oldValue, newValue}) => {
					this.setShowWrapGuide(newValue && atom.config.get("editor.softWrapAtPreferredLineLength"));
				}));
				break;
			case "ifWrapping":
				this.setShowWrapGuide(atom.config.get("editor.softWrap"));
				this.softWrapWatcher = new CompositeDisposable();
				this.softWrapWatcher.add(atom.config.onDidChange('editor.softWrap',
					({oldValue, newValue}) => {
					this.setShowWrapGuide(newValue);
				}));
				break;
			case "never":
				this.setShowWrapGuide(false);
				break;
			default: // "always"
				this.setShowWrapGuide(true);
				break;
		}
	},

	activate() {
		if (this.disposables) {
			if (this.softWrapWatcher) this.softWrapWatcher.dispose();
			this.disposables.dispose();
		}
		this.changeWhenShowingWrapGuide(atom.config.get("oblivion-contrast-syntax.showWrapGuide"));

		this.disposables = new CompositeDisposable();
		this.disposables.add(atom.config.onDidChange('oblivion-contrast-syntax.showWrapGuide',
			({oldValue, newValue}) => {
			this.changeWhenShowingWrapGuide(newValue);
		}));
	},

	deactivate() {
		if (this.softWrapWatcher) this.softWrapWatcher.dispose();
		this.disposables.dispose();
	}
}
