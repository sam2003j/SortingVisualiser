# Sorting Visualizer

Welcome to my Sorting Visualizer project documentation! You can check this website live on [SORTING_VISUALISER](https://sortingvisualizer20.netlify.app/).

## Table of Contents

- Introduction
- Getting Started
- Usage
- Sorting Algorithms
- CSS Styling


## INTRODUCTION
The Sorting Visualizer project is a React application that provides a visual representation of various sorting algorithms. You can use this tool to visualize how different sorting algorithms work and understand their sorting mechanisms.

## Getting Started
### Prerequisites
Before you begin, ensure you have the following installed:
- Node.js (at least version 12.x)
- npm or yarn
### Installation
- Clone this repository
```markdown
git clone https://github.com/your-username/sorting-visualizer.git
```
- Navigate to the project directory:
```markdown
cd sorting-visualizer
```
- Instal dependencies
```markdown
npm install
```
## Usage
### Components
The main component of the application is the SortingVisualizer component. This component renders an array of bars that represent the data to be sorted. Buttons are provided to trigger various sorting algorithms.

### Methods
- resetArray(): Generates a new random array of values.
- mergeSort(): Initiates the merge sort visualization.
- quickSort(): Initiates the quick sort visualization.
- heapSort(): Initiates the heap sort visualization.
- bubbleSort(): Initiates the bubble sort visualization.
- selectionSort(): Initiates the selection sort visualization.
- insertionSort(): Initiates the insertion sort visualization.

## Sorting Algorithms
- Merge Sort: The merge sort algorithm divides the array into smaller subarrays, sorts them, and then merges them back together.
- Quick Sort: The quick sort algorithm partitions the array into two subarrays, recursively sorts them, and combines them.
- Heap Sort: The heap sort algorithm treats the array as a binary heap and repeatedly extracts the maximum element.
- Bubble Sort: The bubble sort algorithm repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order.
- Selection Sort: The selection sort algorithm repeatedly selects the smallest (or largest) element from the unsorted part of the array and places it into the sorted part.
- Insertion Sort: The insertion sort algorithm builds the final sorted array one item at a time by inserting elements in their correct positions.

## CSS Styling
The CSS styling for the application is defined in the SortingVisualizer.css file. It includes styling for the array bars and buttons used in the visualization.
