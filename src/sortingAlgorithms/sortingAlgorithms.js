const ANIMATION_SPEED_MS = 1;
const PRIMARY_COLOR = '#008B8B';
const SECONDARY_COLOR = 'red';

//MERGE
export function getMergeSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
}
function mergeSortHelper(mainArray, startIdx, endIdx, auxiliaryArray, animations,) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}
function doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations,) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  while (i <= middleIdx && j <= endIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, j]);
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      // We overwrite the value at index k in the original array with the
      // value at index i in the auxiliary array.
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      // We overwrite the value at index k in the original array with the
      // value at index j in the auxiliary array.
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, i]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, i]);
    // We overwrite the value at index k in the original array with the
    // value at index i in the auxiliary array.
    animations.push([k, auxiliaryArray[i]]);
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([j, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([j, j]);
    // We overwrite the value at index k in the original array with the
    // value at index j in the auxiliary array.
    animations.push([k, auxiliaryArray[j]]);
    mainArray[k++] = auxiliaryArray[j++];
  }
}

//QUICK
export function animateQuickSort(animations, currentStep) {
  if (currentStep === animations.length) return;

  const arrayBars = document.getElementsByClassName('array-bar');
  const [pivotIdx, leftIdx, rightIdx] = animations[currentStep];

  // Highlight the elements being compared
  arrayBars[pivotIdx].style.backgroundColor = SECONDARY_COLOR;
  arrayBars[leftIdx].style.backgroundColor = SECONDARY_COLOR;
  arrayBars[rightIdx].style.backgroundColor = SECONDARY_COLOR;

  // Perform a swap if needed
  if (leftIdx < rightIdx) {
    setTimeout(() => {
      const tempHeight = arrayBars[leftIdx].style.height;
      arrayBars[leftIdx].style.height = arrayBars[rightIdx].style.height;
      arrayBars[rightIdx].style.height = tempHeight;

      // Revert color after swapping
      arrayBars[pivotIdx].style.backgroundColor = PRIMARY_COLOR;
      arrayBars[leftIdx].style.backgroundColor = PRIMARY_COLOR;
      arrayBars[rightIdx].style.backgroundColor = PRIMARY_COLOR;
      
      animateQuickSort(animations, currentStep + 1); // Move to the next step
    }, ANIMATION_SPEED_MS);
  } else {
    // Revert color without swapping
    arrayBars[pivotIdx].style.backgroundColor = PRIMARY_COLOR;
    arrayBars[leftIdx].style.backgroundColor = PRIMARY_COLOR;
    arrayBars[rightIdx].style.backgroundColor = PRIMARY_COLOR;
    
    animateQuickSort(animations, currentStep + 1); // Move to the next step
  }
}
export function getQuickSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;

  const auxiliaryArray = array.slice();
  quickSortHelper(auxiliaryArray, 0, array.length - 1, animations);

  return animations;
}
function quickSortHelper(array, low, high, animations) {
  if (low < high) {
    const pivotIdx = partition(array, low, high, animations);
    quickSortHelper(array, low, pivotIdx - 1, animations);
    quickSortHelper(array, pivotIdx + 1, high, animations);
  }
}
function partition(array, low, high, animations) {
  const pivot = array[high];
  let i = low - 1;

  for (let j = low; j < high; j++) {
    if (array[j] < pivot) {
      i++;
      animations.push([high, i, j]); // Highlight elements being compared
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }

  animations.push([high, i + 1, high]); // Highlight elements for swap
  const temp = array[i + 1];
  array[i + 1] = array[high];
  array[high] = temp;

  return i + 1;
}

//HEAP
export function animateHeapSort(animations, currentStep) {
  if (currentStep === animations.length) return;

  const arrayBars = document.getElementsByClassName('array-bar');
  const [idx1, idx2] = animations[currentStep];

  // Highlight the elements being compared
  arrayBars[idx1].style.backgroundColor = SECONDARY_COLOR;
  arrayBars[idx2].style.backgroundColor = SECONDARY_COLOR;

  setTimeout(() => {
    const tempHeight = arrayBars[idx1].style.height;
    arrayBars[idx1].style.height = arrayBars[idx2].style.height;
    arrayBars[idx2].style.height = tempHeight;

    // Revert color after swapping
    arrayBars[idx1].style.backgroundColor = PRIMARY_COLOR;
    arrayBars[idx2].style.backgroundColor = PRIMARY_COLOR;

    animateHeapSort(animations, currentStep + 1); // Move to the next step
  }, ANIMATION_SPEED_MS);
}
function heapSort(array) {
  const animations = [];
  const n = array.length;

  // Build a max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    siftDown(array, i, n, animations);
  }

  // Extract elements from the heap one by one
  for (let i = n - 1; i > 0; i--) {
    animations.push([0, i]); // Highlight elements being compared
    const temp = array[0];
    array[0] = array[i];
    array[i] = temp;

    siftDown(array, 0, i, animations);
  }

  return animations;
}
function siftDown(array, i, n, animations) {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;

  if (left < n && array[left] > array[largest]) {
    largest = left;
  }

  if (right < n && array[right] > array[largest]) {
    largest = right;
  }

  if (largest !== i) {
    animations.push([i, largest]); // Highlight elements being compared
    const temp = array[i];
    array[i] = array[largest];
    array[largest] = temp;

    siftDown(array, largest, n, animations);
  }
}
export function getHeapSortAnimations(array) {
  const animations = heapSort(array.slice());
  return animations;
}

//Bubble
export function animateBubbleSort(animations, currentStep) {
  if (currentStep === animations.length) return;

  const arrayBars = document.getElementsByClassName('array-bar');
  const [idx1, idx2, isSwap] = animations[currentStep];

  // Highlight the elements being compared
  arrayBars[idx1].style.backgroundColor = SECONDARY_COLOR;
  arrayBars[idx2].style.backgroundColor = SECONDARY_COLOR;

  setTimeout(() => {
    if (isSwap) {
      const tempHeight = arrayBars[idx1].style.height;
      arrayBars[idx1].style.height = arrayBars[idx2].style.height;
      arrayBars[idx2].style.height = tempHeight;
    }

    // Revert color after comparison or swap
    arrayBars[idx1].style.backgroundColor = PRIMARY_COLOR;
    arrayBars[idx2].style.backgroundColor = PRIMARY_COLOR;

    animateBubbleSort(animations, currentStep + 1); // Move to the next step
  }, ANIMATION_SPEED_MS);
}
export function getBubbleSortAnimations(array) {
  const animations = [];
  const n = array.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      animations.push([j, j + 1]); // Highlight elements being compared

      if (array[j] > array[j + 1]) {
        animations.push([j, j + 1, true]); // Highlight for swap
        const temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
      } else {
        animations.push([j, j + 1, false]); // No swap, just highlight
      }
    }
  }

  return animations;
}

//Selection
export function animateSelectionSort(animations, currentStep) {
  if (currentStep === animations.length) return;

  const arrayBars = document.getElementsByClassName('array-bar');
  const [minIdx, currIdx, isSwap] = animations[currentStep];

  // Highlight the elements being compared
  arrayBars[minIdx].style.backgroundColor = SECONDARY_COLOR;
  arrayBars[currIdx].style.backgroundColor = SECONDARY_COLOR;

  setTimeout(() => {
    if (isSwap) {
      const tempHeight = arrayBars[minIdx].style.height;
      arrayBars[minIdx].style.height = arrayBars[currIdx].style.height;
      arrayBars[currIdx].style.height = tempHeight;
    }

    // Revert color after comparison or swap
    arrayBars[minIdx].style.backgroundColor = PRIMARY_COLOR;
    arrayBars[currIdx].style.backgroundColor = PRIMARY_COLOR;

    animateSelectionSort(animations, currentStep + 1); // Move to the next step
  }, ANIMATION_SPEED_MS);
}
export function getSelectionSortAnimations(array) {
  const animations = [];
  const n = array.length;

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      animations.push([minIdx, j]); // Highlight elements being compared

      if (array[j] < array[minIdx]) {
        minIdx = j;
      }
    }

    animations.push([minIdx, i, true]); // Highlight for swap
    const temp = array[i];
    array[i] = array[minIdx];
    array[minIdx] = temp;
  }

  return animations;
}

//Insertion
export function getInsertionSortAnimations(array) {
  const animations = [];
  const n = array.length;

  for (let i = 1; i < n; i++) {
    const key = array[i];
    let j = i - 1;

    while (j >= 0 && array[j] > key) {
      animations.push([j, j + 1]); // Highlight elements being compared
      animations.push([j, j + 1, true]); // Highlight for swap

      array[j + 1] = array[j];
      j--;

      animations.push([j + 1, j + 1]); // Revert color after swap
    }

    array[j + 1] = key;
  }

  return animations;
}
export function animateInsertionSort(animations, currentStep) {
  if (currentStep === animations.length) return;

  const arrayBars = document.getElementsByClassName('array-bar');
  const [idx1, idx2, isSwap] = animations[currentStep];

  // Highlight the elements being compared
  arrayBars[idx1].style.backgroundColor = SECONDARY_COLOR;
  arrayBars[idx2].style.backgroundColor = SECONDARY_COLOR;

  setTimeout(() => {
    if (isSwap) {
      const tempHeight = arrayBars[idx1].style.height;
      arrayBars[idx1].style.height = arrayBars[idx2].style.height;
      arrayBars[idx2].style.height = tempHeight;
    }

    // Revert color after comparison or swap
    arrayBars[idx1].style.backgroundColor = PRIMARY_COLOR;
    arrayBars[idx2].style.backgroundColor = PRIMARY_COLOR;

    animateInsertionSort(animations, currentStep + 1); // Move to the next step
  }, ANIMATION_SPEED_MS);
}