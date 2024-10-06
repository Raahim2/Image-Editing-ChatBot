import cv2
import numpy as np

# Load images
man_img = cv2.imread('Static/image.png')
original_tshirt_mask = cv2.imread('Static/mask.png', 0)  # Read as grayscale
new_tshirt = cv2.imread('Static/shirt.png')
new_tshirt_mask = cv2.imread('Static/shirtmask.png', 0)  # Read as grayscale

# Check if any image failed to load
if man_img is None:
    raise FileNotFoundError("Failed to load 'Static/image.jpg'. Check file path/integrity.")
if original_tshirt_mask is None:
    raise FileNotFoundError("Failed to load 'Static/mask.png'. Check file path/integrity.")
if new_tshirt is None:
    raise FileNotFoundError("Failed to load 'Static/shirt.png'. Check file path/integrity.")
if new_tshirt_mask is None:
    raise FileNotFoundError("Failed to load 'Static/shirtmask.png'. Check file path/integrity.")

# Resize new t-shirt and its mask to match the original t-shirt area
new_tshirt_resized = cv2.resize(new_tshirt, (man_img.shape[1], man_img.shape[0]))
new_tshirt_mask_resized = cv2.resize(new_tshirt_mask, (man_img.shape[1], man_img.shape[0]))

# Remove the original t-shirt
man_without_tshirt = cv2.bitwise_and(man_img, man_img, mask=cv2.bitwise_not(original_tshirt_mask))

# Prepare the new t-shirt image
new_tshirt_area = cv2.bitwise_and(new_tshirt_resized, new_tshirt_resized, mask=new_tshirt_mask_resized)

# Combine the images
result = cv2.add(man_without_tshirt, new_tshirt_area)

# Save or display the result
cv2.imwrite('result.jpg', result)
cv2.imshow('Result', result)
cv2.waitKey(0)
cv2.destroyAllWindows()
