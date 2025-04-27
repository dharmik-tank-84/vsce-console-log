"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = require("vscode");
// Global variables
let count = 1;
const emojis = [
    "😊",
    "😂",
    "🔥",
    "🚀",
    "🌟",
    "💥",
    "🎯",
    "🥇",
    "⚡",
    "🌈",
    "🎉",
    "✨",
    "💡",
    "💻",
    "📚",
    "🎵",
    "🎨",
    "🏆",
    "🌍",
    "🌙",
    "☀️",
    "🍀",
    "🍎",
    "🍕",
    "🎁",
]; // Expanded to 25 emojis
function activate(context) {
    const disposable = vscode.commands.registerCommand("extension.insertInfiniteConsoleLog", () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage("No active editor found!");
            return;
        }
        const interval = setInterval(() => {
            const activeEditor = vscode.window.activeTextEditor;
            if (!activeEditor || activeEditor !== editor) {
                clearInterval(interval);
                vscode.window.showInformationMessage("Infinite console.log stopped.");
                return;
            }
            const emoji = emojis[(count - 1) % emojis.length]; // Repeat emojis after list finishes
            const logStatement = `console.log("${emoji} == ${count} == message ${count}");\n`;
            activeEditor.edit((editBuilder) => {
                const position = activeEditor.selection.active;
                editBuilder.insert(position, logStatement);
            });
            count++; // Increase the counter
        }, 1000); // Insert every 1 second
        vscode.window.showInformationMessage("Infinite console.log started! Switch editors or close the editor to stop.");
    });
    context.subscriptions.push(disposable);
}
function deactivate() { }
