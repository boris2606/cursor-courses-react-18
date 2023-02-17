import React, { useEffect, useState } from 'react';
import './Timer.css'

const Timer = (props) => {
    // Загальні стайте та підрахунки
    const   gettedMinutes = Math.floor(props.time / 60),
        [ minutes, setMinutes ] = useState(gettedMinutes),
        gettedSeconds = Math.floor(minutes / 60),
        [ seconds, setSeconds ] = useState(gettedSeconds),
        [ widthTime, setWidthTime ] = useState(props.time),
        [ timerActive, setTimerActive ] = useState(false)

    useEffect(() => {
        if (props.autoplay){ // Звірка чи увімкнений автоматичний таймінг
            setTimerActive(true)
        }
        if (seconds > 0 && timerActive) {
            setTimeout(() => { // Зменшення секунд та відповідно шкали таймеру 
                setSeconds(seconds - props.steps.value)
                setWidthTime(widthTime - props.steps.value )
            }, props.steps.stepTime)
        } else if (seconds === 0 && minutes !== 0 && timerActive){
            setTimeout(() => {
                if (props.steps.value === 2){ // Корегування шкали таймеру
                    setWidthTime(widthTime - 1)
                } else {
                    setWidthTime(widthTime - 0)
                }
                setMinutes(minutes - 1)
                setTimeout(setSeconds(props.steps.value === 2 ? 58 : 59), props.steps.stepTime, seconds - props.steps.value); // Корегування таймеру
            }, props.steps.stepTime);
        } else if (seconds === 0 && minutes === 0){
            setTimerActive(false) // Зміни флагу активності таймеру
            setSeconds(gettedSeconds)  // Задання початкових значень відповідно д всіхдних пропсів
            setMinutes(gettedMinutes) // Задання початкових значень відповідно д всіхдних пропсів
            setWidthTime(props.time) // Повернення шкали до початкового стану
            props.updateData(false) // Повернення до батьківського елементу значення автоматичного таймеру
            props.updateSelect(!timerActive) // Повернення до батьківського елементу значення активності таймеру
            props.onTimeEnd() // Звітування про закінчення
        }
        
    },[props,seconds,minutes,timerActive,widthTime,gettedSeconds,gettedMinutes])

    return (
        <div className='component'>
            <div className='info_component'>
                <button disabled={props.autoplay} onClick={() => {
                    timerActive ? props.onTimePause() : props.onTimeStart() // Функції звітування паузи або старту
                    setTimerActive(!timerActive) // Встановлення активності таймеру
                    props.updateSelect(!timerActive) 
                    }}>
                    {/* Вивід тексту кнопки залежно від умови */}
                    {timerActive && props.autoplay  ? "Автоматичний відлік" : timerActive && !props.autoplay? "Зупинити" :'Розпочати'}
                </button>
                <div>{props.onTick(minutes,seconds)}</div>
            </div>
            <div className='wrapper_progress'>
                {/* Шкала прогресу */}
                <progress 
                    className='progress_bar'
                    max={props.time}
                    min={0}
                    value={widthTime}>
                </progress>
            </div>
        </div>
    );
};

export default Timer;