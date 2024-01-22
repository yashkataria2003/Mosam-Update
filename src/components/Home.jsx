import React, { useState } from 'react'

import search_logo_T from '../assets/search_logo_T.png';

import clear_weather_logo from '../assets/clear_weather_logo.png';
import mist_weather_logo from '../assets/mist_weather_logo.png';
import rain_weather_logo from '../assets/rain_weather_logo.png';
import thunderstorm_weather_logo from '../assets/thunderstorm_weather_logo.png';
import snow_weather_logo from '../assets/snow_weather_logo.png';
import air_pressure_logo from '../assets/air_pressure_logo.png';
import clouds_logo from '../assets/clouds_logo.png';
import temprature_logo from '../assets/temprature_logo.png';
import visibility_logo from '../assets/visibility_logo.png';

import react_logo from '../assets/react_logo.png';
import tailwind_logo from '../assets/tailwind_logo.png';
import vite_logo from '../assets/vite_logo.png';

import notfound_logo from '../assets/notfound_logo.png';

import rotating_earth from '../assets/rotating_earth.gif';
import air_logo from '../assets/air_logo.png';
import water_drop_logo from '../assets/water_drop_logo.png';

import Main_logo from '../assets/Main_logo.png';

import main_bg from '../assets/main_bg.mp4'
import rainy_weather_bg from '../assets/rainy_weather_bg.mp4'
import snow_weather_bg from '../assets/snow_weather_bg.mp4'
import sunny_weather_bg from '../assets/sunny_weather_bg.mp4'
import misty_weather_bg from '../assets/misty_weather_bg.mp4'
import cloudy_weather_bg from '../assets/cloudy_weather_bg.mp4'
import thunderstorm_weather_bg from '../assets/thunderstorm_weather_bg.mp4'
import default_weather_bg from '../assets/default_weather_bg.mp4'

import BackgroundVideo from './BackgroundVideo'
import Loading from './Loading';



const Home = (props) => {
    const [weatherName, setWeatherName] = useState("City")
    const [input, setInput] = useState('')
    const [hide, setHide] = useState(false)
    const [temp, setTemp] = useState(0)
    const [des, setDes] = useState("Current Weather")
    const [humidity, setHumidity] = useState(0)
    const [speed, setSpeed] = useState(0)
    const [airPressure, setAirPressure] = useState(0)
    const [clouds, setClouds] = useState(0)
    const [tempMin, setTempMin] = useState(0)
    const [tempMax, setTempMax] = useState(0)
    const [visibility, setVisibility] = useState(0)
    const [weatherImage, setWeatherImage] = useState(rotating_earth)
    const [bgVideo, setBgVideo] = useState(main_bg)

    const [loading, setLoading] = useState(true);

    setTimeout(() => {
        setLoading(false)
    }, 2000);

    const weather_data = async (input) => {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${props.apiKey}`;

        setLoading(true)

        setTimeout(() => {
            setLoading(false)
        }, 2000);

        try {
            const response = await fetch(url);
            const data = await response.json();

            // console.log(data)

            if (await data.cod === `404`) {
                setHide(true)
                console.log("error");
                setBgVideo(main_bg)
            }



            else {
                setWeatherName(data.name)
                setHide(false)
                setTemp(Math.round(await data.main.temp - 273.15))
                setDes(await data.weather[0].description)
                setHumidity(await data.main.humidity)
                setAirPressure(await data.main.pressure)
                setClouds(await data.clouds.all)
                setSpeed(await data.wind.speed)
                setTempMin(Math.round(await data.main.temp_min - 273.15))
                setTempMax(Math.round(await data.main.temp_max - 273.15))
                setVisibility(await data.visibility / 1000)

                if ((Math.round(await data.main.temp - 273.15)) <= 2) {
                    setBgVideo(snow_weather_bg)
                }

                switch (await data.weather[0].main) {
                    case 'Clouds':
                        setWeatherImage(clouds_logo);
                        setBgVideo(cloudy_weather_bg);
                        break;

                    case 'Clear':
                        setWeatherImage(clear_weather_logo);
                        setBgVideo(sunny_weather_bg);
                        break;

                    case 'Rain':
                        setWeatherImage(rain_weather_logo);
                        setBgVideo(rainy_weather_bg);
                        break;

                    case 'Mist':
                        setWeatherImage(mist_weather_logo);
                        setBgVideo(misty_weather_bg);
                        break;

                    case 'Snow':
                        setWeatherImage(snow_weather_logo);
                        setBgVideo(snow_weather_bg);
                        break;

                    case 'Thunderstorm':
                        setWeatherImage(thunderstorm_weather_logo);
                        setBgVideo(thunderstorm_weather_bg);
                        break;

                    default:
                        setWeatherImage(rotating_earth);
                        setBgVideo(default_weather_bg);
                }

                if ((Math.round(await data.main.temp - 273.15)) <= 2) {
                    setBgVideo(snow_weather_bg)
                }
            }


        }

        catch (error) {
            console.error('Error fetching weather data  --> ', error);
        }
    }

    const handleOnChange = (e) => {
        setInput(e.target.value)
    }


    const handleClick = async () => {
        await weather_data(input)
    }

    const handleEnterKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            weather_data(input);
        }
    };


    return (
        // <div className='flex flex-col justify-center items-center h-[100vh] w-[100vw]'>
        <div>
            <BackgroundVideo video={bgVideo} />
            <div className='max-xl:py-10 max-xl:h-[160vh] max-md:py-2 max-lg:h-[160vh] max-md:h-[180vh] max-sm:py-0'>

                {loading ? <Loading /> :

                    <div className='flex flex-col justify-center items-center gap-y-4'>
                        <div className='flex flex-row justify-center items-center h-[5rem] w-[100vw] rounded-xl pt-[4rem]'>
                            <nav className='flex flex-row justify-center items-center h-[5rem] w-[90vw] '>
                                <img src={Main_logo} alt="Logo" className='h-[10rem] z-0 hover:cursor-pointer hover:scale-105 drop-shadow-[0_0.1rem_0.1rem_#000000] focus:h-[100vh] focus:w-[100vw]' />
                            </nav>
                        </div>

                        <div className="z-0 flex flex-col justify-center items-center h-[86.39vh] w-[100vw] max-xl:h-[95vh] max-xl:mt-9 ">
                            <div className="z-0 flex flex-row h-[7rem] w-[85vw] justify-around rounded-xl max-xl:flex-col max-xl:justify-around max-xl:items-center max-xl:py-4 max-xl:w-[100%] max-xl:h-[100%] max-lg:flex-col max-md:flex-col max-sm:flex-col gap-8">
                                <div className='z-0 flex flex-row justify-around items-center bg-[#000000b6] h-[7rem] w-[40vw] rounded-xl gap-3 hover:backdrop-blur-md transition-transform duration-300 transform hover:scale-105 box-shadow-[0_0.5rem_0.5rem_#ffffff] max-xl:w-[45vw] max-2xl:w-[50vw] max-xl:px-[3rem] max-lg:w-[60vw] max-md:w-[70vw] max-sm:w-[90vw] max-sm:gap-1'>
                                    <input type="text" value={input} className="z-0 h-[3rem] w-[30rem] p-3 rounded-2xl focus:border-black focus:scale-2 bg-[#ffffffc1] hover:bg-white text-black max-sm:w-[90vw]" onChange={handleOnChange} onKeyUp={handleEnterKeyPress} onKeyDown={handleEnterKeyPress} placeholder='Enter your location ...' />

                                    <img src={search_logo_T} alt="Search" className='z-0 h-[3rem] hover:cursor-pointer rounded-lg bg-[#ffffffc1] hover:bg-white' onClick={handleClick} />
                                </div>

                                <div className='z-0 flex flex-col items-center justify-center bg-[#000000b6] h-[7rem] w-[40vw] rounded-xl p-2 hover:backdrop-blur-md transition-transform duration-300 transform hover:scale-105 box-shadow-[0_0.5rem_0.5rem_#ffffff] max-xl:w-[45vw] max-lg:w-[60vw] max-md:w-[70vw] max-sm:w-[90vw]'>
                                    <h2 className='z-0  font-sans text-xl text-white'>Technology Used</h2>
                                    <div className='z-0 flex flex-row items-center h-[3rem] w-[40vw] justify-center gap-2 max-sm:gap-1'>
                                        <img src={react_logo} alt="React" className='z-0 h-[9rem] hover:cursor-pointer hover:scale-105 hover:drop-shadow-[0_0.1rem_0.1rem_#ffffff] max-sm:h-[7rem]' />
                                        <img src={tailwind_logo} alt="Tailwind" className='z-0 h-[9rem] hover:cursor-pointer hover:scale-105 hover:drop-shadow-[0_0.1rem_0.1rem_#ffffff] max-sm:h-[7rem]' />
                                        <img src={vite_logo} alt="Tailwind" className='z-0 h-[9rem] hover:cursor-pointer hover:scale-105 hover:drop-shadow-[0_0.1rem_0.1rem_#ffffff] max-sm:h-[7rem] max-sm:bg-blend-multiply' />
                                    </div>
                                </div>
                            </div>

                            <div className='z-0 flex flex-row h-[20rem] w-[85vw] justify-around mt-[2rem] rounded-xl'>
                                {
                                    hide ?
                                        (
                                            <div className='z-0 flex flex-col justify-center items-center bg-[#000000b6] h-[50vh] w-[40vw] rounded-xl p-3 hover:backdrop-blur-md transition-transform duration-300 transform hover:scale-105 box-shadow-[0_0.5rem_0.5rem_#ffffff] max-xl:w-[45vw] max-2xl:w-[50vw] max-xl:px-[3rem] max-lg:w-[60vw] max-md:w-[70vw] max-sm:w-[90vw] max-sm:gap-1 max-xl:h-[70vh]'>
                                                <div className='py-2 max-sm:py-1 text-center max-xl:py-0'>
                                                    <h2 className='z-0 font-sans text-2xl text-white max-sm:text-2xl'>You have eneterd <span className='text-red-600 font-bold'>WRONG</span> / <span className='text-red-600 font-bold'>In-APPROPRIATE</span> Location</h2>
                                                </div>
                                                <div className='z-0 flex flex-row h-[50vh] w-[40vw] justify-around max-lg:flex-col gap-8'>
                                                    <div className="z-0 flex flex-col justify-center items-center">
                                                        <img src={notfound_logo} alt="404 Error" className='z-0 h-[10rem] hover:cursor-pointer hover:scale-105 hover:drop-shadow-[0_0.1rem_0.1rem_#ffffff] animate-pulse' />
                                                        <h1 className='z-0 font-sans text-[1.5rem] text-white'>Sorry, Location not found !!!</h1>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : null
                                }

                                {
                                    !hide ?
                                        (
                                            <div className='flex flex-col justify-center items-center bg-[#000000b6] h-[50vh] w-[60vw] rounded-xl px-3 hover:backdrop-blur-md transition-transform duration-300 transform hover:scale-105 box-shadow-[0_0.5rem_0.5rem_#ffffff] max-xl:h-[80vh]  max-xl:w-[80vw] max-lg:flex-col max-lg:h-[29rem] max-md:h-[100vh] max-md:w-[70vw] max-sm:h-[110vh] max-sm:w-[90vw]'>
                                                <div className='py-2 max-sm:py-1 text-center max-xl:py-0'>
                                                    <h2 className='z-0 font-sans text-3xl text-white max-sm:text-2xl'><span className='font-bold'>{weatherName}'s</span> Weather ...</h2>
                                                </div>
                                                <div className="z-0 flex flex-row justify-around items-center max-xl:flex-col max-lg:px-2">
                                                    <div className='z-0 flex flex-col justify-center items-center'>
                                                        <img src={weatherImage} alt="Weather Image" className="z-0 h-[10rem] hover:cursor-pointer hover:scale-110" />

                                                        <div className="z-0 flex flex-col justify-center items-center w-[10rem]">
                                                            <p className="z-0 font-sans text-lg text-white">{temp}<sup>°</sup>C</p>
                                                            <p className="z-0 font-sans text-xl text-white">{des}</p>
                                                        </div>
                                                    </div>

                                                    <div className='flex justify-evenly items-center w-[40vw] max-2xl:w-[45vw] max-xl:w-[60vw] max-lg:w-[80vw] max-md:flex-col'>
                                                        <div className="z-0 flex flex-col justify-center items-center w-[10rem]">
                                                            <div className="z-0 flex flex-row justify-center items-center w-[17rem]">
                                                                <img src={water_drop_logo} alt="Humidity" className='z-0 h-[4rem] opacity-70 hover:opacity-100 ' />
                                                                <div className="z-0 w-[13rem]">
                                                                    <p className='z-0 font-sans text-xl text-white'><span>{humidity} %</span> Humidity</p>
                                                                </div>
                                                            </div>

                                                            <div className="z-0 flex flex-row justify-center items-center w-[17rem]">
                                                                <img src={air_logo} alt="Wind Speed" className='z-0 h-[4rem] opacity-70 hover:opacity-100' />
                                                                <div className="z-0 w-[13rem]">
                                                                    <p className='z-0 font-sans text-xl text-white'><span >{speed} Km/H</span> Wind Speed</p>
                                                                </div>
                                                            </div>

                                                            <div className="z-0 flex flex-row justify-center items-center w-[17rem]">
                                                                <img src={air_pressure_logo} alt="Air Pressure" className='z-0 h-[4rem] opacity-70 hover:opacity-100' />
                                                                <div className="z-0 w-[13rem]">
                                                                    <p className='z-0 font-sans text-xl text-white'><span >{airPressure} mb</span> Air Pressure</p>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="z-0 flex flex-col justify-center items-center w-[10rem]">
                                                            <div className="z-0 flex flex-row justify-center items-center w-[17rem]">
                                                                <img src={clouds_logo} alt="Clouds" className='z-0 h-[4rem] opacity-70 hover:opacity-100' />
                                                                <div className="z-0 w-[13rem]">
                                                                    <p className='z-0 font-sans text-xl text-white'><span>{clouds} %</span> Clouds</p>
                                                                </div>
                                                            </div>

                                                            <div className="z-0 flex flex-row justify-center items-center w-[17rem]">
                                                                <img src={temprature_logo} alt="Wind Speed" className='z-0 h-[4rem] opacity-70 hover:opacity-100' />
                                                                <div className="z-0 w-[13rem]">
                                                                    <p className='z-0 font-sans text-xl text-white'><span >{tempMin}<sup>°</sup> /{tempMax}<sup>°</sup> C</span> Min-Max Temprature</p>
                                                                </div>
                                                            </div>

                                                            <div className="z-0 flex flex-row justify-center items-center w-[17rem]">
                                                                <img src={visibility_logo} alt="Air Pressure" className='z-0 h-[4rem] opacity-70 hover:opacity-100' />
                                                                <div className="z-0 w-[13rem]">
                                                                    <p className='z-0 font-sans text-xl text-white'><span >{visibility} Km</span> Visibility</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : null
                                }
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default Home;
