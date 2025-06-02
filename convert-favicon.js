const fs = require('fs');
const toIco = require('to-ico');

// Read the SVG file
const svgBuffer = fs.readFileSync('favicon.svg');

// Convert SVG to ICO
// We'll create a simple 32x32 PNG first, then convert to ICO
const sharp = require('sharp').default || require('sharp');

async function convertSvgToIco() {
    try {
        // Convert SVG to PNG buffer at different sizes
        const png16 = await sharp(svgBuffer)
            .resize(16, 16)
            .png()
            .toBuffer();
            
        const png32 = await sharp(svgBuffer)
            .resize(32, 32)
            .png()
            .toBuffer();
            
        const png48 = await sharp(svgBuffer)
            .resize(48, 48)
            .png()
            .toBuffer();

        // Convert to ICO
        const icoBuffer = await toIco([png16, png32, png48]);
        
        // Write the ICO file
        fs.writeFileSync('favicon.ico', icoBuffer);
        console.log('favicon.ico created successfully!');
        
    } catch (error) {
        console.error('Error converting favicon:', error);
        
        // Fallback: try with just to-ico if sharp fails
        try {
            console.log('Trying fallback method...');
            const icoBuffer = await toIco([svgBuffer]);
            fs.writeFileSync('favicon.ico', icoBuffer);
            console.log('favicon.ico created with fallback method!');
        } catch (fallbackError) {
            console.error('Fallback also failed:', fallbackError);
        }
    }
}

convertSvgToIco();
