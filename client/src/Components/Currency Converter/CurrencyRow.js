const CurrencyRow = (props)=>{
    const {options, selectedCurrecy, onChangeCurrency, amount, onChangeAmount} = props;
    return(
            <div>
                <input type="number" onChange={onChangeAmount}  value={amount}></input>
                <select value={selectedCurrecy} onChange={onChangeCurrency}>
                    {options.map((option, index)=>{
                        return(
                            <option key={index}>{option}</option>
                        );
                    })}
                </select>
            </div>
    );
}

export default CurrencyRow;