(function () {
  const tokenReplacements = {
    'f6acff': "color: #f6acff; text-shadow: 1px 1px 8px #ee17f2, 1px -1px 8px #ee17f2, -1px 1px 8px #ee17f2, -1px -1px 8px #ee17f2; backface-visibility: hidden;",
    '4848ff': "color: #4848ff; text-shadow: 1px 1px 8px #0000d3, 1px -1px 8px #0000d3, -1px 1px 8px #0000d3, -1px -1px 8px #0000d3; backface-visibility: hidden;",
    'ffffa9': "color: #ffffa9; text-shadow: 1px 1px 8px #cccc0a, 1px -1px 8px #cccc0a, -1px 1px 8px #cccc0a, -1px -1px 8px #cccc0a; backface-visibility: hidden;",
    '9cddfa': "color: #9cddfa; text-shadow: 1px 1px 8px #00b89d, 1px -1px 8px #00b89d, -1px 1px 8px #00b89d, -1px -1px 8px #00b89d; backface-visibility: hidden;",
    '6efcaa': "color: #6efcaa; text-shadow: 1px 1px 8px #00840b, 1px -1px 8px #00840b, -1px 1px 8px #00840b, -1px -1px 8px #00840b; backface-visibility: hidden;",
    'ff3e3e': "color: #ff3e3e; text-shadow: 1px 1px 8px #e60000, 1px -1px 8px #e60000, -1px 1px 8px #e60000, -1px -1px 8px #e60000; backface-visibility: hidden;",
    'ffffff': "color: #ffffff; text-shadow: 1px 1px 8px #d6d6d6, 1px -1px 8px #d6d6d6, -1px 1px 8px #d6d6d6, -1px -1px 8px #d6d6d6; backface-visibility: hidden;",
    'fa7fd9': "color: #fa7fd9; text-shadow: 1px 1px 8px #a6439b, 1px -1px 8px #a6439b, -1px 1px 8px #a6439b, -1px -1px 8px #a6439b; backface-visibility: hidden;",
    'd0a74c': "color: #d0a74c; text-shadow: 1px 1px 8px #b68518, 1px -1px 8px #b68518, -1px 1px 8px #b68518, -1px -1px 8px #b68518; backface-visibility: hidden;",
    'fd55d7': "color: #fd55d7; text-shadow: 1px 1px 8px #e62fde, 1px -1px 8px #e62fde, -1px 1px 8px #e62fde, -1px -1px 8px #e62fde; backface-visibility: hidden;",
    'd9b970': "color: #d9b970; text-shadow: 1px 1px 8px #c28d1a, 1px -1px 8px #c28d1a, -1px 1px 8px #c28d1a, -1px -1px 8px #c28d1a; backface-visibility: hidden;",
    'cccccc': "color: #cccccc; text-shadow: 1px 1px 8px #aaaaaa, 1px -1px 8px #aaaaaa, -1px 1px 8px #aaaaaa, -1px -1px 8px #aaaaaa; backface-visibility: hidden;"
  };

  const extraStyles = `
    .monaco-editor .margin-view-overlays .line-numbers,
    .monaco-editor .margin-view-overlays .line-numbers.active-line-number,
    .monaco-editor .view-line span.mtkw,
    .monaco-editor .view-line span.mtkcontrol {
      text-shadow: none !important;
    }
    .monaco-editor .bracket-match {
      box-shadow: 1px 1px 8px #a6439b, 1px -1px 8px #a6439b, -1px 1px 8px #a6439b, -1px -1px 8px #a6439b !important;
    }
  `;

  const themeStylesExist = (tokensEl, replacements) => {
    return tokensEl.innerText !== '' &&
      Object.keys(replacements).some(color =>
        tokensEl.innerText.toLowerCase().includes(`#${color}`)
      );
  };

  const replaceTokens = (styles, replacements) =>
    Object.keys(replacements).reduce((acc, color) => {
      const re = new RegExp(`color:\\s*#${color}\\s*;`, 'gi');
      return acc.replace(re, replacements[color]);
    }, styles);

  const usingNeonVSCode = () => {
    const appliedTheme = document.querySelector('[class*="theme-json"]');
    const neonTheme = document.querySelector('[class*="kelvinelove-neonvscode"]');
    return appliedTheme && neonTheme;
  };

  const readyForReplacement = (tokensEl, replacements) =>
    tokensEl ? usingNeonVSCode() && themeStylesExist(tokensEl, replacements) : false;

  const initNeonGlow = (disableGlow, obs) => {
    const tokensEl = document.querySelector('.vscode-tokens-styles');
    if (!tokensEl || !readyForReplacement(tokensEl, tokenReplacements)) {
      return;
    }

    if (!document.querySelector('#neonvscode-glow-styles')) {
      const initialThemeStyles = tokensEl.innerText;
      let updatedThemeStyles = !disableGlow
        ? replaceTokens(initialThemeStyles, tokenReplacements)
        : initialThemeStyles;

      updatedThemeStyles = `${updatedThemeStyles}${extraStyles}`;

      const newStyleTag = document.createElement('style');
      newStyleTag.setAttribute('id', 'neonvscode-glow-styles');
      newStyleTag.innerText = updatedThemeStyles.replace(/(\r\n|\n|\r)/gm, '');
      document.body.appendChild(newStyleTag);
    }

    if (obs) {
      obs.disconnect();
      obs = null;
    }
  };

  const watchForBootstrap = function (mutationsList, observer) {
    for (const mutation of mutationsList) {
      if (mutation.type === 'attributes' || mutation.type === 'childList') {
        const tokensEl = document.querySelector('.vscode-tokens-styles');
        if (readyForReplacement(tokensEl, tokenReplacements)) {
          initNeonGlow([DISABLE_GLOW], observer);
        } else if (tokensEl) {
          observer.disconnect();
          observer.observe(tokensEl, { childList: true });
        }
      }
    }
  };

  const bodyNode = document.querySelector('body');
  const observer = new MutationObserver(watchForBootstrap);
  observer.observe(bodyNode, { attributes: true, childList: true });
})();
