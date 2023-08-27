import React from 'react';
import {getMergeSortAnimations, getQuickSortAnimations,animateQuickSort, animateHeapSort, getHeapSortAnimations,getBubbleSortAnimations,animateBubbleSort,getSelectionSortAnimations,animateSelectionSort,getInsertionSortAnimations,animateInsertionSort } from '../sortingAlgorithms/sortingAlgorithms.js';
import './SortingVisualizer.css';

const ANIMATION_SPEED_MS = 1;
const NUMBER_OF_ARRAY_BARS = 64;
const PRIMARY_COLOR = '#008B8B';
const SECONDARY_COLOR = 'red';


export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      array.push(randomIntFromInterval(1, 500));
    }
    this.setState({array});
  }

  mergeSort() {
    const animations = getMergeSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  quickSort() {
    const animations = getQuickSortAnimations(this.state.array);
    animateQuickSort(animations, 0);
  }

  heapSort() {
  const animations = getHeapSortAnimations(this.state.array);
  animateHeapSort(animations, 0);
  }

  bubbleSort() {
  const animations = getBubbleSortAnimations(this.state.array);
  animateBubbleSort(animations, 0);
  }

  selectionSort() {
  const animations = getSelectionSortAnimations(this.state.array);
  animateSelectionSort(animations, 0);
  }

  insertionSort() {
  const animations = getInsertionSortAnimations(this.state.array);
  animateInsertionSort(animations, 0);
}

  render() {
    const {array} = this.state;

    return (
      <div className="array-container">
        {array.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{
              backgroundColor: PRIMARY_COLOR,
              height: `${value}px`,
            }}></div>
        ))}
        <button onClick={() => this.resetArray()}><b>Generate New Array</b></button>
        <button onClick={() => this.mergeSort()}><b>Merge Sort</b></button>
        <button onClick={() => this.quickSort()}><b>Quick Sort</b></button>
        <button onClick={() => this.heapSort()}><b>Heap Sort</b></button>
        <button onClick={() => this.bubbleSort()}><b>Bubble Sort</b></button>
        <button onClick={() => this.selectionSort()}><b>Selection Sort</b></button>
        <button onClick={() => this.insertionSort()}><b>Insertion Sort</b></button>
      </div>
    );
  }
  
}
function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

