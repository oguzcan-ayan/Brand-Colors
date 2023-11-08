import React, { useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainContext from '../contexts/MainContext';
import LazyLoad from 'react-lazy-load';
import Brand from './Brand';
import DownloadColors from './DownloadColors';
import { GrLinkPrevious } from 'react-icons/gr';

function Collection() {

  const { selectedBrands, setSelectedBrands, brands } = useContext(MainContext);
  const { slugs } = useParams();
  const navigate = useNavigate();
  const clearSelectedBrands = () => {

    setSelectedBrands([]);
    navigate(-1);
  }

  useEffect( () => {
      setSelectedBrands(slugs.split(','));
  }, []);

  return (
    <>
    <main className='content'>
        <header className='header'>
          
          <button className='back-to-all-brands-btn' onClick={clearSelectedBrands}>
            <GrLinkPrevious />
            All Brands
          </button>

          <div className='collection-of-colors'>
            {selectedBrands.length !== 0 && <DownloadColors />}
          </div>
          
        </header>   
        
        <section className='brands'>
            {selectedBrands.map( (slug, index) => {
              let brand = brands.find(brand => brand.slug === slug)
              return(
                <LazyLoad key={index}  height={120}  threshold={0.95}>
                    <Brand brand={brand} />
                </LazyLoad>
            )   
              })}
        </section>
    </main>
    </>
  )
}

export default Collection;