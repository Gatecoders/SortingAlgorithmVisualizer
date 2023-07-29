let array = [];
const arrayContainer = document.getElementById('arrayContainer');
const algorithmSelect = document.getElementById('algorithmSelect');
const arraySizeInput = document.getElementById('arraySize');
const minValueInput = document.getElementById('minValue');
const maxValueInput = document.getElementById('maxValue');

function generateRandomArray() {
    const size = parseInt(arraySizeInput.value);
    const min = parseInt(minValueInput.value);
    const max = parseInt(maxValueInput.value);

    array = [];
    for (let i = 0; i < size; i++) {
        array.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    displayArray();
}

function displayArray() {
    arrayContainer.innerHTML = '';
    for (let i = 0; i < array.length; i++) {
        const bar = document.createElement('div');
        bar.className = 'array-bar';
        bar.style.height = array[i] + 'px';
        arrayContainer.appendChild(bar);
    }
}

function swap(index1, index2) {
    const temp = array[index1];
    array[index1] = array[index2];
    array[index2] = temp;
}

async function bubbleSort() {
    const n = array.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                swap(j, j + 1);
                displayArray();
                await new Promise((resolve) => setTimeout(resolve, 200));
            }
        }
    }
}

async function insertionSort() {
    const n = array.length;
    for (let i = 1; i < n; i++) {
        let key = array[i];
        let j = i - 1;

        while (j >= 0 && array[j] > key) {
            array[j + 1] = array[j];
            j--;
            displayArray();
            await new Promise((resolve) => setTimeout(resolve, 200));
        }
        array[j + 1] = key;
        displayArray();
        await new Promise((resolve) => setTimeout(resolve, 200));
    }
}

async function mergeSort(start, end) {
    if (start < end) {
        const mid = Math.floor((start + end) / 2);
        await mergeSort(start, mid);
        await mergeSort(mid + 1, end);
        await merge(start, mid, end);
    }
}

async function merge(start, mid, end) {
    const n1 = mid - start + 1;
    const n2 = end - mid;

    let leftArray = new Array(n1);
    let rightArray = new Array(n2);

    for (let i = 0; i < n1; i++) {
        leftArray[i] = array[start + i];
    }
    for (let j = 0; j < n2; j++) {
        rightArray[j] = array[mid + 1 + j];
    }

    let i = 0;
    let j = 0;
    let k = start;

    while (i < n1 && j < n2) {
        if (leftArray[i] <= rightArray[j]) {
            array[k] = leftArray[i];
            i++;
        } else {
            array[k] = rightArray[j];
            j++;
        }
        k++;
        displayArray();
        await new Promise((resolve) => setTimeout(resolve, 200));
    }

    while (i < n1) {
        array[k] = leftArray[i];
        i++;
        k++;
        displayArray();
        await new Promise((resolve) => setTimeout(resolve, 200));
    }

    while (j < n2) {
        array[k] = rightArray[j];
        j++;
        k++;
        displayArray();
        await new Promise((resolve) => setTimeout(resolve, 200));
    }
}

async function quickSort(low, high) {
    if (low < high) {
        let pi = await partition(low, high);
        await quickSort(low, pi - 1);
        await quickSort(pi + 1, high);
    }
}

async function partition(low, high) {
    let pivot = array[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
        if (array[j] < pivot) {
            i++;
            swap(i, j);
            displayArray();
            await new Promise((resolve) => setTimeout(resolve, 200));
        }
    }
    swap(i + 1, high);
    displayArray();
    await new Promise((resolve) => setTimeout(resolve, 200));
    return i + 1;
}

async function startSorting() {
    const algorithm = algorithmSelect.value;
    if (algorithm === 'bubble') {
        await bubbleSort();
    } else if (algorithm === 'insertion') {
        await insertionSort();
    } else if (algorithm === 'merge') {
        await mergeSort(0, array.length - 1);
    } else if (algorithm === 'quick') {
        await quickSort(0, array.length - 1);
    }
}
