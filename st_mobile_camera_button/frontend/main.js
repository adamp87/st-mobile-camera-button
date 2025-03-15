function sendValue(value) {
  Streamlit.setComponentValue(value)
}

/**
 * The component's render function. This will be called immediately after
 * the component is initially loaded, and then again every time the
 * component gets new data from Python.
 */
function onRender(event) {
  // Only run the render code the first time the component is loaded.
  if (!window.rendered) {
    // You most likely want to get the data passed in like this
    var { label, height } = event.detail.args;

    let captureButton = document.getElementById('captureButton');
    captureButton.innerHTML = label
    captureButton.setAttribute('width', '100%');
    captureButton.setAttribute('height', 'auto');    

    Streamlit.setFrameHeight(height);

    window.rendered = true
  }
}

// Render the component whenever python send a "render event"
Streamlit.events.addEventListener(Streamlit.RENDER_EVENT, onRender)
// Tell Streamlit that the component is ready to receive events
Streamlit.setComponentReady()

document.addEventListener('DOMContentLoaded', function() {
  console.log("Document loaded and ready.");

  const captureButton = document.getElementById('captureButton');
  const cameraInput = document.getElementById('cameraInput');

  captureButton.onclick = function() {
      console.log("Button clicked.");
      cameraInput.click();
  };

  cameraInput.addEventListener('change', function(event) {
      console.log("File input changed.");
      if (event.target.files && event.target.files[0]) {
          const reader = new FileReader();
          reader.onload = function(e) {
              const imageData = e.target.result;
              console.log("Image captured, sending to Streamlit.");
              Streamlit.setComponentValue(imageData);
          };
          reader.readAsDataURL(event.target.files[0]);
      }
  });

  Streamlit.setComponentReady();  // Notify Streamlit that the component is ready to display
});