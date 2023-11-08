import React, { useContext, useEffect, useState } from 'react';
import MainContext from '../contexts/MainContext';
import { GrLink, GrDownload, GrClose } from 'react-icons/gr';
import { Link } from 'react-router-dom';

function DownloadColors() {

  const {selectedBrands, brands, setSelectedBrands} = useContext(MainContext);
  const [downloadUrl, setDownloadUrl] = useState();
  const [changeCssMethod, setChangeCssMethod] = useState("css");

  const getLink = () => {
    prompt("Here's the URL to share", `http://localhost:5173/collection/${selectedBrands.join(',')}`);
  }

  useEffect(() => {
    if(selectedBrands.length > 0){
      let output = '';

      switch (changeCssMethod) {
        case "css":
          output += ':root {\n'

          selectedBrands.map(slug => {
            let brand = brands.find(brand => brand.slug === slug);
            brand.colors.map((color, key) => {
              output += `--${slug}-${key}: #${color};\n`;
            });
        });
          output += '}';
          break;
      
        case "scss":
          selectedBrands.map(slug => {
            let brand = brands.find(brand => brand.slug === slug);
            brand.colors.map((color, key) => {
              output += `\$${slug}-${key}: #${color};\n`;
            });
        });
          break;

        case "less":
          selectedBrands.map(slug => {
            let brand = brands.find(brand => brand.slug === slug);
            brand.colors.map((color, key) => {
              output += `@${slug}-${key}: #${color};\n`;
            });
          });
          break;  
      }

      const blob = new Blob([output]);
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);

      return () => {
        URL.revokeObjectURL(url);
        setDownloadUrl('');
      }
    }
  }, [selectedBrands, changeCssMethod]);

  return (
    <>  
      <div className='download-colors'>
        <div className='actions'>
          <select onChange={e => setChangeCssMethod(e.target.value)}>
            <option value="css">CSS</option>
            <option value="scss">SCSS</option>
            <option value="less">LESS</option>
          </select>

          <a download={`brands.${changeCssMethod}`} href={downloadUrl}><GrDownload /></a>

          <Link to={`/collection/${selectedBrands.join(',')}`} onClick={getLink}><GrLink /></Link>
        </div>

        <div className='selected-colors' onClick={() => setSelectedBrands([])}>
          <button><GrClose /></button>
          {selectedBrands.length === 1 ? `${selectedBrands.length} brand collected` : `${selectedBrands.length} brands collected`} 
        </div>

      </div>
    </>
  )
}

export default DownloadColors;