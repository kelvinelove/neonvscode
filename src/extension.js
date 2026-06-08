const path = require('path');
const fs = require('fs');
const vscode = require('vscode');

const SCRIPT_TAG = 'neon-glow.js';
const EXTENSION_ID = 'kelvinelove.neonvscode';

const messages = {
  ACTIVATED: 'Neon effects initialized! Restart VS Code to see the glow. Note: You may see an "Unsupported" warning—this is a standard VS Code notification for custom UI styles. Use the "Fix VSCode Checksums" extension to hide it.',
  DEACTIVATED: 'Neon glow disabled. Reload the window to apply.',
  REACTIVATED: 'Neon glow settings updated. Reload to apply.',
  NOT_RUNNING: 'Neon glow is not enabled.',
  ERROR_ACCESS_DENIED: 'Unable to modify VS Code core files. Try running with admin privileges.',
  ERROR_WORKBENCH_NOT_FOUND: 'Could not find the workbench HTML file. Please open an issue on GitHub.',
  ERROR_GENERIC: 'Something went wrong while enabling neon glow.',
  PROMPT_ENABLE: 'NeonVSCode theme is active. Enable the neon glow effect? (one-time setup)'
};

let statusBarItem;

function resolveWorkbenchPaths(base) {
  const electronBaseCandidates = ['electron-browser', 'electron-sandbox'];
  const htmlCandidates = ['workbench.esm.html', 'workbench.html'];

  for (const electronBase of electronBaseCandidates) {
    for (const htmlFile of htmlCandidates) {
      if (fs.existsSync(path.join(base, electronBase, 'workbench', htmlFile))) {
        return [electronBase, htmlFile];
      }
    }
  }
  return null;
}

function getWorkbenchPaths() {
  const appDir = path.dirname(vscode.env.appRoot);
  const base = path.join(appDir, 'app', 'out', 'vs', 'code');
  const workbenchPaths = resolveWorkbenchPaths(base);
  if (!workbenchPaths) {
    return null;
  }
  const [electronBase, workBenchFilename] = workbenchPaths;
  return {
    base,
    electronBase,
    htmlFile: path.join(base, electronBase, 'workbench', workBenchFilename),
    templateFile: path.join(base, electronBase, 'workbench', SCRIPT_TAG)
  };
}

function writeGlowScript(context, disableGlow) {
  const jsTemplate = fs.readFileSync(
    path.join(context.extensionPath, 'src', 'js', 'neon-glow-template.js'),
    'utf-8'
  );
  const finalScript = jsTemplate.replace(/\[DISABLE_GLOW\]/g, disableGlow ? 'true' : 'false');
  const paths = getWorkbenchPaths();
  fs.writeFileSync(paths.templateFile, finalScript, 'utf-8');
}

function isGlowEnabled(html) {
  return html.includes(SCRIPT_TAG);
}

function injectScript(html) {
  if (isGlowEnabled(html)) {
    return null;
  }
  return html.replace(/<\/html>/i, `  <script src="${SCRIPT_TAG}"></script>\n</html>`);
}

function removeScript(html) {
  const re = new RegExp(`^.*(<script src="${SCRIPT_TAG}"><\\/script>).*$\\n?`, 'mg');
  return html.replace(re, '');
}

function enableGlow(context) {
  const paths = getWorkbenchPaths();
  if (!paths) {
    vscode.window.showErrorMessage(messages.ERROR_WORKBENCH_NOT_FOUND);
    return;
  }

  const config = vscode.workspace.getConfiguration('neonvscode');
  const disableGlow = config.get('disableGlow', false);

  try {
    writeGlowScript(context, disableGlow);

    const html = fs.readFileSync(paths.htmlFile, 'utf-8');
    if (isGlowEnabled(html)) {
      vscode.window
        .showInformationMessage(messages.REACTIVATED, 'Reload')
        .then((choice) => {
          if (choice === 'Reload') {
            vscode.commands.executeCommand('workbench.action.reloadWindow');
          }
        });
      return;
    }

    const output = injectScript(html);
    fs.writeFileSync(paths.htmlFile, output, 'utf-8');
    updateStatusBarItem();

    vscode.window
      .showInformationMessage(messages.ACTIVATED, 'Reload')
      .then((choice) => {
        if (choice === 'Reload') {
          vscode.commands.executeCommand('workbench.action.reloadWindow');
        }
      });
  } catch (error) {
    updateStatusBarItem();
    if (/ENOENT|EACCES|EPERM/.test(error.code)) {
      vscode.window.showErrorMessage(messages.ERROR_ACCESS_DENIED);
    } else {
      vscode.window.showErrorMessage(messages.ERROR_GENERIC);
      console.error(error);
    }
  }
}

function disableGlow() {
  const paths = getWorkbenchPaths();
  if (!paths) {
    vscode.window.showErrorMessage(messages.ERROR_WORKBENCH_NOT_FOUND);
    return;
  }

  try {
    const html = fs.readFileSync(paths.htmlFile, 'utf-8');
    if (!isGlowEnabled(html)) {
      vscode.window.showInformationMessage(messages.NOT_RUNNING);
      return;
    }

    fs.writeFileSync(paths.htmlFile, removeScript(html), 'utf-8');
    updateStatusBarItem();

    if (fs.existsSync(paths.templateFile)) {
      fs.unlinkSync(paths.templateFile);
    }

    vscode.window
      .showInformationMessage(messages.DEACTIVATED, 'Reload')
      .then((choice) => {
        if (choice === 'Reload') {
          vscode.commands.executeCommand('workbench.action.reloadWindow');
        }
      });
  } catch (error) {
    updateStatusBarItem();
    if (/ENOENT|EACCES|EPERM/.test(error.code)) {
      vscode.window.showErrorMessage(messages.ERROR_ACCESS_DENIED);
    } else {
      vscode.window.showErrorMessage(messages.ERROR_GENERIC);
      console.error(error);
    }
  }
}

function isNeonThemeActive() {
  const config = vscode.workspace.getConfiguration('workbench');
  const theme = config.get('colorTheme', '');
  return typeof theme === 'string' && theme.toLowerCase().includes('neonvscode');
}

function maybePromptForGlow(context) {
  const paths = getWorkbenchPaths();
  if (!paths) {
    return;
  }

  let html = '';
  try {
    html = fs.readFileSync(paths.htmlFile, 'utf-8');
  } catch {
    return;
  }

  if (isNeonThemeActive() && !isGlowEnabled(html)) {
    vscode.window
      .showInformationMessage(messages.PROMPT_ENABLE, 'Enable Glow', 'Not Now')
      .then((choice) => {
        if (choice === 'Enable Glow') {
          enableGlow(context);
        }
      });
  }
}

function toggleGlow(context) {
  const paths = getWorkbenchPaths();
  if (!paths) return;
  try {
    const html = fs.readFileSync(paths.htmlFile, 'utf-8');
    if (isGlowEnabled(html)) {
      disableGlow();
    } else {
      enableGlow(context);
    }
  } catch (e) {
    console.error(e);
  }
}

function updateStatusBarItem() {
  if (!statusBarItem) {
    statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    statusBarItem.command = 'neonvscode.toggleGlow';
  }

  const paths = getWorkbenchPaths();
  const isThemeActive = isNeonThemeActive();

  // Show status bar item if the theme is active OR if the glow script is currently injected
  const hasInjectedScript = paths && fs.existsSync(paths.htmlFile) && isGlowEnabled(fs.readFileSync(paths.htmlFile, 'utf-8'));

  if (isThemeActive || hasInjectedScript) {
    try {
      const html = fs.readFileSync(paths.htmlFile, 'utf-8');
      const enabled = isGlowEnabled(html);
      statusBarItem.text = enabled ? "$(zap) Neon: On" : "$(zap) Neon: Off";
      statusBarItem.tooltip = enabled ? "NeonVSCode: Click to disable neon glow" : "NeonVSCode: Click to enable neon glow";
      statusBarItem.show();
    } catch {
      statusBarItem.hide();
    }
  } else {
    statusBarItem.hide();
  }
}

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  context.subscriptions.push(
    vscode.commands.registerCommand('neonvscode.enableGlow', () => enableGlow(context)),
    vscode.commands.registerCommand('neonvscode.disableGlow', () => disableGlow()),
    vscode.commands.registerCommand('neonvscode.toggleGlow', () => toggleGlow(context)),
    vscode.workspace.onDidChangeConfiguration((event) => {
      if (event.affectsConfiguration('workbench.colorTheme')) {
        maybePromptForGlow(context);
        updateStatusBarItem();
      }
      if (event.affectsConfiguration('neonvscode.disableGlow')) {
        const paths = getWorkbenchPaths();
        if (paths) {
          try {
            const html = fs.readFileSync(paths.htmlFile, 'utf-8');
            if (isGlowEnabled(html)) {
              writeGlowScript(context, vscode.workspace.getConfiguration('neonvscode').get('disableGlow', false));
              vscode.window.showInformationMessage(messages.REACTIVATED, 'Reload').then(choice => {
                if (choice === 'Reload') vscode.commands.executeCommand('workbench.action.reloadWindow');
              });
            }
          } catch (e) {}
        }
      }
    })
  );

  maybePromptForGlow(context);
  updateStatusBarItem();
}

function deactivate() {}

module.exports = { activate, deactivate };
