// import "./App.css";
import { useState } from 'react';
import img from './assets/img.webp'
import { useEffect } from 'react';
import axios from 'axios';
function App() {
  const [rate, SetRate] = useState({})
  const [amount, setAmount] = useState(0)
  const [fromCurrency, setFromCurrency] = useState('Select')
  const [toCurrency, setToCurrency] = useState('Select')
  const [exchangeRate,setExchangeRate]=useState(0)
  const [convertedCurrency,setConvertedCurrency]=useState(0)
  useEffect(() => {
    const load = async () => {
      try {
        const res = await axios.get("https://api.exchangerate-api.com/v4/latest/USD")
      // console.log(res)
        SetRate(res.data.rates)
        
      }
      catch (err) {
        console.log(err)
      }
    }
  load()
  }, [])

  useEffect(() => {
    setConvertedCurrency((amount * exchangeRate).toFixed(2))
  },[amount,exchangeRate])

  useEffect(() => {
    const exchange = async () => {
      if (fromCurrency === 'Select') {
        return;
     }
      const res = await axios.get(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
      console.log(res.data.rates)
      setExchangeRate(res.data.rates[toCurrency])
    }
    exchange()
  }, [fromCurrency, toCurrency])
console.log(exchangeRate)
  // console.log(rate)
  return (
    <>
      <div className="container">
        <div className="img">
          <img src={img} alt="" />
        </div>
        <h2>Currency coverter</h2>
        <div className="form">
          <div className="input-container">
            <label htmlFor="amt">
              Amount
            </label>
            <input type="number" id="amt" value={amount} onChange={(e )=>setAmount(e.target.value)}/>
          </div>
          <div className="fromCurrency">
            <label htmlFor="from">From Currency</label>
            <select value={fromCurrency} onChange={(e)=>setFromCurrency(e.target.value)}>
          <option value={fromCurrency}>{ fromCurrency}</option>
          {
            Object.entries(rate).map(([key]) =>(
               <option value={key} key={key}>{ key}</option>
              ))
            }</select>
          </div>
          <div className="toCurrency">
            <label htmlFor="">To Currency</label>
            <select value={toCurrency} onChange={(e)=>setToCurrency(e.target.value)}>
              <option value={toCurrency}>{ toCurrency}</option>
              {Object.entries(rate).map(([key]) =>(
               <option value={key} key={key}>{ key}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="result">
          {fromCurrency!=="Select" && toCurrency!=="Select" && amount!="" && <p>{amount} {fromCurrency} equal to {convertedCurrency} { toCurrency}</p>}
        </div>
      </div>
    </>
  );
}

export default App;
