$(document).ready(function () {
// Get all real option labels (excluding no-design)
const realOptionLabels = Array.from(document.querySelectorAll(
    '.w-checkbox.submit-form_select-field'))
  .filter(label => !label.querySelector('#no-design'));

// Get the fake option label
const fakeOptionLabel = document.querySelector(
  '.w-checkbox.submit-form_select-field:has(#no-design)');

// Map labels to their corresponding elements
const realOptions = realOptionLabels.map(label => ({
  label: label,
  input: label.querySelector('input[type="checkbox"]'),
  customCheckbox: label.querySelector('.w-checkbox-input')
}));

const fakeOption = {
  label: fakeOptionLabel,
  input: fakeOptionLabel.querySelector('input[type="checkbox"]'),
  customCheckbox: fakeOptionLabel.querySelector('.w-checkbox-input')
};

// Function to handle the style update
const updateCustomCheckbox = (customCheckbox, isChecked) => {
  if (isChecked) {
    // If it has 'is-checked', replace it with 'w--redirected-checked'
    if (customCheckbox.classList.contains('is-checked')) {
      customCheckbox.classList.remove('is-checked');
    }
    customCheckbox.classList.add('w--redirected-checked');
  } else {
    // Remove both classes when unchecking
    customCheckbox.classList.remove('is-checked', 'w--redirected-checked');
  }
};

// Function to handle real option click
const handleRealOptionClick = (option, e) => {
  e.preventDefault();
  e.stopPropagation();

  option.input.checked = !option.input.checked;
  updateCustomCheckbox(option.customCheckbox, option.input.checked);

  if (option.input.checked) {
    fakeOption.input.checked = false;
    updateCustomCheckbox(fakeOption.customCheckbox, false);
  }
};

// Function to handle fake option click
const handleFakeOptionClick = (e) => {
  e.preventDefault();
  e.stopPropagation();

  fakeOption.input.checked = !fakeOption.input.checked;
  updateCustomCheckbox(fakeOption.customCheckbox, fakeOption.input.checked);

  if (fakeOption.input.checked) {
    realOptions.forEach(option => {
      option.input.checked = false;
      updateCustomCheckbox(option.customCheckbox, false);
    });
  }
};

// Add click handlers to real options
realOptions.forEach((option) => {
  // Handle clicks on the entire label
  option.label.addEventListener('click', (e) => handleRealOptionClick(option, e));
});

// Add click handler to fake option
fakeOption.label.addEventListener('click', handleFakeOptionClick);

// Initial state sync
realOptions.forEach(option => {
  updateCustomCheckbox(option.customCheckbox, option.input.checked);
});
updateCustomCheckbox(fakeOption.customCheckbox, fakeOption.input.checked);

// Debug logging
console.log('Initialized with:', {
  realOptions: realOptions.map(o => ({
    checked: o.input.checked,
    classes: o.customCheckbox.className
  })),
  fakeOption: {
    checked: fakeOption.input.checked,
    classes: fakeOption.customCheckbox.className
  }
});

// Select all elements with the specified attribute
const rangeInputs = document.querySelectorAll('[if-lib="rangeslider-value-input"]');
const rangeLabel = document.querySelector('.submit-form_range-label');

// Function to handle input changes
function handleRangeInput(event) {
  const value = parseFloat(event.target.value);

  // Check if the value exists and is a number
  if (!isNaN(value)) {
    // Add or remove class based on value
    if (value > 0) {
      rangeLabel.classList.add('is-active');
    } else {
      rangeLabel.classList.remove('is-active');
    }
  }
}

// Add event listeners to all matching inputs
rangeInputs.forEach(input => {
  input.addEventListener('input', handleRangeInput);

  // Optional: Handle initial state
  const initialValue = parseFloat(input.value);
  if (!isNaN(initialValue) && initialValue > 0) {
    rangeLabel.classList.add('is-active');
  }
});

// Clean up function to remove event listeners (optional)
function cleanup() {
  rangeInputs.forEach(input => {
    input.removeEventListener('input', handleRangeInput);
  });
}

});
