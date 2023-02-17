import React, {useState } from 'react';
import './App.css';
import Timer from './components/TImer/Timer';

function App() {
// Кроки для таймеру
  let stepsValue = [
    {
      value: 1,
      stepTime: 1000,
      id:1
    },
    {
      value: 2,
      stepTime: 2000,
      id:2
    }
  ]


  const [autoPlay,setAutoPlay] = useState(false) // Сліткування за ввімкнутим автоматичним режимом
  if(autoPlay){ // Інформування про ввімкнений режим
    alert('Увімкнено автоматичний відлік')
  }

  const [selectState,setSelectState] = useState(false) // Слідкування за станом селекту

  const [valueSelect, setValueSelect] = useState('1') // Встановлення значення селекту
  let step = stepsValue.find(elem => { // знаходження селекту з необхідною умовою
    if (elem.value === +valueSelect){
      return elem.value
    }
  })

  const [timeSmallTimer] = useState(60), // Секунди для хвилинного таймеру
        [timeLargeTimer] = useState(180) // Для 3 хв таймеру

  function onTick(minutes,seconds){ // Функція додавання 0 перед значенням якщо воно менше 10
    return `Залишилось часу: ${ minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`
  }

  function handleChangeAutoPlay(){ // Зміна значення чекбоксу автоматичного таймінгу
    setAutoPlay(!autoPlay)
  }

  function handleChangeSelect(event) { // Отримання селекту при зміні
		setValueSelect(event.target.value);
	}

  let updateAutoPlay = (value) => {  // Оновлення з дочірнього елементу значення автоматичного запуску
    setAutoPlay(value)
  }
  let updateSelect = (value) => {  // Оновлення з дочірнього елементу селекту 
    setSelectState(value)
  }
// Загальні функції звітування по таймеру
  function onTimeEnd(){
    console.log("Час вийшов!")
  }
  function onTimeStart(){
    console.log('Час пішов');
  }
  function onTimePause(){
    console.log('Таймер на паузі');
  }
  return (
    <div className="App">
      <div className='block'>

        <div className='main_content'>

          <label className='app_labels'>Автоматичний відлік
            <input className='check_class' type="checkbox" disabled={autoPlay} checked={autoPlay} onChange={handleChangeAutoPlay}/>
          </label>

          <label className='app_labels'>Оновлення таймеру
            <select className='select_style' disabled={selectState || autoPlay} value={valueSelect} onChange={handleChangeSelect}>
              {/* Форування опшинів для селекту з масиву */}
              {stepsValue.map(element => {
                return <option key={element.id}>{element.value}</option>
              })}
            </select>
          </label>
          <a className='reset_fields' href='https://boris2606.github.io/cursor-courses-react-18/'>скинути таймер</a>

        </div>

        <div className='wrapper_components'>
          {/* Виклик компонентів та переданя їм пропсів  */}
          <Timer onTimeEnd={onTimeEnd} onTimeStart={onTimeStart} onTimePause={onTimePause} steps ={step} time ={timeSmallTimer} autoplay={autoPlay} onTick={onTick} updateData={updateAutoPlay} updateSelect={updateSelect}/>
          <Timer onTimeEnd={onTimeEnd} onTimeStart={onTimeStart} onTimePause={onTimePause} steps ={step} time ={timeLargeTimer} autoplay={autoPlay} onTick={onTick} updateData={updateAutoPlay} updateSelect={updateSelect}/>
        </div>

      </div>
    </div>
  );
}

export default App;
