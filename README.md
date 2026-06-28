# 🖥 NeonVSCode

**Tokyo Nights, OLED Blacks, and Neon Glow.**

[NeonVSCode]([url](https://marketplace.visualstudio.com/items?itemName=kelvinelove.neonvscode)) is a high-contrast, vibrant dark theme for Visual Studio Code. Originally born as the popular NeonCode theme for Adobe Brackets, it has been completely rebuilt for VS Code with **True OLED Black (#000000)** optimization and modernized syntax highlighting.

## ✨ Features

*   **True OLED Black:** Backgrounds are set to `#000000` for infinite contrast on OLED and LED displays.
*   **Vibrant Neon Palette:** Electric blues, purples, and cyans inspired by cyberpunk aesthetics.
*   **Highly Readable:** Despite the neon aesthetic, colors are carefully picked to maintain high legibility during long coding sessions.
*   **Semantic Highlighting:** Fully supports modern VS Code semantic tokens for a more accurate coding experience.

## 📸 Preview

![NeonVSCode Full Effect](https://github.com/user-attachments/assets/6d55e983-394b-40e4-888b-9ffd7f816cbd)
*The theme in full effect with Neon Glow enabled.*

## � Installation

1. Open **Visual Studio Code**.
2. Go to **View > Extensions**.
3. Search for `NeonVSCode`.
4. Click **Install**.
5. Go to **File > Preferences > Theme > Color Theme** and select **NeonVSCode**.

![Theme Activated](https://github.com/user-attachments/assets/046f2b08-5a24-43a4-a299-5d2de2793c73)
*NeonVSCode standard UI after activation.*

## ⌨️ Commands & Configuration

This theme includes built-in commands to manage the neon aesthetic:

### To enable the glow

1. Open the **Command Palette** (`Ctrl+Shift+P` / `Cmd+Shift+P`)
2. Type and run: **`NeonVSCode: Enable Neon Glow`**
3. Click **Reload** when prompted — VS Code will restart with the glow active

> The ⚡️ **Neon: On/Off** button in the Status Bar (bottom right) is a one-click shortcut to toggle glow at any time.

### To customize glow brightness

Add the following to your `settings.json`:

```json
"neonvscode.glowBrightness": 0.65
```

- Range: `0.0` (transparent / no glow) → `1.0` (full brightness)
- Default is `0.65` — a carefully tuned value that avoids eye strain during long sessions
- Glow adds a soft visual highlight that enhances the theme’s neon atmosphere while keeping text readable and comfortable.
- **After changing this value**, re-run **`NeonVSCode: Enable Neon Glow`** from the Command Palette to apply the new brightness

### To disable glow but keep the theme

Add to your `settings.json`:

```json
"neonvscode.disableGlow": true
```

Then re-run **`NeonVSCode: Enable Neon Glow`** to apply, or run **`NeonVSCode: Disable Neon Glow`** to remove the glow script entirely.

### To remove the corruption warning

Because NeonVSCode modifies internal VS Code files to inject the glow script, VS Code may display an **"Unsupported"** or **"Your installation appears to be corrupt"** notification. **This is completely normal** — the same behaviour occurs with SynthWave '84 and other UI-modifying themes.

To permanently remove this warning:

1. Install the **[Fix VSCode Checksums](https://marketplace.visualstudio.com/items?itemName=lehni.vscode-fix-checksums)** extension
2. Run **`Fix Checksums: Apply`** from the Command Palette
3. Fully restart VS Code

You can safely dismiss the warning at any time; it does not affect stability or functionality.

## 📸 Screenshots

| Language | Preview |
| :--- | :--- |
| **JavaScript** | *Included in main preview* |
| **Python** | *Coming soon* |
| **HTML** | *Included in main preview* |

## 🛠 Compatibility

NeonVSCode is compatible with:
*   Visual Studio Code v1.74.0+
*   VSCodium
*   GitHub Codespaces
*   Cursor-based editors that support VS Code themes
*   Antigravity coding environments (just kidding, but it looks that good!)

## 📄 License

This project is licensed under the MIT License.
