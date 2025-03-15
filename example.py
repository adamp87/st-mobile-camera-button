import streamlit as st
from st_mobile_camera_button import st_mobile_camera_button

st.title("Custom Mobile Camera Input Component Example")

# Invoke your custom component
image_data = st_mobile_camera_button("Capture Image")

# Display the captured image
if image_data:
    st.image(image_data, caption="Captured Image", use_container_width=True)