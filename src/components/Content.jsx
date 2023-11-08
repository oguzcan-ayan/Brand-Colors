import Search from './Search';
import Brand from './Brand';
import MainContext from '../contexts/MainContext';
import { useContext } from 'react';
import DownloadColors from './DownloadColors';
import LazyLoad from 'react-lazy-load';

function Content() {
  
    const {brands, selectedBrands} = useContext(MainContext);

  return (
    <>
    <main className='content'>
        <header className='header'>
            <Search />
            {selectedBrands.length !== 0 && <DownloadColors />}
        </header>   

        <section className='brands'>
            {brands.map( (brand, index) => (
                <LazyLoad key={index}  height={120}  threshold={0.95}>
                    <Brand brand={brand} />
                </LazyLoad>
            ))}
        </section>

    </main>
    </>
  )
}

export default Content;