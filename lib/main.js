'use babel'

import { CompositeDisposable } from 'atom';

export default {
	disposables: null,
	atPreferredLengthWhatcher: null,

	setShowWrapGuide(show) {
		if (!atom.packages.isPackageActive("wrap-guide")) return;
		// console.log(`Oblivion-Contrast: changing config to ${show?'enable':'disable'} wrap-guide`);
		atom.config.set('wrap-guide.enabled', show);
	},
	changeWhenShowingWrapGuide(when) {
		if (this.atPreferredLengthWhatcher) this.atPreferredLengthWhatcher.dispose();
		// console.log("Oblivion-Contrast: when showing wrap-guide is", when);
		switch (when) {
			case "atPrefLen":
				this.setShowWrapGuide(atom.config.get("editor.softWrapAtPreferredLineLength"));
				this.atPreferredLengthWhatcher = new CompositeDisposable();
				this.atPreferredLengthWhatcher.add( atom.config.onDidChange('editor.softWrapAtPreferredLineLength',
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
			if (this.atPreferredLengthWhatcher) this.atPreferredLengthWhatcher.dispose();
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
		if (this.atPreferredLengthWhatcher) this.atPreferredLengthWhatcher.dispose();
		this.disposables.dispose();
	}
}
