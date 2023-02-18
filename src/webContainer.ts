import {WebContainer} from "@webcontainer/api";
import {files} from "./files";

export let webcontainerInstance: WebContainer;

async function installDependencies() {
    // Install dependencies
    const installProcess = await webcontainerInstance.spawn('npm', ['install']);

    installProcess.output.pipeTo(new WritableStream({
        write(data) {
            console.log(data);
        }
    }))
    // Wait for install command to exit
    return installProcess.exit;
}



window.addEventListener('load', async () => {
    // Call only once
    webcontainerInstance = await WebContainer.boot();
    await webcontainerInstance.mount(files);

    const exitCode = await installDependencies();
    if (exitCode !== 0) {
        throw new Error('Installation failed');
    };

    await webcontainerInstance.spawn('npm', ['run', 'start']);

    const iframe: HTMLIFrameElement = document.querySelector('#test-frame')!
    webcontainerInstance.on('server-ready', (port, url) => {
        iframe.src = url;
    });

});
