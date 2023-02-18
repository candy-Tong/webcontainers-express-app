<script setup lang="ts">
import {ref} from 'vue'
import { files } from './files';
import {webcontainerInstance} from "./webContainer";

const textValue = ref(files['index.js'].file.contents);

async function onChange(){
  await webcontainerInstance.fs.writeFile('/index.js', textValue.value);
}
</script>

<template>
  <div class="container">
    <div class="editor">
      <textarea v-model="textValue" @change="onChange">I am a textarea</textarea>
    </div>
    <div class="preview">
      <iframe id="test-frame" src="./loading.html"></iframe>
    </div>
  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
}

.container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  height: 100%;
  width: 100%;
  margin-top: 30vh;
}

textarea {
  width: 100%;
  height: 100%;
  resize: none;
  border-radius: 0.5rem;
  background: black;
  color: white;
  padding: 0.5rem 1rem;
}

iframe {
  height: 100%;
  width: 100%;
  border-radius: 0.5rem;
}
</style>
