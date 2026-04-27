from PIL import Image
import os

def remove_white_background(input_path, output_path):
    """Convert white background to transparent in PNG files."""
    img = Image.open(input_path)
    
    # Convert to RGBA if not already
    if img.mode != 'RGBA':
        img = img.convert('RGBA')
    
    # Get image data
    data = img.getdata()
    
    # Create new image data with transparent white
    new_data = []
    for item in data:
        # If pixel is white (or very close to white), make it transparent
        if item[0] > 240 and item[1] > 240 and item[2] > 240:
            new_data.append((item[0], item[1], item[2], 0))  # Transparent
        else:
            new_data.append(item)
    
    img.putdata(new_data)
    img.save(output_path)
    print(f"Processed: {output_path}")

# Process both avatar images
remove_white_background('C:/Users/Dell/roshangarwin/public/normal.png', 'C:/Users/Dell/roshangarwin/public/normal.png')
remove_white_background('C:/Users/Dell/roshangarwin/public/closed.png', 'C:/Users/Dell/roshangarwin/public/closed.png')

print("Avatar backgrounds removed successfully!")