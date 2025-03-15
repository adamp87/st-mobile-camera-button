# st-mobile-camera-button

Button to open mobile camera App to upload an image.
Alternative solution to st.file_uploader, as some phones not always let user to select the camera App with the file uploader.
This module is only meant to open your camera on the mobile phone, it is just a file uploder on a PC.

## Installation instructions

Open your project, then add this as a git submodule and install with pip
```sh
git submodule add https://github.com/adamp87/st-mobile-camera-button.git st_mobile_camera_button
pip install ./st_mobile_camera_button
```

## Usage instructions

```python
import streamlit as st
from st_mobile_camera_button import st_mobile_camera_button

st.title("Custom Mobile Camera Input Component Example")

# Invoke your custom component
image_data = st_mobile_camera_button("Capture Image")

# Display the captured image
if image_data:
    st.image(image_data, caption="Captured Image", use_container_width=True)
```

## Notes

Kudos to [Zachary](https://github.com/blackary) for his [streamlit-camera-input-live](https://github.com/blackary/streamlit-camera-input-live), which helped me to implement this streamlit component.