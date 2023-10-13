'use babel'

describe('Oblivion-Contrast', () => {
	let editor=atom, grammar;

	beforeEach(() => {
		waitsForPromise({timeout: 200, label: 'package activation'},
			() => editor.packages.activatePackage('oblivion-contrast-syntax')
		);
		waitsForPromise({timeout: 200, label: 'wrap-guide package activation'},
			() => editor.packages.activatePackage('wrap-guide')
		);
	});

	describe('Wrap-Guide managing', () => {
		it("should be activated", () => {
			expect(editor.packages.isPackageActive("oblivion-contrast-syntax")).toBe(true);
			expect(editor.packages.isPackageActive("wrap-guide")).toBe(true);
		});

		describe('if never showing wrap-guide is choosed', () => {
			beforeEach(() => {
				editor.config.set('oblivion-contrast-syntax.showWrapGuide', "never");
			});
			it('check if wrap-guide is enable', () => {
				expect(editor.config.get('oblivion-contrast-syntax.showWrapGuide')).toBe("never");
				expect(editor.config.get('wrap-guide.enabled')).toBe(false);
			});
		});

		describe('if always showing wrap-guide is choosed', () => {
			beforeEach(() => {
				editor.config.set('oblivion-contrast-syntax.showWrapGuide', "always");
			});
			it('check if wrap-guide is enable', () => {
				expect(editor.config.get('oblivion-contrast-syntax.showWrapGuide')).toBe("always");
				expect(editor.config.get('wrap-guide.enabled')).toBe(true);
			});
		});

		describe('if atPrefLen showing wrap-guide is choosed', () => {
			describe('when softWrap and softWrapAtPreferredLineLength are enabled', () => {
				beforeEach(() => {
					editor.config.set('oblivion-contrast-syntax.showWrapGuide', "atPrefLen");
					editor.config.set('editor.softWrap', true);
					editor.config.set('editor.softWrapAtPreferredLineLength', true);
				});
				it('check if wrap-guide is enable', () => {
					expect(editor.config.get('oblivion-contrast-syntax.showWrapGuide')).toBe("atPrefLen");
					expect(editor.config.get('editor.softWrapAtPreferredLineLength')).toBe(true);
					expect(editor.config.get('editor.softWrap')).toBe(true);
					expect(editor.config.get('wrap-guide.enabled')).toBe(true);
				});
			});
			describe('when softWrap is disabled but softWrapAtPreferredLineLength is enabled', () => {
				beforeEach(() => {
					editor.config.set('oblivion-contrast-syntax.showWrapGuide', "atPrefLen");
					editor.config.set('editor.softWrap', false);
					editor.config.set('editor.softWrapAtPreferredLineLength', true);
				});
				it('check if wrap-guide is enable', () => {
					expect(editor.config.get('oblivion-contrast-syntax.showWrapGuide')).toBe("atPrefLen");
					expect(editor.config.get('editor.softWrapAtPreferredLineLength')).toBe(true);
					expect(editor.config.get('editor.softWrap')).toBe(false);
					expect(editor.config.get('wrap-guide.enabled')).toBe(false);
				});
			});
			describe('when softWrap is enabled but softWrapAtPreferredLineLength is disabled', () => {
				beforeEach(() => {
					editor.config.set('oblivion-contrast-syntax.showWrapGuide', "atPrefLen");
					editor.config.set('editor.softWrap', true);
					editor.config.set('editor.softWrapAtPreferredLineLength', false);
				});
				it('check if wrap-guide is enable', () => {
					expect(editor.config.get('oblivion-contrast-syntax.showWrapGuide')).toBe("atPrefLen");
					expect(editor.config.get('editor.softWrapAtPreferredLineLength')).toBe(false);
					expect(editor.config.get('editor.softWrap')).toBe(true);
					expect(editor.config.get('wrap-guide.enabled')).toBe(false);
				});
			});
		});

		describe('if ifWrapping showing wrap-guide is choosed', () => {
			describe('when softWrapAtPreferredLineLength is disabled but softWrap is enabled', () => {
				beforeEach(() => {
					editor.config.set('oblivion-contrast-syntax.showWrapGuide', "ifWrapping");
					editor.config.set('editor.softWrap', true);
					editor.config.set('editor.softWrapAtPreferredLineLength', false);
				});
				it('check if wrap-guide is enable', () => {
					expect(editor.config.get('oblivion-contrast-syntax.showWrapGuide')).toBe("ifWrapping");
					expect(editor.config.get('editor.softWrapAtPreferredLineLength')).toBe(false);
					expect(editor.config.get('editor.softWrap')).toBe(true);
					expect(editor.config.get('wrap-guide.enabled')).toBe(true);
				});
			});
			describe('when softWrapAtPreferredLineLength is enabled but softWrap is disabled', () => {
				beforeEach(() => {
					editor.config.set('oblivion-contrast-syntax.showWrapGuide', "ifWrapping");
					editor.config.set('editor.softWrap', false);
					editor.config.set('editor.softWrapAtPreferredLineLength', true);
				});
				it('check if wrap-guide is enable', () => {
					expect(editor.config.get('oblivion-contrast-syntax.showWrapGuide')).toBe("ifWrapping");
					expect(editor.config.get('editor.softWrapAtPreferredLineLength')).toBe(true);
					expect(editor.config.get('editor.softWrap')).toBe(false);
					expect(editor.config.get('wrap-guide.enabled')).toBe(false);
				});
			});
		});
	});
});