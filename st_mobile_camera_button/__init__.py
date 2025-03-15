from base64 import b64decode
from io import BytesIO
from pathlib import Path
from typing import Optional

import streamlit.components.v1 as components

# Declare the component directory
component_dir = (Path(__file__).parent / "frontend").absolute()

_component_func = components.declare_component(
    "st_mobile_camera_button",
    path=component_dir,
)

def st_mobile_camera_button(label: str, height=80, key=None) -> Optional[BytesIO]:
    """Wrapper function to call the custom camera input component."""
    # The component will return the base64 encoded image data
    b64: Optional[str] = _component_func(
        label=label,
        height=height,
        key=key,
    )
    if b64 is None:
        return None
    
    # Split the base64 string to remove metadata
    _, encoded = b64.split(',', 1)

    # Decode the base64 string
    image_data = b64decode(encoded)

    # Convert byte data to a BytesIO object
    image_bytes = BytesIO(image_data)

    return image_bytes

# Create a module-level export
__all__ = ["st_mobile_camera_button"]