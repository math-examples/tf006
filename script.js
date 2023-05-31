/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */

// <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs"> </script>
// <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-vis"></script>

//import * as tf from 'https://math-examples.github.io/tf004/tfjs';
//import * as tfvis from 'https://math-examples.github.io/tf004/tfjs-vis'
//import {getModel, loadData} from 'https://math-examples.github.io/tf004/model.js';

try {
      window.tf = tf;
window.tfvis = tfvis;

window.data;
window.model;
    } catch (e) {
        alert(e.message);
    }


async function minitData(s1, s2) {
  window.data = await loadData(s1, s2);
}

function initModel() {
  window.model = getModel();
}

var mMNIST_IMAGES_SPRITE_PATH = '';
var mMNIST_LABELS_PATH = '';

const myLoad = async (e) => {
      document.querySelector('#load-data').innerHTML = 'Loading...';
    await minitData(mMNIST_IMAGES_SPRITE_PATH, mMNIST_LABELS_PATH);
    document.querySelector('#show-examples').disabled = false;
    document.querySelector('#start-training-1').disabled = false;
    document.querySelector('#start-training-2').disabled = false;
    document.querySelector('#start-training-3').disabled = false;
    document.querySelector('#load-data').disabled = true;
}

function getUrl(){

const cb2 =  (files)=>{

let urls = [];

// Store promises in array
for(let i = 0;i < files.length;i++){
urls.push(readFileAsUrl(files[i]));
}
                
// Trigger Promises
Promise.all(urls).then((values) => { mMNIST_LABELS_PATH = values[0];  
myLoad();});
};


const show2 = () => showCB('Get file mnist_labels_uint8 from server?', 'Yes', 'No, choose from local.', myLoad, cb2);

const cb1 =  (files)=>{
let urls = [];

// Store promises in array
for(let i = 0;i < files.length;i++){
urls.push(readFileAsUrl(files[i]));
}

// Trigger Promises
Promise.all(urls).then((values) => {
if(mMNIST_IMAGES_SPRITE_PATH==''){ // for bug
    mMNIST_IMAGES_SPRITE_PATH = values[0];  
    show2();
}
});
};

showCB('Get file mnist_images.png from server?', 'Yes', 'No, choose from local.', show2, cb1);

}

function setupListeners() {
    //alert("22");
  document.querySelector('#show-visor').addEventListener('click', () => {
    const visorInstance = tfvis.visor();
    if (!visorInstance.isOpen()) {
      visorInstance.toggle();
    }
  });

  document.querySelector('#make-first-surface')
      .addEventListener('click', () => {
        tfvis.visor().surface({name: 'My First Surface', tab: 'Input Data'});
      });

  document.querySelector('#load-data').addEventListener('click', (e)=> getUrl());
}

//alert(1);
initModel();
setupListeners();
