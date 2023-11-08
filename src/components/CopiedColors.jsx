import React from 'react';
import getContrastYIQ from './ColorContrastHelper';

function CopiedColors({ color }) {
  return (
    <>
        <div className='copied-colors' style={{'--bgColor': `#${color}`, '--textColor': `${getContrastYIQ(color)}`}}>
          Copied #{color} to the Clipboard
        </div>
    
    </>
  )
}

export default CopiedColors;