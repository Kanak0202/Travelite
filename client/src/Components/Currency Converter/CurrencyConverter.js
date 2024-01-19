import { useEffect, useState } from "react";
import CurrencyRow from "./CurrencyRow";
//css
import "./currency.css";
//icons
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

const CurrencyConverter = (props) => {
    const baseURL = "https://v6.exchangerate-api.com/v6/002210af69f138e1e7cfeb58/latest/INR";

    const [options, setOptions] = useState([]);
    const [fromCurrency, setFromCurrency] = useState();
    const [toCurrency, setToCurrency] = useState();
    const [exchangeRate, setExchangeRate] = useState();
    const [amount, setAmount] = useState(1);
    const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);
    console.log(props);

    let toAmount, fromAmount;
    if (amountInFromCurrency) {
        fromAmount = amount;
        toAmount = amount * exchangeRate;
    } else {
        toAmount = amount;
        fromAmount = amount / exchangeRate;
    }

    const fetchRates = async () => {
        try {
            const response = await fetch(`${baseURL}`);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            const firstCurrency = Object.keys(data.conversion_rates)[146];
            setOptions([...Object.keys(data.conversion_rates)]);
            setFromCurrency(data.base_code);
            setToCurrency(firstCurrency);
            setExchangeRate(data.conversion_rates[firstCurrency]);
        } catch (error) {
            console.error("Error fetching exchange rates:", error.message);
        }
    };

    useEffect(() => {
        fetchRates();
    }, []);

    const pairExchange = async()=>{
      if(fromCurrency != null && toCurrency != null){
        const result = await fetch(`https://v6.exchangerate-api.com/v6/002210af69f138e1e7cfeb58/pair/${fromCurrency}/${toCurrency}`);
        if(!result){
          console.log("Error fetching pair conversion");
        }
        const data = await result.json();
        setExchangeRate(data.conversion_rate);
      }
    }
    
    useEffect(()=>{
      pairExchange();
    }, [fromCurrency, toCurrency]);

    function handleFromAmountChange(e) {
        setAmount(e.target.value);
        setAmountInFromCurrency(true);
    }

    function handleToAmountChange(e) {
        setAmount(e.target.value);
        setAmountInFromCurrency(false);
    }

    return (
        <div className="currency-main-container slidein">
        <div className="close-btn-container" onClick={()=>props.func()}>
        <CancelOutlinedIcon style={{fontSize:"18px"}}/>
        </div>
            <p style={{margin:"12px", fontWeight:"600", fontSize:"18px"}}>Convert</p>
            <CurrencyRow options={options} selectedCurrecy={fromCurrency} onChangeCurrency={(e) => setFromCurrency(e.target.value)} amount={fromAmount} onChangeAmount={handleFromAmountChange} />
            <p style={{fontSize:"1.5em", margin:"2px"}}>=</p>
            <CurrencyRow options={options} selectedCurrecy={toCurrency} onChangeCurrency={(e) => setToCurrency(e.target.value)} amount={toAmount} onChangeAmount={handleToAmountChange} />

        </div>
    );
};

export default CurrencyConverter;
