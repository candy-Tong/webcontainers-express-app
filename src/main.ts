import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { files } from './files';


import { WebContainer } from '@webcontainer/api';

let webcontainerInstance;

window.addEventListener('load', async () => {
    // Call only once
    webcontainerInstance = await WebContainer.boot();
    await webcontainerInstance.mount(files);
    const packageJSON = await webcontainerInstance.fs.readFile('package.json', 'utf-8');
    console.log(packageJSON);
});

createApp(App).mount('#app')
