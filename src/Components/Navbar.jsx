import React, { useState } from 'react'; 
import FilterDramaIcon from '@mui/icons-material/FilterDrama';
import TextField from '@mui/material/TextField';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';

const Navbar = ({ onSearch }) => {
    const [searchCity, setSearchCity] = useState(''); 

    const handleSearchClick = () => {
        if (searchCity.trim()) {
            onSearch(searchCity);
            setSearchCity(''); 
        }
    };

    return (
        <nav style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '10px',
            padding: '10px 30px',
            backgroundColor: '#f8f9fa',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                <FilterDramaIcon />
                <p style={{ fontWeight: 'bold', fontSize: '20px' }}>Weather</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <TextField
                    style={{ background: 'white', borderRadius: '20px', width: '250px' }}
                    placeholder='Search City'
                    variant='outlined' 
                    value={searchCity}
                    onChange={(e) => setSearchCity(e.target.value)}
                />
                <button
                    onClick={handleSearchClick}
                    style={{
                        borderRadius: '6px',
                        backgroundColor: '#4B5550',
                        height: '40px',
                        color: 'white',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '0 15px'
                    }}>
                    SEARCH
                </button>
            </div>
            <div style={{
                marginTop: '1rem',
                fontSize: '16px',
                fontWeight: '700',
                backgroundColor: '#4B5550',
                height: '40px',
                width: '180px',
                color: 'white',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
            }}>
                <GpsFixedIcon />
                <p style={{ fontSize: '17px' }}>Current Location</p>
            </div>
        </nav>
    );
}

export default Navbar;