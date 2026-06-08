# 🖥 NeonVSCode

**Tokyo Nights, OLED Blacks, and Neon Glow.**

NeonVSCode is a high-contrast, vibrant dark theme for Visual Studio Code. Originally born as the popular NeonCode theme for Adobe Brackets, it has been completely rebuilt for VS Code with **True OLED Black (#000000)** optimization and modernized syntax highlighting.

## ✨ Features

*   **True OLED Black:** Backgrounds are set to `#000000` for infinite contrast on OLED and LED displays.
*   **Vibrant Neon Palette:** Electric blues, purples, and cyans inspired by cyberpunk aesthetics.
*   **Highly Readable:** Despite the neon aesthetic, colors are carefully picked to maintain high legibility during long coding sessions.
*   **Semantic Highlighting:** Fully supports modern VS Code semantic tokens for a more accurate coding experience.

## 📸 Preview

![NeonVSCode Full Effect](https://private-user-images.githubusercontent.com/8897257/604616331-52fbf833-a821-4ddd-8c25-7efa5b0f0f98.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3ODA5NDMwNTcsIm5iZiI6MTc4MDk0Mjc1NywicGF0aCI6Ii84ODk3MjU3LzYwNDYxNjMzMS01MmZiZjgzMy1hODIxLTRkZGQtOGMyNS03ZWZhNWIwZjBmOTgucG5nP1gtQW16LUFsZ29yaXRobT1BV1M0LUhNQUMtU0hBMjU2JlgtQW16LUNyZWRlbnRpYWw9QUtJQVZDT0RZTFNBNTNQUUs0WkElMkYyMDI2MDYwOCUyRnVzLWVhc3QtMSUyRnMzJTJGYXdzNF9yZXF1ZXN0JlgtQW16LURhdGU9MjAyNjA2MDhUMTgxOTE3WiZYLUFtei1FeHBpcmVzPTMwMCZYLUFtei1TaWduYXR1cmU9NzI3MTJjOTkyMDIyZTBiMWU5ODQzN2FkOTk2MmNjMWFlZmI5MjM2YjA3ZmM4ZDQ1MTE3ZDliZmQzZTQ4ZjQ0NCZYLUFtei1TaWduZWRIZWFkZXJzPWhvc3QmcmVzcG9uc2UtY29udGVudC10eXBlPWltYWdlJTJGcG5nIn0.lENRoUQ9V81PMAW66IDZP0NuRIeutW5BFcrsDnKEO-c)
*The theme in full effect with Neon Glow enabled.*

## � Installation

1. Open **Visual Studio Code**.
2. Go to **View > Extensions**.
3. Search for `NeonVSCode`.
4. Click **Install**.
5. Go to **File > Preferences > Theme > Color Theme** and select **NeonVSCode**.

![Theme Activated](https://private-user-images.githubusercontent.com/8897257/604616368-3b56db78-6044-4084-b3f0-a605fb9d500f.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3ODA5NDMwNTcsIm5iZiI6MTc4MDk0Mjc1NywicGF0aCI6Ii84ODk3MjU3LzYwNDYxNjM2OC0zYjU2ZGI3OC02MDQ0LTQwODQtYjNmMC1hNjA1ZmI5ZDUwMGYucG5nP1gtQW16LUFsZ29yaXRobT1BV1M0LUhNQUMtU0hBMjU2JlgtQW16LUNyZWRlbnRpYWw9QUtJQVZDT0RZTFNBNTNQUUs0WkElMkYyMDI2MDYwOCUyRnVzLWVhc3QtMSUyRnMzJTJGYXdzNF9yZXF1ZXN0JlgtQW16LURhdGU9MjAyNjA2MDhUMTgxOTE3WiZYLUFtei1FeHBpcmVzPTMwMCZYLUFtei1TaWduYXR1cmU9MWRmMGMwOTM4YmY3ZWMxZGFkZGI5OGVkYzdiMTliYzQ3ZjNjNjNhYTI0MmE2YWQ2NTY2ODlkZGVlZGJmYzFlMyZYLUFtei1TaWduZWRIZWFkZXJzPWhvc3QmcmVzcG9uc2UtY29udGVudC10eXBlPWltYWdlJTJGcG5nIn0.FGGiYMuulNST1fxTlaZjBCvikQVJ15UrJgwaW0k1XmU)
*NeonVSCode standard UI after activation.*

## ⌨️ Commands & Configuration

This theme includes built-in commands to manage the neon aesthetic:

*   `NeonVSCode: Enable Neon Glow`: Activates enhanced glowing effects.
*   `NeonVSCode: Disable Neon Glow`: Reverts to a standard flat neon look.

**Pro Tip:** Look for the ⚡️ **Neon: On/Off** button in your Status Bar (bottom right) for a one-click toggle!

### ⚠️ Dealing with the "Unsupported" Warning
Because this extension modifies internal VS Code files to inject the neon glow script, VS Code may display a notification stating that your installation is "Unsupported" or "Corrupt". This is standard behavior for any extension that modifies the UI layer (like SynthWave '84). It is safe to ignore. To remove this warning and the "Unsupported" text in the title bar, we recommend installing the **Fix VSCode Checksums** extension.

### Settings
You can toggle the glow effect permanently in your `settings.json`:
```json
"neonvscode.disableGlow": false
```

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
