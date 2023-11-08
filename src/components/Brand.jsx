import React, { useContext } from 'react';
import getContrastYIQ  from './ColorContrastHelper';
import MainContext from '../contexts/MainContext';
import ClipBoardButton from 'react-clipboard.js';

function Brand({ brand }) {

  const {selectedBrands, setSelectedBrands, setCopied} = useContext(MainContext);

  const toggleSelected = () => {

      if(selectedBrands.includes(brand.slug)){
        setSelectedBrands(selectedBrands.filter(slug => slug !== brand.slug))
      }
      else{
        setSelectedBrands([...selectedBrands, brand.slug]);
      }
  }

  const copiedColor = ( color ) => {
    setCopied(color);
  }

  return (
      <>
        <div className={`brand ${selectedBrands.includes(brand.slug) ? 'selected' : ''}`}>
            <h4 onClick={toggleSelected}>{brand.title}</h4>

            <div className='brand-colors'>
                {brand.colors.map( (color,index) => (
                  <ClipBoardButton key={index} data-clipboard-text={color} onSuccess={() => copiedColor(color)} component="span" style={{'--bgColor': `#${color}`, '--textColor': `${getContrastYIQ(color)}`}}>
                      #{color}
                  </ClipBoardButton>
                ))}
            </div>
        </div>
      </>
    )
}
export default Brand;